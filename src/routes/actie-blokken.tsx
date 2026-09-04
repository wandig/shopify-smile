import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Download, MonitorPlay, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { FULL_HOUSE_COLORS, wandigSwatchStyle, displayWandigColor } from "@/lib/wandig-colors";


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
  pad: "p-7 md:p-9",
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
      className={`${T.card} ${T.pad} flex min-h-[320px] flex-col justify-between border`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <div className="flex items-start justify-between">
        <Kicker color={t.sub}>{kicker}</Kicker>
        <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
      </div>
      <div className="mt-10">
        <div
          className="text-[92px] font-medium leading-[0.82] tracking-[-0.05em] md:text-[128px]"
          style={{ color: t.accent === "#fffaf5" ? t.fg : T.orange }}
        >
          {amount}
        </div>
        <div className="mt-2 text-[26px] font-normal leading-none tracking-[-0.01em]" style={{ color: t.fg }}>
          {amountSuffix}
        </div>
      </div>
      <div className="mt-10 border-t pt-4 text-[13px]" style={{ borderColor: t.line, color: t.sub }}>
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
    <div className={`${T.card} border p-7`} style={{ background: t.bg, borderColor: t.line }}>
      <Kicker color={t.sub}>{title}</Kicker>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-[52px] font-medium leading-none tracking-[-0.04em]" style={{ color: T.orange }}>
          {amount}
        </span>
        <span className="text-[17px]" style={{ color: t.fg }}>
          korting
        </span>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed" style={{ color: t.sub }}>
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
      className={`${T.pill} inline-flex items-center gap-2 border px-6 py-3 text-sm font-medium transition hover:opacity-90`}
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
      className={`${T.card} flex items-center justify-between gap-6 border px-7 py-5`}
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
      className={`${T.card} ${T.pad} flex min-h-[260px] flex-col border`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      {kicker && <Kicker color={t.sub}>{kicker}</Kicker>}
      <h3 className="mt-5 text-[26px] font-normal leading-[1.15] tracking-[-0.015em]" style={{ color: t.fg }}>
        {title}
      </h3>
      <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed" style={{ color: t.sub }}>
        {sub}
      </p>
      {children && <div className="mt-6">{children}</div>}
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
        className={`${T.card} inline-flex w-full items-center gap-2.5 border px-4 py-3`}
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
    <div className={`${T.card} border p-6`} style={{ background: t.bg, borderColor: t.line }}>
      <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: T.orange }} />
      <p className="mt-4 text-[16px] font-normal tracking-[-0.01em]" style={{ color: t.fg }}>
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
      className={`${T.card} ${T.pad} flex min-h-[300px] flex-col justify-between border`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      <div>
        <h3 className="text-[44px] font-normal leading-[0.95] tracking-[-0.03em] md:text-[56px]" style={{ color: t.fg }}>
          {title}
        </h3>
        <p className="mt-4 text-[16px]" style={{ color: t.sub }}>
          {line}
        </p>
      </div>
      <div className="mt-10 border-t pt-5" style={{ borderColor: t.line }}>
        <CtaTextArrow label={cta} tone={tone} />
      </div>
    </div>
  );
}

export function CinewallMinimal({ tone = "light" }: { tone?: Tone }) {
  const t = TONES[tone];
  return (
    <div
      className={`${T.card} ${T.pad} flex min-h-[300px] items-end border`}
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
    sm: { pad: "px-4 py-3", text: "text-[13px]" },
    md: { pad: "px-5 py-4", text: "text-[15px]" },
    lg: { pad: "px-6 py-5", text: "text-[19px]" },
  }[size];
  return (
    <div
      className={`${T.card} border ${s.pad} inline-flex w-full items-center gap-2.5`}
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
      className={`${T.card} border px-6 py-5`}
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
      className={`${T.card} border px-6 py-5`}
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
  const [busy, setBusy] = useState(false);

  const download = async () => {
    if (!ref.current) return;
    setBusy(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(ref.current, {
        pixelRatio: 3,
        backgroundColor: "transparent",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `wandig-${slugify(label)}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="group/item">
      <div ref={ref} className="inline-block w-full">
        {children}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <button
          type="button"
          onClick={download}
          disabled={busy}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#1f1915]/15 px-3 py-1 text-[11px] text-[#1f1915]/55 transition hover:border-[#ff7d2f] hover:text-[#ff7d2f] disabled:opacity-50"
        >
          <Download className="h-3 w-3" strokeWidth={1.6} />
          {busy ? "..." : "PNG"}
        </button>
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
                ["MonitorPlay", "Geschikt voor alle tv's", "Van 43 tot 75 inch"],
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
            <div className="rounded-[22px] border border-[#1f1915]/10 bg-[#faf8f5] p-7">
              <SaleLabel text="Verjaardagsale" />
              <div className="mt-8 text-[76px] font-medium leading-[0.82] tracking-[-0.05em] text-[#ff7d2f]">30%</div>
              <div className="mt-2 text-[22px] text-[#1f1915]">korting</div>
              <div className="mt-10">
                <CtaButton label="Bekijk tv-meubels" variant="navy" to="/producten" />
              </div>
              <Label>Ad / 1080 × 1080</Label>
            </div>
            <div className="rounded-[22px] border border-[#0e1f2a] bg-[#0e1f2a] p-7">
              <Kicker color="rgba(247,244,239,0.6)">We zijn jarig</Kicker>
              <h3 className="mt-8 text-[34px] font-normal leading-[1.05] tracking-[-0.02em] text-[#f7f4ef]">
                30% korting op
                <br />
                alle tv-meubels
              </h3>
              <div className="mt-10">
                <CtaTextArrow label="Shop nu" tone="dark" />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[#f7f4ef]/40">Ad / Dark / Story</p>
            </div>
            <div className="flex flex-col gap-5">
              <SalePill />
              <CinewallMinimal />
              <UspBlock icon="CalendarClock" title="100 dagen proefkijken" />
            </div>
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
          </div>
        </Section>
      </div>

    </main>
  );
}
