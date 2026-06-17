import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, ChevronRight, ChevronLeft, Check, X, Star, Hammer, ShieldCheck, Ruler } from "lucide-react";
import fullHouseEikenzwartRechtsImage from "@/assets/full-house-eikenzwart-rechts-temp.png";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import wandigLogoWhite from "@/assets/wandig-logo-white.png";

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
  oranje: "#ef8874", orange: "#ef8874",
  rood: "#c0392b", red: "#c0392b",
  blauw: "#2f5d8a", blue: "#2f5d8a",
  groen: "#3d6b4a", green: "#3d6b4a",
  antraciet: "#2f3438",
};

function colorToCss(name: string): string {
  const key = name.toLowerCase().trim();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  for (const k of Object.keys(COLOR_MAP)) {
    if (key.includes(k)) return COLOR_MAP[k];
  }
  return "#d4d4d4";
}

function swatchStyle(name: string): CSSProperties {
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
      <div className="bg-white">
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

const PRODUCT_USPS = [
  "Met de hand gemaakt in onze werkplaats",
  "Plug & play voor jouw woonkamer",
  "Gratis levering, eenvoudig zelf te plaatsen",
];

function ThumbStrip({
  images,
  activeImg,
  onSelect,
}: {
  images: Array<{ node: { url: string; altText: string | null } }>;
  activeImg: number;
  onSelect: (i: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <button
            key={img.node.url + i}
            onClick={() => onSelect(i)}
            className={`shrink-0 w-[18%] min-w-[56px] sm:min-w-[72px] aspect-square overflow-hidden rounded-xl border-2 snap-start transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] ${i === activeImg ? "border-[#ef8874]" : "border-transparent hover:border-[#ef8874]/40"}`}
          >
            <img src={img.node.url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {images.length > 5 && (
        <>
          <button
            aria-label="Vorige"
            onClick={() => scrollBy(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow border border-border flex items-center justify-center hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Volgende"
            onClick={() => scrollBy(1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow border border-border flex items-center justify-center hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

function CrossfadeImage({ src, alt }: { src: string; alt: string }) {
  const [shown, setShown] = useState(src);
  const [incoming, setIncoming] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (src !== shown) {
      setIncoming(src);
      setFadeIn(false);
    }
  }, [src, shown]);

  const promote = (url: string) => {
    setShown(url);
    setIncoming(null);
    setFadeIn(false);
  };

  return (
    <>
      <img src={shown} alt={alt} className="absolute inset-0 h-full w-full scale-[1.28] object-cover" />
      {incoming && incoming !== shown && (
        <img
          key={incoming}
          src={incoming}
          alt={alt}
          onLoad={() => requestAnimationFrame(() => setFadeIn(true))}
          onTransitionEnd={() => promote(incoming)}
          className={`absolute inset-0 h-full w-full scale-[1.28] object-cover transition-opacity duration-300 ease-out ${fadeIn ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}

function ProductView({ product }: { product: ProductNode }) {
  const variants = useMemo(
    () => product.variants.edges.map((e) => e.node as typeof e.node & { image?: { url: string; altText: string | null } | null }),
    [product],
  );
  const [activeImg, setActiveImg] = useState(0);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);
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

  // Follow the active variant's own image whenever ANY option changes (colour,
  // links/rechts, etc.). Manual thumbnail clicks don't change these deps, so they
  // are preserved. Falls back to the first image of the (colour-filtered) group.
  const activeVariantImageUrl = activeVariant?.image?.url;
  useEffect(() => {
    if (activeVariantImageUrl) {
      const idx = images.findIndex((img) => img.node.url === activeVariantImageUrl);
      if (idx >= 0) {
        setActiveImg(idx);
        return;
      }
    }
    setActiveImg(0);
  }, [activeVariantImageUrl, images]);

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
  const showButtonPrice = activeVariant && parseFloat(activeVariant.price.amount) > 0;
  const temporaryFullHouseRightImage =
    product.handle === "full-house" &&
    Object.values(selected).some((value) => value.toLowerCase() === "rechts") &&
    selectedColor?.toLowerCase().includes("eikenzwart")
      ? fullHouseEikenzwartRechtsImage
      : null;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-10 md:py-16">
      <nav className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/producten" className="hover:text-foreground">Modellen</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-20">
        {/* Gallery */}
        <div className="min-w-0">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="relative w-full bg-muted overflow-hidden rounded-2xl mb-3 aspect-square md:aspect-auto md:h-[calc(100svh-260px)]">
              {images[activeImg] && (
                <CrossfadeImage
                  src={temporaryFullHouseRightImage ?? images[activeImg].node.url}
                  alt={images[activeImg].node.altText || product.title}
                />
              )}
            </div>
            {images.length > 1 && (
              <ThumbStrip
                images={images}
                activeImg={activeImg}
                onSelect={setActiveImg}
              />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Cinewall</span>
          <h1 className="font-serif text-2xl md:text-4xl mt-3 leading-[1.05]">{product.title}</h1>

          {/* Reviews */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#ff6e15] text-[#ff6e15]" strokeWidth={0} />
              ))}
            </div>
            <span className="text-foreground/70">4.9 · 128 reviews</span>
          </div>

          <div className="mt-6">
            <div className="grid gap-2.5">
              {PRODUCT_USPS.map((u) => (
                <div key={u} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff6e15]/10 text-[#ff6e15]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{u}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 font-serif text-3xl leading-none text-foreground">{activePrice}</p>

            {hasOptions && (
              <div className="mt-5 space-y-[26px]">
                {visibleOptions.map((opt, optIndex) => {
                  const isColor = /kleur|color/i.test(opt.name);
                  return (
                    <div key={opt.name}>
                      <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                          Stap {optIndex + 1}
                        </span>
                        {selected[opt.name] && (
                          <>
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/25">·</span>
                            <span className="text-sm font-semibold text-foreground">
                              {opt.name.charAt(0).toUpperCase() + opt.name.slice(1).toLowerCase()}: {selected[opt.name]}
                            </span>
                          </>
                        )}
                      </div>
                      {isColor ? (
                        <div className="flex flex-wrap gap-3">
                          {opt.values.map((v) => {
                            const active = selected[opt.name] === v;
                            return (
                              <button
                                key={v}
                                onClick={() => setSelected((s) => ({ ...s, [opt.name]: v }))}
                                title={v}
                                aria-label={v}
                                className={`relative h-11 w-11 overflow-hidden rounded-full border-2 bg-transparent p-0 transition-[border-color,transform] duration-150 ease-out active:scale-95 ${active ? "border-[#ff6e15]" : "border-transparent hover:border-[#ff6e15]/45"}`}
                              >
                                <span
                                  className="relative block h-full w-full rounded-full"
                                  style={swatchStyle(v)}
                                />
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {opt.values.map((v) => {
                            const active = selected[opt.name] === v;
                            return (
                              <button
                                key={v}
                                onClick={() => setSelected((s) => ({ ...s, [opt.name]: v }))}
                                className={`min-h-11 rounded-xl border-2 px-3 py-2 text-sm font-medium transition-[border-color,background-color,color,transform] duration-150 ease-out active:scale-[0.98] ${active ? "border-[#ff6e15] bg-white text-foreground" : "border-transparent bg-[#f4f1ed] text-foreground/75 hover:border-[#ff6e15]/40 hover:bg-white"}`}
                              >
                                {v}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <Button
              onClick={handleAdd}
              disabled={isLoading || !activeVariant?.availableForSale}
              className="mt-[30px] h-14 w-full translate-y-0 rounded-full bg-[#ff6e15] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-none transition-colors duration-150 hover:translate-y-0 hover:bg-[#f2630f] hover:shadow-none active:scale-100 active:translate-y-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : activeVariant?.availableForSale ? (
                <span className="flex w-full items-center justify-center gap-3">
                  <span>In winkelmand</span>
                  {showButtonPrice && <span className="font-serif text-base tracking-normal opacity-90">· {activePrice}</span>}
                </span>
              ) : (
                "Uitverkocht"
              )}
            </Button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/70">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#ff6e15]" strokeWidth={1.8} />
                <span>30 dagen bedenktijd</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Hammer className="h-4 w-4 text-[#ff6e15]" strokeWidth={1.8} />
                <span>Handgemaakt in Nederland</span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/70 animate-in fade-in slide-in-from-bottom-1 duration-700">
              Elke Wandig cinewall wordt met de hand gemaakt — beschikbaar in vaste maten, kleuren en opstellingen. Kabels worden netjes weggewerkt, het front laat geluid moeiteloos door en de afwerking blijft jarenlang strak.
            </p>
          </div>

          {product.description && (
            <div className="mt-6">
              <h2 className="font-bold text-base mb-2">Productomschrijving</h2>
              <p className="text-foreground/75 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Details */}
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-1 duration-700">
            <div className="mb-5">
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Goed om te weten</span>
              <h2 className="mt-2 font-serif text-2xl leading-tight">Alle details op een rij</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Van formaat tot levering — hieronder vind je alles rustig op een rij.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  value: "details",
                  title: "Details & formaat",
                  body: [
                    "Massief houten frame, gemaakt in vaste maten voor jouw tv en woonkamer. Kabels netjes weggewerkt en een geluidsdoorlatend front.",
                    "Standaard hoogte 240 cm — andere afmetingen op aanvraag mogelijk.",
                  ],
                },
                {
                  value: "materiaal",
                  title: "Materiaal & afwerking",
                  body: [
                    "FSC-gecertificeerd massief hout uit Europese bossen. Geen plaatmateriaal, geen plastic afwerking.",
                    "Met de hand geschaafd, gelijmd en afgewerkt in onze eigen werkplaats.",
                  ],
                },
                {
                  value: "shipping",
                  title: "Verzending & plaatsing",
                  body: [
                    "Gratis levering bij jou thuis. Levertijd 4–6 weken na bestelling.",
                    "De cinewall is plug & play ontworpen, zodat je hem eenvoudig zelf neerzet en aansluit.",
                  ],
                },
                {
                  value: "garantie",
                  title: "Garantie & retour",
                  body: [
                    "Vijf jaar garantie op constructie en afwerking.",
                    "30 dagen bedenktijd — niet tevreden? Wij halen de cinewall kosteloos op.",
                  ],
                },
              ].map(({ value, title, body }) => (
                <AccordionItem
                  key={value}
                  value={value}
                  className="border-b border-[#dedede] px-0 first:border-t"
                >
                  <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-foreground no-underline transition-colors hover:text-[#f56e16] hover:no-underline [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-foreground/45">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pb-5 pr-8 text-sm leading-relaxed text-foreground/68">
                    {body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      </div>

      {/* Product story */}
      <section className="bg-white px-5 py-8 md:px-10 md:py-10">
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ff6e15]/35 text-[#ff6e15]">
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
              src={detailMaatwerkImg}
              alt="Wandig cinewall in een rustig interieur"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 md:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <h2 className="max-w-lg font-serif text-[2.16rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[3.24rem]">
              Waarom Wandig de <span className="text-[#ff6e15]">perfecte keuze.</span>
            </h2>
            <p className="mt-7 max-w-md text-[18px] leading-relaxed text-foreground/78">
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
                <div className="mb-2.5 flex h-9 items-end justify-center gap-0.5 blur-[1.2px]">
                  <span className="h-6 w-7 rounded-[7px] bg-[#ff9a45] rotate-[-8deg]" />
                  <span className="h-9 w-6 rounded-[7px] bg-[#ff6e15] rotate-[1deg]" />
                </div>
                <p className="text-[10px] leading-tight text-foreground/70">Zelf<br />bouw</p>
              </div>

              <div className="col-start-4 row-start-1 flex flex-col items-center justify-end pb-3 text-center">
                <div className="mb-2.5 flex h-9 items-end justify-center gap-0.5 blur-[1.2px]">
                  <span className="h-6 w-7 rounded-[7px] bg-[#b7a084] rotate-[-9deg]" />
                  <span className="h-7 w-8 rounded-[8px] bg-[#d4c0a5] rotate-[7deg]" />
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
            <div className="grid min-w-[820px] grid-cols-[1.48fr_0.74fr_0.9fr_0.88fr] grid-rows-[150px_auto] items-stretch gap-x-3">
              <div className="col-start-2 row-start-1 flex flex-col items-center justify-center rounded-t-[12px] bg-[#f56e16] px-4">
                <img
                  src={wandigLogoWhite}
                  alt="Wandig"
                  className="w-[118px] max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="col-start-3 row-start-1 flex flex-col items-center justify-end pb-5 text-center">
                <div className="mb-5 flex h-14 items-end justify-center gap-1 blur-[1.5px]">
                  <span className="h-9 w-10 rounded-[9px] bg-[#ff9a45] rotate-[-8deg]" />
                  <span className="h-14 w-9 rounded-[9px] bg-[#ff6e15] rotate-[1deg]" />
                </div>
                <p className="text-[13px] text-foreground/78">Zelfbouw wand</p>
              </div>

              <div className="col-start-4 row-start-1 flex flex-col items-center justify-end pb-5 text-center">
                <div className="mb-5 flex h-14 items-end justify-center gap-1 blur-[1.5px]">
                  <span className="h-10 w-12 rounded-[10px] bg-[#b7a084] rotate-[-9deg]" />
                  <span className="h-12 w-14 rounded-[12px] bg-[#d4c0a5] rotate-[7deg]" />
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
                  <div key={feature} className="flex h-[58px] items-center px-6 text-[15px] text-foreground">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="col-start-2 row-start-2 overflow-hidden rounded-b-[12px] bg-gradient-to-b from-[#f56e16] to-[#f08971]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex h-[58px] items-center justify-center border-t border-white/10">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff6e15]">
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="row-start-2">
                {["check", "x", "x", "x", "check", "x"].map((state, index) => (
                  <div key={`${state}-${index}`} className="flex h-[58px] items-center justify-center">
                    {state === "check" ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd6cf] text-[#ff6e15]">
                        <Check className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    ) : (
                      <X className="h-4 w-4 text-[#395b95]" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>

              <div className="row-start-2">
                {["x", "check", "x", "x", "check", "x"].map((state, index) => (
                  <div key={`${state}-${index}`} className="flex h-[58px] items-center justify-center">
                    {state === "check" ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd6cf] text-[#ff6e15]">
                        <Check className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    ) : (
                      <X className="h-4 w-4 text-[#395b95]" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-16 md:px-10 md:pb-24">
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
                    <div className="mb-3 flex gap-0.5 text-[#f56e16]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-[#f56e16] text-[#f56e16]" strokeWidth={0} />
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

      <section className="bg-white px-5 py-16 md:px-10 md:py-24">
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
                  <AccordionTrigger className="py-6 text-left text-[18px] font-medium leading-tight text-foreground no-underline transition-colors hover:text-[#f56e16] hover:no-underline md:text-[21px] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-foreground">
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
