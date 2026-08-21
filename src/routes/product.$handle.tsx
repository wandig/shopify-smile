import { Img } from "@/components/Img";
import { optimizeImageUrl } from "@/lib/asset-image";
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
import beforeSoloAsset from "@/assets/before-solo.png.asset.json";
import afterSoloAsset from "@/assets/after-solo.jpg.asset.json";
import {
  CustomerGallerySection,
  BuiltToLastSection,
  FaqSection,
  ReviewsSection,
  NewsletterContactSection,
  TrustBannerSection,
  PuzzleCornerIcon,
} from "@/components/ProductPageSections";

import { Loader2, ChevronRight, ChevronLeft, ChevronDown, Plus, Star, Hammer, ShieldCheck, ShoppingBag, Truck, Plug, Phone, Headphones, Mail, Monitor, User, ArrowRight, Shield, Moon, CalendarClock, SlidersHorizontal, Ruler, MoveHorizontal, MoveVertical } from "lucide-react";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import productStoryBlackOakOrangeImg from "@/assets/product-story-black-oak-orange.jpg";
import wandigLogoWhite from "@/assets/wandig-logo-white.png";
import fullHouseGalleryMainAsset from "@/assets/full-house-closed-front-v10.png.asset.json";
const fullHouseGalleryMain = fullHouseGalleryMainAsset.url;
import fullHouseWalnoot7785Asset from "@/assets/full-house-walnoot-77-85.png.asset.json";
const fullHouseWalnoot7785 = fullHouseWalnoot7785Asset.url;
import fullHouseWalnoot7075Asset from "@/assets/full-house-walnoot-70-75.png.asset.json";
const fullHouseWalnoot7075 = fullHouseWalnoot7075Asset.url;
import fullHouseWalnoot4055Asset from "@/assets/full-house-walnoot-40-55.png.asset.json";
const fullHouseWalnoot4055 = fullHouseWalnoot4055Asset.url;
import fullHouseDonkerEiken7785Asset from "@/assets/full-house-donkereiken-77-85.png.asset.json";
const fullHouseDonkerEiken7785 = fullHouseDonkerEiken7785Asset.url;
import fullHouseDonkerEiken7075Asset from "@/assets/full-house-donkereiken-70-75.png.asset.json";
const fullHouseDonkerEiken7075 = fullHouseDonkerEiken7075Asset.url;
import fullHouseDonkerEiken5865Asset from "@/assets/full-house-donkereiken-58-65.png.asset.json";
const fullHouseDonkerEiken5865 = fullHouseDonkerEiken5865Asset.url;
import fullHouseDonkerEiken4055Asset from "@/assets/full-house-donkereiken-40-55.png.asset.json";
const fullHouseDonkerEiken4055 = fullHouseDonkerEiken4055Asset.url;
import fullHouseCashmere7785Asset from "@/assets/full-house-cashmeregrijs-77-85.png.asset.json";
const fullHouseCashmere7785 = fullHouseCashmere7785Asset.url;
import fullHouseCashmere7785OpenAsset from "@/assets/full-house-cashmeregrijs-77-85-open.png.asset.json";
const fullHouseCashmere7785Open = fullHouseCashmere7785OpenAsset.url;
import fullHouseCashmere7075Asset from "@/assets/full-house-cashmeregrijs-70-75.png.asset.json";
const fullHouseCashmere7075 = fullHouseCashmere7075Asset.url;
import fullHouseCashmere7075OpenAsset from "@/assets/full-house-cashmeregrijs-70-75-open.png.asset.json";
const fullHouseCashmere7075Open = fullHouseCashmere7075OpenAsset.url;
import fullHouseWalnoot5865Asset from "@/assets/full-house-walnoot-58-65.png.asset.json";
const fullHouseWalnoot5865 = fullHouseWalnoot5865Asset.url;
import fullHouseGalleryRoomAsset from "@/assets/full-house-gallery-room.jpg.asset.json";
const fullHouseGalleryRoom = fullHouseGalleryRoomAsset.url;
import fullHouseGalleryStylingOne from "@/assets/full-house-gallery-styling-one.webp";
import fullHouseGalleryStylingTwo from "@/assets/full-house-gallery-styling-two.webp";
import fullHouseGalleryFinish from "@/assets/full-house-gallery-finish.webp";
import fullHouseGalleryStorage from "@/assets/full-house-gallery-storage.webp";
import fullHouseGalleryUse from "@/assets/full-house-gallery-use.webp";
import beforeFullHouseAsset from "@/assets/before-livingroom.png.asset.json";
import afterFullHouseAsset from "@/assets/after-livingroom.jpg.asset.json";
import soloWoonkamerLampAsset from "@/assets/solo-woonkamer-lamp.jpeg.asset.json";
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







export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `Wandig ${params.handle.charAt(0).toUpperCase() + params.handle.slice(1)} — Plug & play cinewall` },
      { name: "description", content: `Bekijk de Wandig ${params.handle} cinewall. Plug & play gemaakt in onze werkplaats.` },
    ],
  }),
  component: ProductPage,
});

type ProductNode = ShopifyProduct["node"];

type GalleryItem = { src: string; alt: string; full?: boolean; square?: boolean };

/** Mobiele swipe-galerij met snap-scroll, puntjes-indicator en maatlint. */
function DimensionRuler({
  widthLabel,
  heightLabel,
  open,
  onToggle,
}: {
  widthLabel: string;
  heightLabel: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pointer-events-none absolute bottom-3 left-0 z-20 flex items-center">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label="Afmetingen bekijken"
        className="pointer-events-auto relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ef7027]/25 bg-white/95 text-[#ef7027] shadow-[0_6px_18px_rgba(7,20,38,0.14)] backdrop-blur transition-transform active:scale-95"
      >
        <Ruler className={`h-[18px] w-[18px] transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>

      <div
        className={`pointer-events-auto ml-[-20px] overflow-hidden rounded-r-full bg-white/95 shadow-[0_6px_18px_rgba(7,20,38,0.12)] backdrop-blur transition-all duration-400 ease-out ${
          open ? "max-w-[280px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        <div className="flex items-center gap-4 whitespace-nowrap py-2.5 pl-7 pr-5 text-[12px] text-[#071426]">
          <span className="flex items-center gap-1.5">
            <MoveHorizontal className="h-3.5 w-3.5 text-[#ef7027]" />
            <span className="text-[#071426]/55">Breedte</span>
            <strong className="font-[500]">{widthLabel} cm</strong>
          </span>
          <span className="h-3 w-px bg-[#071426]/12" />
          <span className="flex items-center gap-1.5">
            <MoveVertical className="h-3.5 w-3.5 text-[#ef7027]" />
            <span className="text-[#071426]/55">Hoogte</span>
            <strong className="font-[500]">{heightLabel} cm</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileGallerySwipe({
  items,
  handle,
  widthLabel,
  heightLabel,
}: {
  items: GalleryItem[];
  handle: string;
  widthLabel: string;
  heightLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [rulerOpen, setRulerOpen] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth || 1;
      setActive(Math.round(el.scrollLeft / width));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="relative -mt-4 lg:hidden">
      <div
        ref={trackRef}
        className="scrollbar-hide -mx-5 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {items.map((item, index) => (
          <div key={`${item.src}-${index}`} className="w-full shrink-0 snap-center">
            <figure
              className={`flex items-center justify-center overflow-hidden bg-[#faf8f5] ${
                handle === "full-house" && index === 0 ? "aspect-[5/4]" : "aspect-square"
              }`}
            >
              <Img
                src={item.src}
                alt={item.alt}
                w={900}
                priority={index === 0}
                className={
                  handle === "full-house" && index === 0
                    ? "h-auto w-[100%] max-w-none object-contain"
                    : "h-full w-full object-cover"
                }
              />
            </figure>
          </div>
        ))}
      </div>

      {/* Maatlint-knop met uitschuivende afmetingen, over de foto */}
      <div className="absolute inset-x-4 bottom-[22px]">
        <DimensionRuler widthLabel={widthLabel} heightLabel={heightLabel} open={rulerOpen} onToggle={() => setRulerOpen((open) => !open)} />
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-[40px] right-4 flex items-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Afbeelding ${index + 1}`}
              onClick={() => {
                const el = trackRef.current;
                if (el) el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index ? "w-5 bg-[#ef7027]" : "w-1.5 bg-[#071426]/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function ProductPage() {
  const { handle } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product as ProductNode | null;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-[#faf8f5]">
        <div className="mx-auto max-w-[1400px] px-3 md:px-10 py-16 grid md:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-muted animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 bg-muted animate-pulse" />
            <div className="h-6 w-1/3 bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  if (error || !data) throw notFound();

  return <ProductView product={data} />;
}

// Volgorde waarin de kleurblokken in de Shopify-galerij zijn geüpload (per handle).
const GALLERY_COLOR_ORDER: Record<string, string[]> = {
  solo: ["Kristalwit", "Dofroze", "Cashmeregrijs", "Donkereiken", "Walnootbruin"],
};


const FULL_HOUSE_GALLERY = [
  { src: fullHouseGalleryMain, alt: "Wandig Full House volledig vrijstaand in walnootbruin", full: true, square: true },
  { src: fullHouseGalleryRoom, alt: "Wandig Full House gemonteerd in een lichte woonkamer", full: true },
  { src: fullHouseGalleryStylingOne, alt: "Detail van de vakken en houtnerf van de Wandig Full House", full: false },
  { src: fullHouseGalleryStylingTwo, alt: "Gestylede vakken van de Wandig Full House", full: false },
  { src: fullHouseGalleryFinish, alt: "Close-up van de strakke frontafwerking", full: true },
  { src: fullHouseGalleryStorage, alt: "Geopend opbergvak met beslag", full: false },
  { src: fullHouseGalleryUse, alt: "Gebruik van het verborgen opbergvak", full: false },
];

const PRODUCT_BENEFITS = [
  { title: "Ontworpen in Nederland", image: ontworpenInNederlandImg.url },
  { title: "Kabels uit het zicht", image: kabelsUitZichtVoordelenUploadImg.url },
  { title: "Eenvoudige klikmontage", image: eenvoudigeKlikmontageUploadImg.url },
  { title: "Persoonlijk advies", image: persoonlijkAdviesUploadImg.url },
  { title: "100 dagen proefkijken", image: proefkijkenUploadImg.url },
  { title: "10 jaar garantie", image: garantieUploadImg.url },
];


function ProductView({ product }: { product: ProductNode }) {
  const variants = useMemo(
    () => product.variants.edges.map((e) => e.node as typeof e.node & { image?: { url: string; altText: string | null } | null }),
    [product],
  );
  
  const benefitsScrollerRef = useRef<HTMLDivElement>(null);
  const mainGalleryImageRef = useRef<HTMLImageElement>(null);
  const galleryContinuationRef = useRef<HTMLDivElement>(null);
  const lastGalleryScrollYRef = useRef(0);
  
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    // De tv-maat optie: "58 - 65 inch" is de tweede waarde (of de waarde die 58 bevat).
    const sizeOption = product.options.find((o) => /maat|size|inch/i.test(o.name));
    const preferredSizeValue = sizeOption
      ? sizeOption.values.find((v) => /58/.test(v)) || sizeOption.values[1]
      : undefined;
    const isPreferredSize = (v: (typeof variants)[number]) =>
      !sizeOption ||
      !preferredSizeValue ||
      v.selectedOptions.some((o) => o.name === sizeOption.name && o.value === preferredSizeValue);
    const first =
      variants.find((v) => v.availableForSale && isPreferredSize(v)) ||
      variants.find(isPreferredSize) ||
      variants.find((v) => v.availableForSale) ||
      variants[0];
    first?.selectedOptions.forEach((o) => { init[o.name] = o.value; });
    if (sizeOption && preferredSizeValue) init[sizeOption.name] = preferredSizeValue;
    return init;
  });


  const [expandedVariantOption, setExpandedVariantOption] = useState<string | null>(null);
  const [productionDetailsOpen, setProductionDetailsOpen] = useState(false);
  const [benefitsScrollState, setBenefitsScrollState] = useState({ atStart: true, atEnd: false });
  const [showOrderWidget, setShowOrderWidget] = useState(false);
  const [desktopRulerOpen, setDesktopRulerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const continuation = galleryContinuationRef.current;
      const threshold = continuation
        ? continuation.getBoundingClientRect().bottom
        : window.innerHeight;
      setShowOrderWidget(threshold < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  


  const activeVariant = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions.every((o) => selected[o.name] === o.value),
    ) || variants[0];
  }, [variants, selected]);

  const productImages = product.images.edges;
  const allImages = useMemo(() => {
    const all = [...productImages];
    variants.forEach((v) => {
      if (v.image?.url && !all.some((img) => img.node.url === v.image!.url)) {
        all.push({ node: { url: v.image.url, altText: v.image.altText } });
      }
    });
    return all;
  }, [productImages, variants]);

  const colorKey = product.options.find((o) => /kleur|color/i.test(o.name))?.name;
  const selectedColor = colorKey ? selected[colorKey] : undefined;
  const sizeKey = product.options.find((o) => /maat|size|inch/i.test(o.name))?.name;
  const selectedSize = sizeKey ? selected[sizeKey] : undefined;

  // Afmetingen volgen de gekozen tv-maat (midden module + twee zijmodules)
  const sizeOption = product.options.find((o) => /maat|size|inch/i.test(o.name));
  const sizeIndex = sizeOption && selectedSize ? sizeOption.values.indexOf(selectedSize) : -1;
  const dimensionSize = WANDIG_SIZES[sizeIndex >= 0 ? sizeIndex : 0];
  const isSolo = product.handle === "solo";
  const specWidthLabel = formatCm(wandigWidth(dimensionSize, isSolo ? 0 : 2));
  const specHeightLabel = String(dimensionSize.wallHeight);

  // Kleurpreview in de specificaties: alle modules in de gekozen kleur
  const specPreviewColor = selectedColor ?? FULL_HOUSE_COLORS[0];
  const specPreviewSource = useMemo(() => {
    if (specPreviewColor === FULL_HOUSE_COLORS[0]) return null;
    const matchingVariant = variants.find((v) => {
      const selections = new Map(
        v.selectedOptions.map((o) => [o.name.toLocaleLowerCase("nl-NL"), o.value]),
      );
      return (
        selections.get("kleur") === specPreviewColor &&
        selections.get("opstelling") === "Links" &&
        selections.get("maat tv") === "58 - 65 inch"
      );
    });
    return matchingVariant?.image?.url ?? FULL_HOUSE_FRONT_IMAGES[specPreviewColor] ?? null;
  }, [variants, specPreviewColor]);

  // Shopify uploads the photos per variant as one consecutive block, starting at
  // the variant's own image. So we slice from that anchor up to the next anchor.
  const images = useMemo(() => {
    // Solo: de galerij is geüpload als blokken per kleur x tv-maat, elk blok start
    // bij een "Closed_Front" foto. De variant-featured images zijn losse duplicaten
    // aan het eind, dus we mappen op blokpositie in plaats van op de variantfoto.
    const galleryColorOrder = GALLERY_COLOR_ORDER[product.handle];
    if (galleryColorOrder && selectedColor && selectedSize && sizeOption) {
      const blockStarts = allImages
        .map((img, i) => (/Closed_Front/i.test(img.node.url) ? i : -1))
        .filter((i) => i >= 0);
      const colorPos = galleryColorOrder.indexOf(selectedColor);
      const sizePos = sizeOption.values.indexOf(selectedSize);
      if (colorPos >= 0 && sizePos >= 0) {
        const blockIndex = colorPos * sizeOption.values.length + sizePos;
        const start = blockStarts[blockIndex];
        if (start !== undefined) {
          const nextStart = blockStarts[blockIndex + 1] ?? allImages.length;
          const group = allImages.slice(start, Math.min(nextStart, start + 9));
          if (group.length > 0) return group;
        }
      }
    }

    const urlIndex = new Map(allImages.map((img, i) => [img.node.url, i] as const));

    const anchorIndexes = Array.from(
      new Set(
        variants
          .map((v) => v.image?.url)
          .filter((u): u is string => Boolean(u))
          .map((u) => urlIndex.get(u))
          .filter((i): i is number => i !== undefined),
      ),
    ).sort((a, b) => a - b);

    const match = variants.find((v) => {
      if (!v.image?.url) return false;
      const c = colorKey ? v.selectedOptions.find((o) => o.name === colorKey)?.value : undefined;
      const s = sizeKey ? v.selectedOptions.find((o) => o.name === sizeKey)?.value : undefined;
      return (!colorKey || c === selectedColor) && (!sizeKey || s === selectedSize);
    });

    const start = match?.image?.url ? urlIndex.get(match.image.url) : undefined;
    if (start === undefined) return allImages;

    const end = anchorIndexes.find((i) => i > start) ?? allImages.length;
    const group = allImages.slice(start, end);
    return group.length > 0 ? group : allImages;
  }, [allImages, variants, colorKey, selectedColor, sizeKey, selectedSize, sizeOption, product.handle]);

  const galleryItems = useMemo(() => {
    const shopifyItems = images.map(({ node }) => ({
      src: node.url,
      alt: node.altText || product.title,
      full: false,
      square: false,
    }));

    if (product.handle === "full-house") {
      const isWalnoot = /walnoot|noten/i.test(selectedColor ?? "");
      const isWalnoot4055 = isWalnoot && sizeIndex === 0;
      const isWalnoot5865 = isWalnoot && sizeIndex === 1;
      const isWalnoot7075 = isWalnoot && sizeIndex === 2;
      const isWalnoot7785 = isWalnoot && sizeIndex === 3;
      const isDonkerEiken = /donker\s*eiken|eikenzwart|donkereiken/i.test(selectedColor ?? "");
      const isDonkerEiken7785 = isDonkerEiken && sizeIndex === 3;
      const isDonkerEiken7075 = isDonkerEiken && sizeIndex === 2;
      const isDonkerEiken5865 = isDonkerEiken && sizeIndex === 1;
      const isDonkerEiken4055 = isDonkerEiken && sizeIndex === 0;
      const isCashmere = /cashmere/i.test(selectedColor ?? "");
      const isCashmere7785 = isCashmere && sizeIndex === 3;
      const isCashmere7075 = isCashmere && sizeIndex === 2;

      const main = isCashmere7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere7785,
            alt: "Wandig Full House in cashmeregrijs voor tv 77 - 85 inch",
          }
        : isCashmere7075
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere7075,
            alt: "Wandig Full House in cashmeregrijs voor tv 70 - 75 inch",
          }
        : isDonkerEiken4055
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken4055,
            alt: "Wandig Full House in donkereiken voor tv 40 - 55 inch",
          }
        : isDonkerEiken5865
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken5865,
            alt: "Wandig Full House in donkereiken voor tv 58 - 65 inch",
          }
        : isDonkerEiken7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken7785,
            alt: "Wandig Full House in donkereiken voor tv 77 - 85 inch",
          }
        : isDonkerEiken7075
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken7075,
            alt: "Wandig Full House in donkereiken voor tv 70 - 75 inch",
          }
        : isWalnoot7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseWalnoot7785,
            alt: "Wandig Full House in walnootbruin voor tv 77 - 85 inch",
          }
        : isWalnoot7075
          ? {
              ...FULL_HOUSE_GALLERY[0],
              src: fullHouseWalnoot7075,
              alt: "Wandig Full House in walnootbruin voor tv 70 - 75 inch",
            }
          : isWalnoot4055
            ? {
                ...FULL_HOUSE_GALLERY[0],
                src: fullHouseWalnoot4055,
                alt: "Wandig Full House in walnootbruin voor tv 40 - 55 inch",
              }
            : isWalnoot5865
              ? {
                  ...FULL_HOUSE_GALLERY[0],
                  src: fullHouseWalnoot5865,
                  alt: "Wandig Full House in walnootbruin voor tv 58 - 65 inch",
                }
              : FULL_HOUSE_GALLERY[0];

      const openVariant = isCashmere7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere7785Open,
            alt: "Wandig Full House in cashmeregrijs met geopende deuren",
          }
        : null;
      const rest = shopifyItems.filter((item) => item.src !== main.src);
      const base = rest.length > 0 ? [main, ...rest] : [main, ...FULL_HOUSE_GALLERY.slice(1)];
      return openVariant ? [base[0], openVariant, ...base.slice(1)] : base;
    }


    return shopifyItems.map((item, index) => ({
      ...item,
      full: index === 0,
      square: index === 0,
    }));
  }, [images, product.handle, product.title, selectedColor, selectedSize, sizeOption, sizeIndex]);

  const openGalleryItem = useMemo(
    () => galleryItems.find((item) => item.src === fullHouseCashmere7785Open) ?? null,
    [galleryItems],
  );
  const [mainDoorsOpen, setMainDoorsOpen] = useState(false);
  useEffect(() => {
    setMainDoorsOpen(false);
  }, [openGalleryItem?.src, selectedColor, selectedSize]);


  const subImageGroups = useMemo(() => {
    const subs = galleryItems.slice(1);
    const groups: Array<typeof galleryItems> = [];
    for (let i = 0; i < subs.length; i += 3) {
      groups.push(subs.slice(i, i + 3));
    }
    return groups;
  }, [galleryItems]);



  useEffect(() => {
    const image = mainGalleryImageRef.current;
    const continuation = galleryContinuationRef.current;
    if (!image || !continuation) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateMainImage = () => {
      frame = 0;

      if (!desktopQuery.matches) {
        image.style.filter = "none";
        image.style.transform = "none";
        image.style.transitionDuration = "0ms";
        lastGalleryScrollYRef.current = window.scrollY;
        return;
      }

      const scrollY = window.scrollY;
      const continuationTop = continuation.getBoundingClientRect().top;
      const blurStart = window.innerHeight * 0.98;
      const blurEnd = window.innerHeight * 0.58;
      const progress = scrollY <= 2
        ? 0
        : Math.min(Math.max((blurStart - continuationTop) / (blurStart - blurEnd), 0), 1);
      const scrollingUp = scrollY < lastGalleryScrollYRef.current;
      const blur = progress * 10;
      const scale = 1;

      image.style.transitionDuration = reducedMotionQuery.matches ? "0ms" : progress === 0 || scrollingUp ? "90ms" : "280ms";
      image.style.filter = `blur(${blur.toFixed(1)}px)`;
      image.style.transform = `scale(${scale.toFixed(4)})`;
      lastGalleryScrollYRef.current = scrollY;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMainImage);
    };

    updateMainImage();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktopQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktopQuery.removeEventListener("change", scheduleUpdate);
      image.style.filter = "";
      image.style.transform = "";
      image.style.transitionDuration = "";
    };
  }, [galleryItems]);

  // Preload alleen de afbeeldingen van de huidige selectie, geoptimaliseerd en
  // pas wanneer de browser rustig is — niet de volledige variantenbibliotheek.
  useEffect(() => {
    const preload = () => {
      images.slice(0, 10).forEach(({ node }) => {
        const img = new Image();
        const url = optimizeImageUrl(node.url, 1200);
        if (url) img.src = url;
      });
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) {
      idle(preload);
      return;
    }
    const timer = window.setTimeout(preload, 1200);
    return () => window.clearTimeout(timer);
  }, [images]);

  // Track benefits carousel scroll position to dim disabled arrows.
  useEffect(() => {
    const carousel = benefitsScrollerRef.current;
    if (!carousel) return;

    const updateScrollState = () => {
      const atStart = carousel.scrollLeft <= 1;
      const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
      setBenefitsScrollState({ atStart, atEnd });
    };

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);



  const handleAdd = async () => {
    if (!activeVariant) return;
    await addItem({
      product: { node: product },
      variantId: activeVariant.id,
      variantTitle: activeVariant.title,
      price: activeVariant.price,
      quantity: 1,
      selectedOptions: activeVariant.selectedOptions,
    });
  };

  const visibleOptions = product.options.filter((o) => !(o.name === "Title" && o.values.length === 1));
  const hasOptions = visibleOptions.length > 0;
  const numericPrice = activeVariant ? parseFloat(activeVariant.price.amount) : 0;
  const fallbackPrice = product.handle === "full-house" ? 1699 : 0;
  const displayedNumericPrice = numericPrice > 0 ? numericPrice : fallbackPrice;
  const currencyCode = activeVariant?.price.currencyCode || "EUR";
  const configuratorPrice = displayedNumericPrice > 0
    ? new Intl.NumberFormat("nl-NL", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(displayedNumericPrice) + "\u2060,-"
    : "Prijs op aanvraag";
  const displayTitle = product.title.replace(/^Wandig\s+/i, "");
  const scrollBenefits = (direction: -1 | 1) => {
    benefitsScrollerRef.current?.scrollBy({ left: direction * 166, behavior: "smooth" });
  };
  return (
    <div className="bg-[#faf8f5]">
      <div className="mx-auto max-w-[1400px] px-0 md:px-10 pt-5 md:pt-8">
      <nav className="px-3 md:px-0 text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-3 lg:mb-5 flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <Link to="/producten" className="hover:text-foreground">Modellen</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10 xl:gap-14">

        {/* Gallery */}
        <div className="min-w-0">
          <MobileGallerySwipe items={galleryItems} handle={product.handle} widthLabel={specWidthLabel} heightLabel={specHeightLabel} />

          {galleryItems[0] && (
            <figure className={`relative hidden overflow-hidden rounded-[6px] lg:block lg:sticky lg:top-0 lg:z-0 ${product.handle === "full-house" ? "lg:flex aspect-[5/4] items-center justify-center bg-[#faf8f5]" : ""}`}>
              <Img
                ref={mainGalleryImageRef}
                w={1200}
                priority
                onClick={openGalleryItem ? () => setMainDoorsOpen((open) => !open) : undefined}
                src={openGalleryItem && mainDoorsOpen ? openGalleryItem.src : galleryItems[0].src}
                alt={openGalleryItem && mainDoorsOpen ? openGalleryItem.alt : galleryItems[0].alt}
                className={`block origin-center transition-[filter,transform] ease-out [will-change:filter,transform] ${openGalleryItem ? "cursor-pointer" : ""} ${product.handle === "full-house" ? "h-auto w-[100%] max-w-none object-contain" : galleryItems[0].square ? "aspect-square w-full object-contain" : "aspect-[4/3] w-full object-cover"}`}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-x-4 bottom-1">
                <DimensionRuler
                  widthLabel={specWidthLabel}
                  heightLabel={specHeightLabel}
                  open={desktopRulerOpen}
                  onToggle={() => setDesktopRulerOpen((open) => !open)}
                />
              </div>
            </figure>

          )}

          <div ref={galleryContinuationRef} className="relative z-10 mt-3 hidden space-y-3 lg:block md:mt-4 md:space-y-4">

            {subImageGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <figure className="overflow-hidden rounded-[6px]">
                  <Img
                    src={group[0].src}
                    alt={group[0].alt}
                    className="block aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </figure>
                {group.length > 1 && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {group.slice(1).map((image, idx) => (
                      <figure key={idx} className="overflow-hidden rounded-[6px]">
                        <Img
                          src={image.src}
                          alt={image.alt}
                          className="block aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="relative z-10 -mt-[38px] min-w-0 lg:mt-0 lg:sticky lg:top-3 lg:ml-auto lg:w-[490px] lg:self-start">
          <div className="space-y-3">
            <section className="overflow-hidden rounded-[20px] border border-[#eeeeee] bg-[#fef9f5] shadow-[0_18px_45px_rgba(42,31,22,0.07)]">
              <button
                type="button"
                onClick={() => setProductionDetailsOpen((open) => !open)}
                aria-expanded={productionDetailsOpen}
                className="flex min-h-[42px] w-full items-center justify-between gap-4 px-4 text-left text-[#071426]"
              >
                <span className="flex items-center gap-2 font-sans text-[14.4px] font-[385] text-[#cdc0b5]" style={{ textShadow: '0 0.55px 0.55px rgba(0,0,0,0.065)' }}>
                  <Img
                    src={dutchDesignIcon.url}
                    w={64}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-5 shrink-0 object-contain opacity-80"
                  />
                  Dutch Design
                </span>
                <span className="flex h-[21.42px] w-[21.42px] shrink-0 items-center justify-center rounded-full border-2 border-[#cdc0b5] bg-transparent text-[#cdc0b5] shadow-none">
                  <Plus className={`h-[10.71px] w-[10.71px] transition-transform duration-400 ease-out ${productionDetailsOpen ? "rotate-45" : "rotate-0"}`} strokeWidth={2} />
                </span>
              </button>

              <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${productionDetailsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="relative min-h-[210px] px-5 pb-8 pt-3 text-[#cdc0b5]">
                    <p className="text-[17px] font-semibold text-[#071426]">Nederlands gemaakt. Met aandacht.</p>
                    <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-[#071426]">
                      Elke Wandig cinewall wordt in onze Nederlandse werkplaats gebouwd, gecontroleerd en plug &amp; play voorbereid voor jouw woonkamer.
                    </p>
                    <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-[#071426]">
                      Van de eerste plank tot de laatste kabeldoorvoer: lokaal vakmanschap, precies passend rond jouw tv.
                    </p>
                    <Img
                      src={puzzlePiecesImg.url}
                      w={220}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-5 right-5 w-[84px] select-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-t-[20px] bg-white p-4">
              <div>
                <div className="mt-[15px] grid grid-cols-1 items-start gap-4 sm:grid-cols-[minmax(0,1fr)_230px]">
                  <div>
                    <h1 className="text-[24px] font-bold leading-none text-[#071426]">{displayTitle}</h1>
                    <p className="mt-2 text-[12px] text-[#071426]/45">Cinewall</p>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("klantbeoordelingen")?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="mt-1 flex cursor-pointer items-center text-[#4f5966]/78 transition hover:text-[#ef7027]"
                      aria-label="Bekijk alle klantbeoordelingen"
                    >
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-3 w-3 fill-current" strokeWidth={0} />
                        ))}
                      </span>
                      <span className="ml-2 text-[10px] text-[#071426]/30">(1000+)</span>
                    </button>

                  </div>

                  <div className="min-w-0 text-right">
                    <p className="text-[23px] font-bold leading-none text-[#ff5a00]">{configuratorPrice}</p>
                  </div>
                </div>

                <PaymentOptionsBadges price={displayedNumericPrice} />
              </div>


              {hasOptions && (
                <div className="mt-4 space-y-2">
                  {visibleOptions.map((opt) => {
                    const isColor = /kleur|color/i.test(opt.name);
                    const isPosition = /opstelling|position|richting|side/i.test(opt.name);
                    const isTvSize = /maat|size|inch/i.test(opt.name);
                    const label = isColor ? "Kleur" : isTvSize ? "Tv-maat" : "Opstelling";
                    const optionExpanded = expandedVariantOption === opt.name;
                    const optionChoices = isTvSize
                      ? [
                          { label: "40 - 55 inch", value: opt.values[0] },
                          { label: "58 - 65 inch", value: opt.values[1] },
                          { label: "70 - 75 inch", value: opt.values[2] },
                          { label: "77 - 85 inch", value: opt.values[3] },
                        ].filter((choice): choice is { label: string; value: string } => Boolean(choice.value))
                      : opt.values.map((value) => ({ label: value, value }));
                    const selectedOptionLabel = isTvSize
                      ? optionChoices.find((choice) => choice.value === selected[opt.name])?.label
                        || selected[opt.name]
                      : selected[opt.name];

                    if (isPosition || isTvSize) {
                      return (
                        <div key={opt.name} className="overflow-hidden rounded-[12px] border border-[#eeeeee]">
                          <button
                            type="button"
                            onClick={() => setExpandedVariantOption((current) => current === opt.name ? null : opt.name)}
                            aria-expanded={optionExpanded}
                            className="flex min-h-[52px] w-full items-center gap-2 px-3 text-left"
                          >
                            <span className="grid min-w-0 flex-1 grid-cols-[80px_minmax(0,1fr)] items-baseline gap-2">
                              <span className="text-[15px] font-[750] leading-none text-[#071426]">{label}</span>
                              <span className="truncate text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">{selectedOptionLabel || optionChoices[0]?.label}</span>
                            </span>
                            <ChevronDown className={`h-4 w-4 text-[#071426]/45 transition-transform duration-300 ease-out ${optionExpanded ? "rotate-180" : "rotate-0"}`} />
                          </button>

                          <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${optionExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                              <div className={`grid gap-2 px-3 pb-3 pt-1 ${isTvSize ? "grid-cols-2" : "grid-cols-2"}`}>
                                {optionChoices.map((choice) => {
                                  const active = selected[opt.name] === choice.value;
                                  return (
                                    <button
                                      key={choice.label}
                                      type="button"
                                      onClick={() => setSelected((current) => ({ ...current, [opt.name]: choice.value }))}
                                      aria-pressed={active}
                                      className={`h-10 rounded-[8px] border bg-[#f8f6f4] px-2 text-[12px] font-medium text-[#071426] transition-[border-color,box-shadow,background-color,transform] duration-300 ease-out hover:bg-[#f3ece6] active:scale-[0.98] ${active ? "border-[#ff5a00] bg-[#fff8f3] shadow-[0_0_0_2px_rgba(255,90,0,0.18)]" : "border-[#eeeeee] shadow-none"}`}
                                    >
                                      {choice.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={opt.name} className="grid min-h-[52px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[12px] border border-[#eeeeee] px-3">
                        {isColor ? (
                          <>
                            <div className="grid min-w-0 grid-cols-[80px_minmax(0,1fr)] items-baseline gap-2">
                              <span className="text-[15px] font-[750] leading-none text-[#071426]">{label}</span>
                              <span className="truncate text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">{displayWandigColor(selected[opt.name] || opt.values[0])}</span>
                            </div>
                            <div className="flex items-center justify-end gap-2.5">
                              {opt.values.slice(0, 5).map((value) => {
                                const active = selected[opt.name] === value;
                                return (
                                  <button
                                    key={value}
                                    type="button"
                                    onClick={() => setSelected((current) => ({ ...current, [opt.name]: value }))}
                                    title={displayWandigColor(value)}
                                    aria-label={`Kleur ${displayWandigColor(value)}`}
                                    aria-pressed={active}
                                    className={`h-9 w-9 shrink-0 rounded-full border-2 p-[2px] transition-transform hover:scale-105 active:scale-95 ${active ? "border-[#ff5a00]" : "border-transparent"}`}
                                  >
                                    <span className="block h-full w-full rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.16)]" style={wandigSwatchStyle(value)} />
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <label className="relative col-span-2 block min-w-0">
                            <span className="sr-only">Kies {label.toLowerCase()}</span>
                            <select
                              value={selected[opt.name] || ""}
                              onChange={(event) => setSelected((current) => ({ ...current, [opt.name]: event.target.value }))}
                              className="h-10 w-full appearance-none bg-transparent pr-7 text-[14px] text-[#071426] outline-none"
                            >
                              {opt.values.map((value) => <option key={value} value={value}>{value}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071426]/45" />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <Button
                onClick={handleAdd}
                disabled={isLoading || !activeVariant?.availableForSale}
                className="group mt-3 h-12 w-full translate-y-0 overflow-hidden rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] px-6 text-sm font-bold text-white shadow-none transition hover:translate-y-0 hover:from-[#e36820] hover:to-[#d8601b] hover:shadow-none active:translate-y-0 active:scale-100"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : activeVariant?.availableForSale ? (
                  <span className="relative block h-full w-full overflow-hidden">
                    <span className="absolute inset-0 flex items-center justify-center gap-1.5 font-[200] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      <Img src={basketIcon.url} alt="" className="h-5 w-5 object-contain" w={64} />In winkelwagen
                    </span>
                    <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-1.5 font-[200] transition-transform duration-300 ease-out group-hover:translate-y-0">
                      <Img src={basketIcon.url} alt="" className="h-5 w-5 object-contain" w={64} />In winkelwagen
                    </span>
                  </span>
                ) : "Uitverkocht"}
              </Button>

              <FreeColorSamples />


              <div className="mb-[10px] mt-[17px] hidden w-full grid-cols-[max-content_max-content_max-content_max-content_max-content] items-center justify-between font-sans tracking-[0.04em] text-[#90949b] sm:grid">
                <div className="flex items-center gap-1.5 text-[12px] font-normal leading-none"><ShieldCheck className="h-[16px] w-[16px] shrink-0" /><span className="whitespace-nowrap">10 jaar garantie</span></div>
                <span className="text-[13px] text-[#cdc0b5]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5 text-[12px] font-normal leading-none"><Hammer className="h-[16px] w-[16px] shrink-0" /><span className="whitespace-nowrap">Handgemaakt in NL</span></div>
                <span className="text-[13px] text-[#cdc0b5]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5 text-[12px] font-normal leading-none"><Truck className="h-[16px] w-[16px] shrink-0" /><span className="whitespace-nowrap">7-14 werkdagen levertijd</span></div>
              </div>

              <div className="mb-[10px] mt-[17px] grid grid-cols-1 divide-y divide-[#eeeeee] font-sans tracking-[0.04em] text-[#90949b] sm:hidden">
                <div className="flex items-center justify-start gap-1.5 py-2 text-[12px] font-normal leading-none"><ShieldCheck className="h-[16px] w-[16px] shrink-0" /><span>10 jaar garantie</span></div>
                <div className="flex items-center justify-start gap-1.5 py-2 text-[12px] font-normal leading-none"><Hammer className="h-[16px] w-[16px] shrink-0" /><span>Handgemaakt in NL</span></div>
                <div className="flex items-center justify-start gap-1.5 py-2 text-[12px] font-normal leading-none"><Truck className="h-[16px] w-[16px] shrink-0" /><span>7-14 werkdagen levertijd</span></div>
              </div>
              </div>
            </section>

            <section className="rounded-[20px] border border-[#eeeeee] bg-white p-4 shadow-[0_14px_34px_rgba(42,31,22,0.05)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eeeeee] px-3 py-1.5 text-[12px] font-normal text-[#071426]/55">
                <span className="h-2 w-2 animate-breathing rounded-full bg-[#ff5a00]" />Laatste exemplaren
              </span>
              <p className="mt-2.5 text-[14px] font-bold text-[#071426]">
                Transformeer je woonkamer in 7 - 14 werkdagen.
                <DeliveryInfoTooltip />
              </p>
              <p className="mt-1 text-[12px] text-[#071426]/55">Bestel vandaag en transformeer je woonkamer.</p>
            </section>

            <section className="overflow-hidden rounded-[20px] border border-[#eeeeee] bg-white p-3 shadow-[0_14px_34px_rgba(42,31,22,0.05)]">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-[14px] font-bold text-[#071426]">Jouw voordelen</h2>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    aria-label="Vorige voordelen"
                    onClick={() => scrollBenefits(-1)}
                    disabled={benefitsScrollState.atStart}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#071426] transition-opacity disabled:text-[#071426]/25"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Volgende voordelen"
                    onClick={() => scrollBenefits(1)}
                    disabled={benefitsScrollState.atEnd}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#071426] transition-opacity disabled:text-[#071426]/25"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                  </button>

                </div>
              </div>
              <div ref={benefitsScrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {PRODUCT_BENEFITS.map((benefit) => (
                  <article key={benefit.title} className="relative h-[195px] min-w-[150px] snap-start overflow-hidden rounded-[13px] bg-[#eee4dc] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                    <Img src={benefit.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 top-0 px-4 pt-5">
                      <h3 className="text-center text-[13px] font-normal leading-tight tracking-[0.03em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">{benefit.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-0">
      <SpecificationsSection
        widthLabel={specWidthLabel}
        heightLabel={specHeightLabel}
        preview={
          isSolo ? (
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
              <Img
                src={galleryItems[0]?.src}
                alt={`Wandig Solo in ${specPreviewColor}`}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
              />
            </div>
          ) : (
            <WandigSpecPreview color={specPreviewColor} source={specPreviewSource} />
          )
        }
      />

      <UniqueSection />

      <BeforeAfterSection
        {...(product.handle === "solo"
          ? { beforeSrc: beforeSoloAsset.url, afterSrc: afterSoloAsset.url }
          : {})}
      />
      </div>


      <CustomerGallerySection
        firstImageSrc={isSolo ? soloWoonkamerLampAsset.url : undefined}
        ctaLabel={isSolo ? "Bestel Solo" : "Bestel Full House"}
        ctaTo={isSolo ? "/product/solo" : undefined}
      />

      </div>

      <BuiltToLastSection />

      <FaqSection />

      <ReviewsSection />

      <NewsletterContactSection />

      <TrustBannerSection />

      {/* Sticky besteller-widget linksonder */}
      <div
        className={`pointer-events-none fixed bottom-5 left-5 z-50 transition-all duration-300 ease-out ${
          showOrderWidget ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={`Bestel ${displayTitle} en kies je kleur`}
          className={`group flex items-center gap-4 rounded-[18px] py-2.5 pl-5 pr-2.5 shadow-[0_14px_35px_rgba(42,31,22,0.18)] transition-transform duration-200 hover:-translate-y-0.5 ${
            showOrderWidget ? "pointer-events-auto" : ""
          }`}
          style={{ background: "linear-gradient(105deg, #f9cfa8 0%, #f5a87a 55%, #ef9464 100%)" }}
        >
          <span className="text-left">
            <span className="block text-[19px] font-bold leading-tight text-[#071426]">{displayTitle}</span>
            <span className="block text-[15px] font-bold leading-tight text-[#ff5a00]">
              {configuratorPrice}
            </span>
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6e15] text-white shadow-[0_6px_14px_rgba(0,0,0,0.15)]">
            <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
          </span>
        </button>
      </div>

    </div>
  );
}

function DeliveryInfoTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative ml-1.5 inline-block align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Meer informatie over de levering"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-[#ff6e15] text-[10px] font-bold leading-none text-[#ff6e15] transition-colors hover:bg-[#ff6e15] hover:text-white"
      >
        i
      </button>
      <span
        role="tooltip"
        className={`fixed left-1/2 top-1/2 z-50 w-[min(320px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-[#eeeeee] bg-white p-3.5 text-left shadow-[0_18px_40px_rgba(42,31,22,0.14)] transition-all duration-200 sm:absolute sm:bottom-[calc(100%+10px)] sm:left-1/2 sm:top-auto sm:z-30 sm:w-[266px] sm:-translate-y-0 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <span className="block text-[13px] font-bold text-[#071426]">Hoe wordt mijn tv kast geleverd?</span>
        <span className="mt-1.5 block text-[12px] font-normal leading-[1.55] text-[#071426]/60">
          Je tv kast wordt plug and play en grotendeels voorgemonteerd geleverd. Geen ingewikkeld bouwpakket dus. Met twee
          personen bevestig je de verschillende onderdelen eenvoudig aan de muur, zodat je snel van je nieuwe tv kast kunt
          genieten.
        </span>
        <span className="absolute left-1/2 top-full hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#eeeeee] bg-white sm:block" />

      </span>
    </span>
  );
}


