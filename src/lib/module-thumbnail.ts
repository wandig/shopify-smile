import {
  getConfiguratorModuleAsset,
  MODULE_CROPS,
  type ModuleCrop,
  type ModulePosition,
} from "@/components/WandigModulePreview";

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

/**
 * Maakt een vierkante foto (JPEG dataURL) van één module in de gekozen kleur,
 * zodat de winkelmand het juiste losse item met de juiste kleur laat zien.
 */
export async function captureModuleThumbnail(
  color: string,
  tvSize: string,
  position: ModulePosition,
  moduleVariant: "original" | "nieuw" | "dicht" | "open" = "dicht",
): Promise<string | null> {
  if (typeof document === "undefined") return null;

  const asset = getConfiguratorModuleAsset(color, tvSize);
  if (!asset) return null;

  // Gebruik exact dezelfde bron als in de modulekiezer: A komt uit de
  // volledige opstelling, B uit de losse positionAsset.
  const positionAsset =
    position === "center" || moduleVariant === "original" || moduleVariant === "open"
      ? undefined
      : asset.positionAssets?.[position];
  const source = positionAsset?.source ?? asset.source;
  const crop: ModuleCrop = positionAsset?.crop ?? (asset.crops ?? MODULE_CROPS)[position];

  const image = await loadImage(source);
  if (!image?.naturalWidth) return null;

  const sx = crop.left * image.naturalWidth;
  const sy = crop.top * image.naturalHeight;
  const sw = crop.width * image.naturalWidth;
  const sh = crop.height * image.naturalHeight;
  if (sw < 1 || sh < 1) return null;

  const size = 360;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#f3efea";
  ctx.fillRect(0, 0, size, size);

  // Vul het vierkant zonder de module te vervormen (met kleine marge).
  const inner = size * 0.92;
  const scale = Math.min(inner / sw, inner / sh);
  const dw = sw * scale;
  const dh = sh * scale;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, sx, sy, sw, sh, (size - dw) / 2, (size - dh) / 2, dw, dh);

  try {
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    return null;
  }
}
