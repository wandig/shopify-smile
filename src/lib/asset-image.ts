/**
 * Bouwt geoptimaliseerde image-URL's.
 *
 * - Lovable assets (/__l5e/assets-v1/...) ondersteunen `?w=` + `q=` en
 *   onderhandelen automatisch AVIF/WebP via de Accept-header.
 * - Shopify CDN URL's ondersteunen `?width=`.
 * - Alle andere URL's (data:, blob:, svg in de bundle) blijven ongewijzigd.
 */

const LOVABLE_ASSET_PREFIX = "/__l5e/assets-v1/";

export function optimizeImageUrl(src: string | undefined, width: number, quality = 80): string | undefined {
  if (!src) return src;
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;

  const w = Math.max(64, Math.round(width));

  if (src.startsWith(LOVABLE_ASSET_PREFIX) || src.includes(LOVABLE_ASSET_PREFIX)) {
    if (/\.svg($|\?)/i.test(src)) return src;
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${w}&q=${quality}`;
  }

  if (src.includes("cdn.shopify.com")) {
    if (/\.svg($|\?)/i.test(src)) return src;
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}width=${w}`;
  }

  return src;
}

/** `1x/2x` srcset zodat retina-schermen scherp blijven zonder overfetch op 1x. */
export function optimizedSrcSet(src: string | undefined, width: number, quality = 80): string | undefined {
  if (!src) return undefined;
  const one = optimizeImageUrl(src, width, quality);
  const two = optimizeImageUrl(src, width * 2, quality);
  if (!one || !two || one === two) return undefined;
  return `${one} 1x, ${two} 2x`;
}
