import { useEffect, useState, type RefObject } from "react";

const DOT_COUNT = 3;

export function ScrollDots({
  scrollRef,
  className = "",
  mobileOnly = true,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
  className?: string;
  mobileOnly?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const ratio = max > 0 ? el.scrollLeft / max : 0;
      setActive(Math.round(ratio * (DOT_COUNT - 1)));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollRef]);

  const goTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max * index) / (DOT_COUNT - 1), behavior: "smooth" });
  };

  return (
    <div
      className={`${mobileOnly ? "flex md:hidden" : "flex"} items-center justify-center gap-1.5 ${className}`}
      role="tablist"
      aria-label="Scrollpositie"
    >
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Ga naar positie ${i + 1}`}
          aria-selected={active === i}
          role="tab"
          className={`h-1.5 rounded-full transition-all duration-300 ${
            active === i ? "w-5 bg-[#ef7027]" : "w-1.5 bg-[#071426]/25"
          }`}
        />
      ))}
    </div>
  );
}
