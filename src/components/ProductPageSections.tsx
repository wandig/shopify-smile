import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef, type ReactNode } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { PaymentOptionsBadges } from "@/components/PaymentOptionsBadges";
import { FreeColorSamples } from "@/components/FreeColorSamples";
import { FULL_HOUSE_COLORS, displayWandigColor, wandigSwatchStyle } from "@/lib/wandig-colors";
import { FULL_HOUSE_FRONT_IMAGES, WandigSpecPreview } from "@/components/WandigModulePreview";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { WANDIG_SIZES, formatCm, wandigWidth } from "@/lib/wandig-dimensions";
import { SpecificationsSection, UniqueSection, BeforeAfterSection } from "@/components/ProductStorySections";

import { Loader2, ChevronRight, ChevronLeft, ChevronDown, Plus, Star, Hammer, ShieldCheck, ShoppingBag, Truck, Plug, Phone, Headphones, Mail, Monitor, User, ArrowRight, Shield, Moon, CalendarClock, SlidersHorizontal } from "lucide-react";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import productStoryBlackOakOrangeImg from "@/assets/product-story-black-oak-orange.jpg";
import wandigLogoWhite from "@/assets/wandig-logo-white.png";
import fullHouseGalleryMain from "@/assets/full-house-gallery-main-cropped.png";
import fullHouseGalleryRoom from "@/assets/full-house-gallery-room.jpg";
import fullHouseGalleryStylingOne from "@/assets/full-house-gallery-styling-one.webp";
import fullHouseGalleryStylingTwo from "@/assets/full-house-gallery-styling-two.webp";
import fullHouseGalleryFinish from "@/assets/full-house-gallery-finish.webp";
import fullHouseGalleryStorage from "@/assets/full-house-gallery-storage.webp";
import fullHouseGalleryUse from "@/assets/full-house-gallery-use.webp";
import beforeFullHouseAsset from "@/assets/before-livingroom.png.asset.json";
import afterFullHouseAsset from "@/assets/after-livingroom.jpg.asset.json";
import basketIcon from "@/assets/basket-icon.svg.asset.json";
import puzzleIcon from "@/assets/Untitled_design_23.svg.asset.json";
import dutchDesignIcon from "@/assets/dutch-design-icon.svg.asset.json";
import puzzlePiecesImg from "@/assets/puzzle-pieces.png.asset.json";
import plugAndPlayIcon from "@/assets/plug-and-play-icon.svg.asset.json";
import warrantyIcon from "@/assets/warranty-icon.svg.asset.json";
import kijkplezierIcon from "@/assets/100-dagen-icon.svg.asset.json";
import cinewallSchema from "@/assets/cinewall-schema-fullhouse.png.asset.json";
import ontworpenInNederlandImg from "@/assets/ontworpen-in-nederland-v2.png.asset.json";
import kabelsUitZichtImg from "@/assets/kabels-uit-zicht.png.asset.json";
import kabelsUitZichtV2Img from "@/assets/kabels-uit-zicht-v2.png.asset.json";
import kabelsUitZichtV3Img from "@/assets/kabels-uit-zicht-v3.png.asset.json";
import eenvoudigeKlikmontageImg from "@/assets/eenvoudige-klikmontage.png.asset.json";
import persoonlijkAdviesImg from "@/assets/persoonlijk-advies.png.asset.json";
import proefkijkenImg from "@/assets/100-dagen-proefkijken.png.asset.json";
import garantieCinewallImg from "@/assets/garantie-cinewall.png.asset.json";
import stijlvolleKleurenImg from "@/assets/stijlvolle-kleuren-v2.png.asset.json";
import eenvoudigeMontageDetailImg from "@/assets/eenvoudige-montage-detail.png.asset.json";
import eenvoudigeMontageV2Img from "@/assets/eenvoudige-montage-v2.png.asset.json";
import onderhoudsvriendelijkImg from "@/assets/onderhoudsvriendelijk.png.asset.json";
import onderhoudsvriendelijkV2Img from "@/assets/onderhoudsvriendelijk-v2.png.asset.json";
import pushToOpenImg from "@/assets/push-to-open.png.asset.json";
import hoogwaardigeKwaliteitImg from "@/assets/hoogwaardige-kwaliteit.png.asset.json";
import hoogwaardigeKwaliteitV2Img from "@/assets/hoogwaardige-kwaliteit-v2.png.asset.json";
import hoogwaardigeKwaliteitV3Img from "@/assets/hoogwaardige-kwaliteit-v3.png.asset.json";
import hoogwaardigeKwaliteitV4Img from "@/assets/hoogwaardige-kwaliteit-v4.png.asset.json";
import kabelsUitZichtV4Img from "@/assets/kabels-uit-zicht-v4.png.asset.json";
import kabelsUitZichtVoordelenImg from "@/assets/kabels-uit-zicht-voordelen.png.asset.json";
import kabelsUitZichtVoordelenUploadImg from "@/assets/kabels-uit-zicht-voordelen-upload.png.asset.json";
import klantWoonkamer1Img from "@/assets/klant-woonkamer-1.png.asset.json";
import klantWoonkamer2Img from "@/assets/klant-woonkamer-2.png.asset.json";
import eenvoudigeKlikmontageUploadImg from "@/assets/eenvoudige-klikmontage-upload.png.asset.json";
import persoonlijkAdviesUploadImg from "@/assets/persoonlijk-advies-upload.png.asset.json";
import proefkijkenUploadImg from "@/assets/proefkijken-upload.png.asset.json";
import garantieUploadImg from "@/assets/garantie-upload.png.asset.json";
import klantWoonkamer3Img from "@/assets/klant-woonkamer-3.png.asset.json";
import klantWoonkamer4Img from "@/assets/klant-woonkamer-4.png.asset.json";
import klantWoonkamer5_2Img from "@/assets/klant-woonkamer-5-2.png.asset.json";
import klantWoonkamer6Img from "@/assets/klant-woonkamer-6.png.asset.json";
import klantWoonkamer7Img from "@/assets/klant-woonkamer-7.png.asset.json";
import klantWoonkamer8Img from "@/assets/klant-woonkamer-8.png.asset.json";
import klantWoonkamer9Img from "@/assets/klant-woonkamer-9.png.asset.json";
import klantWoonkamer10Img from "@/assets/klant-woonkamer-10.png.asset.json";
import gebouwdOmMeeTeGaan1Img from "@/assets/gebouwd-om-mee-te-gaan-1.png.asset.json";
import plugPlayGeleverdV2Img from "@/assets/plug-play-geleverd-v2.png.asset.json";
import proefkijkenBgImg from "@/assets/100-dagen-proefkijken-bg.jpg.asset.json";
import proefkijkenBgV2Img from "@/assets/100-dagen-proefkijken-bg-v2.png.asset.json";
import dutchDesignBgImg from "@/assets/dutch-design-voor-aan-de-muur-bg.png.asset.json";
export function PuzzleCornerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.5 0 2.7 1.2 2.7 2.7S5 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
    </svg>
  );
}

export type GalleryImage = { src: string; alt: string };
export const GALLERY_IMG = (id: string, alt: string): GalleryImage => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`,
  alt,
});

// Each column is either one tall image or a stack of two.
export const CUSTOMER_GALLERY_COLUMNS: Array<{
  width: string;
  items: GalleryImage[];
}> = [
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


export function CustomerGallerySection({ firstImageSrc }: { firstImageSrc?: string } = {}) {
  const columns = firstImageSrc
    ? CUSTOMER_GALLERY_COLUMNS.map((col, i) =>
        i === 0
          ? { ...col, items: col.items.map((it, j) => (j === 0 ? { ...it, src: firstImageSrc } : it)) }
          : col,
      )
    : CUSTOMER_GALLERY_COLUMNS;

  return (
    <section className="mt-12 md:mt-20">
      <div className="mb-6 md:mb-8">
        <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
          Binnenkijken bij onze klanten
        </h2>
        <p className="mt-2 text-[13px] md:text-[14px] text-[#071426]/55">
          Echte interieurs, echte inspiratie. Gemaakt door onze klanten.
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto scrollbar-hide md:mx-0">
        <div className="flex h-[420px] gap-3 px-4 md:h-[560px] md:gap-4 md:px-0">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className={`flex h-full shrink-0 flex-col gap-3 md:gap-4 ${col.width}`}>
              {col.items.map((image, i) => (
                <figure
                  key={i}
                  className="group relative min-h-0 flex-1 overflow-hidden rounded-[14px]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Bestel Full House"
                    className="group/pill absolute bottom-2 left-2 flex h-7 items-center gap-0 rounded-full bg-[#ff843a] pl-1 pr-1 text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[padding,gap] duration-300 ease-out hover:gap-2 hover:pl-3 hover:pr-2 md:bottom-3 md:left-3 md:h-8"
                  >
                    <span className="grid max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-[330] leading-none tracking-[0.04em] transition-[max-width,opacity] duration-300 ease-out opacity-0 group-hover/pill:max-w-[180px] group-hover/pill:opacity-100 md:text-[13px]">
                      Bestel Full House
                    </span>
                    <span className="pill-shimmer relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff843a] text-white md:h-6 md:w-6">
                      <PuzzleCornerIcon className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/pill:rotate-90 md:h-4 md:w-4" />
                    </span>
                  </button>

                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>



    </section>
  );
}


export const BUILT_TO_LAST_CARDS: Array<{
  eyebrow: string;
  title: string;
  body: string;
  bg: string;
  tone: "light" | "dark";
  imageUrl?: string;
  textColor?: string;
  bodyMaxWidth?: string;
}> = [
  {
    eyebrow: "Gemaakt om te blijven",
    title: "10 jaar garantie\nop jouw tv-kast.",
    body: "Ontworpen voor jarenlang dagelijks gebruik, zonder dat je je zorgen hoeft te maken.",
    bg: "#f0e4d5",
    tone: "light",
    imageUrl: gebouwdOmMeeTeGaan1Img.url,
    textColor: "#071426",
  },
  {
    eyebrow: "Zo staat hij",
    title: "Plug-and-play\ngemonteerd.",
    body: "Slim voorbereid en\neenvoudig in elkaar te zetten,\nzonder ingewikkeld maatwerk.",
    bg: "#c0b3a4",
    tone: "light",
    imageUrl: plugPlayGeleverdV2Img.url,
    bodyMaxWidth: "180px",
  },
  {
    eyebrow: "Kijk het rustig aan",
    title: "100 dagen\nproefkijken.",
    body: "Ervaar thuis of jouw nieuwe tv-kast echt bij je interieur past.",
    bg: "#a55f3e",
    tone: "dark",
    imageUrl: proefkijkenBgV2Img.url,
    bodyMaxWidth: "120px",
  },
  {
    eyebrow: "Van Nederlandse bodem",
    title: "Dutch Design\nvoor aan de muur.",
    body: "Rustig vormgegeven in Nederland, met aandacht voor ieder detail.",
    bg: "#936850",
    tone: "dark",
    imageUrl: dutchDesignBgImg.url,
    bodyMaxWidth: "170px",
  },
];

export const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "Wat zijn de afmetingen van de cinewall?",
    answer: "De Wandig Full House is 240 cm breed, 180 cm hoog en 32 cm diep. Het centrale tv-vlak is geschikt voor televisies tot 80 inch.",
  },
  {
    question: "Past mijn soundbar in de cinewall?",
    answer: "Ja, de open vakken en het ruime ontwerp bieden genoeg plaats voor een soundbar, media-apparatuur en accessoires.",
  },
  {
    question: "Is mijn muur geschikt voor een cinewall?",
    answer: "De cinewall is geschikt voor de meeste vlakke, draagkrachtige muren. Bij twijfel kun je gratis contact opnemen met ons adviesteam.",
  },
  {
    question: "Hoe bestel ik een kleurstaal?",
    answer: "Je kunt eenvoudig gratis kleurstalen aanvragen via onze website. Zo zie je thuis precies hoe de afwerking bij jouw interieur past.",
  },
  {
    question: "Wanneer staat mijn cinewall in huis?",
    answer: "Na bestelling is de levertijd gemiddeld 7 tot 14 werkdagen. We plannen samen met jou een dag en tijdslot voor bezorging.",
  },
  {
    question: "Hoe wordt de cinewall aan de muur bevestigd?",
    answer: "De cinewall wordt geleverd inclusief bevestigingsmateriaal en een duidelijke handleiding. De muurbeugels zijn speciaal ontworpen voor een veilige montage.",
  },
  {
    question: "Hoe bevestig ik mijn tv in de cinewall?",
    answer: "Je tv wordt gemonteerd met een VESA-compatibele wandsteun op het centrale tv-vlak. De steun zelf is niet inbegrepen.",
  },
  {
    question: "Hoe sluit ik mijn apparatuur netjes aan?",
    answer: "De achterwand heeft een kabeldoorvoer, zodat alle kabels uit het zicht lopen en je interieur rustig blijft ogen.",
  },
  {
    question: "Kan ik de cinewall zelf monteren?",
    answer: "Ja, de cinewall wordt in voorgemonteerde modules geleverd. Met de meegeleverde klikverbindingen zet je hem in gemiddeld 45 minuten samen.",
  },
  {
    question: "Lukt de montage ook in mijn eentje?",
    answer: "We raden aan om de montage met twee personen te doen, vooral bij het optillen en uitlijnen van de grotere modules.",
  },
  {
    question: "Heb ik speciaal gereedschap nodig?",
    answer: "Nee, voor de montage heb je alleen basisgereedschap zoals een schroevendraaier en een boormachine nodig.",
  },
  {
    question: "Hoeveel jaar garantie krijg ik?",
    answer: "Op de Wandig Full House krijg je 10 jaar garantie. Zo geniet je jarenlang zorgeloos van jouw nieuwe tv-wand.",
  },
];

export function BuiltToLastSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const movedRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    el.scrollLeft = dragStartScrollRef.current - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const el = scrollerRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="bg-gradient-to-b from-[#faf8f5] to-white pt-12 md:pt-20 pb-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-6 text-center md:mb-10">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
            Gebouwd om mee te gaan
          </h2>
        </div>

        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className={`-mx-5 flex gap-3 overflow-x-auto scrollbar-hide px-5 md:mx-0 md:gap-4 md:px-0 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {BUILT_TO_LAST_CARDS.map((card, i) => (
            <article
              key={i}
              className="relative shrink-0 overflow-hidden rounded-[18px] w-[280px] h-[280px] md:w-[360px] md:h-[360px]"
              style={{ scrollSnapAlign: "start", backgroundColor: card.bg }}
            >
              {card.imageUrl && (
                <img
                  src={card.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div
                className={`relative flex h-full flex-col p-6 md:p-7 ${
                  card.textColor
                    ? ""
                    : card.tone === "light"
                      ? "text-[#071426]"
                      : "text-white"
                }`}
                style={{ color: card.textColor }}
              >
                <div
                  className="text-[12px] md:text-[13px] font-normal"
                  style={{ color: card.textColor, opacity: card.textColor ? 1 : undefined }}
                >
                  {card.eyebrow}
                </div>
                <h3 className="mt-2 whitespace-pre-line text-[18px] md:text-[22px] font-bold leading-[1.15]">
                  {card.title}
                </h3>
                <p
                  className="mt-3 max-w-[240px] text-[13px] md:text-[14px] leading-relaxed font-light"
                  style={{ color: card.textColor, opacity: card.textColor ? 1 : undefined, maxWidth: card.bodyMaxWidth }}
                >
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  const mid = Math.ceil(FAQ_ITEMS.length / 2);
  const leftItems = FAQ_ITEMS.slice(0, mid);
  const rightItems = FAQ_ITEMS.slice(mid);

  const renderItem = (
    item: { question: string; answer: string },
    i: number,
    isRight: boolean
  ) => {
    const isOpen = isRight ? openRight === i : openLeft === i;
    const setOpen = isRight ? setOpenRight : setOpenLeft;
    return (
      <div
        key={`${isRight ? "r" : "l"}-${i}`}
        className="rounded-[14px] bg-[#faf8f5] p-4 md:p-5"
      >
        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : i)}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        >
          <span className="text-[14px] font-[500] leading-snug text-[#071426] md:text-[15px]">
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
            <div className="pt-3 text-[13px] leading-relaxed text-[#071426]/65 md:text-[14px]">
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white pb-12 pt-0 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-6 text-center md:mb-10">
          <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">FAQ</span>
          <h2 className="mt-2 text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
            Veelgestelde vragen
          </h2>
          <p className="mt-2 text-[13px] md:text-[14px] text-[#071426]/55">
            Alles wat je wilt weten over onze cinewalls.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <div className="flex flex-1 flex-col gap-3 md:gap-4">
            {leftItems.map((item, i) => renderItem(item, i, false))}
          </div>
          <div className="flex flex-1 flex-col gap-3 md:gap-4">
            {rightItems.map((item, i) => renderItem(item, i, true))}
          </div>
        </div>
      </div>
    </section>
  );
}

export type ReviewItem = { name: string; location: string; rating: number; title: string; body: string; date: string; days: number };

export const REVIEWS: ReviewItem[] = [
  { name: "Sanne V.", location: "Utrecht", rating: 5, title: "Kwaliteit is top", body: "De Full House staat prachtig in onze woonkamer. Afwerking is echt perfect en de montage was zo gepiept.", date: "3 weken geleden", days: 21 },
  { name: "Jeroen B.", location: "Amsterdam", rating: 5, title: "Meer dan verwacht", body: "Bestelling verliep soepel en levering was op tijd. De kast oogt luxer dan op de foto's.", date: "1 maand geleden", days: 32 },
  { name: "Lisa D.", location: "Den Haag", rating: 5, title: "Fantastisch meubel", body: "Onze woonkamer is compleet veranderd. Kabels netjes weggewerkt en de soundbar past perfect.", date: "1 maand geleden", days: 38 },
  { name: "Mark H.", location: "Rotterdam", rating: 4, title: "Mooi en stevig", body: "Zeer tevreden over de kwaliteit. Montage duurde iets langer dan verwacht maar het resultaat is top.", date: "2 maanden geleden", days: 55 },
  { name: "Eva K.", location: "Eindhoven", rating: 5, title: "Precies wat we zochten", body: "De kleurstalen thuis waren super handig. Uiteindelijk gekozen voor donkereiken, ziet er warm en tijdloos uit.", date: "2 maanden geleden", days: 62 },
  { name: "Tom S.", location: "Groningen", rating: 5, title: "Klantenservice top", body: "Had een vraag over de afmetingen en werd direct geholpen. Aanrader!", date: "2 maanden geleden", days: 68 },
  { name: "Anouk M.", location: "Breda", rating: 5, title: "Design meubel", body: "Ziet er echt uit als een designstuk. Vrienden vragen meteen waar we hem vandaan hebben.", date: "3 maanden geleden", days: 88 },
  { name: "Rick J.", location: "Nijmegen", rating: 4, title: "Solide en netjes", body: "Kwaliteit is prima, prijs is eerlijk. Levertijd was 10 dagen, precies zoals aangegeven.", date: "3 maanden geleden", days: 95 },
  { name: "Fleur P.", location: "Haarlem", rating: 5, title: "Zo blij mee", body: "De tv-wand maakt onze woonkamer af. Zelfmontage was verrassend makkelijk met z'n tweeën.", date: "4 maanden geleden", days: 120 },
  { name: "Bas W.", location: "Zwolle", rating: 5, title: "Strak en tijdloos", body: "De cinewall past precies zoals we hoopten. De open vakken zijn ideaal voor onze apparatuur.", date: "4 maanden geleden", days: 128 },
  { name: "Ilse R.", location: "Tilburg", rating: 4, title: "Fijne aankoop", body: "Levering ging netjes en de bezorgers waren vriendelijk. Kleine kras op een paneel werd direct opgelost.", date: "5 maanden geleden", days: 150 },
  { name: "Peter K.", location: "Almere", rating: 5, title: "Alles klopt", body: "Van advies tot montage: alles liep soepel. De kabeldoorvoer werkt perfect.", date: "5 maanden geleden", days: 158 },
  { name: "Nadia el A.", location: "Arnhem", rating: 5, title: "Woonkamer af", body: "Precies het rustige beeld dat we zochten. De tv lijkt nu deel van de wand.", date: "6 maanden geleden", days: 180 },
  { name: "Sven D.", location: "Leiden", rating: 3, title: "Mooi, montage kost tijd", body: "Het resultaat is prachtig, maar reken wel op een middag met twee personen.", date: "6 maanden geleden", days: 188 },
  { name: "Judith H.", location: "Apeldoorn", rating: 5, title: "Prachtige afwerking", body: "De matte afwerking is echt mooi en makkelijk schoon te houden.", date: "7 maanden geleden", days: 210 },
  { name: "Wouter M.", location: "Delft", rating: 5, title: "Slim doordacht", body: "Voorgemonteerde modules klikken netjes in elkaar. Weinig gepuzzel.", date: "7 maanden geleden", days: 220 },
  { name: "Karin B.", location: "Amersfoort", rating: 4, title: "Goede prijs-kwaliteit", body: "Voor deze kwaliteit een eerlijke prijs. Zou hem opnieuw kopen.", date: "8 maanden geleden", days: 245 },
  { name: "Dennis vd V.", location: "Maastricht", rating: 5, title: "Iedereen vraagt ernaar", body: "Complimenten van alle bezoekers. Ziet echt uit als maatwerk.", date: "9 maanden geleden", days: 275 },
];

export const REVIEW_TOTAL = 1042;
export const REVIEW_DISTRIBUTION: Array<{ stars: number; count: number }> = [
  { stars: 5, count: 798 },
  { stars: 4, count: 178 },
  { stars: 3, count: 41 },
  { stars: 2, count: 15 },
  { stars: 1, count: 10 },
];
export const REVIEW_AVERAGE =
  Math.round(
    (REVIEW_DISTRIBUTION.reduce((sum, d) => sum + d.stars * d.count, 0) / REVIEW_TOTAL) * 10,
  ) / 10;

export const REVIEW_SORTS = [
  { value: "relevant", label: "Meest relevant" },
  { value: "newest", label: "Nieuwste eerst" },
  { value: "highest", label: "Hoogste score" },
  { value: "lowest", label: "Laagste score" },
] as const;

export const REVIEWS_PER_PAGE = 4;

export function ReviewStars({ rating, className = "h-3.5 w-3.5" }: { rating: number; className?: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < rating ? "fill-[#ef7027] text-[#ef7027]" : "fill-[#e5ded4] text-[#e5ded4]"}`}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const [sort, setSort] = useState<(typeof REVIEW_SORTS)[number]["value"]>("relevant");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const list = [...REVIEWS];
    if (sort === "newest") return list.sort((a, b) => a.days - b.days);
    if (sort === "highest") return list.sort((a, b) => b.rating - a.rating || a.days - b.days);
    if (sort === "lowest") return list.sort((a, b) => a.rating - b.rating || a.days - b.days);
    return list;
  }, [sort]);

  const pageCount = Math.ceil(sorted.length / REVIEWS_PER_PAGE);
  const visible = sorted.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);
  const activeSortLabel = REVIEW_SORTS.find((s) => s.value === sort)?.label ?? "Meest relevant";

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount));
    document.getElementById("klantbeoordelingen")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="klantbeoordelingen" className="scroll-mt-24 bg-[#fff7ef] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Score-overzicht */}
        <div className="text-center">
          <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">Reviews</span>
          <h2 className="mt-2 text-[22px] font-bold leading-tight text-[#071426] md:text-[26px]">
            Klantbeoordelingen
          </h2>
          <p className="mt-6 text-[38px] font-bold leading-none text-[#ef7027] md:text-[46px]">
            {REVIEW_AVERAGE.toLocaleString("nl-NL", { minimumFractionDigits: 1 })}
          </p>
          <div className="mt-3 flex justify-center">
            <ReviewStars rating={Math.round(REVIEW_AVERAGE)} className="h-5 w-5" />
          </div>
          <p className="mt-3 text-[12px] text-[#071426]/50 md:text-[13px]">
            Gebaseerd op {REVIEW_TOTAL.toLocaleString("nl-NL")} beoordelingen
          </p>
        </div>

        {/* Staafdiagram */}
        <div className="mx-auto mt-7 flex max-w-[420px] flex-col gap-2">
          {REVIEW_DISTRIBUTION.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="flex w-[26px] shrink-0 items-center justify-end gap-1 text-[11px] text-[#071426]/60">
                {d.stars}
                <Star className="h-3 w-3 fill-[#ef7027] text-[#ef7027]" strokeWidth={0} />
              </span>
              <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#e7ddd1]">
                <span
                  className="block h-full rounded-full bg-[#ef7027] transition-[width] duration-700 ease-out"
                  style={{ width: `${(d.count / REVIEW_TOTAL) * 100}%` }}
                />
              </span>
              <span className="w-[42px] shrink-0 text-right text-[11px] text-[#071426]/50 tabular-nums">
                {d.count.toLocaleString("nl-NL")}
              </span>
            </div>
          ))}
        </div>

        {/* Sorteren */}
        <div className="mt-9 flex justify-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              aria-expanded={sortOpen}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-[#e0d5c8] bg-white px-5 py-2.5 text-[13px] text-[#071426] transition hover:border-[#ef7027]"
            >
              {activeSortLabel}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute left-1/2 z-20 mt-2 w-[200px] -translate-x-1/2 overflow-hidden rounded-[14px] border border-[#eee4dc] bg-white shadow-[0_10px_30px_rgba(42,31,22,0.12)]">
                {REVIEW_SORTS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      setSort(s.value);
                      setPage(1);
                      setSortOpen(false);
                    }}
                    className={`block w-full cursor-pointer px-4 py-2.5 text-left text-[13px] transition hover:bg-[#fff7ef] ${
                      s.value === sort ? "text-[#ef7027]" : "text-[#071426]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviewlijst */}
        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-4">
          {visible.map((r) => (
            <article
              key={`${r.name}-${r.days}`}
              className="overflow-hidden rounded-[14px] border border-[#eee4dc] bg-white"
            >
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1e8de] px-5 py-3.5">
                <div className="flex items-center gap-2.5 text-[13px]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f3ddc9] bg-white text-[#ef7027]">
                    <User className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="font-[500] text-[#071426]">{r.name}</span>
                  <span className="text-[#e0d5c8]">|</span>
                  <span className="text-[#071426]/45">Geverifieerde koper</span>
                </div>
                <span className="text-[12px] text-[#071426]/40">{r.date}</span>
              </header>
              <div className="px-5 py-4">
                <ReviewStars rating={r.rating} />
                <h3 className="mt-3 text-[15px] font-[500] text-[#071426]">{r.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#071426]/65 md:text-[14px]">{r.body}</p>
                <p className="mt-4 text-[11px] text-[#071426]/40">
                  Beoordeeld product: <span className="text-[#071426]/70">Full House</span> · {r.location}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Paginering */}
        {pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Vorige pagina"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] text-[#071426]/50 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i + 1)}
                aria-current={page === i + 1}
                className={`h-9 w-9 cursor-pointer rounded-[10px] text-[13px] transition ${
                  page === i + 1
                    ? "bg-[#ef7027] font-[500] text-white"
                    : "text-[#071426]/60 hover:bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === pageCount}
              aria-label="Volgende pagina"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] text-[#071426]/50 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}





export function NewsletterContactSection() {
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
      const res = await subscribeNewsletter({ data: { email: trimmed, source: "product-page" } });
      setStatus("success");
      setMessage(res.alreadySubscribed ? "Je bent al ingeschreven — bedankt!" : "Bedankt! Je bent ingeschreven.");
      setEmail("");
      setAcceptedTerms(false);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    }
  };

  const contactItems = [
    { icon: Phone, label: "Bel ons, steun 9-5", sub: "9:00 - 18:00", value: "+31 085 107 1953" },
    { icon: Headphones, label: "Chat live, agent 9-5", sub: "9:00 - 22:00", value: "Chat met ons" },
    { icon: Mail, label: "Stuur een mail", sub: "iedere werkdag", value: "support.nl@wandig.com" },
  ];

  return (
    <section className="bg-[#ede7e0]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[22px] font-bold leading-[1.25] tracking-[0.01em] text-[#071426] md:text-[26px]">
              Meld je aan voor<br className="hidden sm:block" /> onze nieuwsbrief
            </h2>
            <p className="mt-3 max-w-[380px] text-[13px] leading-relaxed tracking-[0.01em] text-[#071426]/70 md:text-[14px]">
              Blijf op de hoogte van de nieuwste updates, tips en een exclusieve aanbiedingen.
            </p>

            <form onSubmit={onSubmit} className="mt-6 max-w-[430px]" noValidate>
              <div className="flex overflow-hidden rounded-[8px] border border-[#e7ded4] bg-white">
                <label htmlFor="newsletter-email" className="sr-only">E-mailadres</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                  placeholder="Voer je e-mailadres in"
                  className="h-[46px] min-w-0 flex-1 bg-white px-4 text-[14px] tracking-[0.01em] text-[#071426] placeholder:text-[#071426]/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#ef7027] px-5 text-[14px] font-[500] tracking-[0.03em] text-white transition hover:brightness-95 disabled:opacity-60"
                >
                  {status === "loading" ? "Bezig..." : (
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
                  onChange={(e) => { setAcceptedTerms(e.target.checked); if (status !== "idle") setStatus("idle"); }}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-[#cdc0b5] text-[#ef7027] focus:ring-[#ef7027]"
                />
                <span className="text-[13px] leading-snug tracking-[0.01em] text-[#071426]/75">
                  Ik accepteer de voorwaarden.{" "}
                  <a href="/privacy-policy" className="underline decoration-[#071426]/40 underline-offset-2 transition hover:text-[#ef7027] hover:decoration-[#ef7027]">
                    Privacyverklaring
                  </a>
                </span>
              </label>
              {message && (
                <p className={`mt-3 text-[13px] tracking-[0.01em] ${status === "success" ? "text-[#2d6a3e]" : "text-[#b3341c]"}`}>{message}</p>
              )}
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {contactItems.map(({ icon: Icon, label, sub, value }) => (
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
                <p className="mt-4 break-words text-[15px] font-bold leading-tight tracking-[0.01em] text-[#071426]">{value}</p>
                <div className="mt-3 h-px w-full bg-[#071426]/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


export function ShieldOnlyIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <div className={className}>
      <Shield className="h-full w-full" strokeWidth={strokeWidth} />
    </div>
  );
}

export function ShieldMoonIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <Shield className="h-full w-full" strokeWidth={strokeWidth} />
        <Moon className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2" strokeWidth={strokeWidth} />
      </div>
    </div>
  );
}

export function PuzzleIcon({ className }: { className?: string; strokeWidth?: number }) {
  return <img src={puzzleIcon.url} alt="" className={className} />;
}

export function TrustBannerSection() {
  const items = [
    { icon: ShieldOnlyIcon, label: "4,7/5 klantbeoordeling" },
    { icon: Truck, label: "Gratis levering & retourneren" },
    { icon: CalendarClock, label: "100 dagen proefkijken" },
    { icon: PuzzleIcon, label: "10 jaar garantie" },
  ];

  return (
    <section className="bg-[#ffffff]">
      <div className="mx-auto max-w-[1400px] px-5 py-6 md:px-10 md:py-8">
        <div className="flex flex-col divide-y divide-[#e5e5e5] sm:flex-row sm:divide-y-0 sm:divide-x sm:divide-[#e5e5e5]">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-1 items-center justify-center gap-3 py-4 sm:px-4 sm:py-0"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#0f1f2a]" strokeWidth={1.5} />
              <p className="text-[14px] font-normal leading-snug text-[#0f1f2a]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





