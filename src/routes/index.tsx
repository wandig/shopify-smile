import { Img } from "@/components/Img";
import { optimizeImageUrl } from "@/lib/asset-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import press1 from "@/assets/press/press1.svg";
import press2 from "@/assets/press/press2.svg";
import press3 from "@/assets/press/press3.svg";
import press4 from "@/assets/press/press4.svg";
import press5 from "@/assets/press/press5.svg";
import press6 from "@/assets/press/press6.svg";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, formatPrice, lowestPaidPrice, type ShopifyProduct } from "@/lib/shopify";
import { displayWandigColor, sortWandigColors, wandigSwatchStyle } from "@/lib/wandig-colors";

import {
  ArrowRight,
  CalendarClock,
  Plus,
  Shield,
  ShoppingBasket,
  SlidersHorizontal,
  Star,
  Truck,
  User,
} from "lucide-react";

import heroVideo from "@/assets/hero-reel-web.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import werkplaatsVideo from "@/assets/werkplaats-web.mp4.asset.json";
import werkplaatsPoster from "@/assets/werkplaats-poster.jpg.asset.json";
import { LazyVideo } from "@/components/LazyVideo";
import fullhouseOrange from "@/assets/fullhouse-orange.jpeg.asset.json";
import fullHouseClosedFrontV5 from "@/assets/full-house-closed-front-v5.png.asset.json";
import fullHouseSelectedV7 from "@/assets/full-house-selected-v7.png.asset.json";
import fullHouseMobile from "@/assets/full-house-mobile.png.asset.json";
import fullHouseCard from "@/assets/full-house-card.png.asset.json";

import plugPlayImg from "@/assets/plug-play-geleverd.png.asset.json";
import duoCardImg from "@/assets/duo-card.jpg.asset.json";
import soloCardImg from "@/assets/solo-card.jpg.asset.json";
import cashmereAssetTmp from "@/assets/cashmeregrijs.jpg.asset.json";
import kristalwitAssetTmp from "@/assets/kristalwit.webp.asset.json";
import kleurstalenImg from "@/assets/kleurstalen.png.asset.json";
import swatchDonkereikenAsset from "@/assets/donkereiken.jpg.asset.json";
import swatchWalnootbruin from "@/assets/swatches/walnootbruin.jpg";
import swatchDofroze from "@/assets/swatches/dofroze.jpg";
import puzzleIcon from "@/assets/Untitled_design_23.svg.asset.json";
import plugAndPlayIcon from "@/assets/plug-and-play-icon.svg.asset.json";
import kijkplezierIcon from "@/assets/100-dagen-icon.svg.asset.json";
import warrantyIcon from "@/assets/warranty-icon.svg.asset.json";
import configuratorBg from "@/assets/configurator-bg.png.asset.json";
import configuratorBannerKids from "@/assets/configurator-banner-kids.png.asset.json";
import waaromWijBg from "@/assets/waarom-wij-achtergrond.png.asset.json";
import waaromWijCraft from "@/assets/waarom-wij-craft.png.asset.json";
import waaromWijMontage from "@/assets/waarom-wij-montage.png.asset.json";
import waaromWijService from "@/assets/waarom-wij-service.png.asset.json";
import { CustomerGallerySection } from "@/components/CustomerGallerySection";
import { ScrollDots } from "@/components/ScrollDots";

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
    links: [
      { rel: "preload", as: "image", href: heroPoster.url, fetchPriority: "high" },
      { rel: "preconnect", href: "https://hu0i4f-1k.myshopify.com" },
      { rel: "preconnect", href: "https://cdn.shopify.com" },
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
    <section className="relative h-screen max-h-[780px] min-h-[560px] w-full overflow-hidden">
      <LazyVideo
        src={heroVideo.url}
        poster={heroPoster.url}
        eager
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
          <PrimaryButton to="/configurator">Configureer jouw tv-wand</PrimaryButton>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[12px] tracking-[0.01em]">
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#ef7027] text-[#ef7027]" />
            ))}
          </span>
          <span className="opacity-95">1000+ beoordelingen</span>
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
      <div className="mx-auto max-w-[1456px] px-5 py-10 md:px-10 md:py-14">
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

type ModelColor = {
  name: string;
  image?: string;
  hex?: string;
};

const MODEL_COLORS: ModelColor[] = [
  { name: "Walnootbruin", image: swatchWalnootbruin },
  { name: "Donkereiken", image: swatchDonkereikenAsset.url },
  { name: "Cashmere", hex: "#e3d9c9" },
  { name: "Wit", hex: "#f6f4f1" },
  { name: "Blush", hex: "#e6c6bb" },
];

const PRODUCTS: {
  handle: string;
  title: string;
  tagline?: string;
  price: string;
  img: string;
  mobileImg?: string;
  reviews: string;
  meta: string;
  featured?: boolean;
  colorImages?: Record<string, string>;
}[] = [
  {
    handle: "full-house",
    title: "Full House",
    tagline: "Volledige wand-look",
    price: "1.699,-",
    img: fullHouseCard.url,
    mobileImg: fullHouseMobile.url,
    reviews: "(2.526)",
    meta: "240 cm · Full House",
    featured: true,
    colorImages: {},
  },
  {
    handle: "duo",
    title: "Duo",
    price: "1.199,-",
    img: duoCardImg.url,
    reviews: "(143)",
    meta: "180 cm · Duo",
    colorImages: {},
  },
  {
    handle: "solo",
    title: "Solo",
    price: "749,-",
    img: soloCardImg.url,
    reviews: "(143)",
    meta: "120 cm · Solo",
    colorImages: {},
  },
];

function parsePriceToCents(price: string): number | null {
  const normalized = price.replace(/\./g, "").replace(",-", "").replace(",", ".").trim();
  const value = Number(normalized);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function formatInstallment(amount: number): string {
  return `€${Math.round(amount).toLocaleString("nl-NL")},-`;
}

function PaymentInfo({ price, light = false }: { price: string; light?: boolean }) {
  const value = parsePriceToCents(price);
  if (value === null) return null;
  const installment = value / 3;
  const textColor = light ? "text-white/95" : "text-[#071426]/70";
  const badgeBg = light ? "bg-white/20" : "bg-[#f7f3ef]";
  const badgeText = light ? "text-white" : "text-[#071426]";

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-[600] tracking-[0.02em] ${badgeBg} ${badgeText}`}>
          Klarna
        </span>
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-[600] tracking-[0.02em] ${badgeBg} ${badgeText}`}>
          iDEAL
        </span>
      </div>
      <span className={`text-[11px] font-[400] tracking-[0.01em] ${textColor}`}>
        Of 3x {formatInstallment(installment)}, 0% rente
      </span>
    </div>
  );
}

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

function ColorSwatches({
  colors,
  selected,
  onSelect,
  light = false,
}: {
  colors: string[];
  selected: string;
  onSelect: (name: string) => void;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {colors.map((name) => {
        const isActive = name === selected;
        return (
          <button
            key={name}
            type="button"
            title={displayWandigColor(name)}
            aria-label={displayWandigColor(name)}
            aria-pressed={isActive}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(name);
            }}
            className={`h-6 w-6 shrink-0 overflow-hidden rounded-full border ${
              light ? "border-white/70" : "border-[#071426]/15"
            } ${
              isActive
                ? "ring-2 ring-[#ef7027] ring-offset-1 " +
                  (light ? "ring-offset-transparent" : "ring-offset-white")
                : ""
            }`}
            style={wandigSwatchStyle(name)}
          />
        );
      })}
    </div>
  );
}

function ModelCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const shopifyProduct = data?.find((edge) => edge.node.handle === p.handle)?.node;
  const colorOption = shopifyProduct?.options.find((option) => /kleur|color/i.test(option.name));
  const colors = useMemo(
    () => (colorOption ? sortWandigColors(colorOption.values) : MODEL_COLORS.map((c) => c.name)),
    [colorOption],
  );

  const [color, setColor] = useState<string>("");
  const activeColor = color && colors.includes(color) ? color : (colors[0] ?? "");

  const variantImage = useMemo(() => {
    if (!shopifyProduct || !colorOption || !activeColor) return undefined;
    const variants = shopifyProduct.variants.edges.map((edge) => edge.node);
    const sizeOption = shopifyProduct.options.find((option) => /maat|size|inch/i.test(option.name));
    const preferredSizeValue = sizeOption
      ? sizeOption.values.find((v) => /58/.test(v)) ?? sizeOption.values[1]
      : undefined;
    const hasColor = (variant: (typeof variants)[number]) =>
      variant.selectedOptions.some(
        (option) => option.name === colorOption.name && option.value === activeColor,
      );
    const isPreferredSize = (variant: (typeof variants)[number]) =>
      !!sizeOption &&
      !!preferredSizeValue &&
      variant.selectedOptions.some(
        (option) => option.name === sizeOption.name && option.value === preferredSizeValue,
      );
    const match =
      variants.find((variant) => hasColor(variant) && isPreferredSize(variant)) ??
      variants.find(hasColor);
    return match?.image?.url;
  }, [shopifyProduct, colorOption, activeColor]);



  const img = variantImage ?? p.colorImages?.[activeColor] ?? p.img;


  if (p.featured) {
    return (
      <Link
        to="/product/$handle"
        params={{ handle: p.handle }}
        className="group relative w-[360px] shrink-0 snap-start overflow-hidden rounded-[16px] md:w-[46%]"
      >
        <picture className="absolute inset-0 block h-full w-full">
          {p.mobileImg && !variantImage && (
            <source media="(max-width: 767px)" srcSet={optimizeImageUrl(p.mobileImg, 800)} />
          )}

          <Img
            key={img}
            src={img}
            alt={`${p.title} in ${activeColor}`}
            className="h-full w-full animate-[fadeIn_.4s_ease] object-cover transition duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </picture>


        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
          <h3 className="text-[32px] font-[400] leading-[1.05] tracking-[0.01em] md:text-[42px]">
            {p.title}
          </h3>
          <div className="text-[26px] font-[400] leading-[1.05] tracking-[0.01em] md:text-[34px]">
            {p.price}
          </div>
          <PaymentInfo price={p.price} light />
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
          <div>
            <div className="flex items-center gap-2 text-[13px] tracking-[0.01em] text-white/95">
              <Stars />
              <span>{p.reviews}</span>
            </div>
            <div className="mt-1 text-[13px] tracking-[0.01em] text-white/90">{p.meta}</div>
            <div className="mt-2">
              <ColorSwatches colors={colors} selected={activeColor} onSelect={setColor} light />
            </div>
          </div>
          <BasketButton />
        </div>
      </Link>
    );
  }


  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group flex w-[280px] shrink-0 snap-start self-stretch flex-col overflow-hidden rounded-[16px] bg-[#faf8f6] p-3 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:w-[32%]"
    >
      <div className="flex-1 min-h-0 overflow-hidden rounded-[12px] bg-[#f7f7f7]">
        <Img
          key={img}
          src={img}
          alt={`${p.title} in ${activeColor}`}
          className="h-full w-full animate-[fadeIn_.4s_ease] object-cover transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[22px] font-[400] leading-[1.1] tracking-[0.01em] text-[#071426] md:text-[28px]">
              {p.title}
            </h3>
            <div className="mt-0.5 text-[18px] font-[400] tracking-[0.01em] text-[#071426] md:text-[24px]">
              {p.price}
            </div>
            <PaymentInfo price={p.price} />
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <div className="flex items-center gap-2 text-[13px] tracking-[0.01em] text-[#071426]/60">
              <Stars />
              <span>{p.reviews}</span>
            </div>
            <div className="mt-1 text-[13px] tracking-[0.01em] text-[#071426]/60">{p.meta}</div>
            <div className="mt-2">
              <ColorSwatches colors={colors} selected={activeColor} onSelect={setColor} />
            </div>
          </div>
          <BasketButton />
        </div>
      </div>
    </Link>
  );
}

function ProductCarouselSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="bg-[#faf8f5] py-10 md:py-14">
      <div className="mx-auto max-w-[1456px] xl:max-w-[1720px] 2xl:max-w-none pl-5 md:pl-10 2xl:pl-16 pr-0 -mr-[calc((100vw-100%)/2)]">
        <div className="overflow-hidden rounded-l-[20px] bg-[#ede7e0] py-4 pl-4 pr-0 md:py-6 md:pl-6">
          <div
            ref={scrollerRef}
            className="flex min-w-0 flex-1 items-stretch snap-x snap-proximity gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex shrink-0 snap-start items-start pt-2 md:pt-4">
              <span
                className="whitespace-nowrap text-[22px] font-[400] uppercase tracking-[0.06em] text-[#071426] md:text-[34px]"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Kies jouw model
              </span>
            </div>
            {PRODUCTS.map((p) => (
              <ModelCard key={p.handle} p={p} />
            ))}
          </div>
        </div>
        <ScrollDots scrollRef={scrollerRef} className="mt-4 pr-5" />
      </div>
    </section>
  );
}




/* ------------------------- 4. configurator banner ------------------------- */

function ConfiguratorBannerSection() {
  return (
    <>
      {/* Mobile + tablet: oude full-bleed banner */}
      <section className="relative w-full overflow-hidden lg:hidden">
        <Img
          src={configuratorBannerKids.url}
          w={1600}
          alt="Configureer jouw tv-wand"
          className="block h-[420px] w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
          <span className="flex items-center gap-2 text-[12px] tracking-[0.06em] text-white/85">
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
            Configurator
          </span>
          <h2 className="mt-3 max-w-[820px] text-[28px] font-[500] leading-[1.15] tracking-[0.01em]">
            Stel jouw tv-wand samen
          </h2>
          <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed tracking-[0.01em] text-white/85">
            Kies formaat, indeling en kleur en zie direct wat het kost. In een paar minuten klaar.
          </p>
          <div className="mt-8">
            <PrimaryButton to="/configurator">Start de configurator</PrimaryButton>
          </div>
        </div>
      </section>

      {/* Desktop: architectural layered canvas */}
      <section className="hidden w-full overflow-hidden bg-[#faf8f5] px-5 py-10 lg:block lg:py-16">
        <div className="relative mx-auto grid max-w-[1456px] grid-cols-12 items-center">
          {/* Image + swatches */}
          <div className="col-span-12 lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:h-[620px] overflow-hidden rounded-[24px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.12)]">
            <Img
              src={configuratorBannerKids.url}
          w={1600}
              alt="Configureer jouw tv-wand"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
              <Img src={swatchDonkereikenAsset.url} alt="Donkereiken" className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" w={96} />
              <Img src={swatchWalnootbruin} alt="Walnootbruin" className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" w={96} />
              <Img src={cashmereAssetTmp.url} alt="Cashmeregrijs" className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm" w={96} />
              <span className="ml-1 text-[11px] font-[500] tracking-[0.08em] text-[#071426]/60">+ meer</span>
            </div>
          </div>

          {/* Floating content card */}
          <div className="col-span-12 lg:col-span-5 lg:-ml-16 z-10 mt-[-48px] lg:mt-0">
            <div className="rounded-[20px] border border-[#ede7e0] bg-white p-8 shadow-[20px_40px_80px_-20px_rgba(0,0,0,0.08)] lg:p-12">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#d4cec6]" />
                <span className="flex items-center gap-2 text-[10px] font-[500] uppercase tracking-[0.2em] text-[#90949b]">
                  <SlidersHorizontal className="h-3 w-3" strokeWidth={1.5} />
                  Configurator
                </span>
              </div>

              <h2 className="mt-5 max-w-[360px] text-[30px] font-[500] leading-[1.12] tracking-[0.01em] text-[#071426] lg:text-[36px]">
                Stel jouw <span className="font-[400] italic text-[#071426]/85">tv-wand</span> samen
              </h2>

              <p className="mt-4 max-w-[360px] text-[14px] leading-[1.65] tracking-[0.01em] text-[#071426]/55">
                Kies formaat, indeling en kleur en zie direct wat het kost. In een paar minuten klaar.
              </p>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryButton to="/configurator">Start de configurator</PrimaryButton>
                <Link
                  to="/producten"
                  className="group flex items-center gap-1.5 text-[13px] font-[500] tracking-[0.01em] text-[#071426]/80 transition hover:text-[#071426]"
                >
                  Bekijk voorbeelden
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ 5. marquee -------------------------------- */

const PRESS = [press1, press2, press3, press4, press5, press6];

function PressMarqueeSection() {
  const row = [...PRESS, ...PRESS];
  return (
    <section className="relative overflow-hidden bg-[#dfd7ce] py-10 md:py-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#dfd7ce] via-[#dfd7ce]/80 to-transparent md:w-56" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#dfd7ce] via-[#dfd7ce]/80 to-transparent md:w-56" />
      <div className="relative">
        <div className="flex w-max animate-[wandig-marquee_32s_linear_infinite] items-center gap-16 pr-16">
          {row.map((src, i) => (
            <Img
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

/* --------------------------- 6. waarom wij -------------------------------- */

const WHY_US_CARDS = [
  {
    badge: "100 dagen proefkijken",
    title: "KIJK HET RUSTIG AAN",
    subtitle: "Past hij toch niet helemaal bij je? Dan krijg je gewoon je geld terug.",
    bg: "bg-gradient-to-br from-[#ff9a6c] to-[#ef7027]",
    image: waaromWijBg.url,
  },
  {
    badge: "Ontworpen in Nederland",
    title: "VAN NEDERLANDSE BODEM",
    subtitle: "Slim ontworpen, stijlvol afgewerkt en gemaakt voor jarenlang kijkplezier.",
    bg: "bg-gradient-to-br from-[#c0b3a4] to-[#a55f3e]",
    image: waaromWijCraft.url,
  },
  {
    badge: "Eenvoudige klikmontage",
    title: "KLIK. HANG. KLAAR.",
    subtitle: "Dankzij het slimme kliksysteem staat jouw tv-meubel zo op zijn plek.",
    bg: "bg-gradient-to-br from-[#e8a87c] to-[#c4654a]",
    image: waaromWijMontage.url,
  },
  {
    badge: "Persoonlijk advies",
    title: "EVEN SAMEN KIJKEN",
    subtitle: "Twijfel je over de maat, kleur of opstelling? Wij denken graag met je mee.",
    bg: "bg-gradient-to-br from-[#c9b8a8] to-[#8b6a5a]",
    image: waaromWijService.url,
  },
];

function WhyUsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="bg-[#faf8f5] py-10 md:py-14">
      <div className="mx-auto max-w-[1456px] pl-5 pr-0 md:pl-10 md:pr-0">
        <div className="-mr-[calc((100vw-100%)/2)] overflow-hidden rounded-l-[20px] bg-[#ede7e0] py-4 pl-4 pr-0 md:py-6 md:pl-6 md:pr-0">
          <div
            ref={scrollerRef}
            className="flex min-w-0 flex-1 items-stretch snap-x snap-proximity gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
          >
            {/* vertical title */}
            <div className="flex shrink-0 snap-start snap-always items-start pt-2 md:pt-4">
              <span
                className="whitespace-nowrap text-[22px] font-[400] uppercase tracking-[0.03em] text-[#0f1f2a] md:text-[34px]"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Waarom wij
              </span>
            </div>

            {WHY_US_CARDS.map((card) => (
              <div
                key={card.badge}
                className={`group relative flex min-h-[420px] w-[85%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:w-[45%] md:min-h-[520px] md:w-[calc(31.25%-0.9375rem)] md:p-8 ${card.bg}`}
              >
                {card.image && (
                  <Img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-30" />

                <span className="relative z-10 w-fit rounded-full bg-white px-3.5 py-1.5 text-[11px] font-[500] uppercase tracking-[0.08em] text-[#0f1f2a]">
                  {card.badge}
                </span>

                <div className="relative z-10">
                  <h3 className="text-[24px] font-[500] leading-[1.15] tracking-[0.01em] text-white md:text-[30px]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[15px] font-[400] leading-relaxed text-white/85 md:text-[16px]">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollDots scrollRef={scrollerRef} className="mt-4 pr-5" />
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
    <section className="bg-[#faf8f6] py-10 md:py-14">
      <div className="mx-auto max-w-[1456px] px-5 md:px-10">
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
        className="mx-auto flex max-w-[1456px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

      <ScrollDots scrollRef={scrollerRef} className="mt-4" />
    </section>

  );
}

/* ------------------------ 8. gratis kleurstalen --------------------------- */

const SAMPLE_CARDS = [
  { name: "Donkereiken", image: swatchDonkereikenAsset.url },
  { name: "Walnootbruin", image: swatchWalnootbruin },
  { name: "Cashmeregrijs", image: cashmereAssetTmp.url },
  { name: "Kristalwit", image: kristalwitAssetTmp.url },
  { name: "Dofroze", image: swatchDofroze },
];

function ColorSamplesSection() {
  return (
    <section className="bg-gradient-to-b from-[#faf8f5] to-white py-10 md:py-14">
      <div className="mx-auto max-w-[1456px] px-5 md:px-10">
        <div className="flex overflow-hidden rounded-[32px] bg-[#ede7e0] md:rounded-[48px]">
          {/* vertical side label */}
          <div className="hidden w-14 items-center justify-center border-r border-[#d9d1c7] md:flex md:w-20">
            <span
              className="whitespace-nowrap text-[11px] font-[500] uppercase tracking-[0.3em] text-[#071426]/50"
              style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
            >
              Kleurstalen
            </span>
          </div>

          {/* main content */}
          <div className="flex flex-1 flex-col gap-8 p-6 md:flex-row md:items-center md:gap-12 md:p-10 lg:p-16">
            {/* copy */}
            <div className="flex flex-col justify-center space-y-4 md:w-1/2">
              <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">
                Gratis thuis
              </span>
              <h2 className="text-[26px] font-[600] leading-tight tracking-[0.01em] text-[#071426] md:text-[34px] lg:text-[40px]">
                Bestel gratis <br className="hidden md:block" />
                kleurstalen
              </h2>
              <p className="max-w-[420px] text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/70 md:text-[14px]">
                Twijfel je over de kleur? Bestel onze gratis kleurstalen en bekijk ze op je gemak thuis bij
                je eigen muur en lichtinval.
              </p>
              <div className="pt-2">
                <PrimaryButton to="/kleurstalen">Bestel gratis kleurstalen</PrimaryButton>
              </div>
            </div>

            {/* sample cards grid */}
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {SAMPLE_CARDS.map((card, i) => {
                  const isOffset = i === 1 || i === 3;
                  const isLast = i === SAMPLE_CARDS.length - 1;
                  return (
                    <div
                      key={card.name}
                      className={`overflow-hidden rounded-[16px] bg-white p-2 shadow-sm transition-transform duration-300 hover:-translate-y-1 md:p-3 ${
                        isOffset ? "mt-6" : ""
                      } ${isLast ? "col-span-1" : ""} ${
                        i === 3 ? "md:col-start-2" : ""
                      } ${i === 4 ? "md:col-start-3" : ""}`}
                    >
                      <div className="aspect-square overflow-hidden rounded-[12px]">
                        <Img
                          src={card.image}
                          alt={`Kleurstaal ${card.name}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-2 text-center text-[12px] font-[500] tracking-[0.01em] text-[#071426]">
                        {card.name}
                      </p>
                    </div>
                  );
                })}
              </div>
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
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1456px] px-5 md:px-10">
        <blockquote className="mx-auto max-w-[820px] text-center">
          <p className="text-[20px] font-[500] leading-[1.4] tracking-[0.01em] text-[#071426] md:text-[28px]">
            Wandig, dat is handig.
          </p>
        </blockquote>

        {/* asset slot: bedrijfsvideo */}
        <div className="mt-8 overflow-hidden rounded-[20px] bg-black md:mt-12">
          <LazyVideo
            src={werkplaatsVideo.url}
            poster={werkplaatsPoster.url}
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
    <section className="bg-white pt-8 pb-10 md:pt-12 md:pb-14">
      <div className="mx-auto max-w-[1456px] px-5 md:px-10">
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

      </div>
    </section>
  );
}


/* ---------------------------- 11. 4 benefits ------------------------------ */

function PuzzleImgIcon({ className }: { className?: string }) {
  return <Img src={puzzleIcon.url} alt="" className={className} />;
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
      <div className="mx-auto max-w-[1456px] px-5 py-6 md:px-10 md:py-14">
        {/* Mobile: horizontal marquee per benefit */}
        <div className="sm:hidden overflow-hidden">
          <div className="flex w-max animate-usp-marquee">
            {[...items, ...items].map(({ icon: Icon, label }, i) => (
              <div
                key={`${label}-${i}`}
                className="flex items-center justify-center gap-3 px-6"
                style={{ minWidth: "50vw" }}
              >
                <Icon className="h-5 w-5 shrink-0 text-[#0f1f2a]" strokeWidth={1.5} />
                <p className="text-[14px] font-normal leading-snug tracking-[0.01em] text-[#0f1f2a] whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: static 4-column bar */}
        <div className="hidden flex-col divide-y divide-[#e5e5e5] sm:flex sm:flex-row sm:divide-x sm:divide-y-0 sm:divide-[#e5e5e5]">
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
    <div className="overflow-x-clip bg-[#faf8f5]">
      <HeroSection />
      <HeroBenefitsSection />
      <ProductCarouselSection />
      <ConfiguratorBannerSection />
      <WhyUsSection />
      <PressMarqueeSection />
      <CustomerGallerySection />

      <ReviewsSection />
      <ColorSamplesSection />
      <FaqContactSection />
      <QuoteVideoSection />
      <TrustBannerSection />
    </div>
  );
}
