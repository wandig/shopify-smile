import { Img } from "@/components/Img";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import cinewallSchema from "@/assets/cinewall-schema-fullhouse.png.asset.json";
import beforeFullHouseAsset from "@/assets/before-livingroom.png.asset.json";
import afterFullHouseAsset from "@/assets/after-livingroom.jpg.asset.json";
import plugAndPlayIcon from "@/assets/plug-and-play-icon.svg.asset.json";
import warrantyIcon from "@/assets/warranty-icon.svg.asset.json";
import kijkplezierIcon from "@/assets/100-dagen-icon.svg.asset.json";
import stijlvolleKleurenImg from "@/assets/stijlvolle-kleuren-v2.png.asset.json";
import hoogwaardigeKwaliteitV4Img from "@/assets/hoogwaardige-kwaliteit-v4.png.asset.json";
import kabelsUitZichtV4Img from "@/assets/kabels-uit-zicht-v4.png.asset.json";
import pushToOpenImg from "@/assets/push-to-open.png.asset.json";
import eenvoudigeMontageV2Img from "@/assets/eenvoudige-montage-v2.png.asset.json";
import onderhoudsvriendelijkV2Img from "@/assets/onderhoudsvriendelijk-v2.png.asset.json";

const buildSpecSections = (
  widthLabel: string,
  heightLabel: string,
  configSummary?: { colorLabel?: string; modulesLabel?: string },
): Array<{ title: string; body: ReactNode }> => [
  {
    title: "Algemeen",
    body: (
      <p>Wandig Full House is een complete cinewall met open vakken, gesloten kastruimte en een centraal tv-vlak. Ontworpen in Nederland, met de hand gebouwd in onze eigen werkplaats en plug &amp; play voorbereid voor jouw woonkamer.</p>
    ),
  },
  {
    title: "Afmetingen",
    body: (
      <ul className="space-y-1.5">
        {configSummary?.colorLabel && (
          <li className="flex justify-between gap-4"><span>Kleur</span><span className="text-[#071426]">{configSummary.colorLabel}</span></li>
        )}
        {configSummary?.modulesLabel && (
          <li className="flex justify-between gap-4"><span>Modules</span><span className="text-[#071426]">{configSummary.modulesLabel}</span></li>
        )}
        <li className="flex justify-between gap-4"><span>Breedte</span><span className="text-[#071426]">{widthLabel} cm</span></li>
        <li className="flex justify-between gap-4"><span>Hoogte</span><span className="text-[#071426]">{heightLabel} cm</span></li>
        <li className="flex justify-between gap-4"><span>Diepte</span><span className="text-[#071426]">32 cm</span></li>
        <li className="flex justify-between gap-4"><span>Tv-uitsparing</span><span className="text-[#071426]">tot 80 inch</span></li>
      </ul>
    ),
  },


  {
    title: "Materiaal",
    body: <p>Meubelplaat met een echt houtfineer aan de zichtzijden. Alle randen zijn afgewerkt met ABS-kantenband in dezelfde afwerking. Achterwand van gelakt MDF in de gekozen kleur.</p>,
  },
  {
    title: "Tv-formaat",
    body: <p>Geschikt voor tv&apos;s van 40 tot en met 80 inch. De tv wordt centraal gemonteerd met een VESA-compatibele wandsteun (niet inbegrepen). Kabels lopen onzichtbaar door de kabeldoorvoer in de achterwand.</p>,
  },
  {
    title: "Kleuren",
    body: <p>Afhankelijk van het model beschikbaar in Donkereiken, Eikengrijs, Walnootbruin, Cashmeregrijs, Zandsteen, Kristalwit, Blush en lichte afwerkingen zoals Steenwit. Kleurstalen kun je gratis bestellen.</p>,
  },
  {
    title: "Levering",
    body: <p>Levertijd 7 tot 14 werkdagen. Gratis bezorgd door onze eigen chauffeurs op de begane grond. Wij plannen samen met jou een dag en tijdslot in.</p>,
  },
  {
    title: "Montage-instructies",
    body: <p>De cinewall wordt in voorgemonteerde modules geleverd. Met de meegeleverde klikverbindingen zet je hem in gemiddeld 45 minuten samen. Een uitgebreide stap-voor-stap handleiding zit in de verpakking.</p>,
  },
  {
    title: "Onderhoud",
    body: <p>Neem het houtfineer af met een licht vochtige, zachte doek en droog direct na. Vermijd agressieve reinigers en schuursponzen. Voor hardnekkige vlekken kun je een neutrale meubelzeep gebruiken.</p>,
  },
];

export function SpecificationsSection({
  widthLabel = "240",
  heightLabel = "180",
  preview,
  configSummary,
}: {
  widthLabel?: string;
  heightLabel?: string;
  preview?: ReactNode;
  configSummary?: { colorLabel?: string; modulesLabel?: string };
} = {}) {
  const [openSpecs, setOpenSpecs] = useState<Record<string, boolean>>({});
  const SPEC_SECTIONS = buildSpecSections(widthLabel, heightLabel, configSummary);


  return (
      <section className="mt-10 md:mt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Sticky schematic */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div>
                {/* Drawing area — dimensions framing the cabinet */}
                <div
                  className="relative mt-3"
                  style={{ paddingTop: "32px", paddingBottom: "28px", paddingLeft: "16px", paddingRight: "32px" }}
                >
                  {/* Width dimension (top) */}
                  <div className="absolute left-[16px] right-[32px] top-[8px] flex items-center">
                    <svg className="h-[10px] w-[10px] shrink-0 text-[#071426]/50" viewBox="0 0 10 10" fill="none">
                      <path d="M9 1L1 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="relative h-px flex-1 bg-[#071426]/25" />
                    <span className="mx-2 rounded-full bg-[#faf8f5] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#071426]">
                      {widthLabel} cm
                    </span>
                    <span className="relative h-px flex-1 bg-[#071426]/25" />
                    <svg className="h-[10px] w-[10px] shrink-0 text-[#071426]/50" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L9 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Top extension ticks */}
                  <span className="pointer-events-none absolute left-[16px] top-[8px] h-[24px] w-px bg-[#071426]/15" />
                  <span className="pointer-events-none absolute right-[32px] top-[8px] h-[24px] w-px bg-[#071426]/15" />

                  {/* Height dimension (right) */}
                  <div className="absolute right-[6px] top-[32px] bottom-[28px] flex flex-col items-center">
                    <svg className="h-[10px] w-[10px] shrink-0 text-[#071426]/50" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L5 1L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="relative w-px flex-1 bg-[#071426]/25" />
                    <span className="my-2 rounded-full bg-[#faf8f5] px-2 py-1 text-[11px] font-medium tracking-wide text-[#071426] [writing-mode:vertical-rl] rotate-180">
                      {heightLabel} cm
                    </span>
                    <span className="relative w-px flex-1 bg-[#071426]/25" />
                    <svg className="h-[10px] w-[10px] shrink-0 text-[#071426]/50" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L5 9L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Right extension ticks */}
                  <span className="pointer-events-none absolute right-[6px] top-[32px] h-px w-[30px] bg-[#071426]/15" />
                  <span className="pointer-events-none absolute right-[6px] bottom-[28px] h-px w-[30px] bg-[#071426]/15" />

                  {/* Depth dimension (bottom) */}
                  <div className="absolute bottom-[2px] right-[32px] flex items-center gap-2">
                    <span className="h-px w-6 bg-[#071426]/25" />
                    <span className="text-[10px] font-medium text-[#071426]/60">32 cm diep</span>
                  </div>

                  {preview ? (
                    <div className="relative block w-full">{preview}</div>
                  ) : (
                    <Img
                      src={cinewallSchema.url}
                      alt={`Schematische weergave Wandig Full House, ${widthLabel} cm breed en ${heightLabel} cm hoog`}
                      className="relative block h-auto w-full object-contain"
                      style={{ background: "transparent" }}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Spec content */}
          <div className="lg:col-span-7">
            <header className="mb-8 md:mb-10">
              <h2 className="text-[22px] font-bold leading-tight text-[#071426] md:text-[26px]">
                Specificaties
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#071426]/55">
                Alles wat je moet weten over de Wandig Full House cinewall, van afmetingen tot onderhoud.
              </p>
            </header>

            <div className="flex flex-col gap-0 md:flex-row md:gap-x-10">
              <div className="flex-1 md:pr-2">
                {SPEC_SECTIONS.filter((_, i) => i % 2 === 0).map((section) => {
                  const isOpen = !!openSpecs[section.title];
                  return (
                    <div
                      key={section.title}
                      className="group border-b border-[#071426]/10"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSpecs((current) => {
                            const opening = !current[section.title];
                            return opening ? { [section.title]: true } : {};
                          })
                        }
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-[#071426]"
                      >
                        <span>{section.title}</span>
                        <span
                          className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#ef7027]/40 text-[#ef7027] transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-6 text-[13.5px] leading-relaxed text-[#071426]/65">
                            {section.body}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 md:pl-2">
                {SPEC_SECTIONS.filter((_, i) => i % 2 === 1).map((section) => {
                  const isOpen = !!openSpecs[section.title];
                  return (
                    <div
                      key={section.title}
                      className="group border-b border-[#071426]/10"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSpecs((current) => {
                            const opening = !current[section.title];
                            return opening ? { [section.title]: true } : {};
                          })
                        }
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-[#071426]"
                      >
                        <span>{section.title}</span>
                        <span
                          className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#ef7027]/40 text-[#ef7027] transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-6 text-[13.5px] leading-relaxed text-[#071426]/65">
                            {section.body}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

const UNIQUE_CARDS: Array<{
  eyebrow?: string;
  title: string;
  body?: string;
  image: string;
  variant: "light" | "overlay-top" | "overlay-bottom";
  lightText?: boolean;
  noGradient?: boolean;
  subtleGradient?: boolean;
  darkGradient?: boolean;
  darkGradientLower?: boolean;
  blurBehind?: boolean;
}> = [
  {
    title: "Stijlvolle kleuren",
    body: "Tijdloze tinten voor ieder interieur",
    image: stijlvolleKleurenImg.url,
    variant: "light",
    lightText: true,
    noGradient: true,
  },
  {
    title: "Hoogwaardige kwaliteit",
    body: "Stevig gebouwd voor jarenlang woonplezier",
    image: hoogwaardigeKwaliteitV4Img.url,
    variant: "light",
    lightText: true,
    noGradient: true,
  },
  {
    title: "Kabels uit het zicht",
    body: "Snoeren en aansluitingen netjes weggewerkt",
    image: kabelsUitZichtV4Img.url,
    variant: "light",
    lightText: true,
    noGradient: true,
  },


  {
    title: "Push-to-open",
    body: "Greeploos openen met één lichte druk",
    image: pushToOpenImg.url,
    variant: "light",
    lightText: true,
    darkGradient: true,
  },
  {
    title: "Eenvoudige montage",
    body: "Slim ontworpen voor een snelle plaatsing",
    image: eenvoudigeMontageV2Img.url,
    variant: "light",
    lightText: true,
    darkGradientLower: true,
  },
  {
    title: "Onderhoudsvriendelijk",
    body: "Eenvoudig schoon te houden",
    image: onderhoudsvriendelijkV2Img.url,
    variant: "light",
    lightText: true,
    darkGradient: true,
    blurBehind: true,
  },
];


export function UniqueSection({ title = "Dit maakt Full House uniek" }: { title?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const didDragRef = useRef(false);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let dist = Infinity;
      children.forEach((c, i) => {
        const mid = c.offsetLeft - el.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(mid - center);
        if (d < dist) { dist = d; closest = i; }
      });
      setActiveIndex(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !isDragging) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) didDragRef.current = true;
    el.scrollLeft = dragStartScrollRef.current - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="mt-12 md:mt-20">
      <div className="mb-6 md:mb-8">
        <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">{title}</h2>
        <p className="mt-2 text-[13px] md:text-[14px] text-[#071426]/55">Doordacht design, gemaakt voor jouw interieur</p>
      </div>

      <div
        ref={scrollerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 md:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      >
        {UNIQUE_CARDS.map((card) => (
          <article
            key={card.title}
            className="relative h-[440px] w-[280px] shrink-0 snap-center overflow-hidden rounded-[18px] bg-[#f2ece3] md:h-[520px] md:w-[360px]"
          >
            <Img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-[40%] ${card.blurBehind ? "backdrop-blur-lg" : "backdrop-blur-[3px]"}`}
              style={{
                maskImage: "linear-gradient(180deg, #000 0%, #000 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 50%, transparent 100%)",
              }}
            />


            {!card.noGradient && (
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-[40%] ${
                card.darkGradientLower
                  ? "bg-[linear-gradient(180deg,rgba(7,20,38,0.62)_0%,rgba(7,20,38,0.45)_28%,rgba(7,20,38,0.24)_52%,rgba(7,20,38,0.08)_75%,transparent_100%)]"
                  : card.darkGradient
                    ? "bg-[linear-gradient(180deg,rgba(7,20,38,0.62)_0%,rgba(7,20,38,0.40)_28%,rgba(7,20,38,0.18)_52%,rgba(7,20,38,0.06)_75%,transparent_100%)]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.7)_28%,rgba(255,255,255,0.42)_52%,rgba(255,255,255,0.16)_75%,transparent_100%)]"
              }`} />
            )}

            <div className="absolute inset-x-0 top-0 px-6 pb-10 pt-6 md:px-7 md:pt-7" style={{ textShadow: "0 1px 8px rgba(7,20,38,0.45)" }}>
              {card.eyebrow && (
                <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] ${card.lightText ? "text-white/80" : "text-[#071426]/60"}`}>{card.eyebrow}</p>
              )}
              <h3 className={`text-[20px] md:text-[22px] font-bold leading-tight ${card.lightText ? "text-white" : "text-[#071426]"}`}>{card.title}</h3>
              {card.body && (
                <p className={`mt-2 text-[13px] leading-relaxed ${card.lightText ? "text-white" : "text-[#071426]"}`}>{card.body}</p>
              )}

            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {UNIQUE_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ga naar kaart ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all ${activeIndex === i ? "w-6 bg-[#071426]" : "w-2 bg-[#071426]/25"}`}
          />
        ))}
      </div>
    </section>
  );
}

export function BeforeAfterSection({
  beforeSrc = beforeFullHouseAsset.url,
  afterSrc = afterFullHouseAsset.url,
}: { beforeSrc?: string; afterSrc?: string } = {}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section className="mt-12 md:mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Content: title, paragraph, USPs */}
        <div className="lg:col-span-5 space-y-8 lg:space-y-10">
          <div className="space-y-3">
            <p className="text-[12px] md:text-[13px] tracking-[0.14em] uppercase text-[#071426]/55">Voor en na Full House</p>
            <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
              Eén meubel.<br className="hidden md:block" /> Eén compleet andere woonkamer.
            </h2>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-[#071426]/65 max-w-md">
              Sleep de balk om te zien hoe de Full House een lege muur transformeert in een warme, opgeruimde woonkamer met ruimte voor alles wat je dierbaar is.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#071426]/5 group-hover:border-[#ef7027]/30 transition-colors">
                <Img src={plugAndPlayIcon.url} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-90" w={64} />
              </div>
              <div className="pt-0.5">
                <p className="text-[15px] font-semibold text-[#071426]">Plug-and-Play</p>
                <p className="text-[13px] text-[#071426]/55 leading-snug">Eenvoudig en snel te monteren</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#071426]/5 group-hover:border-[#ef7027]/30 transition-colors">
                <Img src={warrantyIcon.url} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-90" w={64} />
              </div>
              <div className="pt-0.5">
                <p className="text-[15px] font-semibold text-[#071426]">10 jaar garantie</p>
                <p className="text-[13px] text-[#071426]/55 leading-snug">Langdurige zekerheid</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#071426]/5 group-hover:border-[#ef7027]/30 transition-colors">
                <Img src={kijkplezierIcon.url} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-90" w={64} />
              </div>
              <div className="pt-0.5">
                <p className="text-[15px] font-semibold text-[#071426]">100 dagen proefkijken</p>
                <p className="text-[13px] text-[#071426]/55 leading-snug">Rustig uitproberen</p>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After slider */}
        <div className="lg:col-span-7">
          <div
            className="relative w-full overflow-hidden rounded-2xl select-none touch-none shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-[#071426]/5"
            style={{ aspectRatio: "4 / 3" }}
            ref={containerRef}
            onPointerDown={(e) => {
              draggingRef.current = true;
              setFromClientX(e.clientX);
            }}
          >
            <Img
              src={afterSrc}
              alt="Woonkamer na Full House"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Img
                src={beforeSrc}
                alt="Woonkamer voor Full House"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </div>

            <div className="absolute top-4 left-4 rounded-full bg-[#fef9f5] px-3 py-1 text-[11px] tracking-[0.14em] uppercase text-[#071426]">Voor</div>
            <div className="absolute top-4 right-4 rounded-full bg-[#ff843a] px-3 py-1 text-[11px] tracking-[0.14em] uppercase text-white">Na</div>

            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)] pointer-events-none"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />
            <button
              type="button"
              aria-label="Sleep om te vergelijken"
              className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] cursor-ew-resize"
              style={{ left: `${position}%` }}
              onPointerDown={(e) => {
                e.stopPropagation();
                draggingRef.current = true;
              }}
            >
              <ChevronLeft className="h-4 w-4 text-[#071426]" strokeWidth={2.5} />
              <ChevronRight className="h-4 w-4 text-[#071426] -ml-1" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );

}
