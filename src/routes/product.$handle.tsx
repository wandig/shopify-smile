import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

import { Loader2, ChevronRight, ChevronLeft, ChevronDown, Plus, Star, Hammer, ShieldCheck, ShoppingBag, Truck, Plug, Phone, Headphones, Mail, Monitor, User } from "lucide-react";
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
import swatchDofroze from "@/assets/swatches/dofroze.jpg";
import swatchEikengrijs from "@/assets/swatches/eikengrijs.jpg";
import swatchEikenzwart from "@/assets/swatches/eikenzwart.jpg";
import swatchKatoengrijs from "@/assets/swatches/katoengrijs.jpg";
import swatchKleibeige from "@/assets/swatches/kleibeige.jpg";
import swatchTruffelbruin from "@/assets/swatches/truffelbruin.jpg";
import swatchWalnootbruin from "@/assets/swatches/walnootbruin.jpg";
import swatchZandsteen from "@/assets/swatches/zandsteen.jpg";
import basketIcon from "@/assets/basket-icon.svg.asset.json";
import dutchDesignIcon from "@/assets/dutch-design-icon.svg.asset.json";
import puzzlePiecesImg from "@/assets/puzzle-pieces.png.asset.json";
import plugAndPlayIcon from "@/assets/plug-and-play-icon.svg.asset.json";
import warrantyIcon from "@/assets/warranty-icon.svg.asset.json";
import kijkplezierIcon from "@/assets/100-dagen-icon.svg.asset.json";
import cinewallSchema from "@/assets/cinewall-schema-fullhouse.png.asset.json";
import ontworpenInNederlandImg from "@/assets/ontworpen-in-nederland.png.asset.json";
import kabelsUitZichtImg from "@/assets/kabels-uit-zicht.png.asset.json";
import kabelsUitZichtV2Img from "@/assets/kabels-uit-zicht-v2.png.asset.json";
import kabelsUitZichtV3Img from "@/assets/kabels-uit-zicht-v3.png.asset.json";
import eenvoudigeKlikmontageImg from "@/assets/eenvoudige-klikmontage.png.asset.json";
import persoonlijkAdviesImg from "@/assets/persoonlijk-advies.png.asset.json";
import proefkijkenImg from "@/assets/100-dagen-proefkijken.png.asset.json";
import garantieCinewallImg from "@/assets/garantie-cinewall.png.asset.json";
import stijlvolleKleurenImg from "@/assets/stijlvolle-kleuren-v2.png.asset.json";
import eenvoudigeMontageDetailImg from "@/assets/eenvoudige-montage-detail.png.asset.json";
import onderhoudsvriendelijkImg from "@/assets/onderhoudsvriendelijk.png.asset.json";
import pushToOpenImg from "@/assets/push-to-open.png.asset.json";
import hoogwaardigeKwaliteitImg from "@/assets/hoogwaardige-kwaliteit.png.asset.json";
import hoogwaardigeKwaliteitV2Img from "@/assets/hoogwaardige-kwaliteit-v2.png.asset.json";
import kabelsUitZichtV4Img from "@/assets/kabels-uit-zicht-v4.png.asset.json";





const SPEC_SECTIONS: Array<{ title: string; body: ReactNode }> = [
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
        <li className="flex justify-between gap-4"><span>Breedte</span><span className="text-[#071426]">240 cm</span></li>
        <li className="flex justify-between gap-4"><span>Hoogte</span><span className="text-[#071426]">180 cm</span></li>
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
    body: <p>Beschikbaar in acht standaard afwerkingen: Eikenzwart, Eikengrijs, Walnootbruin, Truffelbruin, Katoengrijs, Zandsteen, Kleibeige en Dofroze. Kleurstalen kun je gratis bestellen.</p>,
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

const COLOR_MAP: Record<string, string> = {
  zwart: "#1a1a1a", black: "#1a1a1a",
  wit: "#f5f5f5", white: "#f5f5f5",
  grijs: "#9ca3af", grey: "#9ca3af", gray: "#9ca3af",
  bruin: "#8b5a2b", brown: "#8b5a2b",
  eik: "#c8a877", oak: "#c8a877", eiken: "#c8a877",
  noten: "#5b3a22", walnut: "#5b3a22", walnoot: "#5b3a22",
  beige: "#d8c9a8", zand: "#d8c9a8", sand: "#d8c9a8",
  goud: "#c9a84c", gold: "#c9a84c",
  zilver: "#c0c0c0", silver: "#c0c0c0",
  oranje: "#ef7027", orange: "#ef7027",
  rood: "#c0392b", red: "#c0392b",
  blauw: "#2f5d8a", blue: "#2f5d8a",
  groen: "#3d6b4a", green: "#3d6b4a",
  antraciet: "#2f3438",
};

const SWATCH_TEXTURES: Array<[RegExp, string]> = [
  [/eikenzwart/, swatchEikenzwart],
  [/eikengrijs/, swatchEikengrijs],
  [/walnootbruin|walnoot|noten/, swatchWalnootbruin],
  [/truffelbruin|truffel/, swatchTruffelbruin],
  [/katoengrijs|katoen/, swatchKatoengrijs],
  [/zandsteen/, swatchZandsteen],
  [/kleibeige|klei/, swatchKleibeige],
  [/dofroze|roze/, swatchDofroze],
];

function colorToCss(name: string): string {
  const key = name.toLowerCase().trim();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  for (const k of Object.keys(COLOR_MAP)) {
    if (key.includes(k)) return COLOR_MAP[k];
  }
  return "#d4d4d4";
}

function swatchTexture(name: string): string | undefined {
  const key = name.toLowerCase().trim();
  return SWATCH_TEXTURES.find(([pattern]) => pattern.test(key))?.[1];
}

function swatchStyle(name: string): CSSProperties {
  const texture = swatchTexture(name);
  if (texture) {
    return {
      backgroundColor: colorToCss(name),
      backgroundImage: `url(${texture})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  const key = name.toLowerCase().trim();
  const hasOak = /eik|oak/.test(key);
  const hasGrey = /grijs|grey|gray/.test(key);
  const hasBlack = /zwart|black|antraciet/.test(key);
  const hasBrown = /bruin|brown|noten|walnut|walnoot/.test(key);
  const hasBeige = /beige|zand|sand|naturel|natural/.test(key);

  if (key.includes("eikenzwart")) {
    return {
      backgroundColor: "#171615",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 5px), repeating-linear-gradient(2deg, rgba(0,0,0,0.22) 0 2px, transparent 2px 13px), linear-gradient(135deg, #11100f 0%, #26231f 50%, #171615 100%)",
    };
  }

  if (key.includes("eikengrijs")) {
    return {
      backgroundColor: "#9c9b90",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(66,58,48,0.24) 0 1px, transparent 1px 5px), repeating-linear-gradient(6deg, rgba(239,235,218,0.2) 0 2px, transparent 2px 15px), linear-gradient(135deg, #b9b5a7 0%, #98978e 52%, #777970 100%)",
    };
  }

  if (key.includes("walnoot") || key.includes("noten")) {
    return {
      backgroundColor: "#6b3f22",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(37,18,8,0.28) 0 1px, transparent 1px 5px), repeating-linear-gradient(5deg, rgba(211,149,83,0.14) 0 2px, transparent 2px 15px), linear-gradient(135deg, #8b552c 0%, #68401f 54%, #3e2413 100%)",
    };
  }

  if (key.includes("truffel")) {
    return {
      backgroundColor: "#7a5a43",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(48,33,22,0.22) 0 1px, transparent 1px 5px), repeating-linear-gradient(7deg, rgba(205,174,139,0.14) 0 2px, transparent 2px 16px), linear-gradient(135deg, #8b6a50 0%, #72523e 55%, #4f392d 100%)",
    };
  }

  if (key.includes("katoen")) {
    return {
      backgroundColor: "#aeb3b3",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(75,82,82,0.16) 0 1px, transparent 1px 5px), repeating-linear-gradient(8deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 16px), linear-gradient(135deg, #c7cbcb 0%, #aeb3b3 55%, #8e9698 100%)",
    };
  }

  if (key.includes("zandsteen")) {
    return {
      backgroundColor: "#c6a15f",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(104,75,32,0.18) 0 1px, transparent 1px 5px), repeating-linear-gradient(8deg, rgba(255,234,186,0.18) 0 2px, transparent 2px 16px), linear-gradient(135deg, #d8b873 0%, #bd9655 55%, #98723b 100%)",
    };
  }

  if (key.includes("klei")) {
    return {
      backgroundColor: "#bcae9d",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(95,76,58,0.16) 0 1px, transparent 1px 5px), repeating-linear-gradient(8deg, rgba(255,247,230,0.18) 0 2px, transparent 2px 16px), linear-gradient(135deg, #d0c4b3 0%, #b8aa97 55%, #978976 100%)",
    };
  }

  if (key.includes("dofroze") || key.includes("roze")) {
    return {
      backgroundColor: "#c4a29e",
      backgroundImage:
        "repeating-linear-gradient(94deg, rgba(105,71,70,0.16) 0 1px, transparent 1px 5px), repeating-linear-gradient(8deg, rgba(255,235,230,0.18) 0 2px, transparent 2px 16px), linear-gradient(135deg, #d3b4af 0%, #bd9a95 55%, #9f7b77 100%)",
    };
  }

  if (hasOak && hasBlack) {
    return {
      backgroundColor: "#1f1d1a",
      backgroundImage:
        "repeating-linear-gradient(86deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 7px), repeating-linear-gradient(6deg, rgba(0,0,0,0.3) 0 2px, transparent 2px 16px), linear-gradient(135deg, #11100f 0%, #24211e 45%, #151413 100%)",
    };
  }

  if (hasOak && hasGrey) {
    return {
      backgroundColor: "#a9aba6",
      backgroundImage:
        "repeating-linear-gradient(88deg, rgba(70,64,55,0.2) 0 1px, transparent 1px 7px), repeating-linear-gradient(12deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 18px), linear-gradient(135deg, #c8c6bb 0%, #a8a59b 48%, #7e8078 100%)",
    };
  }

  if (hasOak || hasBeige) {
    return {
      backgroundColor: "#c7ad78",
      backgroundImage:
        "repeating-linear-gradient(88deg, rgba(103,67,31,0.18) 0 1px, transparent 1px 7px), repeating-linear-gradient(10deg, rgba(255,244,211,0.18) 0 2px, transparent 2px 18px), linear-gradient(135deg, #d9bf86 0%, #bd9860 52%, #8d6334 100%)",
    };
  }

  if (hasBrown) {
    return {
      backgroundColor: "#8a572b",
      backgroundImage:
        "repeating-linear-gradient(88deg, rgba(38,18,8,0.24) 0 1px, transparent 1px 7px), repeating-linear-gradient(9deg, rgba(255,211,155,0.12) 0 2px, transparent 2px 17px), linear-gradient(135deg, #a26734 0%, #7b4824 52%, #422513 100%)",
    };
  }

  return {
    backgroundColor: colorToCss(name),
    backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 9px), linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.1))",
  };
}

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
      <div className="bg-[#f6f3ee]">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 grid md:grid-cols-2 gap-10">
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
  { title: "Kabels uit het zicht", image: kabelsUitZichtImg.url },
  { title: "Eenvoudige klikmontage", image: eenvoudigeKlikmontageImg.url },
  { title: "Persoonlijk advies", image: persoonlijkAdviesImg.url },
  { title: "100 dagen proefkijken", image: proefkijkenImg.url },
  { title: "10 jaar garantie", image: garantieCinewallImg.url },
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
    const first = variants.find((v) => v.availableForSale) || variants[0];
    first?.selectedOptions.forEach((o) => { init[o.name] = o.value; });
    return init;
  });
  const [expandedVariantOption, setExpandedVariantOption] = useState<string | null>(null);
  const [productionDetailsOpen, setProductionDetailsOpen] = useState(false);
  const [benefitsScrollState, setBenefitsScrollState] = useState({ atStart: true, atEnd: false });
  const [openSpecs, setOpenSpecs] = useState<Record<string, boolean>>({});
  


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
  const positionKey = product.options.find((o) => /opstelling|position|richting|side/i.test(o.name))?.name;
  const selectedPosition = positionKey ? selected[positionKey] : undefined;

  const images = useMemo(() => {
    if (!colorKey || !selectedColor) return allImages;

    const anchorVariants = variants
      .map((v) => ({
        color: v.selectedOptions.find((o) => o.name === colorKey)?.value,
        position: positionKey ? v.selectedOptions.find((o) => o.name === positionKey)?.value : undefined,
        url: v.image?.url,
      }))
      .filter((v): v is { color: string; position: string | undefined; url: string } => Boolean(v.color && v.url));

    const selectedAnchorUrls = new Set(
      anchorVariants
        .filter((v) => v.color === selectedColor && (!positionKey || !selectedPosition || v.position === selectedPosition))
        .map((v) => v.url),
    );
    const boundaryAnchorUrls = new Set(
      anchorVariants
        .filter((v) => v.color !== selectedColor || (positionKey && selectedPosition && v.position !== selectedPosition))
        .map((v) => v.url),
    );
    const startIndex = allImages.findIndex((img) => selectedAnchorUrls.has(img.node.url));

    if (startIndex >= 0) {
      const boundaryIndex = allImages.findIndex((img, index) => index > startIndex && boundaryAnchorUrls.has(img.node.url));
      const grouped = allImages.slice(startIndex, boundaryIndex >= 0 ? boundaryIndex : undefined);
      if (grouped.length > 0) return grouped;
    }

    const selectedVariantImages = allImages.filter((img) => selectedAnchorUrls.has(img.node.url));
    const filtered = selectedVariantImages.length > 0 ? selectedVariantImages : allImages.filter((img) => {
      const filename = img.node.url.toLowerCase();
      return selectedColor
        .toLowerCase()
        .split(/\s|-/)
        .every((part) => !part || filename.includes(part));
    });

    return filtered.length > 0 ? filtered : allImages;
  }, [allImages, variants, colorKey, selectedColor, positionKey, selectedPosition]);

  const galleryItems = useMemo(() => {
    if (product.handle === "full-house") return FULL_HOUSE_GALLERY;

    return images.slice(0, 7).map(({ node }, index) => ({
      src: node.url,
      alt: node.altText || product.title,
      full: index === 0 || index === 1 || index === 4,
      square: index === 0,
    }));
  }, [images, product.handle, product.title]);

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

  // Preload every variant image so switching colour/option crossfades instantly.
  useEffect(() => {
    allImages.forEach(({ node }) => {
      const img = new Image();
      img.src = node.url;
    });
  }, [allImages]);

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
  const installmentPrice = displayedNumericPrice > 0
    ? new Intl.NumberFormat("nl-NL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(displayedNumericPrice / 3)
    : null;
  const displayTitle = product.title.replace(/^Wandig\s+/i, "");
  const scrollBenefits = (direction: -1 | 1) => {
    benefitsScrollerRef.current?.scrollBy({ left: direction * 166, behavior: "smooth" });
  };
  return (
    <div className="bg-[#f6f3ee]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 md:py-16">
      <nav className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/producten" className="hover:text-foreground">Modellen</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10 xl:gap-14">
        {/* Gallery */}
        <div className="min-w-0">
          {galleryItems[0] && (
            <figure className={`overflow-hidden rounded-[6px] lg:sticky lg:top-0 lg:z-0 ${product.handle === "full-house" ? "flex aspect-[5/4] items-center justify-center bg-[#f6f3ee]" : ""}`}>
              <img
                ref={mainGalleryImageRef}
                src={galleryItems[0].src}
                alt={galleryItems[0].alt}
                className={`block origin-center transition-[filter,transform] ease-out [will-change:filter,transform] ${product.handle === "full-house" ? "h-auto w-[76.16%] max-w-none object-contain" : galleryItems[0].square ? "aspect-square w-full object-contain" : "aspect-[4/3] w-full object-cover"}`}
                loading="eager"
                fetchPriority="high"
              />
            </figure>
          )}

          <div ref={galleryContinuationRef} className="relative z-10 mt-3 grid grid-cols-2 gap-3 md:mt-4 md:gap-4">
            {galleryItems.slice(1).map((image, index) => (
              <figure
                key={`${image.src}-${index + 1}`}
                className={`${image.full ? "col-span-2" : "col-span-1"} overflow-hidden rounded-[6px]`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`block w-full ${image.square ? "aspect-square object-contain" : "aspect-[4/3] object-cover"}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 lg:sticky lg:top-3 lg:ml-auto lg:w-[490px] lg:self-start">
          <div className="space-y-3">
            <section className="overflow-hidden rounded-[20px] border border-[#eeeeee] bg-[#fef9f5] shadow-[0_18px_45px_rgba(42,31,22,0.07)]">
              <button
                type="button"
                onClick={() => setProductionDetailsOpen((open) => !open)}
                aria-expanded={productionDetailsOpen}
                className="flex min-h-[42px] w-full items-center justify-between gap-4 px-4 text-left text-[#071426]"
              >
                <span className="flex items-center gap-2 font-sans text-[14.4px] font-[385] text-[#cdc0b5]" style={{ textShadow: '0 0.55px 0.55px rgba(0,0,0,0.065)' }}>
                  <img
                    src={dutchDesignIcon.url}
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
                    <img
                      src={puzzlePiecesImg.url}
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
                    <div className="mt-1 flex items-center text-[#4f5966]/78">
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-3 w-3 fill-current" strokeWidth={0} />
                        ))}
                      </span>
                      <span className="ml-2 text-[10px] text-[#071426]/30">(1000+)</span>
                    </div>
                  </div>

                  <div className="min-w-0 text-right">
                    <p className="text-[23px] font-bold leading-none text-[#ff5a00]">{configuratorPrice}</p>
                    {installmentPrice && (
                      <div className="mt-2 text-[12px] leading-[1.4] text-[#071426]/42">
                        <p className="whitespace-nowrap">3 betalingen van {installmentPrice} tegen 0% rente</p>
                        <p className="mt-1 flex items-baseline justify-end gap-2">
                          <strong
                            className="text-[14px] font-bold leading-none text-[#071426]"
                            style={{ fontFamily: '"Klarna Headline", "Circular-Regular", sans-serif' }}
                          >
                            Klarna.
                          </strong>
                          <a href="https://www.klarna.com/nl/klantenservice/" target="_blank" rel="noreferrer" className="underline underline-offset-2 transition-colors hover:text-[#071426]">
                            Meer informatie
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
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
                          { label: "40 - 50 inch", value: opt.values[0] },
                          { label: "55 - 65 inch", value: opt.values[1] },
                          { label: "70 - 80 inch", value: opt.values[2] },
                        ].filter((choice): choice is { label: string; value: string } => Boolean(choice.value))
                      : opt.values.map((value) => ({ label: value, value }));
                    const selectedOptionLabel = isTvSize
                      ? optionChoices.find((choice) => choice.value === selected[opt.name])?.label
                        || (/^(70|80)/.test(selected[opt.name] || "") ? "70 - 80 inch" : selected[opt.name])
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
                              <div className={`grid gap-2 px-3 pb-3 pt-1 ${isTvSize ? "grid-cols-3" : "grid-cols-2"}`}>
                                {optionChoices.map((choice) => {
                                  const active = selected[opt.name] === choice.value
                                    || (isTvSize && choice.label === "70 - 80 inch" && /^(70|80)/.test(selected[opt.name] || ""));
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
                              <span className="truncate text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">{selected[opt.name] || opt.values[0]}</span>
                            </div>
                            <div className="flex items-center justify-end gap-2.5">
                              {opt.values.slice(0, 5).map((value) => {
                                const active = selected[opt.name] === value;
                                return (
                                  <button
                                    key={value}
                                    type="button"
                                    onClick={() => setSelected((current) => ({ ...current, [opt.name]: value }))}
                                    title={value}
                                    aria-label={`Kleur ${value}`}
                                    aria-pressed={active}
                                    className={`h-9 w-9 shrink-0 rounded-full border-2 p-[2px] transition-transform hover:scale-105 active:scale-95 ${active ? "border-[#ff5a00]" : "border-transparent"}`}
                                  >
                                    <span className="block h-full w-full rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.16)]" style={swatchStyle(value)} />
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
                className="group mt-3 h-12 w-full translate-y-0 overflow-hidden rounded-full bg-[#ff5a00] px-6 text-sm font-bold text-white shadow-none transition-colors hover:translate-y-0 hover:bg-[#e95100] hover:shadow-none active:translate-y-0 active:scale-100"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : activeVariant?.availableForSale ? (
                  <span className="relative block h-full w-full overflow-hidden">
                    <span className="absolute inset-0 flex items-center justify-center gap-1.5 font-[200] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      <img src={basketIcon.url} alt="" className="h-5 w-5 object-contain" />In winkelwagen
                    </span>
                    <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-1.5 font-[200] transition-transform duration-300 ease-out group-hover:translate-y-0">
                      <img src={basketIcon.url} alt="" className="h-5 w-5 object-contain" />In winkelwagen
                    </span>
                  </span>
                ) : "Uitverkocht"}
              </Button>

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
              <p className="mt-2.5 text-[14px] font-bold text-[#071426]">Transformeer je woonkamer in 7 - 14 werkdagen.</p>
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
                    <img src={benefit.image} alt="" className="h-full w-full object-cover" loading="lazy" />
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
                    <span className="mx-2 rounded-full bg-[#f6f3ee] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#071426]">
                      240 cm
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
                    <span className="my-2 rounded-full bg-[#f6f3ee] px-2 py-1 text-[11px] font-medium tracking-wide text-[#071426] [writing-mode:vertical-rl] rotate-180">
                      180 cm
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

                  <img
                    src={cinewallSchema.url}
                    alt="Schematische weergave Wandig Full House, 240 cm breed en 180 cm hoog"
                    className="relative block h-auto w-full object-contain"
                    style={{ background: "transparent" }}
                    loading="lazy"
                  />
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

      <UniqueSection />

      <BeforeAfterSection />

      <CustomerGallerySection />

      <BuiltToLastSection />

      <FaqSection />

      </div>

      <ReviewsSection />

      <NewsletterContactSection />

      <TrustBannerSection />

    </div>
  );
}

const UNIQUE_CARDS: Array<{
  eyebrow?: string;
  title: string;
  body?: string;
  image: string;
  variant: "light" | "overlay-top" | "overlay-bottom";
  lightText?: boolean;
}> = [
  {
    title: "Stijlvolle kleuren",
    body: "Tijdloze tinten voor ieder interieur",
    image: stijlvolleKleurenImg.url,
    variant: "light",
  },
  {
    title: "Hoogwaardige kwaliteit",
    body: "Stevig gebouwd voor jarenlang woonplezier",
    image: hoogwaardigeKwaliteitV2Img.url,
    variant: "light",
    lightText: true,
  },
  {
    title: "Kabels uit het zicht",
    body: "Snoeren en aansluitingen netjes weggewerkt",
    image: kabelsUitZichtV4Img.url,
    variant: "light",
  },
  {
    title: "Push-to-open",
    body: "Greeploos openen met één lichte druk",
    image: pushToOpenImg.url,
    variant: "light",
    lightText: true,
  },
  {
    title: "Eenvoudige montage",
    body: "Slim ontworpen voor een snelle plaatsing",
    image: eenvoudigeMontageDetailImg.url,
    variant: "light",
    lightText: true,
  },
  {
    title: "Onderhoudsvriendelijk",
    body: "Eenvoudig schoon te houden",
    image: onderhoudsvriendelijkImg.url,
    variant: "light",
    lightText: true,
  },
];

function UniqueSection() {
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
        <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">Dit maakt Full House uniek</h2>
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
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-x-0 top-0 px-6 pb-10 pt-6 md:px-7 md:pt-7">
              {card.eyebrow && (
                <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] ${card.lightText ? "text-white/70" : "text-[#071426]/60"}`}>{card.eyebrow}</p>
              )}
              <h3 className={`text-[20px] md:text-[22px] font-bold leading-tight ${card.lightText ? "text-white" : "text-[#071426]"}`}>{card.title}</h3>
              {card.body && (
                <p className={`mt-2 text-[13px] leading-relaxed ${card.lightText ? "text-white/80" : "text-[#071426]/70"}`}>{card.body}</p>
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

function BeforeAfterSection() {
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
                <img src={plugAndPlayIcon.url} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-90" />
              </div>
              <div className="pt-0.5">
                <p className="text-[15px] font-semibold text-[#071426]">Plug-and-Play</p>
                <p className="text-[13px] text-[#071426]/55 leading-snug">Eenvoudig en snel te monteren</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#071426]/5 group-hover:border-[#ef7027]/30 transition-colors">
                <img src={warrantyIcon.url} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-90" />
              </div>
              <div className="pt-0.5">
                <p className="text-[15px] font-semibold text-[#071426]">10 jaar garantie</p>
                <p className="text-[13px] text-[#071426]/55 leading-snug">Langdurige zekerheid</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#071426]/5 group-hover:border-[#ef7027]/30 transition-colors">
                <img src={kijkplezierIcon.url} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-90" />
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
            <img
              src={afterFullHouseAsset.url}
              alt="Woonkamer na Full House"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                src={beforeFullHouseAsset.url}
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

function PuzzleCornerIcon({ className }: { className?: string }) {
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

type GalleryImage = { src: string; alt: string };
const GALLERY_IMG = (id: string, alt: string): GalleryImage => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`,
  alt,
});

// Each column is either one tall image or a stack of two.
const CUSTOMER_GALLERY_COLUMNS: Array<{
  width: string;
  items: GalleryImage[];
}> = [
  {
    width: "w-[240px] md:w-[340px]",
    items: [GALLERY_IMG("photo-1616486338812-3dadae4b4ace", "Woonkamer met Full House cinewall")],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      GALLERY_IMG("photo-1600210492486-724fe5c67fb0", "Interieur met tv-meubel"),
      GALLERY_IMG("photo-1615529182904-14819c35db37", "Minimalistisch interieur met tv-wand"),
    ],
  },
  {
    width: "w-[220px] md:w-[300px]",
    items: [GALLERY_IMG("photo-1616627561950-9f746e330187", "Warme woonkamer met houten cinewall")],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      GALLERY_IMG("photo-1600607687939-ce8a6c25118c", "Moderne woonkamer met tv-wand"),
      GALLERY_IMG("photo-1600566753190-17f0baa2a6c3", "Stijlvol tv-meubel"),
    ],
  },
  {
    width: "w-[240px] md:w-[340px]",
    items: [GALLERY_IMG("photo-1615873968403-89e068629265", "Sfeervolle woonkamer met cinewall")],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      GALLERY_IMG("photo-1616137466211-f939a420be84", "Design interieur"),
      GALLERY_IMG("photo-1618220179428-22790b461013", "Lichte woonkamer"),
    ],
  },
];


function CustomerGallerySection() {
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
          {CUSTOMER_GALLERY_COLUMNS.map((col, colIndex) => (
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


const BUILT_TO_LAST_CARDS: Array<{
  eyebrow: string;
  title: string;
  body: string;
  bg: string;
  tone: "light" | "dark";
}> = [
  {
    eyebrow: "Gemaakt om te blijven",
    title: "10 jaar garantie\nop jouw tv-kast.",
    body: "Ontworpen voor jarenlang dagelijks gebruik, zonder dat je je zorgen hoeft te maken.",
    bg: "#f0e4d5",
    tone: "light",
  },
  {
    eyebrow: "Zo staat hij",
    title: "Plug-and-play\ngemonteerd.",
    body: "Slim voorbereid en eenvoudig in elkaar te zetten, zonder ingewikkeld maatwerk.",
    bg: "#c0b3a4",
    tone: "light",
  },
  {
    eyebrow: "Kijk het rustig aan",
    title: "100 dagen\nproefkijken.",
    body: "Ervaar thuis of jouw nieuwe tv-kast echt bij je interieur past.",
    bg: "#a55f3e",
    tone: "dark",
  },
  {
    eyebrow: "Van Nederlandse bodem",
    title: "Dutch Design\nvoor aan de muur.",
    body: "Rustig vormgegeven in Nederland, met aandacht voor ieder detail.",
    bg: "#936850",
    tone: "dark",
  },
];

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
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

function BuiltToLastSection() {
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
    <section className="mt-12 md:mt-20">
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
        className={`-mx-4 flex gap-3 overflow-x-auto scrollbar-hide px-4 md:mx-0 md:gap-4 md:px-0 ${
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
            <div
              className={`relative flex h-full flex-col p-6 md:p-7 ${
                card.tone === "light" ? "text-[#071426]" : "text-white"
              }`}
            >
              <div
                className={`text-[12px] md:text-[13px] font-normal ${
                  card.tone === "light" ? "text-[#071426]/60" : "text-white/80"
                }`}
              >
                {card.eyebrow}
              </div>
              <h3 className="mt-2 whitespace-pre-line text-[18px] md:text-[22px] font-bold leading-[1.15]">
                {card.title}
              </h3>
              <p
                className={`mt-3 max-w-[240px] text-[13px] md:text-[14px] leading-relaxed ${
                  card.tone === "light" ? "text-[#071426]/70" : "text-white/85"
                }`}
              >
                {card.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
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
        className="rounded-[14px] bg-white p-4 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:p-5"
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
    <section className="mt-12 md:mt-20">
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
    </section>
  );
}

const REVIEWS: Array<{ name: string; location: string; rating: number; title: string; body: string; date: string }> = [
  { name: "Sanne V.", location: "Utrecht", rating: 5, title: "Kwaliteit is top", body: "De Full House staat prachtig in onze woonkamer. Afwerking is echt perfect en de montage was zo gepiept.", date: "3 weken geleden" },
  { name: "Jeroen B.", location: "Amsterdam", rating: 5, title: "Meer dan verwacht", body: "Bestelling verliep soepel en levering was op tijd. De kast oogt luxer dan op de foto's.", date: "1 maand geleden" },
  { name: "Lisa D.", location: "Den Haag", rating: 5, title: "Fantastisch meubel", body: "Onze woonkamer is compleet veranderd. Kabels netjes weggewerkt en de soundbar past perfect.", date: "1 maand geleden" },
  { name: "Mark H.", location: "Rotterdam", rating: 4, title: "Mooi en stevig", body: "Zeer tevreden over de kwaliteit. Montage duurde iets langer dan verwacht maar het resultaat is top.", date: "2 maanden geleden" },
  { name: "Eva K.", location: "Eindhoven", rating: 5, title: "Precies wat we zochten", body: "De kleurstalen thuis waren super handig. Uiteindelijk gekozen voor eiken, ziet er warm en tijdloos uit.", date: "2 maanden geleden" },
  { name: "Tom S.", location: "Groningen", rating: 5, title: "Klantenservice top", body: "Had een vraag over de afmetingen en werd direct geholpen. Aanrader!", date: "2 maanden geleden" },
  { name: "Anouk M.", location: "Breda", rating: 5, title: "Design meubel", body: "Ziet er echt uit als een designstuk. Vrienden vragen meteen waar we hem vandaan hebben.", date: "3 maanden geleden" },
  { name: "Rick J.", location: "Nijmegen", rating: 4, title: "Solide en netjes", body: "Kwaliteit is prima, prijs is eerlijk. Levertijd was 10 dagen, precies zoals aangegeven.", date: "3 maanden geleden" },
  { name: "Fleur P.", location: "Haarlem", rating: 5, title: "Zo blij mee", body: "De tv-wand maakt onze woonkamer af. Zelfmontage was verrassend makkelijk met z'n tweeën.", date: "4 maanden geleden" },
];

function ReviewsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="mt-12 bg-[#fff7ef] py-10 md:mt-20 md:py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">Reviews</span>
            <h2 className="mt-2 text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
              Wat klanten zeggen over hun tv-kast.
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Vorige"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#071426] transition hover:bg-[#f6f3ee]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Volgende"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#071426] transition hover:bg-[#f6f3ee]"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mx-auto flex max-w-[1400px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 md:px-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-pl-5 md:scroll-pl-10"
      >
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            className="flex w-[280px] shrink-0 snap-start flex-col justify-between rounded-[14px] bg-white p-5 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:w-[340px]"
          >
            <div className="pb-5">
              <div className="flex items-center gap-1 text-[#ef7027]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className={idx < r.rating ? "text-[#ef7027]" : "text-[#e5ded4]"}>★</span>
                ))}
              </div>
              <h3 className="mt-3 text-[15px] font-[500] text-[#071426]">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#071426]/65 md:text-[14px]">{r.body}</p>
            </div>
            <div className="border-t border-[#e5ded4]/40 pt-5 flex items-center gap-2.5 text-[12px]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#ef7027]">
                <User className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="font-[500] text-[#071426]">{r.name} · {r.location}</span>
              <span className="text-[#071426]/50">· {r.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


function NewsletterContactSection() {
  const [email, setEmail] = useState("");
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
    setStatus("loading");
    setMessage("");
    try {
      const res = await subscribeNewsletter({ data: { email: trimmed, source: "product-page" } });
      setStatus("success");
      setMessage(res.alreadySubscribed ? "Je bent al ingeschreven — bedankt!" : "Bedankt! Je bent ingeschreven.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    }
  };

  return (
    <section className="bg-[#fffcf8]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-[500] leading-tight text-[#071426]">
              Meld je aan voor onze nieuwsbrief
            </h2>
            <p className="mt-3 max-w-md text-[14px] md:text-[15px] leading-relaxed text-[#071426]/70">
              Blijf op de hoogte van nieuwe modellen, styling-tips en exclusieve aanbiedingen. Geen spam — schrijf je uit wanneer je wilt.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">E-mailadres</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                placeholder="jouw@email.nl"
                className="h-12 flex-1 rounded-full border border-[#e2d3bf] bg-white px-5 text-[14px] text-[#071426] placeholder:text-[#071426]/40 focus:border-[#ef7027] focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 rounded-full bg-[#ef7027] px-7 text-[14px] font-[500] text-white transition hover:brightness-95 disabled:opacity-60"
              >
                {status === "loading" ? "Bezig..." : "Inschrijven"}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-[13px] ${status === "success" ? "text-[#2d6a3e]" : "text-[#b3341c]"}`}>{message}</p>
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:gap-6">
            <div className="flex flex-col">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071426]/5">
                  <Phone className="h-[18px] w-[18px] text-[#071426]/45" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[14px] font-[500] text-[#071426]">Bel ons, steun 9-5</p>
                  <p className="text-[13px] text-[#071426]/60">9:00 - 18:00</p>
                </div>
              </div>
              <p className="mt-5 text-[12px] font-[500] leading-tight text-[#071426]">+31 085 107 1953</p>
              <div className="mt-5 h-px w-full bg-[#071426]/10" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071426]/5">
                  <Headphones className="h-[18px] w-[18px] text-[#071426]/45" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[14px] font-[500] text-[#071426]">Chat live, agent 9-5</p>
                  <p className="text-[13px] text-[#071426]/60">9:00 - 22:00</p>
                </div>
              </div>
              <p className="mt-5 text-[12px] font-[500] leading-tight text-[#071426]">Chat met ons</p>
              <div className="mt-5 h-px w-full bg-[#071426]/10" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071426]/5">
                  <Mail className="h-[18px] w-[18px] text-[#071426]/45" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[14px] font-[500] text-[#071426]">Stuur een mail</p>
                  <p className="text-[13px] text-[#071426]/60">iedere werkdag</p>
                </div>
              </div>
              <p className="mt-5 text-[12px] font-[500] leading-tight text-[#071426] break-words">support.nl@wandig.com</p>
              <div className="mt-5 h-px w-full bg-[#071426]/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBannerSection() {
  const items = [
    { imageIcon: kijkplezierIcon.url, label: "100 dagen proefkijken" },
    { icon: Truck, label: "Gratis bezorgd in Nederland" },
    { icon: Monitor, label: "Geschikt voor tv's tot 80 inch" },
    { icon: ShieldCheck, label: "10 jaar garantie" },
  ];

  return (
    <section className="bg-[#f7f3ef]">
      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, imageIcon, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ef7027]/10">
                {imageIcon ? (
                  <div
                    className="h-6 w-6 bg-[#ef7027]"
                    style={{
                      maskImage: `url(${imageIcon})`,
                      WebkitMaskImage: `url(${imageIcon})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                    aria-hidden="true"
                  />
                ) : Icon ? (
                  <Icon className="h-5 w-5 text-[#ef7027]" strokeWidth={1.5} />
                ) : null}
              </div>
              <p className="text-[14px] font-[500] leading-snug text-[#071426]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






