import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef, type ReactNode } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { displayWandigColor, wandigSwatchStyle } from "@/lib/wandig-colors";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
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
      <div className="bg-[#faf8f5]">
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
    const first = variants.find((v) => v.availableForSale) || variants[0];
    first?.selectedOptions.forEach((o) => { init[o.name] = o.value; });
    return init;
  });
  const [expandedVariantOption, setExpandedVariantOption] = useState<string | null>(null);
  const [productionDetailsOpen, setProductionDetailsOpen] = useState(false);
  const [benefitsScrollState, setBenefitsScrollState] = useState({ atStart: true, atEnd: false });
  const [showOrderWidget, setShowOrderWidget] = useState(false);

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

  // Shopify uploads the photos per variant as one consecutive block, starting at
  // the variant's own image. So we slice from that anchor up to the next anchor.
  const images = useMemo(() => {
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
  }, [allImages, variants, colorKey, selectedColor, sizeKey, selectedSize]);

  const galleryItems = useMemo(() => {
    const shopifyItems = images.map(({ node }) => ({
      src: node.url,
      alt: node.altText || product.title,
      full: false,
      square: false,
    }));

    if (product.handle === "full-house") {
      const main = FULL_HOUSE_GALLERY[0];
      const rest = shopifyItems.filter((item) => item.src !== main.src);
      return rest.length > 0 ? [main, ...rest] : FULL_HOUSE_GALLERY;
    }

    return shopifyItems.map((item, index) => ({
      ...item,
      full: index === 0,
      square: index === 0,
    }));
  }, [images, product.handle, product.title]);

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
    <div className="bg-[#faf8f5]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-5 md:pt-8">
      <nav className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-5 flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <Link to="/producten" className="hover:text-foreground">Modellen</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10 xl:gap-14">
        {/* Gallery */}
        <div className="min-w-0">
          {galleryItems[0] && (
            <figure className={`overflow-hidden rounded-[6px] lg:sticky lg:top-0 lg:z-0 ${product.handle === "full-house" ? "flex aspect-[5/4] items-center justify-center bg-[#faf8f5]" : ""}`}>
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

          <div ref={galleryContinuationRef} className="relative z-10 mt-3 space-y-3 md:mt-4 md:space-y-4">
            {subImageGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <figure className="overflow-hidden rounded-[6px]">
                  <img
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
                        <img
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

      <SpecificationsSection />

      <UniqueSection />

      <BeforeAfterSection />

      <CustomerGallerySection />

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
        className={`absolute bottom-[calc(100%+10px)] left-1/2 z-30 w-[266px] -translate-x-1/2 rounded-[16px] border border-[#eeeeee] bg-white p-3.5 text-left shadow-[0_18px_40px_rgba(42,31,22,0.14)] transition-all duration-200 ${
          open ? "visible opacity-100 translate-y-0" : "invisible translate-y-1 opacity-0"
        }`}
      >
        <span className="block text-[13px] font-bold text-[#071426]">Hoe wordt mijn tv kast geleverd?</span>
        <span className="mt-1.5 block text-[12px] font-normal leading-[1.55] text-[#071426]/60">
          Je tv kast wordt plug and play en grotendeels voorgemonteerd geleverd. Geen ingewikkeld bouwpakket dus. Met twee
          personen bevestig je de verschillende onderdelen eenvoudig aan de muur, zodat je snel van je nieuwe tv kast kunt
          genieten.
        </span>
        <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#eeeeee] bg-white" />
      </span>
    </span>
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
    <section className="bg-[#fff7ef] py-10 md:py-16">
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


function ShieldOnlyIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <div className={className}>
      <Shield className="h-full w-full" strokeWidth={strokeWidth} />
    </div>
  );
}

function ShieldMoonIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <Shield className="h-full w-full" strokeWidth={strokeWidth} />
        <Moon className="absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2" strokeWidth={strokeWidth} />
      </div>
    </div>
  );
}

function PuzzleIcon({ className }: { className?: string; strokeWidth?: number }) {
  return <img src={puzzleIcon.url} alt="" className={className} />;
}

function TrustBannerSection() {
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





