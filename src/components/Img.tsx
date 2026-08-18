import { optimizeImageUrl, optimizedSrcSet } from "@/lib/asset-image";

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
  /** Beoogde weergavebreedte in CSS-px (1x). Retina krijgt automatisch 2x. */
  w?: number;
  /** Zet aan voor het LCP-beeld: eager laden met hoge prioriteit. */
  priority?: boolean;
  ref?: React.Ref<HTMLImageElement>;
};

/**
 * Drop-in vervanging voor <img> die CDN-resizing + moderne formaten gebruikt
 * en standaard lazy laadt.
 */
export function Img({ src, w = 900, priority = false, loading, decoding, ...rest }: ImgProps) {
  const optimized = optimizeImageUrl(src, w);
  const srcSet = optimizedSrcSet(src, w);

  return (
    <img
      {...rest}
      src={optimized}
      srcSet={srcSet}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? (priority ? "sync" : "async")}
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}

export default Img;
