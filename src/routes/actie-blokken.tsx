import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Download, MonitorPlay, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { FULL_HOUSE_COLORS, wandigSwatchStyle, displayWandigColor } from "@/lib/wandig-colors";
import puzzleIconAsset from "@/assets/Untitled_design_23.svg.asset.json";


export const Route = createFileRoute("/actie-blokken")({
  head: () => ({
    meta: [
      { title: "Actieblokken — Wandig componentbibliotheek" },
      {
        name: "description",
        content:
          "Interne bibliotheek met Wandig actie-, CTA- en USP-blokken voor advertenties, social creatives en campagnes.",
      },
      { property: "og:title", content: "Actieblokken — Wandig componentbibliotheek" },
      {
        property: "og:description",
        content: "Premium campagneblokken in de Wandig-stijl: sale, CTA's, USP's en Cinewall.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ActieBlokkenPage,
});

/* ---------------- design tokens ---------------- */

const T = {
  card: "rounded-[22px]",
  pill: "rounded-full",
  ink: "#1f1915",
  navy: "#0e1f2a",
  orange: "#ff7d2f",
  bluegrey: "#7f919b",
  cream: "#f2eee7",
  pad: "p-5 md:p-6",
} as const;

type Tone = "light" | "dark" | "orange" | "bluegrey";

const TONES: Record<Tone, { bg: string; fg: string; sub: string; line: string; accent: string }> = {
  light: { bg: "#faf8f5", fg: T.ink, sub: "rgba(31,25,21,0.55)", line: "rgba(31,25,21,0.10)", accent: T.orange },
  dark: { bg: T.navy, fg: "#f7f4ef", sub: "rgba(247,244,239,0.60)", line: "rgba(247,244,239,0.14)", accent: T.orange },
  orange: { bg: T.orange, fg: "#fffaf5", sub: "rgba(255,250,245,0.75)", line: "rgba(255,250,245,0.28)", accent: "#fffaf5" },
  bluegrey: { bg: T.bluegrey, fg: "#ffffff", sub: "rgba(255,255,255,0.72)", line: "rgba(255,255,255,0.24)", accent: "#fffaf5" },
};

/* ---------------- primitives ---------------- */

function Kicker({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color }}>
      {children}
    </span>
  );
}

export function ArrowCircle({
  tone = "light",
  size = 40,
}: {
  tone?: Tone;
  size?: number;
}) {
  const t = TONES[tone];
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full border transition"
      style={{ width: size, height: size, borderColor: t.line, color: t.fg }}
    >
      <ArrowRight style={{ width: size * 0.4, height: size * 0.4 }} strokeWidth={1.5} />
    </span>
  );
}

function PuzzlePieceBlock({
  size = 96,
  tone = "light",
}: {
  size?: number;
  tone?: "light" | "dark" | "orange";
}) {
  const bg = tone === "dark" ? T.navy : tone === "orange" ? T.orange : "#faf8f5";
  const line = tone === "dark" ? "rgba(247,244,239,0.14)" : tone === "orange" ? "rgba(255,250,245,0.28)" : "rgba(31,25,21,0.10)";
  const filter =
    tone === "orange"
      ? "brightness(0) saturate(100%) invert(100%)"
      : "brightness(0) saturate(100%) invert(54%) sepia(93%) saturate(1300%) hue-rotate(350deg) brightness(101%) contrast(101%)";
  return (
    <div
      className={`${T.card} inline-flex w-fit items-center justify-center border`}
      style={{ background: bg, borderColor: line, padding: size * 0.28 }}
    >
      <img
        src={puzzleIconAsset.url}
        alt="Puzzelstuk"
        style={{ width: size, height: size, filter }}
      />
    </div>
  );
}

/* ---------------- 1. Sale blocks ---------------- */

export function SaleEditorialCard({
  kicker = "Verjaardagsale",
  amount = "30%",
  amountSuffix = "korting",
  footnote = "Op alle tv-meubels",
  tone = "light",
}: {
  kicker?: string;
  amount?: string;
  amountSuffix?: string;
  footnote?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} flex flex-col border pl-5 pr-4 py-5 md:pl-6 md:pr-5 md:py-6`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <div className="flex items-start justify-between">
        <Kicker color={t.sub}>{kicker}</Kicker>
        <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
      </div>
      <div className="mt-4">
        <div
          className="text-[80px] font-medium leading-[0.82] tracking-[-0.05em] md:text-[104px]"
          style={{ color: t.accent === "#fffaf5" ? t.fg : T.orange }}
        >
          {amount}
        </div>
        <div className="mt-1.5 text-[24px] font-normal leading-none tracking-[-0.01em]" style={{ color: t.fg }}>
          {amountSuffix}
        </div>
      </div>
      <div className="mt-4 border-t pt-3 text-[13px]" style={{ borderColor: t.line, color: t.sub }}>
        {footnote}
      </div>
    </div>
  );
}

export function SaleCompactCard({
  title = "We zijn jarig",
  amount = "30%",
  sub = "Tijdelijk 30% verjaardagskorting",
  tone = "dark",
}: {
  title?: string;
  amount?: string;
  sub?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div className={`${T.card} border pl-5 pr-4 py-5`} style={{ background: t.bg, borderColor: t.line }}>
      <Kicker color={t.sub}>{title}</Kicker>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-[52px] font-medium leading-none tracking-[-0.04em]" style={{ color: T.orange }}>
          {amount}
        </span>
        <span className="text-[17px]" style={{ color: t.fg }}>
          korting
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed" style={{ color: t.sub }}>
        {sub}
      </p>
    </div>
  );
}

export function SalePill({
  text = "Verjaardagsale — 30% korting",
  tone = "light",
}: {
  text?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <span
      className={`${T.pill} inline-flex items-center gap-2.5 border px-5 py-2.5 text-[13px]`}
      style={{ background: t.bg, borderColor: t.line, color: t.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
      {text}
    </span>
  );
}

export function SaleLabel({ text = "Tijdelijk", tone = "light" }: { text?: string; tone?: Tone }) {
  const t = TONES[tone];
  return (
    <span
      className={`${T.pill} inline-flex items-center border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]`}
      style={{ borderColor: tone === "light" ? "rgba(255,125,47,0.4)" : t.line, color: tone === "light" ? T.orange : t.fg }}
    >
      {text}
    </span>
  );
}

/* ---------------- 2. CTA ---------------- */

type CtaVariant = "orange" | "navy" | "cream";

export function CtaButton({
  label = "Shop nu",
  variant = "orange",
  to,
}: {
  label?: string;
  variant?: CtaVariant;
  to?: string;
}) {
  const styles: Record<CtaVariant, { bg: string; fg: string; border: string }> = {
    orange: { bg: T.orange, fg: "#fffaf5", border: T.orange },
    navy: { bg: T.navy, fg: "#f7f4ef", border: T.navy },
    cream: { bg: "#faf8f5", fg: T.ink, border: "rgba(31,25,21,0.14)" },
  };
  const s = styles[variant];
  const inner = (
    <span
      className={`${T.pill} inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium transition hover:opacity-90`}
      style={{ background: s.bg, color: s.fg, borderColor: s.border }}
    >
      {label}
      <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
    </span>
  );
  return to ? <Link to={to as never}>{inner}</Link> : inner;
}

export function CtaWide({
  label = "Bekijk tv-meubels",
  sub,
  tone = "light",
}: {
  label?: string;
  sub?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} flex min-w-[240px] items-center justify-between gap-6 border pl-5 pr-4 py-4`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <span>
        <span className="block text-[17px] font-normal tracking-[-0.01em]" style={{ color: t.fg }}>
          {label}
        </span>
        {sub && (
          <span className="mt-1 block text-[13px]" style={{ color: t.sub }}>
            {sub}
          </span>
        )}
      </span>
      <ArrowCircle tone={tone} />
    </div>
  );
}

export function CtaTextArrow({ label = "Ontdek de Cinewall", tone = "light" }: { label?: string; tone?: Tone }) {
  const t = TONES[tone];
  return (
    <span className="inline-flex items-center gap-3 text-[15px]" style={{ color: t.fg }}>
      {label}
      <ArrowCircle tone={tone} size={32} />
    </span>
  );
}

/* ---------------- 3. Discovery cards ---------------- */

export function DiscoveryCard({
  kicker,
  title,
  sub,
  cta = "Bekijken",
  tone = "light",
  children,
}: {
  kicker?: string;
  title: string;
  sub: string;
  cta?: string;
  tone?: Tone;
  children?: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} flex min-w-[280px] flex-col border pl-5 pr-4 py-5 md:pl-6 md:pr-5 md:py-6`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      {kicker && <Kicker color={t.sub}>{kicker}</Kicker>}
      <h3 className="mt-3 text-[26px] font-normal leading-[1.15] tracking-[-0.015em]" style={{ color: t.fg }}>
        {title}
      </h3>
      <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed" style={{ color: t.sub }}>
        {sub}
      </p>
      {children && <div className="mt-4">{children}</div>}
      <div className="mt-auto flex items-center justify-between pt-8">
        <span className="text-[13px]" style={{ color: t.sub }}>
          {cta}
        </span>
        <ArrowCircle tone={tone} size={36} />
      </div>
    </div>
  );
}

export function ColorSwatchRow({ tone = "light" }: { tone?: Tone }) {
  const t = TONES[tone];
  return (
    <div className="flex items-center gap-3">
      {FULL_HOUSE_COLORS.map((name) => (
        <span
          key={name}
          title={displayWandigColor(name)}
          aria-label={displayWandigColor(name)}
          className="h-9 w-9 rounded-full border"
          style={{ ...wandigSwatchStyle(name), borderColor: t.line }}
        />
      ))}
    </div>
  );
}

/* ---------------- 4. USP ---------------- */

const USP_ICONS = { CalendarClock, Truck, ShieldCheck, Sparkles, MonitorPlay };

export function UspBlock({
  icon = "CalendarClock",
  title,
  sub,
  tone = "light",
  size = "md",
}: {
  icon?: keyof typeof USP_ICONS;
  title: string;
  sub?: string;
  tone?: Tone;
  size?: "sm" | "md";
}) {
  const t = TONES[tone];
  const Icon = USP_ICONS[icon];

  if (size === "sm") {
    return (
      <div
        className={`${T.card} inline-flex w-fit items-center gap-2.5 border pl-4 pr-3 py-3`}
        style={{ background: t.bg, borderColor: t.line }}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} style={{ color: T.orange }} />
        <span className="text-[13px] font-normal tracking-[-0.01em]" style={{ color: t.fg }}>
          {title}
        </span>
        {sub && (
          <span className="text-[12px]" style={{ color: t.sub }}>
            · {sub}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`${T.card} inline-block w-fit border pl-6 pr-5 py-6`} style={{ background: t.bg, borderColor: t.line }}>
      <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: T.orange }} />
      <p className="mt-3 text-[16px] font-normal tracking-[-0.01em]" style={{ color: t.fg }}>
        {title}
      </p>
      {sub && (
        <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: t.sub }}>
          {sub}
        </p>
      )}
    </div>
  );
}


/* ---------------- 5. Cinewall editorial ---------------- */

export function CinewallEditorial({
  title = "Cinewall",
  line = "Van muur naar blikvanger.",
  cta = "Bekijk collectie",
  tone = "dark",
}: {
  title?: string;
  line?: string;
  cta?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} flex flex-col justify-between border pl-5 pr-4 py-5 md:pl-6 md:pr-5 md:py-6`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <div>
        <h3 className="text-[44px] font-normal leading-[0.95] tracking-[-0.03em] md:text-[56px]" style={{ color: t.fg }}>
          {title}
        </h3>
        <p className="mt-3 text-[16px]" style={{ color: t.sub }}>
          {line}
        </p>
      </div>
      <div className="mt-6 border-t pt-3" style={{ borderColor: t.line }}>
        <CtaTextArrow label={cta} tone={tone} />
      </div>
    </div>
  );
}

export function CinewallMinimal({ tone = "light" }: { tone?: Tone }) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} flex min-h-[160px] items-end border pl-5 pr-4 py-5 md:pl-6 md:pr-5 md:py-6`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <h3 className="text-[40px] font-normal leading-[0.98] tracking-[-0.03em] md:text-[52px]" style={{ color: t.fg }}>
        Ontdek de
        <br />
        Cinewall
        <span style={{ color: T.orange }}>.</span>
      </h3>
    </div>
  );
}

/* ---------------- 6. losse kleine blokken ---------------- */

export function MiniBlock({
  text,
  tone = "light",
  accentDot = false,
  size = "md",
}: {
  text: string;
  tone?: Tone;
  accentDot?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const t = TONES[tone];
  const s = {
    sm: { pad: "pl-4 pr-3 py-3", text: "text-[13px]" },
    md: { pad: "pl-4 pr-3 py-3", text: "text-[15px]" },
    lg: { pad: "pl-5 pr-4 py-4", text: "text-[19px]" },
  }[size];
  return (
    <div
      className={`${T.card} border ${s.pad} inline-flex w-fit items-center gap-2.5`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      {accentDot && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: T.orange }} />}
      <span className={`${s.text} font-normal tracking-[-0.01em]`} style={{ color: t.fg }}>
        {text}
      </span>
    </div>
  );
}

export function MiniStatBlock({
  amount = "30%",
  label = "korting",
  tone = "light",
}: {
  amount?: string;
  label?: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} inline-block min-w-[140px] border pl-5 pr-4 py-4`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[40px] font-medium leading-none tracking-[-0.04em]" style={{ color: T.orange }}>
          {amount}
        </span>
        <span className="text-[15px]" style={{ color: t.fg }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export function SwatchOnlyBlock({ tone = "light", size = 40 }: { tone?: Tone; size?: number }) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} inline-block border pl-5 pr-4 py-4`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <div className="flex items-center justify-center gap-3">
        {FULL_HOUSE_COLORS.map((name) => (
          <span
            key={name}
            title={displayWandigColor(name)}
            aria-label={displayWandigColor(name)}
            className="rounded-full border"
            style={{ ...wandigSwatchStyle(name), borderColor: t.line, width: size, height: size }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- 7. hero lockup (zoals /producten) ---------------- */

export function HeroLockupBlock({
  eyebrow = "Cinewalls",
  title = "Verjaardagssale",
  badge = "-30%",
  sub,
  tone = "light",
  align = "left",
  size = "md",
  bare = false,
}: {
  eyebrow?: string;
  title?: string;
  badge?: string | null;
  sub?: string;
  tone?: Tone;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  bare?: boolean;
}) {
  const t = TONES[tone];
  const s = {
    sm: { title: "text-[26px]", badge: "text-[14px] px-2.5 py-1", pad: "pl-5 pr-4 py-5" },
    md: { title: "text-[36px] md:text-[44px]", badge: "text-[18px] px-3 py-1.5", pad: "pl-6 pr-5 py-6" },
    lg: { title: "text-[52px] md:text-[68px]", badge: "text-[22px] px-3.5 py-2", pad: "pl-7 pr-6 py-8" },
  }[size];

  return (
    <div
      className={`${bare ? "" : `${T.card} border ${s.pad}`} inline-block w-fit`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line }}
    >
      <div
        className={`flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center text-center" : ""}`}
      >
        {eyebrow && (
          <p
            className="w-full text-[13px] font-medium uppercase tracking-[0.12em]"
            style={{ color: t.sub }}
          >
            {eyebrow}
          </p>
        )}
        <h3
          className={`font-serif ${s.title} leading-[1.05]`}
          style={{ color: t.fg }}
        >
          {title}
        </h3>
        {badge && (
          <span
            className={`inline-flex items-center justify-center rounded-lg border bg-transparent ${s.badge} font-medium shadow-sm`}
            style={{ borderColor: t.accent, color: t.accent, transform: "rotate(6deg)" }}
          >
            {badge}
          </span>
        )}
      </div>
      {sub && (
        <p
          className={`mt-3 max-w-[420px] text-[15px] leading-relaxed ${align === "center" ? "mx-auto text-center" : ""}`}
          style={{ color: t.sub }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------------- 9. balloons (verjaardagsale) ---------------- */

function BalloonShape({
  color,
  size = 48,
  string = true,
  rotation = 0,
}: {
  color: string;
  size?: number;
  string?: boolean;
  rotation?: number;
}) {
  const w = size;
  const h = size * 1.18;
  const knot = size * 0.12;
  return (
    <svg
      width={w}
      height={h + (string ? size * 0.7 : 0)}
      viewBox={`0 0 ${w} ${h + (string ? size * 0.7 : 0)}`}
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "center top" }}
    >
      <ellipse
        cx={w / 2}
        cy={h / 2 - knot / 2}
        rx={w / 2 - 1}
        ry={h / 2 - knot / 2 - 1}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
      <path
        d={`M${w / 2} ${h - knot} L${w / 2 - knot * 0.4} ${h} L${w / 2 + knot * 0.4} ${h} Z`}
        fill={color}
      />
      {string && (
        <path
          d={`M${w / 2} ${h} Q${w / 2 + size * 0.12} ${h + size * 0.22} ${w / 2 - size * 0.06} ${h + size * 0.46} T${w / 2 + size * 0.08} ${h + size * 0.7}`}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      )}
      <ellipse
        cx={w / 2 - size * 0.16}
        cy={h / 2 - size * 0.22}
        rx={size * 0.06}
        ry={size * 0.1}
        fill={color}
        opacity={0.35}
      />
    </svg>
  );
}

function BalloonCluster({
  tone = "light",
  size = 64,
}: {
  tone?: Tone;
  size?: number;
}) {
  const t = TONES[tone];
  const accent = tone === "orange" ? "#fffaf5" : T.orange;
  const secondary = tone === "orange" ? "rgba(255,250,245,0.55)" : t.sub;
  return (
    <div className="relative inline-flex h-[120px] w-[120px] items-start justify-center">
      <div className="absolute" style={{ left: 6, top: 22 }}>
        <BalloonShape color={secondary} size={size * 0.72} rotation={-14} />
      </div>
      <div className="absolute" style={{ right: 8, top: 18 }}>
        <BalloonShape color={secondary} size={size * 0.68} rotation={16} />
      </div>
      <div className="absolute" style={{ left: "50%", top: 0, transform: "translateX(-50%)" }}>
        <BalloonShape color={accent} size={size} rotation={0} />
      </div>
    </div>
  );
}

export function BalloonBlock({
  kicker = "Verjaardagsale",
  title = "We zijn jarig",
  amount = "30%",
  sub = "korting op alle tv-meubels",
  tone = "light",
  bare = false,
}: {
  kicker?: string;
  title?: string;
  amount?: string;
  sub?: string;
  tone?: Tone;
  bare?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${bare ? "" : `${T.card} border`} inline-block w-fit pl-6 pr-5 py-6`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line }}
    >
      <div className="flex items-start gap-5">
        <BalloonCluster tone={tone} size={56} />
        <div className="flex min-w-[180px] flex-col justify-center pt-2">
          <Kicker color={t.sub}>{kicker}</Kicker>
          <p className="mt-2 text-[22px] font-normal leading-[1.1] tracking-[-0.015em]" style={{ color: t.fg }}>
            {title}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[44px] font-medium leading-none tracking-[-0.04em]" style={{ color: T.orange }}>
              {amount}
            </span>
            <span className="text-[15px]" style={{ color: t.sub }}>
              {sub}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BalloonMini({
  text = "Verjaardagsale",
  tone = "light",
  bare = false,
}: {
  text?: string;
  tone?: Tone;
  bare?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${bare ? "" : `${T.card} border`} inline-flex w-fit items-center gap-2.5 pl-4 pr-3 py-3`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line }}
    >
      <BalloonShape color={T.orange} size={22} string={false} />
      <span className="text-[13px] font-normal tracking-[-0.01em]" style={{ color: t.fg }}>
        {text}
      </span>
    </div>
  );
}

export function BalloonDiscountPill({
  amount = "30%",
  label = "Verjaardagskorting",
  tone = "light",
  bare = false,
}: {
  amount?: string;
  label?: string;
  tone?: Tone;
  bare?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${bare ? "" : `${T.pill} border`} inline-flex w-fit items-center gap-3 pl-2 pr-5 py-2`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line }}
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: T.orange }}
      >
        <BalloonShape color="#fffaf5" size={18} string={false} />
      </span>
      <span className="text-[17px] font-normal tracking-[-0.01em]" style={{ color: t.fg }}>
        <strong className="font-medium" style={{ color: T.orange }}>{amount}</strong> {label}
      </span>
    </div>
  );
}

export function BalloonVerticalBlock({
  amount = "30%",
  sub = "korting",
  tone = "light",
  bare = false,
}: {
  amount?: string;
  sub?: string;
  tone?: Tone;
  bare?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${bare ? "" : `${T.card} border`} inline-flex w-fit flex-col items-center px-6 py-6`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line }}
    >
      <BalloonCluster tone={tone} size={52} />
      <div className="mt-4 text-center">
        <div className="text-[56px] font-medium leading-[0.85] tracking-[-0.05em]" style={{ color: T.orange }}>
          {amount}
        </div>
        <div className="mt-1 text-[17px]" style={{ color: t.sub }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

export function BalloonSingleBlock({
  tone = "light",
  size = 96,
  bare = false,
}: {
  tone?: Tone;
  size?: number;
  bare?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${bare ? "" : `${T.card} border`} inline-flex items-center justify-center`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line, padding: size * 0.45 }}
    >
      <BalloonShape color={tone === "orange" ? "#fffaf5" : T.orange} size={size} />
    </div>
  );
}

export function DiscountThirtyBlock({
  tone = "light",
  label,
  bare = false,
}: {
  tone?: Tone;
  label?: string;
  bare?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`${bare ? "" : `${T.card} border`} inline-flex w-fit flex-col items-start gap-1 pl-6 pr-5 py-5`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line }}
    >
      <span className="text-[56px] font-medium leading-none tracking-[-0.05em]" style={{ color: T.orange }}>
        -30%
      </span>
      {label && (
        <span className="text-[14px]" style={{ color: t.sub }}>
          {label}
        </span>
      )}
    </div>
  );
}

export function DiscountThirtyOutlinedBlock({
  tone = "light",
  outline = "orange",
  bare = false,
  rotate = true,
}: {
  tone?: Tone;
  outline?: "orange" | "navy" | "bluegrey" | "dark";
  bare?: boolean;
  rotate?: boolean;
}) {
  const t = TONES[tone];
  const outlineColor =
    outline === "orange" ? T.orange : outline === "navy" ? T.navy : outline === "bluegrey" ? T.bluegrey : T.ink;
  return (
    <div
      className={`${bare ? "" : `${T.card} border`} inline-flex items-center justify-center`}
      style={bare ? undefined : { background: t.bg, borderColor: t.line, padding: 28 }}
    >
      <span
        className="inline-flex items-center justify-center border px-4 py-1.5 text-[24px] font-medium leading-none tracking-[-0.03em]"
        style={{
          background: "#faf8f5",
          borderColor: outlineColor,
          color: outlineColor,
          borderRadius: 10,
          borderWidth: 1.5,
          transform: rotate ? "rotate(-5deg)" : undefined,
        }}
      >
        -30%
      </span>
    </div>
  );
}

/* ---------------- page shell ---------------- */


function Section({ index, title, sub, children }: { index: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#1f1915]/10 py-14 md:py-20">
      <div className="flex items-baseline gap-4">
        <span className="text-[11px] font-medium tracking-[0.16em] text-[#1f1915]/40">{index}</span>
        <h2 className="text-[24px] font-normal tracking-[-0.015em] text-[#1f1915] md:text-[30px]">{title}</h2>
      </div>
      {sub && <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-[#1f1915]/55">{sub}</p>}
      <div className="mt-9 md:mt-12">{children}</div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[#1f1915]/40">{children}</p>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Item({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<null | "png" | "svg">(null);

  const download = async (format: "png" | "svg") => {
    const node = ref.current;
    if (!node) return;
    setBusy(format);
    try {
      const { toPng, toSvg } = await import("html-to-image");
      // Measure the true visual bounds, including children that overflow the
      // wrapper (rotated badges, shadows, rings) so nothing gets clipped.
      const base = node.getBoundingClientRect();
      let left = base.left;
      let top = base.top;
      let right = base.right;
      let bottom = base.bottom;
      node.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        left = Math.min(left, r.left);
        top = Math.min(top, r.top);
        right = Math.max(right, r.right);
        bottom = Math.max(bottom, r.bottom);
      });
      const pad = 2;
      const offsetX = base.left - left + pad;
      const offsetY = base.top - top + pad;
      const width = Math.ceil(right - left) + pad * 2;
      const height = Math.ceil(bottom - top) + pad * 2;
      const options = {
        backgroundColor: undefined,
        cacheBust: true,
        width,
        height,
        skipFonts: false,
        style: {
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transformOrigin: "top left",
        },
      } as const;
      const dataUrl =
        format === "svg"
          ? await toSvg(node, options)
          : await toPng(node, {
              ...options,
              // 8x pixel ratio => razor sharp for 1080x1080 / 1080x1920 ads
              pixelRatio: 8,
            });
      const link = document.createElement("a");
      link.download = `wandig-${slugify(label)}.${format}`;
      link.href = dataUrl;
      link.click();
    } finally {
      setBusy(null);
    }
  };


  return (
    <div className="group/item">
      <div ref={ref} className="inline-block w-fit">
        {children}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <div className="mt-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => download("png")}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1f1915]/15 px-3 py-1 text-[11px] text-[#1f1915]/55 transition hover:border-[#ff7d2f] hover:text-[#ff7d2f] disabled:opacity-50"
          >
            <Download className="h-3 w-3" strokeWidth={1.6} />
            {busy === "png" ? "..." : "PNG"}
          </button>
          <button
            type="button"
            onClick={() => download("svg")}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1f1915]/15 px-3 py-1 text-[11px] text-[#1f1915]/55 transition hover:border-[#ff7d2f] hover:text-[#ff7d2f] disabled:opacity-50"
          >
            <Download className="h-3 w-3" strokeWidth={1.6} />
            {busy === "svg" ? "..." : "SVG"}
          </button>
        </div>
      </div>
    </div>
  );
}



function ActieBlokkenPage() {
  return (
    <main className="min-h-screen bg-[#f2eee7]">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-24 pt-14 md:px-10 md:pt-20">
        <header className="pb-4">
          <Kicker color="rgba(31,25,21,0.45)">Intern — componentbibliotheek</Kicker>
          <h1 className="mt-5 max-w-[720px] text-[38px] font-normal leading-[1.05] tracking-[-0.03em] text-[#1f1915] md:text-[52px]">
            Actieblokken voor advertenties en campagnes
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-[#1f1915]/55">
            Alle blokken volgen dezelfde radius, typografische schaal en spacing als de Wandig-site. Teksten zijn
            aanpasbaar via props, dus 30% wordt later eenvoudig 20%.
          </p>
        </header>

        <Section index="01" title="Sale en campagne" sub="Groot cijfer, rustige omgeving. Oranje blijft accent.">
          <div className="grid gap-6 md:grid-cols-3">
            <Item label="Sale / Light / Large">
              <SaleEditorialCard />
            </Item>
            <Item label="Sale / Dark / Large">
              <SaleEditorialCard
                tone="dark"
                kicker="30% verjaardagskorting"
                footnote="Op alle tv-meubels — tijdelijk"
              />
            </Item>
            <div className="flex flex-col gap-6">
              <Item label="Sale / Dark / Compact">
                <SaleCompactCard />
              </Item>
              <Item label="Sale / Light / Compact">
                <SaleCompactCard
                  tone="light"
                  title="Verjaardagsale"
                  sub="30% korting op alle tv-meubels"
                />
              </Item>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Item label="Pill / Light">
              <SalePill />
            </Item>
            <Item label="Pill / Dark">
              <SalePill tone="dark" text="We zijn jarig — 30% korting" />
            </Item>
            <Item label="Label / Outline">
              <SaleLabel />
            </Item>
            <Item label="Label / Orange">
              <SaleLabel tone="orange" text="30% korting" />
            </Item>
          </div>
        </Section>

        <Section index="02" title="CTA's" sub="Één primaire actie per creative.">
          <div className="flex flex-wrap items-start gap-5">
            <Item label="CTA / Orange">
              <CtaButton label="Shop nu" variant="orange" to="/producten" />
            </Item>
            <Item label="CTA / Navy">
              <CtaButton label="Bekijk tv-meubels" variant="navy" to="/producten" />
            </Item>
            <Item label="CTA / Cream">
              <CtaButton label="Bekijk collectie" variant="cream" to="/producten" />
            </Item>
            <Item label="CTA / Text + arrow">
              <CtaTextArrow label="Stel zelf samen" />
            </Item>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Item label="CTA / Wide / Light">
              <CtaWide label="Bekijk tv-meubels" sub="Solo, Duo of Full House" />
            </Item>
            <Item label="CTA / Wide / Dark">
              <CtaWide tone="dark" label="Ontdek de Cinewall" sub="Van muur naar blikvanger" />
            </Item>
          </div>
        </Section>

        <Section index="03" title="Configurator en kleurstalen">
          <div className="grid gap-6 md:grid-cols-2">
            <Item label="Discovery / Light">
              <DiscoveryCard
                kicker="Configurator"
                title="Stel jouw tv-meubel samen"
                sub="Kies formaat, kleur en opstelling."
                cta="Stel zelf samen"
              />
            </Item>
            <Item label="Discovery / Light / Swatches">
              <DiscoveryCard
                kicker="Kleurstalen"
                title="Gratis kleurstalen"
                sub="Ontdek welke kleur bij jouw interieur past."
                cta="Gratis aanvragen"
              >
                <ColorSwatchRow />
              </DiscoveryCard>
            </Item>
          </div>
        </Section>

        <Section index="04" title="USP's" sub="Kleine line-icons, tekst blijft leidend. Alles los te downloaden als PNG.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["CalendarClock", "100 dagen proefkijken", "Kijk rustig of het bij je past"],
                ["Truck", "Gratis verzending", "Door heel Nederland"],
                ["ShieldCheck", "10 jaar garantie", "Kwaliteit waar je op kunt vertrouwen"],
                ["Sparkles", "Nederlands design", "Ontworpen en gemaakt in Nederland"],
                ["MonitorPlay", "Geschikt voor alle tv's", "Van 40 tot 85 inch"],
              ] as const
            ).map(([icon, title, sub]) => (
              <Item key={title} label={`USP / Light / ${title}`}>
                <UspBlock icon={icon} title={title} sub={sub} />
              </Item>
            ))}
            <Item label="USP / Dark / 10 jaar garantie">
              <UspBlock tone="dark" icon="ShieldCheck" title="10 jaar garantie" sub="Kwaliteit waar je op kunt vertrouwen" />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            Compacte USP's
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["CalendarClock", "100 dagen proefkijken", "light"],
                ["Truck", "Gratis verzending", "light"],
                ["ShieldCheck", "10 jaar garantie", "light"],
                ["Sparkles", "Nederlands design", "light"],
                ["MonitorPlay", "Geschikt voor alle tv's", "light"],
                ["CalendarClock", "100 dagen proefkijken", "dark"],
                ["Truck", "Gratis verzending", "dark"],
                ["ShieldCheck", "10 jaar garantie", "dark"],
              ] as const
            ).map(([icon, title, tone]) => (
              <Item key={`${title}-${tone}`} label={`USP / ${tone === "dark" ? "Dark" : "Light"} / Compact / ${title}`}>
                <UspBlock size="sm" tone={tone} icon={icon} title={title} />
              </Item>
            ))}
          </div>
        </Section>


        <Section index="05" title="Cinewall">
          <div className="grid gap-6 md:grid-cols-3">
            <Item label="Cinewall / Dark / Editorial">
              <CinewallEditorial />
            </Item>
            <Item label="Cinewall / Light / Minimal">
              <CinewallMinimal />
            </Item>
            <Item label="Cinewall / Blue grey">
              <CinewallEditorial tone="bluegrey" title="Cinewall" line="Rust aan de wand." cta="Bekijk collectie" />
            </Item>
          </div>
        </Section>

        <Section index="06" title="Voorbeeldcombinaties" sub="Twee of drie blokken samen, zoals in een advertentie.">
          <div className="grid gap-6 md:grid-cols-3">
            <Item label="Ad / Light / 1080 × 1080">
              <div className="rounded-[22px] border border-[#1f1915]/10 bg-[#faf8f5] p-5">
                <SaleLabel text="Verjaardagsale" />
                <div className="mt-5 text-[76px] font-medium leading-[0.82] tracking-[-0.05em] text-[#ff7d2f]">30%</div>
                <div className="mt-2 text-[22px] text-[#1f1915]">korting</div>
                <div className="mt-6">
                  <CtaButton label="Bekijk tv-meubels" variant="navy" to="/producten" />
                </div>
              </div>
            </Item>
            <Item label="Ad / Dark / Story">
              <div className="rounded-[22px] border border-[#0e1f2a] bg-[#0e1f2a] p-5">
                <Kicker color="rgba(247,244,239,0.6)">We zijn jarig</Kicker>
                <h3 className="mt-5 text-[34px] font-normal leading-[1.05] tracking-[-0.02em] text-[#f7f4ef]">
                  30% korting op
                  <br />
                  alle tv-meubels
                </h3>
                <div className="mt-6">
                  <CtaTextArrow label="Shop nu" tone="dark" />
                </div>
              </div>
            </Item>
            <Item label="Ad / Stack / Cinewall">
              <div className="flex flex-col gap-5">
                <SalePill />
                <CinewallMinimal />
                <UspBlock size="sm" icon="CalendarClock" title="100 dagen proefkijken" />
              </div>
            </Item>
          </div>

        </Section>

        <Section
          index="07"
          title="Losse blokken"
          sub="Kleine blokken met één regel tekst, los te downloaden als PNG."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Mini / 30% korting">
              <MiniBlock text="30% korting" accentDot />
            </Item>
            <Item label="Mini / Stat / 30%">
              <MiniStatBlock />
            </Item>
            <Item label="Mini / Verjaardagsale">
              <MiniBlock text="Verjaardagsale" accentDot />
            </Item>
            <Item label="Mini / Dark / 30% korting">
              <MiniBlock tone="dark" text="30% korting op alle tv-meubels" accentDot />
            </Item>
            <Item label="Mini / Gratis kleurstalen">
              <MiniBlock text="Gratis kleurstalen" accentDot />
            </Item>
            <Item label="Kleurstalen / Alleen kleuren">
              <SwatchOnlyBlock />
            </Item>
            <Item label="Mini / Shop nu / Large">
              <MiniBlock size="lg" text="Shop nu" />
            </Item>
            <Item label="Mini / Small / Tijdelijk">
              <MiniBlock size="sm" text="Tijdelijk" accentDot />
            </Item>
            <Item label="Mini / We zijn jarig">
              <MiniBlock text="We zijn jarig" accentDot />
            </Item>
            <Item label="Mini / 100 dagen proefkijken">
              <MiniBlock size="sm" text="100 dagen proefkijken" />
            </Item>
            <Item label="Mini / Gratis verzending">
              <MiniBlock size="sm" text="Gratis verzending" />
            </Item>
            <Item label="Mini / 10 jaar garantie">
              <MiniBlock size="sm" text="10 jaar garantie" />
            </Item>
            <Item label="Mini / Nederlands design">
              <MiniBlock size="sm" text="Nederlands design" />
            </Item>
            <Item label="Mini / Geschikt voor alle tv's">
              <MiniBlock size="sm" text="Geschikt voor alle tv's" />
            </Item>
            <Item label="Mini / Blue grey / Stel zelf samen">
              <MiniBlock tone="bluegrey" text="Stel zelf samen" />
            </Item>
            <Item label="Mini / Orange / 30% korting">
              <MiniBlock tone="orange" text="30% korting" />
            </Item>
            <Item label="Mini / Bekijk collectie">
              <MiniBlock text="Bekijk collectie" />
            </Item>
            <Item label="Kleurstalen / Dark / Alleen kleuren">
              <SwatchOnlyBlock tone="dark" />
            </Item>
            <Item label="Puzzelstuk / Oranje / Klein">
              <PuzzlePieceBlock size={72} />
            </Item>
            <Item label="Puzzelstuk / Oranje / Groot">
              <PuzzlePieceBlock size={120} />
            </Item>
            <Item label="Puzzelstuk / Dark / Oranje">
              <PuzzlePieceBlock size={96} tone="dark" />
            </Item>
            <Item label="Puzzelstuk / Orange bg / Wit">
              <PuzzlePieceBlock size={96} tone="orange" />
            </Item>
          </div>
        </Section>

        <Section
          index="08"
          title="Hero-lockup"
          sub="Het kopblok van de collectiepagina: serif titel en schuin kortingslabel. Met of zonder boventitel en achtergrond, allemaal los te downloaden."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Hero / Light / Medium">
              <HeroLockupBlock />
            </Item>
            <Item label="Hero / Dark / Medium">
              <HeroLockupBlock tone="dark" />
            </Item>
            <Item label="Hero / Light / Groot">
              <HeroLockupBlock size="lg" />
            </Item>
            <Item label="Hero / Light / Compact">
              <HeroLockupBlock size="sm" />
            </Item>
            <Item label="Hero / Center / Met subtekst">
              <HeroLockupBlock
                align="center"
                sub="Op alle tv-meubels. Tijdelijk, zolang de voorraad strekt."
              />
            </Item>
            <Item label="Hero / Blue grey / We zijn jarig">
              <HeroLockupBlock tone="bluegrey" eyebrow="Wandig" title="We zijn jarig" badge="-30%" />
            </Item>
            <Item label="Hero / Orange / Zonder label">
              <HeroLockupBlock tone="orange" eyebrow="Tijdelijk" title="30% korting" badge={null} />
            </Item>
            <Item label="Hero / Cinewall / Dark">
              <HeroLockupBlock tone="dark" eyebrow="Cinewall" title="Van muur naar blikvanger" badge={null} />
            </Item>
            <Item label="Hero / Zonder kader (transparant)">
              <HeroLockupBlock bare />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            Zonder achtergrond
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Hero / Bare / Light / Medium">
              <HeroLockupBlock bare />
            </Item>
            <Item label="Hero / Bare / Dark / Medium">
              <HeroLockupBlock bare tone="dark" />
            </Item>
            <Item label="Hero / Bare / Light / Groot">
              <HeroLockupBlock bare size="lg" />
            </Item>
            <Item label="Hero / Bare / Light / Compact">
              <HeroLockupBlock bare size="sm" />
            </Item>
            <Item label="Hero / Bare / Center / Met subtekst">
              <HeroLockupBlock
                bare
                align="center"
                sub="Op alle tv-meubels. Tijdelijk, zolang de voorraad strekt."
              />
            </Item>
            <Item label="Hero / Bare / Blue grey / We zijn jarig">
              <HeroLockupBlock bare tone="bluegrey" eyebrow="Wandig" title="We zijn jarig" badge="-30%" />
            </Item>
            <Item label="Hero / Bare / Orange / Zonder label">
              <HeroLockupBlock bare tone="orange" eyebrow="Tijdelijk" title="30% korting" badge={null} />
            </Item>
            <Item label="Hero / Bare / Cinewall / Dark">
              <HeroLockupBlock bare tone="dark" eyebrow="Cinewall" title="Van muur naar blikvanger" badge={null} />
            </Item>
            <Item label="Hero / Bare / Light / Zonder label">
              <HeroLockupBlock bare eyebrow="Verjaardagsale" title="30% korting" badge={null} />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            Zonder boventitel
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Hero / Zonder boventitel / Light / Medium">
              <HeroLockupBlock eyebrow="" />
            </Item>
            <Item label="Hero / Zonder boventitel / Dark / Medium">
              <HeroLockupBlock tone="dark" eyebrow="" />
            </Item>
            <Item label="Hero / Zonder boventitel / Light / Groot">
              <HeroLockupBlock size="lg" eyebrow="" />
            </Item>
            <Item label="Hero / Zonder boventitel / Orange">
              <HeroLockupBlock tone="orange" eyebrow="" title="30% korting" badge={null} />
            </Item>
            <Item label="Hero / Zonder boventitel / Blue grey">
              <HeroLockupBlock tone="bluegrey" eyebrow="" title="We zijn jarig" badge="-30%" />
            </Item>
            <Item label="Hero / Zonder boventitel / Center">
              <HeroLockupBlock align="center" eyebrow="" title="Verjaardagssale" badge="-30%" sub="Op alle tv-meubels. Tijdelijk, zolang de voorraad strekt." />
            </Item>
            <Item label="Hero / Bare / Zonder boventitel / Light / Medium">
              <HeroLockupBlock bare eyebrow="" />
            </Item>
            <Item label="Hero / Bare / Zonder boventitel / Dark / Medium">
              <HeroLockupBlock bare tone="dark" eyebrow="" />
            </Item>
            <Item label="Hero / Bare / Zonder boventitel / Light / Groot">
              <HeroLockupBlock bare size="lg" eyebrow="" />
            </Item>
            <Item label="Hero / Bare / Zonder boventitel / Orange">
              <HeroLockupBlock bare tone="orange" eyebrow="" title="30% korting" badge={null} />
            </Item>
            <Item label="Hero / Bare / Zonder boventitel / Blue grey">
              <HeroLockupBlock bare tone="bluegrey" eyebrow="" title="We zijn jarig" badge="-30%" />
            </Item>
            <Item label="Hero / Bare / Zonder boventitel / Center">
              <HeroLockupBlock bare align="center" eyebrow="" title="Verjaardagssale" badge="-30%" sub="Op alle tv-meubels. Tijdelijk, zolang de voorraad strekt." />
            </Item>
          </div>
        </Section>

        <Section
          index="09"
          title="Ballonnen"
          sub="Lichte, feestelijke accenten voor de verjaardagsale. Geen cartoon-stijl, alleen subtiele lijnballonnen in de Wandig-kleuren."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Ballon / Verjaardagsale / Light">
              <BalloonBlock />
            </Item>
            <Item label="Ballon / Verjaardagsale / Dark">
              <BalloonBlock tone="dark" />
            </Item>
            <Item label="Ballon / Verjaardagsale / Orange">
              <BalloonBlock tone="orange" kicker="Tijdelijk" title="30% korting" />
            </Item>
            <Item label="Ballon / Verticaal / Light">
              <BalloonVerticalBlock />
            </Item>
            <Item label="Ballon / Verticaal / Dark">
              <BalloonVerticalBlock tone="dark" />
            </Item>
            <Item label="Ballon / Verticaal / Blue grey">
              <BalloonVerticalBlock tone="bluegrey" />
            </Item>
            <Item label="Ballon / Mini / Light">
              <BalloonMini />
            </Item>
            <Item label="Ballon / Mini / Dark">
              <BalloonMini tone="dark" />
            </Item>
            <Item label="Ballon / Pill / Light">
              <BalloonDiscountPill />
            </Item>
            <Item label="Ballon / Pill / Dark">
              <BalloonDiscountPill tone="dark" />
            </Item>
            <Item label="Ballon / Pill / Orange">
              <BalloonDiscountPill tone="orange" />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            Zonder achtergrond
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Ballon / Bare / Verjaardagsale / Light">
              <BalloonBlock bare />
            </Item>
            <Item label="Ballon / Bare / Verjaardagsale / Dark">
              <BalloonBlock bare tone="dark" />
            </Item>
            <Item label="Ballon / Bare / Verjaardagsale / Orange">
              <BalloonBlock bare tone="orange" kicker="Tijdelijk" title="30% korting" />
            </Item>
            <Item label="Ballon / Bare / Verticaal / Light">
              <BalloonVerticalBlock bare />
            </Item>
            <Item label="Ballon / Bare / Verticaal / Dark">
              <BalloonVerticalBlock bare tone="dark" />
            </Item>
            <Item label="Ballon / Bare / Verticaal / Blue grey">
              <BalloonVerticalBlock bare tone="bluegrey" />
            </Item>
            <Item label="Ballon / Bare / Mini / Light">
              <BalloonMini bare />
            </Item>
            <Item label="Ballon / Bare / Mini / Dark">
              <BalloonMini bare tone="dark" />
            </Item>
            <Item label="Ballon / Bare / Pill / Light">
              <BalloonDiscountPill bare />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            Losse items
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Item label="Ballon / Los / Oranje">
              <BalloonSingleBlock />
            </Item>
            <Item label="Ballon / Los / Donker">
              <BalloonSingleBlock tone="dark" />
            </Item>
            <Item label="Ballon / Los / Oranje bg">
              <BalloonSingleBlock tone="orange" />
            </Item>
            <Item label="Ballon / Los / Blue grey">
              <BalloonSingleBlock tone="bluegrey" />
            </Item>
            <Item label="Ballon / Los / Bare / Oranje">
              <BalloonSingleBlock bare />
            </Item>
            <Item label="Ballon / Los / Bare / Donker">
              <BalloonSingleBlock tone="dark" bare />
            </Item>
            <Item label="Ballon / Los / Bare / Oranje bg">
              <BalloonSingleBlock tone="orange" bare />
            </Item>
            <Item label="Ballon / Los / Bare / Blue grey">
              <BalloonSingleBlock tone="bluegrey" bare />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            Outlined -30% blokjes
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Item label="Outlined / Oranje">
              <DiscountThirtyOutlinedBlock />
            </Item>
            <Item label="Outlined / Navy">
              <DiscountThirtyOutlinedBlock outline="navy" />
            </Item>
            <Item label="Outlined / Blue grey">
              <DiscountThirtyOutlinedBlock outline="bluegrey" />
            </Item>
            <Item label="Outlined / Donker bg">
              <DiscountThirtyOutlinedBlock tone="dark" outline="dark" />
            </Item>
            <Item label="Outlined / Bare / Oranje">
              <DiscountThirtyOutlinedBlock bare />
            </Item>
            <Item label="Outlined / Bare / Navy">
              <DiscountThirtyOutlinedBlock outline="navy" bare />
            </Item>
            <Item label="Outlined / Bare / Blue grey">
              <DiscountThirtyOutlinedBlock outline="bluegrey" bare />
            </Item>
            <Item label="Outlined / Bare / Donker">
              <DiscountThirtyOutlinedBlock tone="dark" outline="dark" bare />
            </Item>
          </div>

          <p className="mt-10 mb-4 text-[12px] uppercase tracking-[0.14em]" style={{ color: T.bluegrey }}>
            -30% blokjes
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Item label="-30% / Light">
              <DiscountThirtyBlock />
            </Item>
            <Item label="-30% / Dark">
              <DiscountThirtyBlock tone="dark" />
            </Item>
            <Item label="-30% / Orange">
              <DiscountThirtyBlock tone="orange" />
            </Item>
            <Item label="-30% / Blue grey">
              <DiscountThirtyBlock tone="bluegrey" />
            </Item>
            <Item label="-30% / Bare / Light">
              <DiscountThirtyBlock bare />
            </Item>
            <Item label="-30% / Bare / Dark">
              <DiscountThirtyBlock tone="dark" bare />
            </Item>
            <Item label="-30% / Bare / Orange">
              <DiscountThirtyBlock tone="orange" bare />
            </Item>
            <Item label="-30% / Bare / Blue grey">
              <DiscountThirtyBlock tone="bluegrey" bare />
            </Item>
            <Item label="-30% / Met label / Light">
              <DiscountThirtyBlock label="Op alle tv-meubels" />
            </Item>
            <Item label="-30% / Met label / Dark">
              <DiscountThirtyBlock tone="dark" label="Op alle tv-meubels" />
            </Item>
            <Item label="-30% / Met label / Orange">
              <DiscountThirtyBlock tone="orange" label="Op alle tv-meubels" />
            </Item>
            <Item label="-30% / Met label / Blue grey">
              <DiscountThirtyBlock tone="bluegrey" label="Op alle tv-meubels" />
            </Item>
          </div>
        </Section>
      </div>


    </main>
  );
}
