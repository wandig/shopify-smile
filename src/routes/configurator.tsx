import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarCheck, Check, ChevronDown, ChevronLeft, ChevronRight, Hammer, Plug, Plus, Puzzle, Ruler, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CustomerGallerySection } from "@/components/CustomerGallerySection";
import { SpecificationsSection, UniqueSection, BeforeAfterSection } from "@/components/ProductStorySections";
import { BuiltToLastSection, FaqSection, ReviewsSection } from "@/components/ProductTrustSections";
import centerModule from "@/assets/center-module-trim.png.asset.json";
import leftModule from "@/assets/left-module-trim.png.asset.json";
import rightModuleUrl from "@/assets/right-module-trim-tight-cropped.png";
import werkplaatsImg from "@/assets/werkplaats.jpg";
import fullHouseFinishImg from "@/assets/full-house-gallery-finish.webp";
import fullHouseUseImg from "@/assets/full-house-gallery-use.webp";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import fullHouseRoomImg from "@/assets/full-house-gallery-room.jpg";
import detailDesignImg from "@/assets/detail-design.jpg";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { FULL_HOUSE_COLORS, sortWandigColors, wandigSwatchStyle } from "@/lib/wandig-colors";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Wandig configurator — stel jouw tv-wand samen" },
      {
        name: "description",
        content:
          "Stel jouw Wandig direct samen: kies de modules, het tv-formaat en de kleur. De prijs zie je live in beeld.",
      },
      { property: "og:title", content: "Wandig configurator — stel jouw tv-wand samen" },
      {
        property: "og:description",
        content: "Kies je modules, tv-formaat en kleur. Live preview en directe prijsindicatie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConfiguratorPage,
});

const TV_OPTIONS = [
  { value: '43"', note: "40–50 inch", shopifyValue: "40 - 50 inch", price: 0, wallHeight: 170 },
  { value: '55"', note: "50–60 inch", shopifyValue: "55 - 65 inch", price: 150, wallHeight: 180 },
  { value: '65"', note: "60–70 inch", shopifyValue: "70 - 75 inch", price: 250, wallHeight: 190 },
  { value: '75"', note: "70–80 inch", shopifyValue: "80 - 85 inch", price: 350, wallHeight: 200 },
];

const BASE_PRICE = 1699;
const BASE_WIDTH = 120;
const LEFT_MODULE_PRICE = 475;
const LEFT_MODULE_WIDTH = 40;
const RIGHT_MODULE_PRICE = 475;
const RIGHT_MODULE_WIDTH = 40;
const MODULE_REVEAL = "moduleColorReveal 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both";

const CONFIGURATOR_BENEFITS = [
  { title: "Ontworpen in Nederland", image: werkplaatsImg },
  { title: "Kabels uit het zicht", image: fullHouseFinishImg },
  { title: "Eenvoudige klikmontage", image: fullHouseUseImg },
  { title: "Persoonlijk advies", image: detailMaatwerkImg },
  { title: "100 dagen proefkijken", image: fullHouseRoomImg },
  { title: "10 jaar garantie", image: detailDesignImg },
];

const FULL_HOUSE_FRONT_IMAGES: Record<string, string> = {
  Truffelbruin:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_febf1f75-a372-4cd7-aa4a-98f7231d208a.jpg?v=1785761296",
  Cashmeregrijs:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_bb9754f6-1ec4-4bb9-b906-0f6c91cfc4da.jpg?v=1785762097",
  Blush:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_daab0722-3ff3-46ab-99f4-71ef038faecf.jpg?v=1785762321",
  Kristalwit:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_1cb0343f-93b7-4c9c-ac58-92a733dc67be.jpg?v=1785762395",
};

const MODULE_CROPS = {
  left: { left: 0.19, top: 0.182, width: 0.144, height: 0.569 },
  center: { left: 0.334, top: 0.182, width: 0.331, height: 0.569 },
  right: { left: 0.665, top: 0.182, width: 0.147, height: 0.569 },
} as const;

type ModulePosition = keyof typeof MODULE_CROPS;

function CroppedModuleImage({
  color,
  position,
  source,
  animate = true,
  testId = true,
  className = "",
}: {
  color: string;
  position: ModulePosition;
  source: string;
  animate?: boolean;
  testId?: boolean;
  className?: string;
}) {
  const crop = MODULE_CROPS[position];

  return (
    <div
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`relative h-full shrink-0 overflow-hidden ${className}`}
      style={{
        aspectRatio: `${(crop.width * 4) / (crop.height * 3)}`,
        animation: animate ? MODULE_REVEAL : undefined,
        backfaceVisibility: "hidden",
        contain: "paint",
        willChange: animate ? "opacity" : undefined,
      }}
    >
      <img
        src={source}
        alt={`Wandig ${position === "center" ? "middenmodule" : `${position === "left" ? "linker" : "rechter"} module`} in ${color}`}
        className="pointer-events-none absolute max-w-none select-none"
        style={{
          width: `${100 / crop.width}%`,
          height: `${100 / crop.height}%`,
          left: `${(-crop.left / crop.width) * 100}%`,
          top: `${(-crop.top / crop.height) * 100}%`,
        }}
      />
    </div>
  );
}

function ConfiguratorModuleImage({
  color,
  position,
  source,
  animate = true,
  testId = true,
  className = "",
}: {
  color: string;
  position: ModulePosition;
  source: string | null;
  animate?: boolean;
  testId?: boolean;
  className?: string;
}) {
  const usesWalnutAsset = color === FULL_HOUSE_COLORS[0];

  if (!usesWalnutAsset) {
    return (
      <CroppedModuleImage
        color={color}
        position={position}
        source={source!}
        animate={animate}
        testId={testId}
        className={className}
      />
    );
  }

  const walnutSource =
    position === "left" ? leftModule.url : position === "center" ? centerModule.url : rightModuleUrl;

  return (
    <img
      src={walnutSource}
      alt={`Wandig ${position === "center" ? "middenmodule" : `${position === "left" ? "linker" : "rechter"} module`} in ${color}`}
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`block h-full w-auto select-none ${className}`}
      style={{
        animation: animate ? MODULE_REVEAL : undefined,
        backfaceVisibility: "hidden",
        willChange: animate ? "opacity" : undefined,
      }}
    />
  );
}

function euro(n: number) {
  return `€ ${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(n)}`;
}

function euroWithCents(n: number) {
  return `€ ${new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`;
}

const INFO_TOPICS = {
  klarna: {
    eyebrow: "Betalen in 3 termijnen",
    title: "Betalen met Klarna",
    paragraphs: [
      "Met Klarna verdeel je het bedrag in 3 gelijke termijnen, zonder rente en zonder extra kosten.",
      "De eerste termijn betaal je bij je bestelling, de volgende twee automatisch met een maand tussenruimte.",
    ],
    bullets: [
      "0% rente en geen afsluitkosten",
      "Automatische incasso van dezelfde rekening",
      "Je kiest Klarna gewoon af bij het afrekenen",
    ],
  },
  proefkijken: {
    eyebrow: "100 dagen garantie",
    title: "100 dagen rustig proefkijken",
    paragraphs: [
      "Je Wandig staat 100 dagen bij je thuis op proef. Ervaar de kast in jouw licht, bij jouw bank en met jouw tv.",
      "Past het niet? Dan halen we de kast gratis bij je op en krijg je het volledige bedrag terug.",
    ],
    bullets: ["Gratis retour ophalen aan huis", "Volledige terugbetaling", "Geen vragen, geen kleine lettertjes"],
  },
  plugplay: {
    eyebrow: "Plug & play",
    title: "Aansluiten en direct genieten",
    paragraphs: [
      "Elke Wandig komt voorbereid uit onze werkplaats: kabelgoten, doorvoeren en montagerails zitten er al in.",
      "Met de klikmontage hang je de kast recht aan de wand en schuif je de modules tegen elkaar aan.",
    ],
    bullets: [
      "Montagemateriaal en handleiding inbegrepen",
      "Kabels netjes uit het zicht",
      "Gemiddeld binnen een uur klaar",
    ],
  },
  garantie: {
    eyebrow: "10 jaar garantie",
    title: "Gebouwd om jarenlang mee te gaan",
    paragraphs: [
      "We geven 10 jaar garantie op de constructie, het beslag en de afwerking van je Wandig.",
      "Gaat er onverhoopt toch iets mis? Dan lossen we het op met onderdelen uit onze eigen werkplaats.",
    ],
    bullets: ["10 jaar op constructie en beslag", "Onderdelen blijven leverbaar", "Persoonlijke service uit Nederland"],
  },
} as const;

type InfoTopicKey = keyof typeof INFO_TOPICS;

function InfoDrawerLink({ topic, className }: { topic: InfoTopicKey; className?: string }) {
  const [open, setOpen] = useState(false);
  const info = INFO_TOPICS[topic];

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Meer informatie
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-[440px] border-l border-[#eeeeee] bg-[#faf8f5] px-7 py-10 sm:max-w-[440px]"
          style={{ fontFamily: '"Circular-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          <SheetHeader className="space-y-3 text-left">
            <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#ef7027]">{info.eyebrow}</span>
            <SheetTitle className="text-[26px] font-normal leading-tight tracking-[0.01em] text-[#071426]">
              {info.title}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {info.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[13.5px] leading-relaxed text-[#071426]/70">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-7 space-y-3 border-t border-[#eeeeee] pt-6">
            {info.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#071426]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ef7027]" strokeWidth={2} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}


function ConfiguratorPage() {
  const { data: fullHouseProduct } = useQuery({
    queryKey: ["product", "full-house"],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: "full-house" });
      return (response?.data?.product ?? null) as ShopifyProduct["node"] | null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const colors = useMemo(() => {
    const liveColors = fullHouseProduct?.options
      .filter((option) => /kleur|color/i.test(option.name))
      .flatMap((option) => option.values) ?? [];
    const sortedColors = sortWandigColors(liveColors);
    return sortedColors.length > 0 ? sortedColors : [...FULL_HOUSE_COLORS];
  }, [fullHouseProduct]);

  const [color, setColor] = useState<string>(FULL_HOUSE_COLORS[0]);
  const [previewColor, setPreviewColor] = useState<string>(FULL_HOUSE_COLORS[0]);
  const [previousPreviewColor, setPreviousPreviewColor] = useState<string | null>(null);
  const [tv, setTv] = useState(TV_OPTIONS[1]);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [productionDetailsOpen, setProductionDetailsOpen] = useState(false);
  const [tvSizeOpen, setTvSizeOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const benefitsScrollerRef = useRef<HTMLDivElement>(null);
  const previewCleanupTimerRef = useRef<number | null>(null);

  const scrollBenefits = (direction: -1 | 1) => {
    benefitsScrollerRef.current?.scrollBy({ left: direction * 166, behavior: "smooth" });
  };

  useEffect(() => {
    if (!colors.includes(color)) {
      setColor(colors[0]);
      setPreviewColor(colors[0]);
    }
  }, [color, colors]);

  useEffect(() => {
    const images = Object.values(FULL_HOUSE_FRONT_IMAGES).map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });

    void Promise.all(images.map((image) => image.decode().catch(() => undefined)));
  }, []);

  useEffect(
    () => () => {
      if (previewCleanupTimerRef.current !== null) {
        window.clearTimeout(previewCleanupTimerRef.current);
      }
    },
    [],
  );

  const selectColor = (nextColor: string) => {
    if (nextColor === color) return;

    setPreviousPreviewColor(previewColor);
    setColor(nextColor);
    setPreviewColor(nextColor);

    if (previewCleanupTimerRef.current !== null) {
      window.clearTimeout(previewCleanupTimerRef.current);
    }
    previewCleanupTimerRef.current = window.setTimeout(() => {
      setPreviousPreviewColor(null);
    }, 320);
  };

  const width = BASE_WIDTH + (hasLeft ? LEFT_MODULE_WIDTH : 0) + (hasRight ? RIGHT_MODULE_WIDTH : 0);
  const selectedShopifyVariant = useMemo(() => {
    const shopifyArrangement = hasRight && !hasLeft ? "Rechts" : "Links";

    return fullHouseProduct?.variants.edges
      .map((edge) => edge.node)
      .find((variant) => {
        const selections = new Map(
          variant.selectedOptions.map((option) => [option.name.toLocaleLowerCase("nl-NL"), option.value]),
        );
        return (
          selections.get("kleur") === color &&
          selections.get("opstelling") === shopifyArrangement &&
          selections.get("maat tv") === tv.shopifyValue
        );
      });
  }, [color, fullHouseProduct, hasLeft, hasRight, tv.shopifyValue]);
  const shopifyBasePrice = Number(selectedShopifyVariant?.price.amount ?? 0);
  const configuredBasePrice = shopifyBasePrice > 0 ? shopifyBasePrice : BASE_PRICE;
  const optionPriceAdjustment =
    tv.price + (hasLeft ? LEFT_MODULE_PRICE : 0) + (hasRight ? RIGHT_MODULE_PRICE : 0);
  const total = useMemo(
    () => configuredBasePrice + optionPriceAdjustment,
    [configuredBasePrice, optionPriceAdjustment],
  );
  const shopifyCompareAtPrice = Number(selectedShopifyVariant?.compareAtPrice?.amount ?? 0);
  const beforeTotal =
    shopifyCompareAtPrice > configuredBasePrice
      ? shopifyCompareAtPrice + optionPriceAdjustment
      : null;
  const usesWalnutModules = previewColor === FULL_HOUSE_COLORS[0];
  const colorModuleSource = useMemo(() => {
    if (usesWalnutModules) return null;

    const matchingVariant = fullHouseProduct?.variants.edges
      .map((edge) => edge.node)
      .find((variant) => {
        const selections = new Map(
          variant.selectedOptions.map((option) => [option.name.toLocaleLowerCase("nl-NL"), option.value]),
        );
        return (
          selections.get("kleur") === previewColor &&
          selections.get("opstelling") === "Links" &&
          selections.get("maat tv") === "55 - 65 inch"
        );
      });

    return matchingVariant?.image?.url ?? FULL_HOUSE_FRONT_IMAGES[previewColor];
  }, [fullHouseProduct, previewColor, usesWalnutModules]);
  const previousModuleSource = useMemo(() => {
    if (!previousPreviewColor || previousPreviewColor === FULL_HOUSE_COLORS[0]) return null;

    const matchingVariant = fullHouseProduct?.variants.edges
      .map((edge) => edge.node)
      .find((variant) => {
        const selections = new Map(
          variant.selectedOptions.map((option) => [option.name.toLocaleLowerCase("nl-NL"), option.value]),
        );
        return (
          selections.get("kleur") === previousPreviewColor &&
          selections.get("opstelling") === "Links" &&
          selections.get("maat tv") === "55 - 65 inch"
        );
      });

    return matchingVariant?.image?.url ?? FULL_HOUSE_FRONT_IMAGES[previousPreviewColor];
  }, [fullHouseProduct, previousPreviewColor]);

  return (
    <main className="min-h-screen bg-[#f8f6f3]">
      <div className="w-full">
        <div className="relative grid w-full items-start overflow-hidden bg-[#e9e3dc] lg:min-h-[calc(85vh-39px)] lg:grid-cols-[minmax(0,1fr)_528px] lg:py-[30px]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[79%] border-b border-black/[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 52% 34%, rgba(255,255,255,0.98) 0%, rgba(249,246,242,0.82) 34%, rgba(232,225,217,0.2) 72%), linear-gradient(180deg, #f3efea 0%, #e8e1d9 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[21%]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 22%), linear-gradient(180deg, #ded6cd 0%, #cfc4b9 100%)",
              boxShadow: "inset 0 18px 30px rgba(76,61,48,0.045)",
            }}
          />
          <div className="pointer-events-none absolute bottom-[18.5%] left-[37.5%] h-6 w-[44%] -translate-x-1/2 rounded-[50%] bg-black/[0.13] blur-xl" />

          <section className="relative z-[1] min-w-0 overflow-hidden lg:h-full">
          {/* Scene */}
          <div
            ref={stageRef}
            className="relative flex min-h-[620px] items-center justify-center overflow-hidden px-3 py-16 md:min-h-[760px] md:px-8 md:pb-[78px] md:pt-[76px] lg:h-full lg:min-h-0"
          >
            <button
              type="button"
              onClick={() => setShowMeasurements((visible) => !visible)}
              aria-label={showMeasurements ? "Afmetingen verbergen" : "Afmetingen tonen"}
              aria-pressed={showMeasurements}
              title={showMeasurements ? "Afmetingen verbergen" : "Afmetingen tonen"}
              className={`absolute left-4 top-4 z-[9] flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_10px_24px_rgba(3,12,26,0.11)] transition-all duration-300 hover:-translate-y-px md:left-6 md:top-6 lg:left-auto lg:right-3 lg:top-2 ${
                showMeasurements
                  ? "border-[#ef7027] bg-[#ef7027] text-white"
                  : "border-[#ded7d0] bg-white/92 text-[#303640] backdrop-blur"
              }`}
            >
              <Ruler className="h-[19px] w-[19px]" strokeWidth={1.8} />
            </button>

            {/* Configuration */}
            <div className="relative z-[3] flex w-full max-w-[1200px] origin-top translate-y-[10%] scale-[0.67] items-end justify-center sm:scale-[0.785] lg:scale-[0.716] xl:scale-[0.901] 2xl:scale-[0.97]">
              {/* Wall unit — modules sit flush against each other */}
              <div className="relative flex h-[420px] items-end lg:h-[520px]">
                {showMeasurements && (
                  <div className="pointer-events-none absolute inset-0 z-[8] text-[#303640]">
                    <div className="absolute -top-[46px] inset-x-0 flex items-center gap-3">
                      <span className="h-px flex-1 bg-[#303640]/55" />
                      <span className="rounded-full border border-[#303640]/15 bg-white/92 px-3 py-1.5 text-[12px] font-semibold shadow-sm backdrop-blur">
                        Breedte {width} cm
                      </span>
                      <span className="h-px flex-1 bg-[#303640]/55" />
                    </div>
                    <div className="absolute -left-[112px] inset-y-0 flex w-10 flex-col items-center gap-3">
                      <span className="w-px flex-1 bg-[#303640]/55" />
                      <span className="whitespace-nowrap rounded-full border border-[#303640]/15 bg-white/92 px-3 py-1.5 text-[12px] font-semibold shadow-sm backdrop-blur [writing-mode:vertical-rl] rotate-180">
                        Hoogte {tv.wallHeight} cm
                      </span>
                      <span className="w-px flex-1 bg-[#303640]/55" />
                    </div>
                  </div>
                )}
                {/* Add / remove left module */}
                <button
                  type="button"
                  onClick={() => setHasLeft(!hasLeft)}
                  aria-label={hasLeft ? "Linker module verwijderen" : "Linker module toevoegen"}
                  className="absolute left-0 top-1/2 z-[6] flex h-11 w-11 -translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e2dc] bg-white text-[20px] font-bold leading-none text-[#ef7027] shadow-[0_10px_24px_rgba(3,12,26,0.10)] transition-colors hover:border-[#ef7027]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                    {!hasLeft && <path d="M12 5v14" />}
                  </svg>
                </button>

                <div
                  className={`relative z-[1] mr-[-3px] h-[calc(100%_+_0.4px)] translate-y-[0.25px] overflow-hidden ${
                    hasLeft ? "max-w-[600px] opacity-100" : "max-w-0 opacity-0"
                  }`}
                  style={{
                    transitionProperty: "max-width, opacity",
                    transitionDuration: "650ms, 650ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {previousPreviewColor && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-0" aria-hidden="true">
                      <ConfiguratorModuleImage
                        color={previousPreviewColor}
                        position="left"
                        source={previousModuleSource}
                        animate={false}
                        testId={false}
                      />
                    </div>
                  )}
                  <ConfiguratorModuleImage
                    key={`left-${previewColor}`}
                    color={previewColor}
                    position="left"
                    source={colorModuleSource}
                    className={`relative z-[1] origin-bottom-right transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasLeft ? "translate-x-0 scale-100" : "translate-x-6 scale-[95%]"
                    }`}
                  />
                </div>
                <div className="relative z-[2] h-full">
                  {previousPreviewColor && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-0" aria-hidden="true">
                      <ConfiguratorModuleImage
                        color={previousPreviewColor}
                        position="center"
                        source={previousModuleSource}
                        animate={false}
                        testId={false}
                      />
                    </div>
                  )}
                  <ConfiguratorModuleImage
                    key={`center-${previewColor}`}
                    color={previewColor}
                    position="center"
                    source={colorModuleSource}
                    className="relative z-[1]"
                  />
                </div>
                <div
                  className={`relative z-[1] h-[calc(100%_+_0.4px)] translate-y-[0.25px] overflow-hidden ${
                    usesWalnutModules ? "ml-[-11px]" : "ml-[-3px]"
                  } ${
                    hasRight ? "max-w-[600px] opacity-100" : "max-w-0 opacity-0"
                  }`}
                  style={{
                    transitionProperty: "max-width, opacity",
                    transitionDuration: "650ms, 650ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {previousPreviewColor && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-0" aria-hidden="true">
                      <ConfiguratorModuleImage
                        color={previousPreviewColor}
                        position="right"
                        source={previousModuleSource}
                        animate={false}
                        testId={false}
                      />
                    </div>
                  )}
                  <ConfiguratorModuleImage
                    key={`right-${previewColor}`}
                    color={previewColor}
                    position="right"
                    source={colorModuleSource}
                    className={`relative z-[1] origin-bottom-left transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasRight ? "translate-x-0 scale-100" : "-translate-x-6 scale-[95%]"
                    }`}
                  />
                </div>

                {/* Add / remove right module */}
                <button
                  type="button"
                  onClick={() => setHasRight(!hasRight)}
                  aria-label={hasRight ? "Rechter module verwijderen" : "Rechter module toevoegen"}
                  className="absolute right-0 top-1/2 z-[6] flex h-11 w-11 translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e2dc] bg-white text-[20px] font-bold leading-none text-[#ef7027] shadow-[0_10px_24px_rgba(3,12,26,0.10)] transition-colors hover:border-[#ef7027]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                    {!hasRight && <path d="M12 5v14" />}
                  </svg>
                </button>
              </div>

            </div>
          </div>
          </section>

          <aside className="relative z-[2] mx-4 my-5 overflow-hidden rounded-[22px] border border-[#e8e2dc] bg-white p-5 shadow-[0_18px_48px_rgba(3,12,26,0.09)] lg:mx-0 lg:my-0 lg:h-full lg:w-[492px] lg:justify-self-start lg:px-4 lg:pb-3 lg:pt-0">
            <section className="-mx-4 mb-3 overflow-hidden bg-[#fef9f5]">
              <button
                type="button"
                onClick={() => setProductionDetailsOpen((open) => !open)}
                aria-expanded={productionDetailsOpen}
                className="flex min-h-[42px] w-full items-center justify-between gap-4 px-4 text-left text-[#071426]"
              >
                <span
                  className="flex items-center gap-2 font-sans text-[14.4px] font-[385] text-[#cdc0b5]"
                  style={{ textShadow: "0 0.55px 0.55px rgba(0,0,0,0.065)" }}
                >
                  <span className="grid h-3.5 w-5 shrink-0 grid-rows-3 overflow-hidden rounded-[1px] opacity-80" aria-hidden="true">
                    <span className="bg-[#ae1c28]" />
                    <span className="bg-white" />
                    <span className="bg-[#21468b]" />
                  </span>
                  Dutch Design
                </span>
                <span className="flex h-[21.42px] w-[21.42px] shrink-0 items-center justify-center rounded-full border-2 border-[#cdc0b5] bg-transparent text-[#cdc0b5] shadow-none">
                  <Plus
                    className={`h-[10.71px] w-[10.71px] transition-transform duration-400 ease-out ${productionDetailsOpen ? "rotate-45" : "rotate-0"}`}
                    strokeWidth={2}
                  />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  productionDetailsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="relative min-h-[210px] px-5 pb-8 pt-3">
                    <p className="text-[17px] font-semibold text-[#071426]">Nederlands gemaakt. Met aandacht.</p>
                    <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-[#071426]">
                      Elke Wandig cinewall wordt in onze Nederlandse werkplaats gebouwd, gecontroleerd en plug &amp; play voorbereid voor jouw woonkamer.
                    </p>
                    <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-[#071426]">
                      Van de eerste plank tot de laatste kabeldoorvoer: lokaal vakmanschap, precies passend rond jouw tv.
                    </p>
                    <div className="pointer-events-none absolute bottom-5 right-5 flex items-end text-[#cdc0b5]" aria-hidden="true">
                      <Puzzle className="h-10 w-10 -rotate-12 opacity-65" strokeWidth={1.5} />
                      <Puzzle className="-ml-2 h-14 w-14 rotate-12 opacity-85" strokeWidth={1.5} />
                      <Puzzle className="-ml-3 h-9 w-9 -rotate-6 opacity-55" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-b border-[#eeeeee] pb-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-1">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#ef7027]">
                  Jouw configuratie
                </span>
                <div className="flex items-baseline justify-end gap-2.5 text-right">
                  {beforeTotal !== null && (
                    <span className="whitespace-nowrap text-[14px] font-medium text-[#9a9da2] line-through decoration-1">
                      {euro(beforeTotal)}
                    </span>
                  )}
                  <strong className="whitespace-nowrap text-[34px] font-bold leading-none tracking-[-0.03em] text-[#ff5a00]">
                    {euro(total)}
                  </strong>
                </div>

                <span aria-hidden="true" />
                <p className="whitespace-nowrap text-right text-[12px] leading-[1.4] text-[#071426]/42">
                  3 betalingen van {euroWithCents(total / 3)} tegen 0% rente
                </p>

                <div className="flex items-center text-[#4f5966]/78">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-3 w-3 fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="ml-2 text-[10px] text-[#071426]/30">(1000+)</span>
                </div>
                <p className="flex items-baseline justify-end gap-2 text-[12px] leading-[1.4] text-[#071426]/42">
                  <strong
                    className="text-[14px] font-bold leading-none text-[#071426]"
                    style={{ fontFamily: '"Klarna Headline", "Circular-Regular", sans-serif' }}
                  >
                    Klarna.
                  </strong>
                  <InfoDrawerLink
                    topic="klarna"
                    className="underline underline-offset-2 transition-colors hover:text-[#071426]"
                  />

                </p>
              </div>
            </div>

            <div className="mt-3 grid min-h-[52px] grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-2 rounded-[12px] border border-[#eeeeee] px-3">
              <strong className="text-[15px] font-[750] leading-none text-[#071426]">Kleur</strong>
              <div className="flex min-w-0 items-center justify-start gap-2">
                {colors.map((colorName) => (
                  <button
                    key={colorName}
                    type="button"
                    onClick={() => selectColor(colorName)}
                    aria-label={colorName}
                    title={colorName}
                    aria-pressed={colorName === color}
                    className={`h-8 w-8 shrink-0 rounded-full border-2 transition-all duration-200 hover:-translate-y-px lg:h-[35px] lg:w-[35px] ${
                      colorName === color
                        ? "border-[#ef7027] shadow-[0_0_0_3px_rgba(239,112,39,0.12),inset_0_0_0_1px_rgba(0,0,0,0.18)]"
                        : "border-transparent shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]"
                    }`}
                    style={wandigSwatchStyle(colorName)}
                  />
                ))}
              </div>
              <span className="whitespace-nowrap text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">{color}</span>
            </div>

            <div className="mb-3 mt-2 overflow-hidden rounded-[12px] border border-[#eeeeee]">
              <button
                type="button"
                onClick={() => setTvSizeOpen((open) => !open)}
                aria-expanded={tvSizeOpen}
                className="flex min-h-[52px] w-full items-center gap-2 px-3 text-left"
              >
                <span className="grid min-w-0 flex-1 grid-cols-[80px_minmax(0,1fr)] items-baseline gap-2">
                  <span className="text-[15px] font-[750] leading-none text-[#071426]">Tv-maat</span>
                  <span className="truncate text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">
                    {tv.note}
                  </span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#071426]/45 transition-transform duration-300 ease-out ${tvSizeOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  tvSizeOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-2 px-3 pb-3 pt-1">
                    {TV_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTv(option)}
                        aria-pressed={option.value === tv.value}
                        className={`h-10 rounded-[8px] border bg-[#f8f6f4] px-2 text-[12px] font-medium text-[#071426] transition-[border-color,box-shadow,background-color,transform] duration-300 ease-out hover:bg-[#f3ece6] active:scale-[0.98] ${
                          option.value === tv.value
                            ? "border-[#ff5a00] bg-[#fff8f3] shadow-[0_0_0_2px_rgba(255,90,0,0.18)]"
                            : "border-[#eeeeee] shadow-none"
                        }`}
                      >
                        {option.note}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Button
                type="button"
                onClick={() =>
                  toast.success("Samenstelling opgeslagen", {
                    description: `Tv ${tv.value} · ${color} · ${width} cm · ${euro(total)}`,
                  })
                }
                className="group mt-3 h-12 w-full translate-y-0 overflow-hidden rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] px-6 text-sm font-bold text-white shadow-none transition hover:translate-y-0 hover:from-[#e36820] hover:to-[#d8601b] hover:shadow-none active:translate-y-0 active:scale-100"
              >
                <span className="relative block h-full w-full overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center gap-1.5 font-[200] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />Voeg samenstelling toe
                  </span>
                  <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-1.5 font-[200] transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />Voeg samenstelling toe
                  </span>
                </span>
              </Button>

              <div className="mb-[10px] mt-[17px] hidden w-full grid-cols-[max-content_max-content_max-content_max-content_max-content] items-center justify-between font-sans tracking-[0.04em] text-[#90949b] sm:grid">
                <div className="flex items-center gap-1.5 text-[10.8px] font-normal leading-none"><ShieldCheck className="h-[14.4px] w-[14.4px] shrink-0" /><span className="whitespace-nowrap">10 jaar garantie</span></div>
                <span className="text-[11.7px] text-[#cdc0b5]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5 text-[10.8px] font-normal leading-none"><Hammer className="h-[14.4px] w-[14.4px] shrink-0" /><span className="whitespace-nowrap">Handgemaakt in NL</span></div>
                <span className="text-[11.7px] text-[#cdc0b5]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5 text-[10.8px] font-normal leading-none"><Truck className="h-[14.4px] w-[14.4px] shrink-0" /><span className="whitespace-nowrap">7-14 werkdagen levertijd</span></div>
              </div>

              <div className="mb-[10px] mt-[17px] grid grid-cols-1 divide-y divide-[#eeeeee] font-sans tracking-[0.04em] text-[#90949b] sm:hidden">
                <div className="flex items-center justify-start gap-1.5 py-2 text-[10.8px] font-normal leading-none"><ShieldCheck className="h-[14.4px] w-[14.4px] shrink-0" /><span>10 jaar garantie</span></div>
                <div className="flex items-center justify-start gap-1.5 py-2 text-[10.8px] font-normal leading-none"><Hammer className="h-[14.4px] w-[14.4px] shrink-0" /><span>Handgemaakt in NL</span></div>
                <div className="flex items-center justify-start gap-1.5 py-2 text-[10.8px] font-normal leading-none"><Truck className="h-[14.4px] w-[14.4px] shrink-0" /><span>7-14 werkdagen levertijd</span></div>
              </div>

              <section className="mt-4 border-t border-[#eeeeee] pt-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-[#030c1a]">Jouw voordelen</h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label="Vorige voordelen"
                      onClick={() => scrollBenefits(-1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[#030c1a] transition-colors hover:bg-[#f8f6f3]"
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      aria-label="Volgende voordelen"
                      onClick={() => scrollBenefits(1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[#030c1a] transition-colors hover:bg-[#f8f6f3]"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <div
                  ref={benefitsScrollerRef}
                  className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {CONFIGURATOR_BENEFITS.map((benefit) => (
                    <article
                      key={benefit.title}
                      className="relative h-[195px] min-w-[150px] snap-start overflow-hidden rounded-[13px] bg-[#eee4dc] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                    >
                      <img src={benefit.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
                      <h4 className="absolute inset-x-0 top-0 px-3 pt-5 text-center text-[13px] font-normal leading-tight tracking-[0.03em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                        {benefit.title}
                      </h4>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
      <section className="w-full border-t border-[#eeeeee] bg-[#faf8f4]">
        <div
          className="mx-auto grid min-h-[198px] max-w-[1500px] grid-cols-1 gap-8 px-7 py-10 text-[#1b1d20] sm:grid-cols-2 lg:grid-cols-[1.05fr_repeat(4,1fr)] lg:items-start lg:gap-7 lg:px-12 lg:py-[52px] xl:px-16"
          style={{ fontFamily: '"Circular-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          <div>
            <p className="max-w-[225px] text-[11px] leading-[1.45] text-[#474b50]">
              Gebaseerd op meer dan 1000 beoordelingen van onze klanten
            </p>
            <div className="mt-3 flex items-center gap-2">
              <strong className="text-[22px] font-semibold leading-none tracking-0">4,9/5</strong>
              <span className="flex items-center gap-0.5" aria-label="5 van 5 sterren">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-[17px] w-[17px] fill-current" strokeWidth={0} />
                ))}
              </span>
            </div>
          </div>

          <article className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3">
            <Hammer className="mt-0.5 h-[19px] w-[19px]" strokeWidth={1.5} />
            <div>
              <h2 className="text-[15px] font-medium leading-tight">Gemaakt in Nederland</h2>
              <p className="mt-2 text-[11px] leading-relaxed text-[#62666b]">Met aandacht, speciaal voor jou</p>
            </div>
          </article>

          <article className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3">
            <CalendarCheck className="mt-0.5 h-[19px] w-[19px]" strokeWidth={1.5} />
            <div>
              <h2 className="text-[15px] font-medium leading-tight">100 dagen garantie</h2>
              <p className="mt-2 text-[11px] leading-relaxed text-[#62666b]">Rustig ervaren in jouw interieur</p>
              <InfoDrawerLink
                topic="proefkijken"
                className="mt-3 inline-block border-b border-current pb-0.5 text-[11px] font-medium leading-none transition-opacity hover:opacity-60"
              />
            </div>
          </article>

          <article className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3">
            <Plug className="mt-0.5 h-[19px] w-[19px]" strokeWidth={1.5} />
            <div>
              <h2 className="text-[15px] font-medium leading-tight">Plug &amp; play</h2>
              <p className="mt-2 text-[11px] leading-relaxed text-[#62666b]">Aansluiten en direct genieten</p>
              <InfoDrawerLink
                topic="plugplay"
                className="mt-3 inline-block border-b border-current pb-0.5 text-[11px] font-medium leading-none transition-opacity hover:opacity-60"
              />
            </div>
          </article>

          <article className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3">
            <ShieldCheck className="mt-0.5 h-[19px] w-[19px]" strokeWidth={1.5} />
            <div>
              <h2 className="text-[15px] font-medium leading-tight">10 jaar garantie</h2>
              <p className="mt-2 text-[11px] leading-relaxed text-[#62666b]">Gebouwd om jarenlang mee te gaan</p>
              <InfoDrawerLink
                topic="garantie"
                className="mt-3 inline-block border-b border-current pb-0.5 text-[11px] font-medium leading-none transition-opacity hover:opacity-60"
              />
            </div>
          </article>
        </div>

        </div>
      </section>
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-10">
        <SpecificationsSection />
        <UniqueSection title="Dit maakt Wandig uniek" />
        <BeforeAfterSection />
      </div>

      <CustomerGallerySection backgroundClassName="bg-[#faf8f4]" />

      <BuiltToLastSection />

      <FaqSection />

      <ReviewsSection />
    </main>
  );
}
