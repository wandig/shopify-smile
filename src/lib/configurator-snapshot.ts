import { toJpeg } from "html-to-image";

const TARGET_WIDTH = 900;

async function toDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

/**
 * Snijdt rond de kast (focus-element) een 4:3 uitsnede uit de foto,
 * zodat de kast volledig zichtbaar, groot en gecentreerd is.
 */
async function cropAroundFocus(
  dataUrl: string,
  focusRect: DOMRect,
  stageRect: DOMRect,
  pixelRatio: number,
): Promise<string | null> {
  const image = await loadImage(dataUrl);
  if (!image) return null;

  const scale = image.width / stageRect.width;
  const cabLeft = (focusRect.left - stageRect.left) * pixelRatio;
  const cabTop = (focusRect.top - stageRect.top) * pixelRatio;
  const cabWidth = Math.max(1, focusRect.width * pixelRatio);
  const cabHeight = Math.max(1, focusRect.height * pixelRatio);

  // Kast vult ~80% van de breedte van de uitsnede, en staat ~30% lager in beeld.
  // Daartoe is het kader in de hoogte ruim genoeg (kast + 2x verschuiving + marge).
  const cropHeight = Math.max((cabWidth / 0.8) * (3 / 4), cabHeight * 1.95, cabHeight / 0.86);
  const cropWidth = cropHeight * (4 / 3);

  // Uitsnede schuift omhoog ten opzichte van de kast, zodat de kast lager staat.
  let x = cabLeft + cabWidth / 2 - cropWidth / 2;
  let y = cabTop + cabHeight / 2 - cropHeight / 2 - cabHeight * 0.42;

  // Binnen de foto houden.
  const drawWidth = Math.min(cropWidth, image.width);
  const drawHeight = Math.min(cropHeight, image.height);
  x = Math.min(Math.max(x, 0), Math.max(0, image.width - drawWidth));
  y = Math.min(Math.max(y, 0), Math.max(0, image.height - drawHeight));

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(drawWidth);
  canvas.height = Math.round(drawHeight);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#f3efea";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight, 0, 0, canvas.width, canvas.height);
  try {
    return canvas.toDataURL("image/jpeg", 0.88);
  } catch {
    return null;
  }
}

/**
 * Maakt een foto (JPEG dataURL) van de configuratiescène.
 * Knoppen en overlays met data-capture="hide" blijven buiten beeld.
 * Externe afbeeldingen worden eerst ingebed; lukt dat niet, dan null.
 * Met `focus` wordt de kast volledig, groot en gecentreerd in beeld gezet.
 */
export async function captureConfiguratorImage(
  node: HTMLElement,
  focus?: HTMLElement | null,
): Promise<string | null> {
  const restore: Array<() => void> = [];

  try {
    const images = Array.from(node.querySelectorAll("img"));
    await Promise.all(
      images.map(async (image) => {
        const src = image.getAttribute("src");
        if (!src || src.startsWith("data:")) return;
        const absolute = new URL(src, window.location.href);
        if (absolute.origin === window.location.origin) return;
        const dataUrl = await toDataUrl(absolute.toString());
        if (!dataUrl) return;
        const originalSrc = src;
        const originalSrcSet = image.getAttribute("srcset");
        image.setAttribute("src", dataUrl);
        image.removeAttribute("srcset");
        restore.push(() => {
          image.setAttribute("src", originalSrc);
          if (originalSrcSet) image.setAttribute("srcset", originalSrcSet);
        });
      }),
    );

    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    const pixelRatio = Math.min(2, Math.max(0.5, TARGET_WIDTH / rect.width));

    const full = await toJpeg(node, {
      quality: 0.82,
      pixelRatio,
      backgroundColor: "#f3efea",
      skipFonts: true,
      filter: (domNode) => {
        if (!(domNode instanceof HTMLElement)) return true;
        if (domNode.dataset["capture"] === "hide") return false;
        if (domNode.tagName === "BUTTON") return false;
        return true;
      },
    });

    if (!focus) return full;

    const focusRect = focus.getBoundingClientRect();
    if (!focusRect.width || !focusRect.height) return full;
    return await cropAroundFocus(full, focusRect, rect, pixelRatio);
  } catch {
    return null;
  } finally {
    restore.forEach((fn) => fn());
  }
}
