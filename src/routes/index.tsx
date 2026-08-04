import { createFileRoute, Link } from "@tanstack/react-router";
import press1 from "@/assets/press/press1.svg";
import press2 from "@/assets/press/press2.svg";
import press3 from "@/assets/press/press3.svg";
import press4 from "@/assets/press/press4.svg";
import press5 from "@/assets/press/press5.svg";
import press6 from "@/assets/press/press6.svg";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarClock,
  Headphones,
  Mail,
  Phone,
  Plus,
  Shield,
  ShoppingBasket,
  SlidersHorizontal,
  Star,
  Truck,
  User,
} from "lucide-react";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";
import heroVideo from "@/assets/hero-reel.mp4.asset.json";
import werkplaatsVideo from "@/assets/wandig-werkplaats.mov.asset.json";
import fullhouseOrange from "@/assets/fullhouse-orange.jpeg.asset.json";
import tvOrangeImg from "@/assets/tv-orange.png.asset.json";
import plugPlayImg from "@/assets/plug-play-geleverd.png.asset.json";
import kleurstalenImg from "@/assets/kleurstalen.png.asset.json";
import dutchDesignBg from "@/assets/dutch-design-voor-aan-de-muur-bg.png.asset.json";
import puzzlePiecesImg from "@/assets/puzzle-pieces.png.asset.json";
import puzzleIcon from "@/assets/Untitled_design_23.svg.asset.json";
import plugAndPlayIcon from "@/assets/plug-and-play-icon.svg.asset.json";
import kijkplezierIcon from "@/assets/100-dagen-icon.svg.asset.json";
import warrantyIcon from "@/assets/warranty-icon.svg.asset.json";
import configuratorBg from "@/assets/configurator-bg.png.asset.json";
import klantWoonkamer1Img from "@/assets/klant-woonkamer-1.png.asset.json";
import klantWoonkamer2Img from "@/assets/klant-woonkamer-2.png.asset.json";
import klantWoonkamer3Img from "@/assets/klant-woonkamer-3.png.asset.json";
import klantWoonkamer4Img from "@/assets/klant-woonkamer-4.png.asset.json";
import klantWoonkamer5_2Img from "@/assets/klant-woonkamer-5-2.png.asset.json";
import klantWoonkamer6Img from "@/assets/klant-woonkamer-6.png.asset.json";
import klantWoonkamer7Img from "@/assets/klant-woonkamer-7.png.asset.json";
import klantWoonkamer8Img from "@/assets/klant-woonkamer-8.png.asset.json";
import klantWoonkamer9Img from "@/assets/klant-woonkamer-9.png.asset.json";
import klantWoonkamer10Img from "@/assets/klant-woonkamer-10.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wandig — Plug & play tv-wanden uit eigen werkplaats" },
      {
        name: "description",
        content:
          "Tijdloze plug & play tv-wanden op maat. Kies je formaat, indeling en kleur. Gratis levering, 100 dagen proefkijken en 10 jaar garantie.",
      },
      { property: "og:title", content: "Wandig — Plug & play tv-wanden op maat" },
      {
        property: "og:description",
        content: "Tijdloze plug & play tv-wanden op maat. Kies je formaat, indeling en kleur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

/* ---------------------------------- shared --------------------------------- */

function SectionHeading({
  kicker,
  title,
  intro,
  align = "center",
}: {
  kicker?: string;
  title: ReactNode;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {kicker && (
        <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">{kicker}</span>
      )}
      <h2 className="mt-2 text-[22px] md:text-[26px] font-bold leading-tight tracking-[0.01em] text-[#071426]">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-2 text-[13px] md:text-[14px] leading-relaxed tracking-[0.01em] text-[#071426]/55 ${align === "center" ? "mx-auto max-w-[560px]" : "max-w-[520px]"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] px-7 text-[14px] font-[500] tracking-[0.04em] text-white transition hover:brightness-95"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

/* ------------------------------- 1. hero ---------------------------------- */

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <video
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative flex h-full w-full flex-col items-center justify-center px-5 text-center text-white">
        <h1 className="text-[32px] font-[600] leading-[1.1] tracking-[0.01em] md:text-[52px]">
          Jouw tv-wand, op maat gemaakt
        </h1>
        <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed tracking-[0.01em] text-white/85 md:text-[15px]">
          Plug &amp; play geleverd uit eigen werkplaats. Kies je formaat, indeling en kleur.
        </p>
        <div className="mt-8">
          <PrimaryButton to="/producten">Configureer jouw tv-wand</PrimaryButton>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[12px] tracking-[0.01em]">
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#ef7027] text-[#ef7027]" />
            ))}
          </span>
          <span className="opacity-95">23.000+ beoordelingen</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 2. 3 benefits (hero) -------------------------- */

const HERO_BENEFITS = [
  {
    kicker: "VERTROUWD DOOR KLANTEN",
    title: "+15.000 verkochte tv-meubels",
    body: "Ontworpen om jarenlang het middelpunt van je woonkamer te zijn.",
  },
  {
    kicker: "ZORGELOOS THUIS PROBEREN",
    title: "100 dagen proefkijken",
    body: "Bekijk rustig thuis of het perfect past bij jouw interieur.",
  },
  {
    kicker: "KWALITEIT GEGARANDEERD",
    title: "10 jaar garantie",
    body: "Duurzame kwaliteit waar je jarenlang op kunt vertrouwen.",
  },
];

function HeroBenefitsSection() {
  return (
    <section className="bg-[#faf8f5]">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 sm:grid-cols-3 md:gap-16">
          {HERO_BENEFITS.map((b) => (
            <div key={b.title} className="mx-auto max-w-[320px] text-center">
              <span className="text-[11px] font-[400] uppercase tracking-[0.14em] text-[#ef7027]">
                {b.kicker}
              </span>
              <h3 className="mt-3 text-[16px] font-[400] leading-[1.3] tracking-[0.01em] text-[#071426] md:text-[18px]">
                {b.title}
              </h3>
              <p className="mt-3 text-[13px] font-[300] leading-relaxed tracking-[0.01em] text-[#071426]/60 md:text-[14px]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------------------------- 3. product carousel --------------------------- */

const PRODUCTS = [
  {
    handle: "full-house",
    title: "Full House",
    tagline: "Volledige wand-look",
    price: "1.699,-",
    img: fullhouseOrange.url,
    reviews: "(2.526)",
    meta: "240 cm · Full House",
    featured: true,
  },
  {
    handle: "duo",
    title: "Duo",
    tagline: "Symmetrisch met opbergruimte",
    price: "1.199,-",
    img: plugPlayImg.url,
    reviews: "(143)",
    meta: "180 cm · Duo",
    delivery: "Levering: 10 werkdagen",
  },
  {
    handle: "solo",
    title: "Solo",
    tagline: "Compact en strak",
    price: "749,-",
    img: tvOrangeImg.url,
    reviews: "(143)",
    meta: "120 cm · Solo",
    delivery: "Levering: 10 werkdagen",
  },
];

function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-[#ef7027] text-[#ef7027]" />
      ))}
    </span>
  );
}

function BasketButton() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] text-white transition group-hover:brightness-95">
      <ShoppingBasket className="h-[18px] w-[18px]" strokeWidth={1.5} />
    </span>
  );
}

function ProductCarouselSection() {
  return (
    <section className="bg-[#faf8f5] pb-10 md:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="overflow-hidden rounded-[20px] bg-[#ede7e0] p-4 md:p-6">
          <div className="flex gap-5">
            <div className="hidden shrink-0 items-start pt-4 md:flex">
              <span
                className="whitespace-nowrap text-[34px] font-[300] uppercase tracking-[0.06em] text-[#071426]"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Kies jouw model
              </span>
            </div>

            <div
              className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {PRODUCTS.map((p) =>
                p.featured ? (
                  <Link
                    key={p.handle}
                    to="/product/$handle"
                    params={{ handle: p.handle }}
                    className="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-[16px] md:w-[46%]"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[520px]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white">
                      <div>
                        <h3 className="text-[26px] font-[600] leading-[1.1] tracking-[0.01em] md:text-[32px]">
                          {p.title}
                        </h3>
                        <div className="text-[22px] font-[600] leading-tight tracking-[0.01em] md:text-[26px]">
                          {p.price}
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-[12px] tracking-[0.01em] text-white/90">
                          <Stars />
                          <span>{p.reviews}</span>
                        </div>
                        <div className="mt-1 text-[12px] tracking-[0.01em] text-white/80">{p.meta}</div>
                      </div>
                      <BasketButton />
                    </div>
                  </Link>
                ) : (
                  <Link
                    key={p.handle}
                    to="/product/$handle"
                    params={{ handle: p.handle }}
                    className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] bg-white p-3 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:w-[32%]"
                  >
                    <div className="overflow-hidden rounded-[12px] bg-[#f7f7f7]">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-[200px] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[260px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[20px] font-[600] leading-[1.1] tracking-[0.01em] text-[#071426] md:text-[24px]">
                            {p.title}
                          </h3>
                          <div className="mt-0.5 text-[18px] font-[600] tracking-[0.01em] text-[#071426] md:text-[22px]">
                            {p.price}
                          </div>
                        </div>
                        {p.delivery && (
                          <span className="mt-1 text-[11px] tracking-[0.01em] text-[#071426]/50">
                            {p.delivery}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[13px] tracking-[0.01em] text-[#071426]/60">{p.tagline}</p>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                        <div>
                          <div className="flex items-center gap-2 text-[12px] tracking-[0.01em] text-[#071426]/60">
                            <Stars />
                            <span>{p.reviews}</span>
                          </div>
                          <div className="mt-1 text-[12px] tracking-[0.01em] text-[#071426]/60">{p.meta}</div>
                        </div>
                        <BasketButton />
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


/* ------------------------- 4. configurator banner ------------------------- */

function ConfiguratorBannerSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={configuratorBg.url}
        alt="Configureer jouw tv-wand"
        className="h-[420px] w-full object-cover md:h-[620px]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
        <span className="flex items-center gap-2 text-[12px] tracking-[0.06em] text-white/85">
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
          Configurator
        </span>
        <h2 className="mt-3 max-w-[820px] text-[28px] font-[500] leading-[1.15] tracking-[0.01em] md:text-[46px]">
          Stel jouw tv-wand samen
        </h2>
        <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed tracking-[0.01em] text-white/85 md:text-[15px]">
          Kies formaat, indeling en kleur en zie direct wat het kost. In een paar minuten klaar.
        </p>
        <div className="mt-8">
          <PrimaryButton to="/producten">Start de configurator</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- 4b. binnenkijken ----------------------------- */

function PuzzleCornerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.5 0 2.7 1.2 2.7 2.7S5 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
    </svg>
  );
}

const CUSTOMER_GALLERY_COLUMNS = [
  {
    width: "w-[240px] md:w-[340px]",
    items: [{ src: klantWoonkamer1Img.url, alt: "Woonkamer met Full House cinewall" }],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      { src: klantWoonkamer2Img.url, alt: "Roze cinewall met tv in woonkamer" },
      { src: klantWoonkamer3Img.url, alt: "Kinderen spelen voor houten cinewall" },
    ],
  },
  {
    width: "w-[220px] md:w-[300px]",
    items: [{ src: klantWoonkamer6Img.url, alt: "Donkere houten cinewall met tv en vakken" }],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      { src: klantWoonkamer4Img.url, alt: "Roze cinewall in moderne woonkamer" },
      { src: klantWoonkamer7Img.url, alt: "Lichte cinewall in moderne woonkamer" },
    ],
  },
  {
    width: "w-[240px] md:w-[340px]",
    items: [{ src: klantWoonkamer5_2Img.url, alt: "Houten cinewall met tv en decoratie in lichte woonkamer" }],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      { src: klantWoonkamer8Img.url, alt: "Donkere houten cinewall met tv en decoratie in moderne woonkamer" },
      { src: klantWoonkamer10Img.url, alt: "Roze cinewall met tv en vakken in lichte woonkamer" },
    ],
  },
  {
    width: "w-[240px] md:w-[340px]",
    items: [{ src: klantWoonkamer9Img.url, alt: "Witte cinewall met tv in lichte woonkamer" }],
  },
];

function CustomerGallerySection() {
  return (
    <section className="bg-[#ffc79d] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#0e1f2a]">
            Binnenkijken bij onze klanten
          </h2>
          <p className="mt-2 text-[13px] md:text-[14px] text-[#0e1f2a]">
            Echte interieurs, echte inspiratie. Gemaakt door onze klanten.
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto scrollbar-hide md:mx-0">
          <div className="flex h-[420px] gap-3 px-5 md:h-[560px] md:gap-4 md:px-0">
            {CUSTOMER_GALLERY_COLUMNS.map((col, colIndex) => (
              <div key={colIndex} className={`flex h-full shrink-0 flex-col gap-3 md:gap-4 ${col.width}`}>
                {col.items.map((image, i) => (
                  <figure key={i} className="group relative min-h-0 flex-1 overflow-hidden rounded-[14px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    <Link
                      to="/product/full-house"
                      className="group/pill absolute bottom-2 left-2 flex h-7 items-center gap-0 rounded-full bg-[#ff843a] pl-1 pr-1 text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[padding,gap] duration-300 ease-out hover:gap-2 hover:pl-3 hover:pr-2 md:bottom-3 md:left-3 md:h-8"
                    >
                      <span className="grid max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-[330] leading-none tracking-[0.04em] transition-[max-width,opacity] duration-300 ease-out opacity-0 group-hover/pill:max-w-[180px] group-hover/pill:opacity-100 md:text-[13px]">
                        Bestel Full House
                      </span>
                      <span className="pill-shimmer relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff843a] text-white md:h-6 md:w-6">
                        <PuzzleCornerIcon className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/pill:rotate-90 md:h-4 md:w-4" />
                      </span>
                    </Link>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------ 5. marquee -------------------------------- */

const PRESS = [press1, press2, press3, press4, press5, press6];

function PressMarqueeSection() {
  const row = [...PRESS, ...PRESS];
  return (
    <section className="relative overflow-hidden bg-[#dfd7ce] py-8 md:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#dfd7ce] via-[#dfd7ce]/70 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#dfd7ce] via-[#dfd7ce]/70 to-transparent md:w-32" />
      <div className="relative">
        <div className="flex w-max animate-[wandig-marquee_32s_linear_infinite] items-center gap-16 pr-16">
          {row.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              aria-hidden="true"
              className="h-7 w-auto shrink-0 opacity-90 md:h-9"
            />
          ))}
        </div>
      </div>
      <style>{`@keyframes wandig-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* --------------------------- 6. dutch design ------------------------------ */

function DutchDesignSection() {
  return (
    <section className="bg-[#faf8f5] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[20px]">
          {/* asset slot: dutch design achtergrond */}
          <img
            src={dutchDesignBg.url}
            alt="Dutch design tv-wand"
            className="h-[420px] w-full object-cover md:h-[520px]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14">
            <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-white/60">
              Dutch design
            </span>
            <h2 className="mt-2 max-w-[520px] text-[24px] font-[600] leading-tight tracking-[0.01em] text-white md:text-[32px]">
              Ontworpen én gemaakt in Nederland
            </h2>
            <p className="mt-3 max-w-[440px] text-[13px] leading-relaxed tracking-[0.01em] text-white/80 md:text-[14px]">
              Eigen ontwerp, eigen werkplaats in Best. Tijdloze lijnen, eerlijke materialen en een
              afwerking die je voelt.
            </p>
            <div className="mt-7">
              <PrimaryButton to="/bezoek">Bekijk onze werkplaats</PrimaryButton>
            </div>
          </div>
          <img
            src={puzzlePiecesImg.url}
            alt=""
            className="pointer-events-none absolute bottom-4 right-4 w-[90px] opacity-90 md:w-[120px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 7. reviews -------------------------------- */

const REVIEWS = [
  { name: "Sanne V.", location: "Utrecht", rating: 5, title: "Kwaliteit is top", body: "De Full House staat prachtig in onze woonkamer. Afwerking is echt perfect en de montage was zo gepiept.", date: "3 weken geleden" },
  { name: "Jeroen B.", location: "Amsterdam", rating: 5, title: "Meer dan verwacht", body: "Bestelling verliep soepel en levering was op tijd. De kast oogt luxer dan op de foto's.", date: "1 maand geleden" },
  { name: "Lisa D.", location: "Den Haag", rating: 5, title: "Fantastisch meubel", body: "Onze woonkamer is compleet veranderd. Kabels netjes weggewerkt en de soundbar past perfect.", date: "1 maand geleden" },
  { name: "Mark H.", location: "Rotterdam", rating: 4, title: "Mooi en stevig", body: "Zeer tevreden over de kwaliteit. Montage duurde iets langer dan verwacht maar het resultaat is top.", date: "2 maanden geleden" },
  { name: "Eva K.", location: "Eindhoven", rating: 5, title: "Precies wat we zochten", body: "De kleurstalen thuis waren super handig. Uiteindelijk gekozen voor eiken, warm en tijdloos.", date: "2 maanden geleden" },
  { name: "Tom S.", location: "Groningen", rating: 5, title: "Klantenservice top", body: "Had een vraag over de afmetingen en werd direct geholpen. Aanrader!", date: "2 maanden geleden" },
];

function ReviewsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-[#faf8f6] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
          <SectionHeading kicker="Reviews" title="Wat klanten zeggen over hun tv-wand." align="left" />

          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Vorige"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#071426] transition hover:bg-[#faf8f5]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Volgende"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#071426] transition hover:bg-[#faf8f5]"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mx-auto flex max-w-[1400px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            className="flex w-[280px] shrink-0 snap-start flex-col justify-between rounded-[14px] bg-white p-5 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:w-[340px]"
          >
            <div className="pb-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className={idx < r.rating ? "text-[#ef7027]" : "text-[#e5ded4]"}>
                    ★
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-[15px] font-[500] tracking-[0.01em] text-[#071426]">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/65 md:text-[14px]">
                {r.body}
              </p>
            </div>
            <div className="flex items-center gap-2.5 border-t border-[#e5ded4]/40 pt-5 text-[12px]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#ef7027]">
                <User className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="font-[500] text-[#071426]">
                {r.name} · {r.location}
              </span>
              <span className="text-[#071426]/50">· {r.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ 8. gratis kleurstalen --------------------------- */

function ColorSamplesSection() {
  return (
    <section className="bg-[#faf8f5] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid items-center gap-8 overflow-hidden rounded-[20px] bg-[#ede7e0] md:grid-cols-2">
          {/* asset slot: kleurstalen foto */}
          <img
            src={kleurstalenImg.url}
            alt="Gratis kleurstalen van Wandig"
            className="h-full max-h-[380px] w-full object-cover"
            loading="lazy"
          />
          <div className="p-8 md:p-12">
            <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">
              Gratis thuis
            </span>
            <h2 className="mt-2 text-[22px] font-[600] leading-tight tracking-[0.01em] text-[#071426] md:text-[28px]">
              Bestel gratis kleurstalen
            </h2>
            <p className="mt-3 max-w-[420px] text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/70 md:text-[14px]">
              Twijfel je over de kleur? Wij sturen je gratis stalen zodat je thuis in je eigen licht kunt
              kiezen.
            </p>
            <div className="mt-7">
              <PrimaryButton to="/klantenservice">Bestel gratis kleurstalen</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 9. quote + video ----------------------------- */

function QuoteVideoSection() {
  return (
    <section className="bg-[#faf8f5] pb-10 md:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <blockquote className="mx-auto max-w-[820px] text-center">
          <p className="text-[20px] font-[500] leading-[1.4] tracking-[0.01em] text-[#071426] md:text-[28px]">
            Wandig, dat is handig.
          </p>
        </blockquote>

        {/* asset slot: bedrijfsvideo */}
        <div className="mt-8 overflow-hidden rounded-[20px] bg-black md:mt-12">
          <video
            src={werkplaatsVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 10. FAQ + contact ---------------------------- */

const FAQ_ITEMS = [
  { question: "Hoe lang duurt de levering?", answer: "Gemiddeld leveren we binnen 10 werkdagen. Bij een maatwerkkleur kan dit iets langer duren; je hoort altijd vooraf de exacte levertijd." },
  { question: "Moet ik zelf monteren?", answer: "Onze tv-wanden komen plug & play geleverd. Met twee personen hang je hem op met de bijgeleverde klikmontage." },
  { question: "Past een soundbar in de kast?", answer: "Ja. Elk model heeft ruimte voor een soundbar en apparatuur, met kabeldoorvoer zodat kabels uit het zicht blijven." },
  { question: "Kan ik de kleur thuis bekijken?", answer: "Zeker. Bestel gratis kleurstalen en bekijk ze rustig in je eigen woonkamer voordat je beslist." },
  { question: "Wat als het meubel niet bevalt?", answer: "Je hebt 100 dagen proefkijken. Bevalt het niet, dan halen we het gratis bij je op." },
  { question: "Hoeveel garantie krijg ik?", answer: "Op elke tv-wand geldt 10 jaar garantie op materiaal en constructie." },
];

function FaqContactSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          kicker="FAQ"
          title="Veelgestelde vragen"
          intro="Alles wat je wilt weten over onze tv-wanden."
        />

        <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className="rounded-[14px] bg-[#faf8f5] p-4 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:p-5"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="text-[14px] font-[500] leading-snug tracking-[0.01em] text-[#071426] md:text-[15px]">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[#cdc0b5] text-[#071426] transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
                  >
                    <Plus className="h-3 w-3" strokeWidth={2} />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3 text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/65 md:text-[14px]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 border-t border-[#eee7de] pt-10 sm:grid-cols-3 sm:gap-6">
          {[
            { icon: Phone, label: "Bel ons, steun 9-5", sub: "9:00 - 18:00", value: "+31 085 107 1953" },
            { icon: Headphones, label: "Chat live, agent 9-5", sub: "9:00 - 22:00", value: "Chat met ons" },
            { icon: Mail, label: "Stuur een mail", sub: "iedere werkdag", value: "support.nl@wandig.com" },
          ].map(({ icon: Icon, label, sub, value }) => (
            <div key={label}>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#ef7027]/10">
                  <Icon className="h-[17px] w-[17px] text-[#ef7027]" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] leading-snug tracking-[0.01em] text-[#071426]/75">{label}</p>
                  <p className="text-[12px] leading-snug tracking-[0.01em] text-[#071426]/75">{sub}</p>
                </div>
              </div>
              <p className="mt-4 break-words text-[15px] font-bold leading-tight tracking-[0.01em] text-[#071426]">
                {value}
              </p>
              <div className="mt-3 h-px w-full bg-[#071426]/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- 11. nieuwsbrief ----------------------------- */

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Vul een geldig e-mailadres in.");
      return;
    }
    if (!acceptedTerms) {
      setStatus("error");
      setMessage("Accepteer de voorwaarden om door te gaan.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await subscribeNewsletter({ data: { email: trimmed, source: "homepage" } });
      setStatus("success");
      setMessage(res.alreadySubscribed ? "Je bent al ingeschreven — bedankt!" : "Bedankt! Je bent ingeschreven.");
      setEmail("");
      setAcceptedTerms(false);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    }
  };

  return (
    <section className="bg-[#fffcf8]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[560px] text-center">
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[0.01em] text-[#071426] md:text-[26px]">
            Meld je aan voor onze nieuwsbrief
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/70 md:text-[14px]">
            Blijf op de hoogte van de nieuwste updates, tips en exclusieve aanbiedingen.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-[430px] text-left" noValidate>
            <div className="flex overflow-hidden rounded-[8px] border border-[#e7ded4] bg-white">
              <label htmlFor="home-newsletter-email" className="sr-only">
                E-mailadres
              </label>
              <input
                id="home-newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Voer je e-mailadres in"
                className="h-[46px] min-w-0 flex-1 bg-white px-4 text-[14px] tracking-[0.01em] text-[#071426] placeholder:text-[#071426]/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#ef7027] px-5 text-[14px] font-[500] tracking-[0.03em] text-white transition hover:brightness-95 disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Bezig..."
                ) : (
                  <>
                    Inschrijven
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (status !== "idle") setStatus("idle");
                }}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-[#cdc0b5] text-[#ef7027] focus:ring-[#ef7027]"
              />
              <span className="text-[13px] leading-snug tracking-[0.01em] text-[#071426]/75">
                Ik accepteer de voorwaarden.{" "}
                <a
                  href="/algemene-voorwaarden"
                  className="underline decoration-[#071426]/40 underline-offset-2 transition hover:text-[#ef7027] hover:decoration-[#ef7027]"
                >
                  Privacyverklaring
                </a>
              </span>
            </label>
            {message && (
              <p
                className={`mt-3 text-[13px] tracking-[0.01em] ${status === "success" ? "text-[#2d6a3e]" : "text-[#b3341c]"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- 12. 4 benefits ------------------------------ */

function PuzzleImgIcon({ className }: { className?: string }) {
  return <img src={puzzleIcon.url} alt="" className={className} />;
}

function TrustBannerSection() {
  const items = [
    { icon: Shield, label: "4,7/5 klantbeoordeling" },
    { icon: Truck, label: "Gratis levering & retourneren" },
    { icon: CalendarClock, label: "100 dagen proefkijken" },
    { icon: PuzzleImgIcon, label: "10 jaar garantie" },
  ];

  return (
    <section className="bg-[#f7f3ef]">
      <div className="mx-auto max-w-[1400px] px-5 py-6 md:px-10 md:py-8">
        <div className="flex flex-col divide-y divide-[#e5e5e5] sm:flex-row sm:divide-x sm:divide-y-0 sm:divide-[#e5e5e5]">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-1 items-center justify-center gap-3 py-4 sm:px-4 sm:py-0">
              <Icon className="h-5 w-5 shrink-0 text-[#0f1f2a]" strokeWidth={1.5} />
              <p className="text-[14px] font-normal leading-snug tracking-[0.01em] text-[#0f1f2a]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- page ------------------------------------ */

function Home() {
  return (
    <div className="bg-[#faf8f5]">
      <HeroSection />
      <HeroBenefitsSection />
      <ProductCarouselSection />
      <ConfiguratorBannerSection />
      <DutchDesignSection />
      <PressMarqueeSection />
      <CustomerGallerySection />

      <ReviewsSection />
      <ColorSamplesSection />
      <QuoteVideoSection />
      <FaqContactSection />
      <NewsletterSection />
      <TrustBannerSection />
    </div>
  );
}
