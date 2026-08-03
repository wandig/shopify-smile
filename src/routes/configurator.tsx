import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import cinewallVisual from "@/assets/cinewall-schema-fullhouse.png.asset.json";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Wandig configurator — stel jouw tv-wand samen" },
      {
        name: "description",
        content:
          "Stel jouw Wandig direct samen: kies de zijmodules, het tv-formaat en de kleur. De prijs zie je live in beeld.",
      },
      { property: "og:title", content: "Wandig configurator — stel jouw tv-wand samen" },
      {
        property: "og:description",
        content:
          "Kies je zijmodules, tv-formaat en kleur. Live preview en directe prijsindicatie.",
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

type SideType = "left" | "right" | "none";

const SIDE_OPTIONS: Array<{ value: SideType; label: string; note: string; price: number; width: number }> = [
  { value: "left", label: "Linker module", note: "Links", price: 475, width: 60 },
  { value: "right", label: "Rechter module", note: "Rechts", price: 475, width: 60 },
  { value: "none", label: "Geen module", note: "Leeg", price: 0, width: 0 },
];

const TV_OPTIONS = [
  { value: "40–50 inch", note: "Compact", price: 0 },
  { value: "50–60 inch", note: "Meest gekozen", price: 150 },
  { value: "70–80 inch", note: "Royaal", price: 350 },
];

const BASE_PRICE = 1699;
const BASE_WIDTH = 120;

function euro(n: number) {
  return `€ ${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(n)}`;
}

function sideOption(v: SideType) {
  return SIDE_OPTIONS.find((o) => o.value === v)!;
}

function ConfiguratorPage() {
  const [color, setColor] = useState(COLORS[0]);
  const [leftType, setLeftType] = useState<SideType>("left");
  const [rightType, setRightType] = useState<SideType>("right");
  const [tv, setTv] = useState(TV_OPTIONS[0]);
  const [open, setOpen] = useState<"left" | "right" | "tv" | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!stageRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const width = useMemo(
    () => BASE_WIDTH + sideOption(leftType).width + sideOption(rightType).width,
    [leftType, rightType],
  );
  const total = useMemo(
    () => BASE_PRICE + sideOption(leftType).price + sideOption(rightType).price + tv.price,
    [leftType, rightType, tv],
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
            Klik op het tv-vak in het midden om het formaat te wijzigen. Klik op een
            zijmodule om te bepalen welk type daar moet komen. Het middenelement hangt
            visueel tegen de wand.
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

            {/* Colour picker */}
            <div className="absolute left-3 top-3 z-[9] flex items-center gap-2 rounded-[13px] border border-[#e8e2dc] bg-white/90 p-2 shadow-[0_10px_26px_rgba(3,12,26,0.07)] backdrop-blur md:left-[18px] md:top-[18px]">
              <div className="flex flex-col gap-0.5 pr-1">
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

            {/* Hint */}
            <div className="absolute left-1/2 top-[22px] z-[6] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-[#e8e2dc] bg-white/90 px-4 py-2.5 text-[12px] tracking-[0.01em] text-[#656a72] shadow-[0_10px_28px_rgba(3,12,26,0.07)] backdrop-blur md:block">
              Klik op een onderdeel om het te wijzigen
            </div>

            {/* Configuration */}
            <div className="relative z-[3] flex w-full max-w-[1200px] origin-top scale-[0.62] items-start justify-center gap-2.5 sm:scale-[0.84] lg:scale-100 lg:gap-[18px]">
              <SideSlot
                side="left"
                type={leftType}
                color={color.hex}
                open={open === "left"}
                onToggle={() => setOpen(open === "left" ? null : "left")}
                onSelect={(v) => {
                  setLeftType(v);
                  setOpen(null);
                }}
              />

              {/* Center */}
              <div className="flex min-h-[420px] w-[430px] justify-center lg:min-h-[520px] lg:w-[560px]">
                <div className="relative w-[430px] max-w-full lg:w-[520px]">
                  <img
                    src={cinewallVisual.url}
                    alt={`Wandig middenmodule in ${color.name}`}
                    className="block h-auto w-full select-none rounded-[8px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.10)]"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(open === "tv" ? null : "tv")}
                    aria-label="Tv-formaat wijzigen"
                    className="group absolute left-[8.2%] top-[27.8%] h-[42.6%] w-[81%] rounded-[4px] border-2 border-white/20 bg-[#030c1a]/[0.02] transition hover:-translate-y-[3px] hover:border-[#ef7027]/60 hover:bg-white/10"
                  >
                    <span className="pointer-events-none absolute bottom-[-16px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#e8e2dc] bg-white px-3 py-2 text-[10px] font-black tracking-[0.01em] text-[#4f545b] opacity-0 shadow-[0_12px_28px_rgba(3,12,26,0.12)] transition group-hover:bottom-[-12px] group-hover:opacity-100">
                      Klik voor tv-formaat
                    </span>
                  </button>

                  {open === "tv" && (
                    <Popover className="left-1/2 top-[62%]">
                      {TV_OPTIONS.map((o) => (
                        <PopoverItem
                          key={o.value}
                          active={o.value === tv.value}
                          label={o.value}
                          note={o.note}
                          onClick={() => {
                            setTv(o);
                            setOpen(null);
                          }}
                        />
                      ))}
                    </Popover>
                  )}
                </div>
              </div>

              <SideSlot
                side="right"
                type={rightType}
                color={color.hex}
                open={open === "right"}
                onToggle={() => setOpen(open === "right" ? null : "right")}
                onSelect={(v) => {
                  setRightType(v);
                  setOpen(null);
                }}
              />
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
                  tv.value,
                  color.name,
                  `Links: ${sideOption(leftType).label.toLowerCase()}`,
                  `Rechts: ${sideOption(rightType).label.toLowerCase()}`,
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
                    description: `${tv.value} · ${color.name} · ${width} cm · ${euro(total)}`,
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

function Popover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute z-30 min-w-[190px] -translate-x-1/2 rounded-[16px] border border-[#e8e2dc] bg-white p-2 shadow-[0_20px_60px_rgba(3,12,26,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

function PopoverItem({
  label,
  note,
  active,
  onClick,
}: {
  label: string;
  note: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[11px] px-3 py-2.5 text-left text-[12px] font-bold tracking-[0.01em] transition ${
        active ? "bg-[#fff3eb] text-[#e36820]" : "text-[#030c1a] hover:bg-[#f6f3f0]"
      }`}
    >
      {label}
      <small className="font-bold text-[#747981]">{note}</small>
    </button>
  );
}

function SideSlot({
  side,
  type,
  color,
  open,
  onToggle,
  onSelect,
}: {
  side: "left" | "right";
  type: SideType;
  color: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (v: SideType) => void;
}) {
  const empty = type === "none";
  return (
    <div className="relative flex justify-center pt-14">
      <button
        type="button"
        onClick={onToggle}
        aria-label={`${side === "left" ? "Linker" : "Rechter"} module wijzigen`}
        className={`group relative h-[296px] w-[170px] rounded-[7px] transition hover:-translate-y-[3px] hover:brightness-[1.03] lg:h-[336px] lg:w-[200px] ${
          empty
            ? "grid place-items-center border-[1.5px] border-dashed border-[#b9b1aa] bg-white/40 p-7 text-center text-[12px] font-bold text-[#7c746e]"
            : "shadow-[0_16px_34px_rgba(0,0,0,0.15)]"
        }`}
        style={empty ? undefined : { backgroundColor: color }}
      >
        {empty ? (
          <span>Geen module</span>
        ) : (
          <>
            <span className="pointer-events-none absolute inset-[18px] rounded-[3px] border border-white/20" />
            <span
              className={`pointer-events-none absolute top-[34px] h-1 w-[42px] rounded-full bg-white/50 ${
                type === "left" ? "right-[25px]" : "left-[25px]"
              }`}
            />
          </>
        )}
        <span className="pointer-events-none absolute bottom-[-16px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#e8e2dc] bg-white px-3 py-2 text-[10px] font-black tracking-[0.01em] text-[#4f545b] opacity-0 shadow-[0_12px_28px_rgba(3,12,26,0.12)] transition group-hover:bottom-[-12px] group-hover:opacity-100">
          Klik om te wijzigen
        </span>
      </button>

      {open && (
        <Popover className="left-1/2 top-0">
          {SIDE_OPTIONS.map((o) => (
            <PopoverItem
              key={o.value}
              active={o.value === type}
              label={o.label}
              note={o.note}
              onClick={() => onSelect(o.value)}
            />
          ))}
        </Popover>
      )}
    </div>
  );
}
