import { useEffect, useRef, useState } from "react";
import { optimizeImageUrl } from "@/lib/asset-image";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Laadt de video direct (voor de hero boven de fold). */
  eager?: boolean;
};

/**
 * Video die pas gaat downloaden zodra hij (bijna) in beeld komt.
 * Tot dat moment wordt alleen de poster-afbeelding geladen.
 */
export function LazyVideo({ src, poster, className, eager = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    if (active) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    if (el.getAttribute("src") !== src) el.setAttribute("src", src);
    el.load();
    void el.play().catch(() => {});
  }, [active, src]);

  return (
    <video
      ref={ref}
      poster={optimizeImageUrl(poster, 1280)}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={active ? "auto" : "none"}
      className={className}
    />
  );
}

export default LazyVideo;
