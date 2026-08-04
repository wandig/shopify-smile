import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import centerModule from "@/assets/center-module-trim.png.asset.json";
import leftModule from "@/assets/left-module-trim.png.asset.json";
import rightModuleUrl from "@/assets/right-module-trim-tight-cropped.png";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Wandig configurator — stel jouw tv-wand samen" },
      {
        name: "description",
        content:
          "Stel jouw Wandig direct samen: kies de modules, het tv-formaat en de kleur. De prijs zie je live in beeld.",
      },
      { property: "og:title", content: "Wandig configurator — stel jouw tv-wand samen" },
      {
        property: "og:description",
        content: "Kies je modules, tv-formaat en kleur. Live preview en directe prijsindicatie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConfiguratorPage,
});

const COLORS = [
  { name: "Eikenzwart", hex: "#242424" },
  { name: "Walnootbruin", hex: "#6b4630" },
  { name: "Truffelbruin", hex: "#8a6a52" },
  { name: "Steenwit", hex: "#ece6dd" },
  { name: "Blush", hex: "#d9a794" },
];

const TV_OPTIONS = [
  { value: '43"', note: "40–50 inch", price: 0 },
  { value: '55"', note: "50–60 inch", price: 150 },
  { value: '65"', note: "60–70 inch", price: 250 },
  { value: '75"', note: "70–80 inch", price: 350 },
];

const BASE_PRICE = 1699;
const BASE_WIDTH = 120;
const LEFT_MODULE_PRICE = 475;
const LEFT_MODULE_WIDTH = 40;
const RIGHT_MODULE_PRICE = 475;
const RIGHT_MODULE_WIDTH = 40;

function euro(n: number) {
  return `€ ${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(n)}`;
}

function ConfiguratorPage() {
  const [color, setColor] = useState(COLORS[0]);
  const [tv, setTv] = useState(TV_OPTIONS[1]);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);
  const [tvPickerOpen, setTvPickerOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTvPickerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const width = BASE_WIDTH + (hasLeft ? LEFT_MODULE_WIDTH : 0) + (hasRight ? RIGHT_MODULE_WIDTH : 0);
  const total = useMemo(
    () => BASE_PRICE + tv.price + (hasLeft ? LEFT_MODULE_PRICE : 0) + (hasRight ? RIGHT_MODULE_PRICE : 0),
    [tv, hasLeft, hasRight],
  );

  return (
    <main className="min-h-screen bg-[#f8f6f3] p-4 md:p-7">
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <header className="mb-5">
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#ef7027]">
            Wandig configurator
          </span>
          <h1 className="mt-2 max-w-[740px] text-[28px] font-bold leading-[1.02] tracking-[-0.03em] text-[#030c1a] md:text-[44px]">
            Stel jouw Wandig direct samen.
          </h1>
          <p className="mt-3 max-w-[760px] text-[14px] leading-relaxed tracking-[0.01em] text-[#747981] md:text-[15px]">
            Klik op de tv in het midden om het formaat te wijzigen en gebruik de plus links
            of rechts om de zijmodules toe te voegen.
          </p>
        </header>

        {/* Stage card */}
        <div className="overflow-hidden rounded-[24px] border border-[#e8e2dc] bg-white shadow-[0_22px_60px_rgba(3,12,26,0.10)]">
          <div className="flex items-center justify-between gap-5 border-b border-[#e8e2dc] px-5 py-4">
            <div className="flex items-center gap-3">
              <strong className="text-[14px] tracking-[0.01em] text-[#030c1a]">
                Jouw configuratie
              </strong>
              <span className="hidden text-[12px] tracking-[0.01em] text-[#747981] sm:inline">
                Alle keuzes maak je direct in de kast
              </span>
            </div>
            <span className="rounded-full bg-[#f3f0ec] px-3 py-2 text-[11px] font-bold tracking-[0.01em] text-[#5f625f]">
              Live preview
            </span>
          </div>

          {/* Scene */}
          <div
            ref={stageRef}
            className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f4f1ed] to-[#efebe6] px-3 py-16 md:min-h-[700px] md:px-8 md:pb-[78px] md:pt-[76px]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.48]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 18%, rgba(255,255,255,.75), transparent 42%), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px)",
                backgroundSize: "auto, 54px 54px, 54px 54px",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-[42px] border-t border-black/[0.03] bg-gradient-to-b from-[#ece7e1] to-[#e2dbd2]" />

            {/* Variant selectors */}
            <div className="absolute left-3 top-3 z-[9] w-[228px] md:left-[18px] md:top-[18px]">
              <div className="rounded-[13px] border border-[#e8e2dc] bg-white/90 p-3 shadow-[0_10px_26px_rgba(3,12,26,0.07)] backdrop-blur">
                <div className="mb-2 flex items-baseline gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.01em] text-[#747981]">
                    Kleur
                  </span>
                  <strong className="text-[12px] tracking-[0.01em] text-[#030c1a]">
                    {color.name}
                  </strong>
                </div>
                <div className="flex gap-1.5">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c)}
                      aria-label={c.name}
                      aria-pressed={c.name === color.name}
                      className={`h-[23px] w-[23px] rounded-full border-2 transition hover:-translate-y-px ${
                        c.name === color.name
                          ? "border-[#ef7027] shadow-[0_0_0_3px_rgba(239,112,39,0.12),inset_0_0_0_1px_rgba(0,0,0,0.18)]"
                          : "border-transparent shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {tvPickerOpen && (
                <div className="mt-2.5 rounded-[13px] border border-[#e8e2dc] bg-white/90 p-3 shadow-[0_10px_26px_rgba(3,12,26,0.07)] backdrop-blur">
                  <div className="mb-2 flex items-baseline gap-1.5">
                    <span className="text-[10px] font-bold tracking-[0.01em] text-[#747981]">
                      Tv-formaat
                    </span>
                    <strong className="text-[12px] tracking-[0.01em] text-[#030c1a]">
                      {tv.value}
                    </strong>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TV_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => setTv(o)}
                        aria-pressed={o.value === tv.value}
                        className={`rounded-[9px] border-2 px-2 py-2 text-left transition hover:-translate-y-px ${
                          o.value === tv.value
                            ? "border-[#ef7027] bg-[#fff5ee] shadow-[0_0_0_3px_rgba(239,112,39,0.12)]"
                            : "border-[#e8e2dc] bg-white"
                        }`}
                      >
                        <span className="block text-[12px] font-bold tracking-[0.01em] text-[#030c1a]">
                          {o.value}
                        </span>
                        <span className="block text-[9px] font-bold tracking-[0.01em] text-[#8a837b]">
                          {o.note}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Configuration */}
            <div className="relative z-[3] flex w-full max-w-[1200px] origin-top scale-[0.61] items-end justify-center sm:scale-[0.765] lg:scale-[0.85]">
              {/* Wall unit — modules sit flush against each other */}
              <div className="relative flex h-[420px] items-end lg:h-[520px]">
                {/* Add / remove left module */}
                <button
                  type="button"
                  onClick={() => setHasLeft(!hasLeft)}
                  aria-label={hasLeft ? "Linker module verwijderen" : "Linker module toevoegen"}
                  className="absolute left-0 top-1/2 z-[6] flex h-11 w-11 -translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e2dc] bg-white text-[20px] font-bold leading-none text-[#ef7027] shadow-[0_10px_24px_rgba(3,12,26,0.10)] transition-colors hover:border-[#ef7027]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                    {!hasLeft && <path d="M12 5v14" />}
                  </svg>
                </button>

                <div
                  className={`relative z-[1] mr-[-3px] h-[99.7%] -translate-y-[1px] overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    hasLeft ? "max-w-[600px] opacity-100" : "max-w-0 opacity-0"
                  }`}
                >
                  <img
                    src={leftModule.url}
                    alt={`Wandig linker module in ${color.name}`}
                    className={`block h-full w-auto select-none origin-bottom-right transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasLeft ? "translate-x-0 scale-100" : "translate-x-6 scale-[95%]"
                    }`}
                  />
                </div>
                <div className="relative z-[2] h-full">
                  <img
                    src={centerModule.url}
                    alt={`Wandig middenmodule in ${color.name}`}
                    className="block h-full w-auto select-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTvPickerOpen(!tvPickerOpen)}
                    aria-label="Tv-formaat wijzigen"
                    className="group absolute left-[6.2%] top-[25.4%] h-[48.6%] w-[87.6%] cursor-pointer"
                  >
                    <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#e8e2dc] bg-white px-3 py-2 text-[11px] font-black tracking-[0.01em] text-[#4f545b] opacity-0 shadow-[0_12px_28px_rgba(3,12,26,0.12)] transition group-hover:-top-10 group-hover:opacity-100">
                      Klik voor tv-formaat
                    </span>
                  </button>
                </div>
                <div
                  className={`relative z-[1] ml-[-3px] h-[99.7%] -translate-y-[1px] overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    hasRight ? "max-w-[600px] opacity-100" : "max-w-0 opacity-0"
                  }`}
                >
                  <img
                    src={rightModuleUrl}
                    alt={`Wandig rechter module in ${color.name}`}
                    className={`block h-full w-auto select-none origin-bottom-left transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasRight ? "translate-x-0 scale-100" : "-translate-x-6 scale-[95%]"
                    }`}
                  />
                </div>

                {/* Add / remove right module */}
                <button
                  type="button"
                  onClick={() => setHasRight(!hasRight)}
                  aria-label={hasRight ? "Rechter module verwijderen" : "Rechter module toevoegen"}
                  className="absolute right-0 top-1/2 z-[6] flex h-11 w-11 translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e2dc] bg-white text-[20px] font-bold leading-none text-[#ef7027] shadow-[0_10px_24px_rgba(3,12,26,0.10)] transition-colors hover:border-[#ef7027]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                    {!hasRight && <path d="M12 5v14" />}
                  </svg>
                </button>
              </div>

            </div>


            <div className="absolute bottom-[54px] left-1/2 z-[4] -translate-x-1/2 rounded-full bg-white/75 px-3 py-1.5 text-[11px] font-bold tracking-[0.01em] text-[#6d6762] backdrop-blur">
              {width} cm totale breedte
            </div>
            <div className="absolute bottom-[58px] right-[22px] z-[4] hidden rounded-full border border-black/[0.04] bg-white/70 px-3 py-1.5 text-[11px] font-bold tracking-[0.01em] text-[#8a837b] backdrop-blur md:block">
              Cinewall look · wandgemonteerd
            </div>
          </div>

          {/* Price panel */}
          <div className="grid items-center gap-6 border-t border-[#e8e2dc] bg-white px-6 py-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <strong className="text-[14px] tracking-[0.01em] text-[#030c1a]">
                Jouw Wandig
              </strong>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[
                  `Tv ${tv.value}`,
                  color.name,
                  hasLeft && hasRight
                    ? "Met linker & rechter module"
                    : hasLeft
                      ? "Met linker module"
                      : hasRight
                        ? "Met rechter module"
                        : "Alleen middenmodule",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-[#f5f2ef] px-3 py-2 text-[11px] font-bold tracking-[0.01em] text-[#62676e]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-[18px]">
              <div className="text-left md:text-right">
                <span className="mb-1 block text-[11px] tracking-[0.01em] text-[#747981]">
                  Indicatieve totaalprijs
                </span>
                <strong className="text-[30px] font-bold tracking-[-0.03em] text-[#030c1a]">
                  {euro(total)}
                </strong>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.success("Samenstelling opgeslagen", {
                    description: `Tv ${tv.value} · ${color.name} · ${width} cm · ${euro(total)}`,
                  })
                }
                className="whitespace-nowrap rounded-[14px] bg-[#ef7027] px-5 py-4 text-[13px] font-black tracking-[0.04em] text-white shadow-[0_12px_25px_rgba(239,112,39,0.24)] transition hover:-translate-y-px hover:bg-[#e36820]"
              >
                Voeg samenstelling toe
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
