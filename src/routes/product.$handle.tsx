import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, ChevronRight, ChevronLeft, ChevronDown, Check, X, Star, Hammer, ShieldCheck, Ruler, ShoppingBag, Truck } from "lucide-react";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import productStoryBlackOakOrangeImg from "@/assets/product-story-black-oak-orange.jpg";
import comparisonDiyWallImg from "@/assets/comparison-diy-wall.jpg";
import comparisonStandardFurnitureImg from "@/assets/comparison-standard-furniture.jpg";
import wandigLogoWhite from "@/assets/wandig-logo-white.png";
import fullHouseGalleryMain from "@/assets/full-house-gallery-main.png";
import fullHouseGalleryRoom from "@/assets/full-house-gallery-room.jpg";
import fullHouseGalleryStylingOne from "@/assets/full-house-gallery-styling-one.webp";
import fullHouseGalleryStylingTwo from "@/assets/full-house-gallery-styling-two.webp";
import fullHouseGalleryFinish from "@/assets/full-house-gallery-finish.webp";
import fullHouseGalleryStorage from "@/assets/full-house-gallery-storage.webp";
import fullHouseGalleryUse from "@/assets/full-house-gallery-use.webp";
import swatchDofroze from "@/assets/swatches/dofroze.jpg";
import swatchEikengrijs from "@/assets/swatches/eikengrijs.jpg";
import swatchEikenzwart from "@/assets/swatches/eikenzwart.jpg";
import swatchKatoengrijs from "@/assets/swatches/katoengrijs.jpg";
import swatchKleibeige from "@/assets/swatches/kleibeige.jpg";
import swatchTruffelbruin from "@/assets/swatches/truffelbruin.jpg";
import swatchWalnootbruin from "@/assets/swatches/walnootbruin.jpg";
import swatchZandsteen from "@/assets/swatches/zandsteen.jpg";

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
      <div className="bg-[#e5dcd4]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 grid md:grid-cols-2 gap-10">
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
  { title: "Rust zonder kabels", image: productStoryBlackOakOrangeImg },
  { title: "Handgemaakt in NL", image: detailMaatwerkImg },
  { title: "Ontworpen voor jouw woonkamer", image: fullHouseGalleryRoom },
  { title: "5 jaar garantie", image: fullHouseGalleryStylingOne },
  { title: "Eenvoudig te plaatsen", image: fullHouseGalleryUse },
];

function ComparisonMiniVisual({ type, compact = false }: { type: "diy" | "furniture"; compact?: boolean }) {
  const src = type === "diy" ? comparisonDiyWallImg : comparisonStandardFurnitureImg;
  const alt = type === "diy" ? "Zelfbouw tv-wand in aanbouw" : "Standaard tv-meubel in woonkamer";

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-[10px] object-cover shadow-[0_10px_26px_rgba(18,18,18,0.09)] ${compact ? "h-9 w-11" : "h-14 w-[78px]"}`}
      loading="lazy"
    />
  );
}

function ProductView({ product }: { product: ProductNode }) {
  const variants = useMemo(
    () => product.variants.edges.map((e) => e.node as typeof e.node & { image?: { url: string; altText: string | null } | null }),
    [product],
  );
  const reviewCarouselRef = useRef<HTMLDivElement>(null);
  const benefitsScrollerRef = useRef<HTMLDivElement>(null);
  const reviewDragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    const first = variants.find((v) => v.availableForSale) || variants[0];
    first?.selectedOptions.forEach((o) => { init[o.name] = o.value; });
    return init;
  });

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

  // Preload every variant image so switching colour/option crossfades instantly.
  useEffect(() => {
    allImages.forEach(({ node }) => {
      const img = new Image();
      img.src = node.url;
    });
  }, [allImages]);

  const reviews = useMemo(() => [
    {
      name: "Milan V.",
      title: "Eindelijk geen losse kabels meer.",
      body: "De wand oogt rustig en strak. Vooral het plug & play gemak maakte verschil: alles voelde direct logisch en netjes afgewerkt.",
    },
    {
      name: "Sanne K.",
      title: "Veel mooier dan een standaard tv-meubel.",
      body: "We wilden iets dat echt bij de woonkamer past. De kleur, maat en indeling voelen alsof het altijd al zo hoorde.",
    },
    {
      name: "Noah B.",
      title: "Strak afgewerkt tot in de details.",
      body: "Onze soundbar en apparatuur zijn weggewerkt zonder dat het geluid minder is geworden. Precies het rustige beeld dat we zochten.",
    },
    {
      name: "Eva R.",
      title: "Professioneel van ontwerp tot levering.",
      body: "Het advies vooraf was duidelijk en de levering verliep heel netjes. Je ziet dat dit geen snelle standaardoplossing is.",
    },
    {
      name: "Jeroen T.",
      title: "De woonkamer voelt meteen luxer.",
      body: "Iedereen die binnenkomt vraagt naar de cinewall. Het is functioneel, maar vooral heel mooi en rustig in het interieur.",
    },
    {
      name: "Lisa D.",
      title: "Alles klopt precies met de ruimte.",
      body: "De cinewall voelt niet als een los meubel, maar als onderdeel van het huis. Dat maakt de woonkamer veel rustiger.",
    },
    {
      name: "Bram H.",
      title: "Montage was sneller dan verwacht.",
      body: "Binnen een dag stond alles strak. Geen rommel, geen losse snoeren en de afwerking is echt netjes gedaan.",
    },
    {
      name: "Nora P.",
      title: "Precies de warme uitstraling die we wilden.",
      body: "De kleurstalen hielpen enorm. Uiteindelijk past de gekozen afwerking perfect bij onze vloer en meubels.",
    },
  ], []);

  useEffect(() => {
    const carousel = reviewCarouselRef.current;
    if (!carousel || reviews.length === 0) return;

    const getMetrics = () => {
      const firstCard = carousel.querySelector<HTMLElement>("[data-review-card]");
      if (!firstCard) return null;

      const gap = parseFloat(window.getComputedStyle(carousel).columnGap || "0");
      const step = firstCard.offsetWidth + gap;
      const loopWidth = step * reviews.length;
      return step && loopWidth ? { step, loopWidth } : null;
    };

    const placeAtMiddleSet = () => {
      const metrics = getMetrics();
      if (metrics) carousel.scrollLeft = metrics.loopWidth;
    };

    placeAtMiddleSet();
    window.setTimeout(placeAtMiddleSet, 100);

    const advance = () => {
      if (reviewDragRef.current.active) return;

      const metrics = getMetrics();
      if (!metrics) return;

      const { step, loopWidth } = metrics;
      if (carousel.scrollLeft >= loopWidth * 2 - step) {
        carousel.scrollLeft -= loopWidth;
      }

      carousel.scrollBy({ left: step, behavior: "smooth" });

      window.setTimeout(() => {
        if (carousel.scrollLeft >= loopWidth * 2) {
          carousel.scrollLeft -= loopWidth;
        }
      }, 850);
    };

    const interval = window.setInterval(advance, 7000);
    return () => window.clearInterval(interval);
  }, [reviews.length]);

  const normalizeReviewCarousel = () => {
    const carousel = reviewCarouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>("[data-review-card]");
    if (!carousel || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(carousel).columnGap || "0");
    const loopWidth = (firstCard.offsetWidth + gap) * reviews.length;
    if (!loopWidth) return;

    if (carousel.scrollLeft < loopWidth * 0.5) {
      carousel.scrollLeft += loopWidth;
    } else if (carousel.scrollLeft > loopWidth * 2.5) {
      carousel.scrollLeft -= loopWidth;
    }
  };

  const startReviewDrag = (event: PointerEvent<HTMLDivElement>) => {
    const carousel = reviewCarouselRef.current;
    if (!carousel) return;

    reviewDragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
    };
    carousel.setPointerCapture(event.pointerId);
  };

  const moveReviewDrag = (event: PointerEvent<HTMLDivElement>) => {
    const carousel = reviewCarouselRef.current;
    if (!carousel || !reviewDragRef.current.active) return;

    event.preventDefault();
    const delta = event.clientX - reviewDragRef.current.startX;
    carousel.scrollLeft = reviewDragRef.current.scrollLeft - delta;
    normalizeReviewCarousel();
  };

  const endReviewDrag = (event: PointerEvent<HTMLDivElement>) => {
    const carousel = reviewCarouselRef.current;
    if (!carousel || !reviewDragRef.current.active) return;

    reviewDragRef.current.active = false;
    if (carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }
    normalizeReviewCarousel();
  };

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
  const activePrice = activeVariant ? formatPrice(activeVariant.price.amount, activeVariant.price.currencyCode) : "Prijs op aanvraag";
  const numericPrice = activeVariant ? parseFloat(activeVariant.price.amount) : 0;
  const configuratorPrice = numericPrice > 0 ? activePrice.replace("€", "").trim() : product.handle === "full-house" ? "1699,-" : activePrice;
  const installmentPrice = numericPrice > 0
    ? formatPrice((numericPrice / 3).toFixed(2), activeVariant!.price.currencyCode)
    : "€581,66";
  const displayTitle = product.title.replace(/^Wandig\s+/i, "");
  const scrollBenefits = (direction: -1 | 1) => {
    benefitsScrollerRef.current?.scrollBy({ left: direction * 180, behavior: "smooth" });
  };
  return (
    <div className="bg-[#e5dcd4]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-10 md:py-16">
      <nav className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/producten" className="hover:text-foreground">Modellen</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.42fr)_minmax(360px,0.78fr)] lg:gap-10 xl:gap-14">
        {/* Gallery */}
        <div className="grid min-w-0 grid-cols-2 gap-3 md:gap-4">
          {galleryItems.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={`${image.full ? "col-span-2" : "col-span-1"} overflow-hidden rounded-[6px]`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`block w-full ${image.square ? "aspect-square object-contain" : "aspect-[4/3] object-cover"}`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </figure>
          ))}
        </div>

        {/* Info */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-3">
            <section className="rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_18px_45px_rgba(42,31,22,0.07)]">
              <div className="grid grid-cols-[minmax(0,1fr)_132px] gap-4">
                <div>
                  <h1 className="text-[28px] font-bold leading-none text-[#071426]">{displayTitle}</h1>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-[#071426]/65">
                    <span className="grid h-3.5 w-5 overflow-hidden border border-black/10" aria-hidden="true">
                      <span className="bg-[#ae1c28]" />
                      <span className="bg-white" />
                      <span className="bg-[#21468b]" />
                    </span>
                    <span>Nederlandse productie</span>
                    <span className="ml-1 h-4 w-px bg-black/20" />
                  </div>
                  <p className="mt-3 text-[13px] font-medium text-[#071426]">Tv-kast</p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[#071426]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" strokeWidth={0} />
                    ))}
                    <span className="ml-1 text-[11px] text-[#071426]/60">(1000+)</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[28px] font-bold leading-none text-[#ff5a00]">{configuratorPrice}</p>
                  <p className="mt-4 text-[10px] leading-relaxed text-[#071426]/76">
                    3 betalingen van {installmentPrice}<br />tegen 0% rente met <strong className="text-[#071426]">Klarna.</strong>
                  </p>
                  <a href="https://www.klarna.com/nl/klantenservice/" target="_blank" rel="noreferrer" className="mt-2 inline-block text-[10px] text-[#071426] underline underline-offset-2">
                    Meer informatie
                  </a>
                </div>
              </div>

              {hasOptions && (
                <div className="mt-4 space-y-2">
                  {visibleOptions.map((opt) => {
                    const isColor = /kleur|color/i.test(opt.name);
                    const label = isColor ? "Kleur" : /maat|size|inch/i.test(opt.name) ? "Tv-maat" : "Opstelling";

                    return (
                      <div key={opt.name} className="grid min-h-[52px] grid-cols-[76px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-black/10 px-3">
                        <span className="text-[14px] font-bold text-[#071426]">{label}</span>
                        {isColor ? (
                          <div className="grid grid-cols-8 items-center gap-1.5">
                            {opt.values.map((value) => {
                              const active = selected[opt.name] === value;
                              return (
                                <button
                                  key={value}
                                  type="button"
                                  onClick={() => setSelected((current) => ({ ...current, [opt.name]: value }))}
                                  title={value}
                                  aria-label={`Kleur ${value}`}
                                  aria-pressed={active}
                                  className={`mx-auto h-6 w-6 rounded-full border-2 p-[2px] transition-transform hover:scale-105 active:scale-95 xl:h-7 xl:w-7 ${active ? "border-[#ff5a00]" : "border-transparent"}`}
                                >
                                  <span className="block h-full w-full rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.16)]" style={swatchStyle(value)} />
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <label className="relative block min-w-0">
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
                className="mt-3 h-12 w-full translate-y-0 rounded-full bg-[#ff5a00] px-6 text-sm font-bold text-white shadow-none transition-colors hover:translate-y-0 hover:bg-[#e95100] hover:shadow-none active:translate-y-0 active:scale-100"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : activeVariant?.availableForSale ? (
                  <span className="flex items-center justify-center gap-3"><ShoppingBag className="h-5 w-5" />In winkelwagen</span>
                ) : "Uitverkocht"}
              </Button>

              <div className="mt-3 grid grid-cols-3 divide-x divide-black/10 text-[#071426]">
                <div className="flex items-center justify-center gap-1.5 px-2 text-center text-[9px] leading-tight"><ShieldCheck className="h-[18px] w-[18px] shrink-0" /><span>5 jaar garantie</span></div>
                <div className="flex items-center justify-center gap-1.5 px-2 text-center text-[9px] leading-tight"><Hammer className="h-[18px] w-[18px] shrink-0" /><span>Handgemaakt in NL</span></div>
                <div className="flex items-center justify-center gap-1.5 px-2 text-center text-[9px] leading-tight"><Truck className="h-[18px] w-[18px] shrink-0" /><span>7 - 14 werkdagen levertijd</span></div>
              </div>
            </section>

            <section className="rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_14px_34px_rgba(42,31,22,0.05)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-semibold text-[#071426]">
                <span className="h-2 w-2 rounded-full bg-[#ff5a00]" />Laatste exemplaren
              </span>
              <p className="mt-2.5 text-[14px] font-bold text-[#071426]">Transformeer je woonkamer in 7 - 14 werkdagen.</p>
              <p className="mt-1 text-[12px] text-[#071426]/55">Bestel vandaag en transformeer je woonkamer.</p>
            </section>

            <section className="overflow-hidden rounded-[20px] border border-black/10 bg-white p-3 shadow-[0_14px_34px_rgba(42,31,22,0.05)]">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-[14px] font-bold text-[#071426]">Jouw voordelen</h2>
                <div className="flex gap-1.5">
                  <button type="button" aria-label="Vorige voordelen" onClick={() => scrollBenefits(-1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-[#071426] transition-colors hover:bg-[#f7f3f0]"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <button type="button" aria-label="Volgende voordelen" onClick={() => scrollBenefits(1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-[#071426] transition-colors hover:bg-[#f7f3f0]"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div ref={benefitsScrollerRef} className="flex snap-x snap-mandatory gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {PRODUCT_BENEFITS.map((benefit) => (
                  <article key={benefit.title} className="relative h-[136px] min-w-[116px] snap-start overflow-hidden rounded-[13px] bg-[#eee4dc]">
                    <img src={benefit.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/88 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#7a3422]">Inclusief</span>
                    <h3 className="absolute inset-x-2.5 bottom-2.5 text-[12px] font-semibold leading-tight text-white drop-shadow">{benefit.title}</h3>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-8 rounded-[20px] border border-black/10 bg-white p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Productomschrijving</span>
          <h2 className="mt-2 font-serif text-2xl leading-tight">Gemaakt voor rust in jouw woonkamer</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            {product.description || "Elke Wandig cinewall wordt met de hand gemaakt en volledig voorbereid geleverd. Kabels, apparatuur en aansluitingen krijgen een vaste plek voor een rustig en strak eindbeeld."}
          </p>
        </div>

        <div>
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Goed om te weten</span>
          <Accordion type="single" collapsible className="mt-2">
            {[
              { value: "details", title: "Details & formaat", body: ["Massief houten frame, gemaakt in vaste maten voor jouw tv en woonkamer. Kabels netjes weggewerkt en een geluidsdoorlatend front.", "Standaard hoogte 240 cm — andere afmetingen op aanvraag mogelijk."] },
              { value: "materiaal", title: "Materiaal & afwerking", body: ["FSC-gecertificeerd massief hout uit Europese bossen. Geen plaatmateriaal, geen plastic afwerking.", "Met de hand geschaafd, gelijmd en afgewerkt in onze eigen werkplaats."] },
              { value: "shipping", title: "Verzending & plaatsing", body: ["Gratis levering bij jou thuis. Levertijd 7–14 werkdagen.", "De cinewall is plug & play ontworpen, zodat je hem eenvoudig zelf neerzet en aansluit."] },
              { value: "garantie", title: "Garantie & retour", body: ["Vijf jaar garantie op constructie en afwerking.", "30 dagen bedenktijd — niet tevreden? Wij halen de cinewall kosteloos op."] },
            ].map(({ value, title, body }) => (
              <AccordionItem key={value} value={value} className="border-b border-black/10 px-0 first:border-t">
                <AccordionTrigger className="py-4 text-left text-[14px] font-semibold text-foreground no-underline hover:text-[#ff5a00] hover:no-underline">{title}</AccordionTrigger>
                <AccordionContent className="space-y-2 pb-4 pr-8 text-sm leading-relaxed text-foreground/68">
                  {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      </div>

      {/* Product story */}
      <section className="bg-[#e5dcd4] px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[22px] border border-[#dedede] bg-white md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-8 py-7 md:order-1 md:h-[720px] md:px-12 md:py-0 lg:px-16">
            <h2 className="max-w-xl font-serif text-[1.875rem] leading-[1.05] text-foreground md:text-[2.375rem]">
              Rustig beeld, perfect weggewerkt.
            </h2>
            <p className="mt-3 max-w-xl text-[17.5px] leading-relaxed text-foreground/72">
              Tv, soundbar, apparatuur en kabels krijgen één vaste plek in een cinewall die je eenvoudig samenstelt voor jouw ruimte. Geen losse snoeren, geen drukke hoekjes en geen meubel dat net niet past — alleen een rustig wandbeeld dat klopt in verhouding, materiaal en afwerking.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: Ruler,
                  title: "Plug & play",
                  body: "Keuze uit vaste maten, kleuren en opstellingen.",
                },
                {
                  icon: Hammer,
                  title: "Eenvoudig te plaatsen",
                  body: "Slim ontworpen zodat je hem eenvoudig zelf neerzet en aansluit.",
                },
                {
                  icon: ShieldCheck,
                  title: "Zeker gevoel",
                  body: "5 jaar garantie en 30 dagen bedenktijd na plaatsing.",
                },
              ].map(({ icon: I, title, body }) => (
                <div key={title}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ef7027]/35 text-[#ef7027]">
                    <I className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-2.5 text-[17.5px] font-semibold leading-tight">{title}</h3>
                  <p className="mt-1.5 text-[16.25px] leading-relaxed text-foreground/64">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 h-[528px] bg-[#f2f0ed] md:order-2 md:h-[720px]">
            <img
              src={productStoryBlackOakOrangeImg}
              alt="Ingezoomde Wandig Full House black oak cinewall in oranje studio"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#e5dcd4] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 md:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <h2 className="max-w-lg font-serif text-[1.94rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[2.92rem]">
              Waarom Wandig de <span className="text-[#ef7027]">perfecte keuze is</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/72 md:text-[16px]">
              Geen los meubel, geen half afgewerkte wand. Wandig combineert plug & play gemak, slimme afwerking en een strak eindbeeld in één oplossing voor jouw woonkamer.
            </p>
          </div>

          <div className="md:hidden">
            <div className="grid grid-cols-[minmax(0,1fr)_72px_50px_50px] grid-rows-[96px_auto] items-stretch gap-x-1.5">
              <div className="col-start-2 row-start-1 flex flex-col items-center justify-center rounded-t-[11px] bg-[#f56e16] px-1.5">
                <img
                  src={wandigLogoWhite}
                  alt="Wandig"
                  className="w-[64px] max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="col-start-3 row-start-1 flex flex-col items-center justify-end pb-3 text-center">
                <div className="mb-2.5">
                  <ComparisonMiniVisual type="diy" compact />
                </div>
                <p className="text-[10px] leading-tight text-foreground/70">Zelf<br />bouw</p>
              </div>

              <div className="col-start-4 row-start-1 flex flex-col items-center justify-end pb-3 text-center">
                <div className="mb-2.5">
                  <ComparisonMiniVisual type="furniture" compact />
                </div>
                <p className="text-[10px] leading-tight text-foreground/70">Standaard<br />meubel</p>
              </div>

              <div className="row-start-2 overflow-hidden rounded-[11px] bg-[#f7f7f7]">
                {[
                  "Plug & play rondom jouw tv",
                  "Kabels netjes weggewerkt",
                  "Gratis levering, zelf plaatsen",
                  "Rustig ingebouwd eindbeeld",
                  "Massief hout en nette afwerking",
                  "5 jaar garantie",
                ].map((feature) => (
                  <div key={feature} className="flex min-h-[54px] items-center px-3.5 text-[12.5px] font-medium leading-snug text-foreground/88">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="col-start-2 row-start-2 overflow-hidden rounded-b-[11px] bg-gradient-to-b from-[#f56e16] to-[#f08971]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex min-h-[54px] items-center justify-center border-t border-white/10">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#f56e16]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="row-start-2">
                {["check", "x", "x", "x", "check", "x"].map((state, index) => (
                  <div key={`${state}-${index}`} className="flex min-h-[54px] items-center justify-center">
                    {state === "check" ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd6cf] text-[#f56e16]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                    ) : (
                      <X className="h-4 w-4 text-[#395b95]" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>

              <div className="row-start-2">
                {["x", "check", "x", "x", "check", "x"].map((state, index) => (
                  <div key={`${state}-${index}`} className="flex min-h-[54px] items-center justify-center">
                    {state === "check" ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd6cf] text-[#f56e16]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                    ) : (
                      <X className="h-4 w-4 text-[#395b95]" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto pb-2 md:block">
            <div className="grid w-max grid-cols-[278px_139px_128px_128px] grid-rows-[156px_auto] items-stretch gap-x-3">
              <div className="col-start-2 row-start-1 flex flex-col items-center justify-center rounded-t-[12px] bg-[#f56e16] px-4">
                <img
                  src={wandigLogoWhite}
                  alt="Wandig"
                  className="w-[118px] max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="col-start-3 row-start-1 flex flex-col items-center justify-end pb-5 text-center">
                <div className="mb-4">
                  <ComparisonMiniVisual type="diy" />
                </div>
                <p className="text-[13px] text-foreground/78">Zelfbouw wand</p>
              </div>

              <div className="col-start-4 row-start-1 flex flex-col items-center justify-end pb-5 text-center">
                <div className="mb-4">
                  <ComparisonMiniVisual type="furniture" />
                </div>
                <p className="text-[13px] text-foreground/78">Standaard meubels</p>
              </div>

              <div className="row-start-2 overflow-hidden rounded-[12px] bg-[#f7f7f7]">
                {[
                  "Plug & play rondom jouw tv",
                  "Kabels netjes weggewerkt",
                  "Gratis levering, zelf plaatsen",
                  "Rustig ingebouwd eindbeeld",
                  "Massief hout en nette afwerking",
                  "5 jaar garantie",
                ].map((feature) => (
                  <div key={feature} className="flex h-[57px] items-center px-6 text-[14px] text-foreground">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="col-start-2 row-start-2 overflow-hidden rounded-b-[12px] bg-gradient-to-b from-[#f56e16] to-[#f08971]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex h-[57px] items-center justify-center border-t border-white/10">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#ff6e15]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="row-start-2">
                {["check", "x", "x", "x", "check", "x"].map((state, index) => (
                  <div key={`${state}-${index}`} className="flex h-[57px] items-center justify-center">
                    {state === "check" ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd6cf] text-[#ff6e15]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                    ) : (
                      <X className="h-3.5 w-3.5 text-[#395b95]" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>

              <div className="row-start-2">
                {["x", "check", "x", "x", "check", "x"].map((state, index) => (
                  <div key={`${state}-${index}`} className="flex h-[57px] items-center justify-center">
                    {state === "check" ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd6cf] text-[#ff6e15]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                    ) : (
                      <X className="h-3.5 w-3.5 text-[#395b95]" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e5dcd4] px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1500px]">
          <div
            ref={reviewCarouselRef}
            onPointerDown={startReviewDrag}
            onPointerMove={moveReviewDrag}
            onPointerUp={endReviewDrag}
            onPointerCancel={endReviewDrag}
            onPointerLeave={endReviewDrag}
            className="flex cursor-grab gap-5 overflow-x-auto scroll-smooth pb-3 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[...reviews, ...reviews, ...reviews].map((review, index) => {
              const image = allImages[index % Math.max(allImages.length, 1)]?.node;
              return (
                <article
                  key={`${review.name}-${index}`}
                  data-review-card
                  className="min-w-[264px] max-w-[264px] overflow-hidden rounded-[18px] border border-[#dedede] bg-white md:min-w-[calc((100%_-_80px)/5)] md:max-w-[calc((100%_-_80px)/5)]"
                >
                  <div className="h-[150px] bg-[#f4f1ed] md:h-[168px]">
                    <img
                      src={image?.url || detailMaatwerkImg}
                      alt={image?.altText || "Wandig cinewall bij klant thuis"}
                      className="h-full w-full select-none object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf0ef] text-white">
                        <span className="h-3.5 w-3.5 rounded-full bg-white" />
                      </span>
                      <span className="text-base font-medium text-foreground">{review.name}</span>
                    </div>
                    <div className="mb-3 flex gap-0.5 text-[#ef7027]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-[#ef7027] text-[#ef7027]" strokeWidth={0} />
                      ))}
                    </div>
                    <h3 className="text-[18px] font-bold leading-snug text-foreground">{review.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-foreground/82">{review.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#e5dcd4] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1080px] text-center">
          <h2 className="font-serif text-[2.55rem] leading-none tracking-[-0.045em] text-foreground md:text-[4rem]">
            Questions?
          </h2>
          <p className="mt-6 text-[17px] text-foreground/76">
            We hebben antwoorden
          </p>

          <div className="mt-12 rounded-[18px] bg-[#f4f1ed] px-6 py-5 text-left md:px-12 md:py-7">
            <Accordion type="single" collapsible>
              {[
                {
                  value: "faq-measure",
                  question: "Hoe weet ik welke maat ik nodig heb?",
                  answer: "Kies eerst je tv-formaat en opstelling. Na je bestelling stemmen we de exacte wandmaat, kijkhoogte en indeling rustig met je af voordat we gaan produceren.",
                },
                {
                  value: "faq-cables",
                  question: "Worden kabels en apparatuur weggewerkt?",
                  answer: "Ja. Kabels, apparatuur en soundbar krijgen een vaste plek in het ontwerp, zodat het eindbeeld strak en rustig blijft.",
                },
                {
                  value: "faq-delivery",
                  question: "Is levering inbegrepen?",
                  answer: "Ja, levering is inbegrepen. De cinewall is plug & play ontworpen, zodat je hem eenvoudig zelf neerzet en aansluit.",
                },
                {
                  value: "faq-custom",
                  question: "Kan ik afwijken van de standaard afmetingen?",
                  answer: "Dat kan. De standaardhoogte is 240 cm, maar andere afmetingen en details zijn op aanvraag mogelijk.",
                },
                {
                  value: "faq-warranty",
                  question: "Hoe zit het met garantie?",
                  answer: "Je krijgt 5 jaar garantie op constructie en afwerking, plus 30 dagen bedenktijd na plaatsing.",
                },
              ].map(({ value, question, answer }) => (
                <AccordionItem key={value} value={value} className="border-b border-black/10 px-0 last:border-b-0">
                  <AccordionTrigger className="py-6 text-left text-[18px] font-medium leading-tight text-foreground no-underline transition-colors hover:text-[#ef7027] hover:no-underline md:text-[21px] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-foreground">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-[15px] leading-relaxed text-foreground/68 md:text-base">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
