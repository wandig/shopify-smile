import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Minus, Plus, Puzzle } from "lucide-react";

import fullhouseOrange from "@/assets/fullhouse-orange.jpeg.asset.json";
import tvOrangeImg from "@/assets/tv-orange.png.asset.json";
import plugPlayImg from "@/assets/plug-play-geleverd.png.asset.json";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Configureer jouw tv-kast — Wandig" },
      {
        name: "description",
        content:
          "Stel je eigen tv-wand samen: kies de modules, de kleur en jouw tv-maat. Direct de prijs in beeld.",
      },
      { property: "og:title", content: "Configureer jouw tv-kast — Wandig" },
      {
        property: "og:description",
        content:
          "Stel je eigen tv-wand samen: kies de modules, de kleur en jouw tv-maat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConfiguratorPage,
});

const COLORS = [
  { name: "Eikenzwart", hex: "#1c1a18" },
  { name: "Walnootbruin", hex: "#6b4630" },
  { name: "Truffelbruin", hex: "#8a6a52" },
  { name: "Steenwit", hex: "#ece6dd" },
  { name: "Blush", hex: "#d9a794" },
];

const MODULES = [
  {
    key: "left" as const,
    label: "Linker module",
    body: "Extra opbergruimte en breedte aan de linkerzijde.",
    price: 475,
    width: 60,
    img: plugPlayImg.url,
  },
  {
    key: "center" as const,
    label: "Middenmodule",
    body: "De basis van elke wand — inclusief kabelgoot en montageset.",
    price: 749,
    width: 120,
    img: fullhouseOrange.url,
  },
  {
    key: "right" as const,
    label: "Rechter module",
    body: "Extra opbergruimte en breedte aan de rechterzijde.",
    price: 475,
    width: 60,
    img: tvOrangeImg.url,
  },
];

const TV_SIZES = [
  { label: '43"', minWidth: 120 },
  { label: '50"', minWidth: 120 },
  { label: '55"', minWidth: 120 },
  { label: '65"', minWidth: 180 },
  { label: '75"', minWidth: 240 },
  { label: '85"', minWidth: 240 },
];

function euro(n: number) {
  return `${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(n)},-`;
}

function ConfiguratorPage() {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const [color, setColor] = useState(COLORS[0]);
  const [tv, setTv] = useState(TV_SIZES[2]);

  const width = useMemo(
    () => 120 + (left ? 60 : 0) + (right ? 60 : 0),
    [left, right],
  );
  const total = useMemo(
    () => 749 + (left ? 475 : 0) + (right ? 475 : 0),
    [left, right],
  );
  const tvFits = width >= tv.minWidth;

  const selected = { left, center: true, right };

  return (
    <main className="bg-[#faf8f5]">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-8 md:px-10 md:pt-12">
        <nav className="text-[12px] tracking-[0.01em] text-[#071426]/50">
          <Link to="/" className="hover:opacity-70">
            Home
          </Link>
          <span className="px-2">/</span>
          <span>Configurator</span>
        </nav>

        <header className="mt-6 max-w-[720px]">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#ef7027]">
            Stel jouw wand samen
          </span>
          <h1 className="mt-3 text-[30px] font-bold leading-[1.1] tracking-[0.01em] text-[#071426] md:text-[42px]">
            Configureer jouw tv-kast
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed tracking-[0.01em] text-[#071426]/60 md:text-[15px]">
            Kies je modules, je kleur en jouw tv-maat. De middenmodule zit altijd
            standaard bij je configuratie — links en rechts bouw je zelf uit.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Preview */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[20px] bg-[#f7f7f7] p-4 md:p-6">
              <div className="flex items-end justify-center gap-2">
                {MODULES.map((m) => {
                  const active = selected[m.key];
                  if (!active) return null;
                  return (
                    <div
                      key={m.key}
                      className="overflow-hidden rounded-[12px] border-2"
                      style={{
                        borderColor: "#ef8874",
                        flex: m.key === "center" ? 2 : 1,
                        backgroundColor: color.hex,
                      }}
                    >
                      <div className="aspect-[4/5] w-full opacity-90 mix-blend-luminosity">
                        <img
                          src={m.img}
                          alt={`${m.label} in ${color.name}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] tracking-[0.01em] text-[#071426]/60">
                <span>Breedte: {width} cm</span>
                <span>Kleur: {color.name}</span>
                <span>Tv-maat: {tv.label}</span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div>
            {/* Modules */}
            <section>
              <h2 className="text-[18px] font-bold tracking-[0.01em] text-[#071426]">
                Modules
              </h2>
              <div className="mt-4 space-y-3">
                {MODULES.map((m) => {
                  const isCenter = m.key === "center";
                  const active = selected[m.key];
                  const toggle = () => {
                    if (isCenter) return;
                    if (m.key === "left") setLeft((v) => !v);
                    else setRight((v) => !v);
                  };
                  return (
                    <div
                      key={m.key}
                      className={`flex items-center gap-4 rounded-[12px] border-2 bg-[#f7f7f7] p-4 transition ${
                        active ? "border-[#ef8874]" : "border-transparent"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-bold tracking-[0.01em] text-[#071426]">
                            {m.label}
                          </span>
                          {isCenter && (
                            <span className="rounded-full bg-[#ef7027]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#ef7027]">
                              Standaard
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/60">
                          {m.body}
                        </p>
                        <div className="mt-2 text-[13px] tracking-[0.01em] text-[#071426]/70">
                          +{m.width} cm · {euro(m.price)}
                        </div>
                      </div>

                      {isCenter ? (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ef7027] text-white">
                          <Check className="h-[18px] w-[18px]" strokeWidth={2} />
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={toggle}
                          aria-pressed={active}
                          aria-label={`${active ? "Verwijder" : "Voeg toe"} ${m.label}`}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                            active
                              ? "bg-[#0f1f2a] text-white hover:bg-[#1a2d3a]"
                              : "bg-gradient-to-b from-[#ef7027] to-[#e36820] text-white hover:brightness-95"
                          }`}
                        >
                          {active ? (
                            <Minus className="h-[18px] w-[18px]" strokeWidth={2} />
                          ) : (
                            <Plus className="h-[18px] w-[18px]" strokeWidth={2} />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Color */}
            <section className="mt-10">
              <h2 className="text-[18px] font-bold tracking-[0.01em] text-[#071426]">
                Kleur: <span className="font-normal">{color.name}</span>
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                    aria-pressed={c.name === color.name}
                    className={`h-11 w-11 rounded-full border-2 transition ${
                      c.name === color.name
                        ? "border-[#ef8874] ring-2 ring-[#ef8874]/30"
                        : "border-[#ef8874]/40 hover:border-[#ef8874]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </section>

            {/* TV size */}
            <section className="mt-10">
              <h2 className="text-[18px] font-bold tracking-[0.01em] text-[#071426]">
                Tv-maat: <span className="font-normal">{tv.label}</span>
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {TV_SIZES.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setTv(s)}
                    aria-pressed={s.label === tv.label}
                    className={`h-11 min-w-[64px] rounded-[12px] border-2 bg-[#f7f7f7] px-4 text-[14px] tracking-[0.01em] transition ${
                      s.label === tv.label
                        ? "border-[#ef8874] text-[#071426]"
                        : "border-transparent text-[#071426]/70 hover:border-[#ef8874]/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {!tvFits && (
                <p className="mt-3 text-[13px] tracking-[0.01em] text-[#ef7027]">
                  Voor een {tv.label} tv adviseren we een wand van minimaal{" "}
                  {tv.minWidth} cm — voeg een extra module toe.
                </p>
              )}
            </section>

            {/* Summary */}
            <section className="mt-10 rounded-[16px] bg-[#ede7e0] p-5 md:p-6">
              <h2 className="text-[16px] font-bold tracking-[0.01em] text-[#071426]">
                Jouw configuratie
              </h2>
              <ul className="mt-4 space-y-2 text-[14px] tracking-[0.01em] text-[#071426]/70">
                {MODULES.filter((m) => selected[m.key]).map((m) => (
                  <li key={m.key} className="flex justify-between gap-4">
                    <span>{m.label}</span>
                    <span>{euro(m.price)}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4">
                  <span>Kleur</span>
                  <span>{color.name}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Tv-maat</span>
                  <span>{tv.label}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Totale breedte</span>
                  <span>{width} cm</span>
                </li>
              </ul>
              <div className="mt-5 flex items-end justify-between border-t border-[#071426]/10 pt-5">
                <span className="text-[14px] tracking-[0.01em] text-[#071426]/70">
                  Totaal
                </span>
                <span className="text-[26px] font-bold tracking-[0.01em] text-[#071426]">
                  {euro(total)}
                </span>
              </div>
              <Link
                to="/product/$handle"
                params={{ handle: "full-house" }}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] text-[15px] font-light tracking-[0.04em] text-white transition hover:brightness-95"
              >
                <Puzzle className="h-4 w-4" strokeWidth={1.75} />
                Naar bestellen
              </Link>
              <p className="mt-3 flex items-center justify-center gap-2 text-[12px] tracking-[0.01em] text-[#071426]/60">
                <Check className="h-4 w-4 text-[#ef7027]" strokeWidth={2} />
                100 dagen proefkijken · 10 jaar garantie
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
