import { useEffect, useRef, useState } from "react";
import { optimizeImageUrl } from "@/lib/asset-image";

export type VideoSource = {
  src: string;
  type: string;
  /** Optionele media-query, bijv. "(max-width: 767px)". */
  media?: string;
};

type LazyVideoProps = {
  /** Enkele bron (fallback wanneer geen `sources` is opgegeven). */
  src?: string;
  /** Meerdere bronnen: eerst WebM, daarna MP4 als fallback. */
  sources?: VideoSource[];
  poster?: string;
  className?: string;
  /** Laadt de video direct (voor de hero boven de fold). */
  eager?: boolean;
  /** Zet geluid aan zolang de video in beeld is en uit als je wegscrollt. */
  unmuteInView?: boolean;
};

/**
 * Video die pas gaat downloaden zodra hij (bijna) in beeld komt.
 * Tot dat moment wordt alleen de poster-afbeelding geladen.
 */
export function LazyVideo({ src, sources, poster, className, eager = false, unmuteInView = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);
  const [inView, setInView] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

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
    if (src && el.getAttribute("src") !== src) el.setAttribute("src", src);
    el.load();
    void el.play().catch(() => {});
  }, [active, src]);

  /* Houdt bij of de video echt in beeld staat (voor geluid aan/uit). */
  useEffect(() => {
    if (!unmuteInView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setInView(!!e && e.isIntersecting && e.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5, 0.75] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [unmuteInView]);

  /* Geluid aan in beeld, uit buiten beeld. Browsers kunnen dit blokkeren
     tot de bezoeker iets op de pagina heeft aangeklikt. */
  useEffect(() => {
    if (!unmuteInView) return;
    const el = ref.current;
    if (!el) return;

    if (!inView) {
      el.muted = true;
      setSoundOn(false);
      return;
    }

    let cancelled = false;
    const tryUnmute = () => {
      if (cancelled || !ref.current) return;
      const v = ref.current;
      v.muted = false;
      v.volume = 1;
      void v
        .play()
        .then(() => {
          if (!cancelled) setSoundOn(!v.muted);
        })
        .catch(() => {
          v.muted = true;
          if (!cancelled) setSoundOn(false);
        });
    };

    tryUnmute();
    const onGesture = () => tryUnmute();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [inView, unmuteInView, active]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted) el.volume = 1;
    void el.play().catch(() => {});
    setSoundOn(!el.muted);
  };

  const video = (
    <video
      ref={ref}
      poster={optimizeImageUrl(poster, 1280)}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={active ? "auto" : "none"}
      className={className}
    >
      {active && sources
        ? sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={s.media} />
          ))
        : null}
    </video>
  );

  if (!unmuteInView) return video;

  return (
    <div className="relative">
      {video}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundOn ? "Geluid uitzetten" : "Geluid aanzetten"}
        className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
      >
        {soundOn ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            <path d="m17 9 4 6" />
            <path d="m21 9-4 6" />
          </svg>
        )}
      </button>
    </div>
  );
}


export default LazyVideo;
