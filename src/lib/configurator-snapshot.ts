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

/**
 * Maakt een foto (JPEG dataURL) van de configuratiescène.
 * Knoppen en overlays met data-capture="hide" blijven buiten beeld.
 * Externe afbeeldingen worden eerst ingebed; lukt dat niet, dan null.
 */
export async function captureConfiguratorImage(node: HTMLElement): Promise<string | null> {
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

    return await toJpeg(node, {
      quality: 0.82,
      pixelRatio: Math.min(2, Math.max(0.5, TARGET_WIDTH / rect.width)),
      backgroundColor: "#f3efea",
      skipFonts: true,
      filter: (domNode) => {
        if (!(domNode instanceof HTMLElement)) return true;
        if (domNode.dataset["capture"] === "hide") return false;
        if (domNode.tagName === "BUTTON") return false;
        return true;
      },
    });
  } catch {
    return null;
  } finally {
    restore.forEach((fn) => fn());
  }
}
