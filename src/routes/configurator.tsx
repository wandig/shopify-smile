import { Img } from "@/components/Img";
import { showReviews } from "@/lib/features";
import { optimizeImageUrl } from "@/lib/asset-image";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarCheck, Check, ChevronDown, ChevronLeft, ChevronRight, Hammer, MoveHorizontal, MoveVertical, Plug, Plus, Ruler, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { PaymentOptionsBadges } from "@/components/PaymentOptionsBadges";
import { SpecificationsSection, UniqueSection, BeforeAfterSection } from "@/components/ProductStorySections";
import {
  CustomerGallerySection,
  BuiltToLastSection,
  FaqSection,
  ReviewsSection,
  NewsletterContactSection,
  TrustBannerSection,
} from "@/components/ProductPageSections";
import {
  CONFIGURATOR_MODULE_ASSETS,
  ConfiguratorModuleImage,
  CroppedModuleImage,
  FULL_HOUSE_FRONT_IMAGES,
  MODULE_CROPS,
  WandigSpecPreview,
  getConfiguratorModuleAsset,
  type ModuleCropSet,
  type ModulePosition,
  type ConfiguratorModuleAsset,
} from "@/components/WandigModulePreview";
import openLeftModule from "@/assets/configurator/walnootbruin-links-open-v2.png.asset.json";

import dutchDesignIcon from "@/assets/dutch-design-icon.svg.asset.json";
import puzzlePiecesImg from "@/assets/puzzle-pieces.png.asset.json";
import werkplaatsImgAsset from "@/assets/werkplaats.jpg.asset.json";
const werkplaatsImg = werkplaatsImgAsset.url;
import fullHouseFinishImgAsset from "@/assets/full-house-gallery-finish.webp.asset.json";
const fullHouseFinishImg = fullHouseFinishImgAsset.url;
import fullHouseUseImgAsset from "@/assets/full-house-gallery-use.webp.asset.json";
const fullHouseUseImg = fullHouseUseImgAsset.url;
import detailMaatwerkImgAsset from "@/assets/detail-maatwerk.jpg.asset.json";
const detailMaatwerkImg = detailMaatwerkImgAsset.url;
import fullHouseRoomImgAsset from "@/assets/full-house-gallery-room.jpg.asset.json";
const fullHouseRoomImg = fullHouseRoomImgAsset.url;
import detailDesignImgAsset from "@/assets/detail-design.jpg.asset.json";
const detailDesignImg = detailDesignImgAsset.url;
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

import { FULL_HOUSE_COLORS, displayWandigColor, sortWandigColors, wandigSwatchStyle } from "@/lib/wandig-colors";

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
  { value: '43"', note: "40–55 inch", shopifyValue: "40 - 55 inch", soloShopifyValue: "40 - 50 inch", price: 0, wallHeight: 180, centerWidth: 134, originalModuleWidth: 62, newModuleWidth: 44 },
  { value: '55"', note: "58–65 inch", shopifyValue: "58 - 65 inch", soloShopifyValue: "55 - 65 inch", price: 150, wallHeight: 180, centerWidth: 156, originalModuleWidth: 56, newModuleWidth: 38 },
  { value: '65"', note: "70–75 inch", shopifyValue: "70 - 75 inch", soloShopifyValue: "70 - 75 inch", price: 250, wallHeight: 185, centerWidth: 177, originalModuleWidth: 49, newModuleWidth: 34 },
  { value: '75"', note: "77–85 inch", shopifyValue: "77 - 85 inch", soloShopifyValue: "80 - 85 inch", price: 350, wallHeight: 190, centerWidth: 200, originalModuleWidth: 42, newModuleWidth: 29 },
];




export type LeftModuleVariant = "dicht" | "open" | "original" | "nieuw";
export type RightModuleVariant = LeftModuleVariant;

const SINGLE_MODULE_ASSET_SIZES = [
  "40 - 55 inch",
  "58 - 65 inch",
  "70 - 75 inch",
  "77 - 85 inch",
];
const SINGLE_MODULE_ASSET_COLORS = new Set<string>([
  FULL_HOUSE_COLORS[0],
  FULL_HOUSE_COLORS[1],
  FULL_HOUSE_COLORS[2],
  FULL_HOUSE_COLORS[3],
  FULL_HOUSE_COLORS[4],
]);

const hasSingleModuleAssetPicker = (color: string, tvSize: string) =>
  SINGLE_MODULE_ASSET_COLORS.has(color) && SINGLE_MODULE_ASSET_SIZES.includes(tvSize);

/** Crop of the open (shelf) left module render, measured on the 1920x1440 source. */
export const OPEN_LEFT_CROPS: ModuleCropSet = {
  left: { left: 840 / 1920, top: 170 / 1440, width: 239 / 1920, height: 1100 / 1440 },
  center: MODULE_CROPS.center,
  right: MODULE_CROPS.right,
};

/** The open left render mirrored into a right-side module. */
export const OPEN_RIGHT_CROPS: ModuleCropSet = {
  left: MODULE_CROPS.left,
  center: MODULE_CROPS.center,
  right: OPEN_LEFT_CROPS.left,
};

const selectSingleSideAssets = (
  positionAssets: ConfiguratorModuleAsset["positionAssets"],
  color: string,
  tvSize: string,
  leftVariant: LeftModuleVariant,
  rightVariant: RightModuleVariant,
) => {
  if (
    !hasSingleModuleAssetPicker(color, tvSize) ||
    !positionAssets
  ) {
    return positionAssets;
  }

  return {
    ...positionAssets,
    left: leftVariant === "original" ? undefined : positionAssets.left,
    right: rightVariant === "original" ? undefined : positionAssets.right,
  };
};

function ConfiguratorPreviewAssembly({
  color,
  source,
  crops,
  hasLeft,
  hasRight,
  animateSides,
  leftVariant = "dicht",
  rightVariant = "dicht",
  positionAssets,
}: {
  color: string;
  source: string | null;
  crops: ModuleCropSet;
  hasLeft: boolean;
  hasRight: boolean;
  animateSides: boolean;
  leftVariant?: LeftModuleVariant;
  rightVariant?: RightModuleVariant;
  positionAssets?: ConfiguratorModuleAsset["positionAssets"];
}) {
  const usesLegacyWalnutModules = color === FULL_HOUSE_COLORS[0] && source === null;
  const sideTransition = animateSides
    ? {
        transitionProperty: "max-width, opacity, transform",
        transitionDuration: "520ms, 320ms, 520ms",
        transitionTimingFunction:
          "cubic-bezier(0.22,1,0.36,1), ease-out, cubic-bezier(0.22,1,0.36,1)",
      }
    : undefined;
  const moduleSource = (position: ModulePosition) => positionAssets?.[position]?.source ?? source;
  const moduleCrops = (position: ModulePosition): ModuleCropSet =>
    positionAssets?.[position]
      ? { ...crops, [position]: positionAssets[position]!.crop }
      : crops;

  return (
    <div className="flex h-full items-end justify-center">
      <div
        className={`relative z-[1] mr-[-3px] translate-y-[0.25px] overflow-hidden ${
          leftVariant === "open" ? "h-full" : "h-[calc(100%_+_0.4px)]"
        } ${
          hasLeft
            ? `max-w-[600px] opacity-100 ${leftVariant === "open" ? "translate-x-[1px]" : "translate-x-0"}`
            : "max-w-0 translate-x-5 opacity-0"
        }`}
        style={{
          ...sideTransition,
          height:
            (leftVariant === "dicht" || leftVariant === "nieuw") &&
            positionAssets?.left?.heightAdjustmentPx
              ? `calc(100% + ${0.4 + positionAssets.left.heightAdjustmentPx}px)`
              : undefined,
        }}
      >
        {leftVariant === "open" ? (
          <CroppedModuleImage
            color={color}
            position="left"
            source={openLeftModule.url}
            animate={false}
            testId={animateSides}
            crops={OPEN_LEFT_CROPS}
          />
        ) : (
          <ConfiguratorModuleImage
            color={color}
            position="left"
            source={moduleSource("left")}
            animate={false}
            testId={animateSides}
            crops={moduleCrops("left")}
            bottomTrimPx={positionAssets?.left?.bottomTrimPx}
            walnutSideOffsetY={-0.5 + (positionAssets?.left?.offsetYPx ?? 0)}
            sideOffsetY={positionAssets?.left?.offsetYPx ?? 0}
          />
        )}
      </div>


      <div className="relative z-[2] h-full">
        <ConfiguratorModuleImage
          color={color}
          position="center"
          source={moduleSource("center")}
          animate={false}
          testId={animateSides}
          crops={moduleCrops("center")}
        />
      </div>

      <div
        className={`relative z-[1] translate-y-[0.25px] overflow-hidden ${
          rightVariant === "open" ? "h-full" : "h-[calc(100%_+_0.4px)]"
        } ${
          usesLegacyWalnutModules ? "ml-[-11px]" : "ml-[-3px]"
        } ${
          hasRight
            ? `max-w-[600px] opacity-100 ${rightVariant === "open" ? "-translate-x-[1px]" : "translate-x-0"}`
            : "max-w-0 -translate-x-5 opacity-0"
        }`}
        style={{
          ...sideTransition,
          height:
            (rightVariant === "dicht" || rightVariant === "nieuw") &&
            positionAssets?.right?.heightAdjustmentPx
              ? `calc(100% + ${0.4 + positionAssets.right.heightAdjustmentPx}px)`
              : undefined,
        }}
      >
        {rightVariant === "open" ? (
          <CroppedModuleImage
            color={color}
            position="right"
            source={openLeftModule.url}
            animate={false}
            testId={animateSides}
            crops={OPEN_RIGHT_CROPS}
            className="-scale-x-100"
          />
        ) : (
          <ConfiguratorModuleImage
            color={color}
            position="right"
            source={moduleSource("right")}
            animate={false}
            testId={animateSides}
            crops={moduleCrops("right")}
            bottomTrimPx={positionAssets?.right?.bottomTrimPx}
            walnutSideOffsetY={-0.5 + (positionAssets?.right?.offsetYPx ?? 0)}
            sideOffsetY={positionAssets?.right?.offsetYPx ?? 0}
          />
        )}
      </div>
    </div>
  );
}


const CONFIGURATOR_BENEFITS = [
  { title: "Ontworpen in Nederland", image: werkplaatsImg },
  { title: "Kabels uit het zicht", image: fullHouseFinishImg },
  { title: "In een handomdraai", image: fullHouseUseImg },
  { title: "Persoonlijk advies", image: detailMaatwerkImg },
  { title: "100 dagen proefkijken", image: fullHouseRoomImg },
  { title: "10 jaar garantie", image: detailDesignImg },
];


function euro(n: number) {
  return `${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(n)},-`;
}

function findModuleVariantImage(
  product: ShopifyProduct["node"] | null | undefined,
  color: string,
  tvSize: string,
) {
  return product?.variants.edges
    .map((edge) => edge.node)
    .find((variant) => {
      const selections = new Map(
        variant.selectedOptions.map((option) => [option.name.toLocaleLowerCase("nl-NL"), option.value]),
      );
      return (
        selections.get("kleur") === color &&
        selections.get("opstelling") === "Links" &&
        selections.get("maat tv") === tvSize
      );
    })?.image?.url;
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
          className="w-full max-w-[440px] rounded-l-3xl border-l border-[#eeeeee] bg-[#faf8f5] px-7 py-10 sm:max-w-[440px]"
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


function useWandigProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return (response?.data?.product ?? null) as ShopifyProduct["node"] | null;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/** Vindt de variant die hoort bij kleur / opstelling / tv-maat. */
function findWandigVariant(
  product: ShopifyProduct["node"] | null | undefined,
  color: string,
  arrangement: "Links" | "Rechts" | null,
  tvSize: string,
) {
  return product?.variants.edges
    .map((edge) => edge.node)
    .find((variant) => {
      const selections = new Map(
        variant.selectedOptions.map((option) => [option.name.toLocaleLowerCase("nl-NL"), option.value]),
      );
      return (
        selections.get("kleur") === color &&
        selections.get("maat tv") === tvSize &&
        (arrangement === null || selections.get("opstelling") === arrangement)
      );
    });
}

/** Vindt de variant van het losse "Wandig Nieuwe Module"-product. */
function findNewModuleVariant(
  product: ShopifyProduct["node"] | null | undefined,
  color: string,
  side: "Links" | "Rechts",
  tvSize: string,
) {
  return product?.variants.edges
    .map((edge) => edge.node)
    .find((variant) => {
      const selections = new Map(
        variant.selectedOptions.map((option) => [option.name.toLocaleLowerCase("nl-NL"), option.value]),
      );
      return (
        selections.get("kleur") === color &&
        selections.get("positie") === side &&
        selections.get("maat tv") === tvSize
      );
    });
}

function ConfiguratorPage() {
  const { data: fullHouseProduct } = useWandigProduct("full-house");
  const { data: soloProduct } = useWandigProduct("solo");
  const { data: duoProduct } = useWandigProduct("duo");
  const { data: newModuleProduct } = useWandigProduct("wandig-nieuwe-module");

  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);


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
  const [previousPreviewTvValue, setPreviousPreviewTvValue] = useState<string | null>(null);
  const [tv, setTv] = useState(TV_OPTIONS[1]);
  const [hasLeft, setHasLeft] = useState(false);
  const [leftVariant, setLeftVariant] = useState<LeftModuleVariant>("nieuw");
  const [leftPickerOpen, setLeftPickerOpen] = useState(false);

  const [hasRight, setHasRight] = useState(false);
  const [rightVariant, setRightVariant] = useState<RightModuleVariant>("nieuw");
  const [rightPickerOpen, setRightPickerOpen] = useState(false);
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
    const configuredSources = Object.values(CONFIGURATOR_MODULE_ASSETS).flatMap((assetsBySize) =>
      Object.values(assetsBySize).flatMap((asset) =>
        asset
          ? [
              asset.source,
              ...Object.values(asset.positionAssets ?? {}).map((positionAsset) => positionAsset.source),
            ]
          : [],
      ),
    );
    const sources = [...new Set([...Object.values(FULL_HOUSE_FRONT_IMAGES), ...configuredSources])];
    const images = sources.map((source) => {
      const image = new Image();
      image.src = optimizeImageUrl(source, 1200) ?? source;
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
    setPreviousPreviewTvValue(tv.shopifyValue);
    setColor(nextColor);
    setPreviewColor(nextColor);

    if (previewCleanupTimerRef.current !== null) {
      window.clearTimeout(previewCleanupTimerRef.current);
    }
    previewCleanupTimerRef.current = window.setTimeout(() => {
      setPreviousPreviewColor(null);
      setPreviousPreviewTvValue(null);
    }, 520);
  };

  const selectTv = (nextTv: (typeof TV_OPTIONS)[number]) => {
    if (nextTv.shopifyValue === tv.shopifyValue) return;

    setPreviousPreviewColor(previewColor);
    setPreviousPreviewTvValue(tv.shopifyValue);
    setTv(nextTv);

    if (previewCleanupTimerRef.current !== null) {
      window.clearTimeout(previewCleanupTimerRef.current);
    }
    previewCleanupTimerRef.current = window.setTimeout(() => {
      setPreviousPreviewColor(null);
      setPreviousPreviewTvValue(null);
    }, 520);
  };

  const moduleWidth = (variant: LeftModuleVariant | RightModuleVariant) =>
    variant === "nieuw" ? tv.newModuleWidth : tv.originalModuleWidth;
  const moduleVariantLabel = (variant: LeftModuleVariant | RightModuleVariant) =>
    variant === "nieuw" ? "nieuw" : "origineel";
  const widthCm =
    tv.centerWidth +
    (hasLeft ? moduleWidth(leftVariant) : 0) +
    (hasRight ? moduleWidth(rightVariant) : 0);
  const width = Number.isInteger(widthCm)
    ? String(widthCm)
    : widthCm.toFixed(1).replace(".", ",");
  // Welk Wandig-model hoort bij deze samenstelling?
  // Het basisproduct (Solo/Duo/Full House) dekt de middenmodule + de originele zijmodules.
  // Elke nieuwe module wordt als los product ("Wandig Nieuwe Module") toegevoegd.
  const hasLeftOriginal = hasLeft && leftVariant !== "nieuw";
  const hasRightOriginal = hasRight && rightVariant !== "nieuw";
  const originalCount = (hasLeftOriginal ? 1 : 0) + (hasRightOriginal ? 1 : 0);
  const newModuleSides: Array<"Links" | "Rechts"> = [
    ...(hasLeft && leftVariant === "nieuw" ? (["Links"] as const) : []),
    ...(hasRight && rightVariant === "nieuw" ? (["Rechts"] as const) : []),
  ];
  const model = originalCount === 2 ? "full-house" : originalCount === 1 ? "duo" : "solo";
  const arrangement: "Links" | "Rechts" | null =
    model === "duo" ? (hasRightOriginal ? "Rechts" : "Links") : null;
  const modelLabel =
    model === "full-house"
      ? "Wandig Full House"
      : model === "duo"
        ? `Wandig Duo ${arrangement === "Rechts" ? "Rechts" : "Links"}`
        : "Wandig Solo";
  const activeProduct = model === "solo" ? soloProduct : model === "duo" ? duoProduct : fullHouseProduct;
  const activeTvSize = model === "duo" ? tv.shopifyValue : tv.soloShopifyValue;

  const selectedShopifyVariant = useMemo(
    () => findWandigVariant(activeProduct, color, arrangement, activeTvSize),
    [activeProduct, arrangement, color, activeTvSize],
  );
  const newModuleVariants = useMemo(
    () =>
      newModuleSides.map((side) => ({
        side,
        variant: findNewModuleVariant(newModuleProduct, color, side, tv.shopifyValue),
      })),
    [newModuleProduct, color, tv.shopifyValue, newModuleSides.join("|")],
  );

  // Vaste configuratorprijzen (actieprijs / doorgestreepte prijs)
  const CENTER_PRICE = 1196;
  const CENTER_COMPARE_PRICE = 1709;
  const ORIGINAL_MODULE_PRICE = 396;
  const ORIGINAL_MODULE_COMPARE_PRICE = 566;
  const NEW_MODULE_PRICE = 297;
  const NEW_MODULE_COMPARE_PRICE = 424;

  const modulePrice = (variant: LeftModuleVariant | RightModuleVariant) =>
    variant === "nieuw" ? NEW_MODULE_PRICE : ORIGINAL_MODULE_PRICE;
  const moduleComparePrice = (variant: LeftModuleVariant | RightModuleVariant) =>
    variant === "nieuw" ? NEW_MODULE_COMPARE_PRICE : ORIGINAL_MODULE_COMPARE_PRICE;

  const total = useMemo(
    () =>
      CENTER_PRICE +
      (hasLeft ? modulePrice(leftVariant) : 0) +
      (hasRight ? modulePrice(rightVariant) : 0),
    [hasLeft, hasRight, leftVariant, rightVariant],
  );
  const beforeTotal = useMemo(
    () =>
      CENTER_COMPARE_PRICE +
      (hasLeft ? moduleComparePrice(leftVariant) : 0) +
      (hasRight ? moduleComparePrice(rightVariant) : 0),
    [hasLeft, hasRight, leftVariant, rightVariant],
  );

  const colorModuleAsset = useMemo(() => {
    const configuredAsset = getConfiguratorModuleAsset(previewColor, tv.shopifyValue);
    if (configuredAsset) return configuredAsset;
    if (previewColor === FULL_HOUSE_COLORS[0]) return { source: null, crops: MODULE_CROPS, positionAssets: undefined };

    return {
      source:
        findModuleVariantImage(fullHouseProduct, previewColor, tv.shopifyValue) ??
        FULL_HOUSE_FRONT_IMAGES[previewColor],
      crops: MODULE_CROPS,
    };
  }, [fullHouseProduct, previewColor, tv.shopifyValue]);
  const previousModuleAsset = useMemo(() => {
    if (!previousPreviewColor) return null;

    const previousTvSize = previousPreviewTvValue ?? tv.shopifyValue;
    const configuredAsset = getConfiguratorModuleAsset(previousPreviewColor, previousTvSize);
    if (configuredAsset) return configuredAsset;
    if (previousPreviewColor === FULL_HOUSE_COLORS[0]) return { source: null, crops: MODULE_CROPS, positionAssets: undefined };

    return {
      source:
        findModuleVariantImage(fullHouseProduct, previousPreviewColor, previousTvSize) ??
        FULL_HOUSE_FRONT_IMAGES[previousPreviewColor],
      crops: MODULE_CROPS,
    };
  }, [fullHouseProduct, previousPreviewColor, previousPreviewTvValue, tv.shopifyValue]);
  const colorModuleSource = colorModuleAsset.source;
  const previousModuleSource = previousModuleAsset?.source ?? null;
  const isSingleModuleAssetPicker = hasSingleModuleAssetPicker(
    previewColor,
    tv.shopifyValue,
  );
  const selectedPositionAssets = selectSingleSideAssets(
    colorModuleAsset.positionAssets,
    previewColor,
    tv.shopifyValue,
    leftVariant,
    rightVariant,
  );
  const previousSelectedPositionAssets = previousModuleAsset
    ? selectSingleSideAssets(
        previousModuleAsset.positionAssets,
        previousPreviewColor ?? previewColor,
        previousPreviewTvValue ?? tv.shopifyValue,
        leftVariant,
        rightVariant,
      )
    : undefined;
  const leftModuleOptions: Array<{ variant: LeftModuleVariant; label: string }> =
    isSingleModuleAssetPicker
      ? [
          { variant: "original", label: "Originele module" },
          { variant: "nieuw", label: "Nieuwe module" },
        ]
      : [
          { variant: "dicht", label: "Met deuren" },
          { variant: "open", label: "Open vakken" },
        ];
  const rightModuleOptions: Array<{ variant: RightModuleVariant; label: string }> =
    isSingleModuleAssetPicker
      ? [
          { variant: "original", label: "Originele module" },
          { variant: "nieuw", label: "Nieuwe module" },
        ]
      : [
          { variant: "dicht", label: "Met deuren" },
          { variant: "open", label: "Open vakken" },
        ];

  const handleAddToCart = async () => {
    const missingNewModule = newModuleVariants.some((entry) => !entry.variant);
    if (!activeProduct || !selectedShopifyVariant || (newModuleProduct && missingNewModule)) {
      toast.error("Deze samenstelling is nu niet beschikbaar", {
        description: `${modelLabel} · ${displayWandigColor(color)} · ${activeTvSize}`,
        position: "top-center",
      });
      return;
    }

    await addItem({
      product: { node: activeProduct },
      variantId: selectedShopifyVariant.id,
      variantTitle: selectedShopifyVariant.title,
      price: selectedShopifyVariant.price,
      quantity: 1,
      selectedOptions: selectedShopifyVariant.selectedOptions,
    });

    if (newModuleProduct) {
      for (const entry of newModuleVariants) {
        if (!entry.variant) continue;
        await addItem({
          product: { node: newModuleProduct },
          variantId: entry.variant.id,
          variantTitle: entry.variant.title,
          price: entry.variant.price,
          quantity: 1,
          selectedOptions: entry.variant.selectedOptions,
        });
      }
    }

    const extra = newModuleVariants.length
      ? ` + nieuwe module ${newModuleVariants.map((e) => e.side.toLowerCase()).join(" & ")}`
      : "";
    toast.success(`${modelLabel}${extra} toegevoegd`, {
      description: `${displayWandigColor(color)} · ${activeTvSize} · ${width} cm · ${euro(total)}`,
      position: "top-center",
    });
  };



  return (
    <main className="min-h-screen bg-[#f8f6f3]">
      <div className="w-full">
        <div className="relative grid w-full items-start overflow-hidden bg-[#e9e3dc] lg:min-h-[calc(85vh-39px)] lg:grid-cols-[minmax(0,1fr)_528px] lg:py-[30px]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[79%] border-b border-black/[0.08] lg:block"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 52% 34%, rgba(255,255,255,0.98) 0%, rgba(249,246,242,0.82) 34%, rgba(232,225,217,0.2) 72%), linear-gradient(180deg, #f3efea 0%, #e8e1d9 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[21%] lg:block"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 22%), linear-gradient(180deg, #ded6cd 0%, #cfc4b9 100%)",
              boxShadow: "inset 0 18px 30px rgba(76,61,48,0.045)",
            }}
          />
          <div className="pointer-events-none absolute bottom-[18.5%] left-[37.5%] hidden h-6 w-[44%] -translate-x-1/2 rounded-[50%] bg-black/[0.13] blur-xl lg:block" />

          <section className="relative z-[1] min-w-0 overflow-hidden lg:h-full">
          {/* Scene */}
          <div
            ref={stageRef}
            className="relative flex h-[422px] items-start justify-center overflow-hidden px-3 pb-0 pt-[90px] md:h-auto md:min-h-[760px] md:items-center md:px-8 md:pb-[78px] md:pt-[76px] lg:h-full lg:min-h-0"
          >
            {/* Muur + vloer voor mobiel en tablet */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[79%] border-b border-black/[0.08] lg:hidden"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 52% 34%, rgba(255,255,255,0.98) 0%, rgba(249,246,242,0.82) 34%, rgba(232,225,217,0.2) 72%), linear-gradient(180deg, #f3efea 0%, #e8e1d9 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[21%] lg:hidden"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 22%), linear-gradient(180deg, #ded6cd 0%, #cfc4b9 100%)",
                boxShadow: "inset 0 18px 30px rgba(76,61,48,0.045)",
              }}
            />
            <div className="pointer-events-none absolute bottom-[18.5%] left-1/2 h-6 w-[52%] -translate-x-1/2 rounded-[50%] bg-black/[0.13] blur-xl lg:hidden" />


            {/* Mobiel: uitschuivend maatlint, onderaan boven de Dutch Design-tekst */}
            <div className="pointer-events-none absolute bottom-[104px] left-4 z-[9] flex max-w-[calc(100%-32px)] items-center md:hidden">
              <button
                type="button"
                onClick={() => setShowMeasurements((visible) => !visible)}
                aria-expanded={showMeasurements}
                aria-label="Afmetingen bekijken"
                className="pointer-events-auto relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ef7027]/25 bg-white/95 text-[#ef7027] shadow-[0_6px_18px_rgba(7,20,38,0.14)] backdrop-blur transition-transform active:scale-95"
              >
                <Ruler className={`h-[18px] w-[18px] transition-transform duration-300 ${showMeasurements ? "rotate-45" : ""}`} />
              </button>
              <div
                className={`pointer-events-auto ml-[-20px] overflow-hidden rounded-r-full bg-white/95 shadow-[0_6px_18px_rgba(7,20,38,0.12)] backdrop-blur transition-all duration-300 ease-out ${
                  showMeasurements ? "max-w-[300px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3 whitespace-nowrap py-2.5 pl-7 pr-5 text-[12px] text-[#071426]">
                  <span className="flex items-center gap-1.5">
                    <MoveHorizontal className="h-3.5 w-3.5 text-[#ef7027]" />
                    <span className="text-[#071426]/55">Breedte</span>
                    <strong className="font-[500]">{width} cm</strong>
                  </span>
                  <span className="h-3 w-px bg-[#071426]/12" />
                  <span className="flex items-center gap-1.5">
                    <MoveVertical className="h-3.5 w-3.5 text-[#ef7027]" />
                    <span className="text-[#071426]/55">Hoogte</span>
                    <strong className="font-[500]">{tv.wallHeight} cm</strong>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMeasurements((visible) => !visible)}
              aria-label={showMeasurements ? "Afmetingen verbergen" : "Afmetingen tonen"}
              aria-pressed={showMeasurements}
              title={showMeasurements ? "Afmetingen verbergen" : "Afmetingen tonen"}
              className={`absolute left-4 top-4 z-[9] hidden h-11 w-11 items-center justify-center rounded-full border shadow-[0_10px_24px_rgba(3,12,26,0.11)] transition-all duration-300 hover:-translate-y-px md:left-6 md:top-6 md:flex lg:left-auto lg:right-3 lg:top-2 ${
                showMeasurements
                  ? "border-[#ef7027] bg-[#ef7027] text-white"
                  : "border-[#ded7d0] bg-white/92 text-[#303640] backdrop-blur"
              }`}
            >
              <Ruler className="h-[19px] w-[19px]" strokeWidth={1.8} />
            </button>

            {/* Configuration */}
            <div className="relative z-[3] flex w-full max-w-[1200px] origin-top translate-y-[-9.62%] scale-[0.513] items-end justify-center md:translate-y-[10%] md:scale-[0.707] lg:translate-y-[-4.37%] lg:scale-[0.644] xl:scale-[0.811] 2xl:scale-[0.873]">
              {/* Wall unit — modules sit flush against each other */}
              <div className="relative flex h-[420px] items-end lg:h-[520px]">
                {showMeasurements && (
                  <div className="pointer-events-none absolute inset-0 z-[8] hidden text-[#303640] md:block">
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
                  onClick={() => {
                    if (hasLeft) {
                      setHasLeft(false);
                      return;
                    }
                    if (isSingleModuleAssetPicker) {
                      setLeftPickerOpen(true);
                      return;
                    }
                    setLeftVariant("dicht");
                    setHasLeft(true);
                  }}
                  aria-label={hasLeft ? "Linker module verwijderen" : "Linker module toevoegen"}
                  className="absolute left-0 top-1/2 z-[6] flex h-[48.4px] w-[48.4px] -translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e2dc] bg-white text-[20px] font-bold leading-none text-[#ef7027] shadow-[0_10px_24px_rgba(3,12,26,0.10)] transition-colors hover:border-[#ef7027] md:h-11 md:w-11"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[22px] w-[22px] md:h-5 md:w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                    {!hasLeft && <path d="M12 5v14" />}
                  </svg>
                </button>

                <Dialog open={leftPickerOpen} onOpenChange={setLeftPickerOpen}>
                  <DialogContent className="max-w-[560px] rounded-[20px] border-[#eee7e0] bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-[20px] font-semibold text-[#071426]">
                        Kies je linker module
                      </DialogTitle>
                      <DialogDescription className="text-[14px] text-[#5a6472]">
                        Beide modules klikken naadloos tegen de middenmodule.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-3">
                      {leftModuleOptions.map((option) => (
                        <button
                          key={option.variant}
                          type="button"
                          onClick={() => {
                            setLeftVariant(option.variant);
                            setHasLeft(true);
                            setLeftPickerOpen(false);
                          }}
                          className={`group flex flex-col items-center gap-3 rounded-[12px] border-2 bg-[#f7f7f7] p-4 transition-colors ${
                            leftVariant === option.variant
                              ? "border-[#ef8874]"
                              : "border-transparent hover:border-[#e8e2dc]"
                          }`}
                        >
                          <div className="flex h-[180px] items-end justify-center">
                            <CroppedModuleImage
                              color={previewColor}
                              position="left"
                              source={
                                option.variant === "open"
                                  ? openLeftModule.url
                                  : option.variant === "original"
                                    ? (colorModuleSource ?? openLeftModule.url)
                                    : (colorModuleAsset.positionAssets?.left?.source ??
                                      colorModuleSource ??
                                      openLeftModule.url)
                              }
                              animate={false}
                              testId={false}
                              crops={
                                option.variant === "open"
                                  ? OPEN_LEFT_CROPS
                                  : option.variant === "original"
                                    ? colorModuleAsset.crops
                                    : colorModuleAsset.positionAssets?.left
                                    ? {
                                        ...colorModuleAsset.crops,
                                        left: colorModuleAsset.positionAssets.left.crop,
                                      }
                                    : colorModuleAsset.crops
                              }
                              heightAdjustmentPx={
                                option.variant === "dicht" || option.variant === "nieuw"
                                  ? colorModuleAsset.positionAssets?.left?.heightAdjustmentPx
                                  : undefined
                              }
                              bottomTrimPx={
                                option.variant === "dicht" || option.variant === "nieuw"
                                  ? colorModuleAsset.positionAssets?.left?.bottomTrimPx
                                  : undefined
                              }
                              translateY={
                                option.variant === "dicht" || option.variant === "nieuw"
                                  ? (colorModuleAsset.positionAssets?.left?.offsetYPx ?? 0)
                                  : 0
                              }
                            />
                          </div>
                          <span className="text-[14px] font-semibold text-[#071426]">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>



                {previousPreviewColor && previousModuleAsset && (
                  <div
                    key={`previous-${previousPreviewColor}-${previousPreviewTvValue}`}
                    className="configurator-preview-exit pointer-events-none absolute bottom-0 left-1/2 z-0 h-full -translate-x-1/2"
                    aria-hidden="true"
                  >
                    <ConfiguratorPreviewAssembly
                      color={previousPreviewColor}
                      source={previousModuleSource}
                      crops={previousModuleAsset.crops}
                      hasLeft={hasLeft}
                      hasRight={hasRight}
                      animateSides={false}
                      positionAssets={previousSelectedPositionAssets}
                      leftVariant={leftVariant}
                      rightVariant={rightVariant}
                    />
                  </div>
                )}

                <div
                  key={`current-${previewColor}-${tv.shopifyValue}`}
                  className={`relative z-[1] h-full ${previousPreviewColor ? "configurator-preview-enter" : ""}`}
                >
                  <ConfiguratorPreviewAssembly
                    color={previewColor}
                    source={colorModuleSource}
                    crops={colorModuleAsset.crops}
                    hasLeft={hasLeft}
                    hasRight={hasRight}
                    animateSides
                    positionAssets={selectedPositionAssets}
                    leftVariant={leftVariant}
                    rightVariant={rightVariant}
                  />
                </div>


                {/* Add / remove right module */}
                <button
                  type="button"
                  onClick={() => {
                    if (hasRight) {
                      setHasRight(false);
                      return;
                    }
                    if (isSingleModuleAssetPicker) {
                      setRightPickerOpen(true);
                      return;
                    }
                    setRightVariant("dicht");
                    setHasRight(true);
                  }}
                  aria-label={hasRight ? "Rechter module verwijderen" : "Rechter module toevoegen"}
                  className="absolute right-0 top-1/2 z-[6] flex h-[48.4px] w-[48.4px] translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e2dc] bg-white text-[20px] font-bold leading-none text-[#ef7027] shadow-[0_10px_24px_rgba(3,12,26,0.10)] transition-colors hover:border-[#ef7027] md:h-11 md:w-11"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[22px] w-[22px] md:h-5 md:w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                    {!hasRight && <path d="M12 5v14" />}
                  </svg>
                </button>

                <Dialog open={rightPickerOpen} onOpenChange={setRightPickerOpen}>
                  <DialogContent className="max-w-[560px] rounded-[20px] border-[#eee7e0] bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-[20px] font-semibold text-[#071426]">
                        Kies je rechter module
                      </DialogTitle>
                      <DialogDescription className="text-[14px] text-[#5a6472]">
                        Beide modules klikken naadloos tegen de middenmodule.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-3">
                      {rightModuleOptions.map((option) => (
                        <button
                          key={option.variant}
                          type="button"
                          onClick={() => {
                            setRightVariant(option.variant);
                            setHasRight(true);
                            setRightPickerOpen(false);
                          }}
                          className={`group flex flex-col items-center gap-3 rounded-[12px] border-2 bg-[#f7f7f7] p-4 transition-colors ${
                            rightVariant === option.variant
                              ? "border-[#ef8874]"
                              : "border-transparent hover:border-[#e8e2dc]"
                          }`}
                        >
                          <div className="flex h-[180px] items-end justify-center">
                            <CroppedModuleImage
                              color={previewColor}
                              position="right"
                              source={
                                option.variant === "open"
                                  ? openLeftModule.url
                                  : option.variant === "original"
                                    ? (colorModuleSource ?? openLeftModule.url)
                                    : (colorModuleAsset.positionAssets?.right?.source ??
                                      colorModuleSource ??
                                      openLeftModule.url)
                              }
                              animate={false}
                              testId={false}
                              className={option.variant === "open" ? "-scale-x-100" : ""}
                              crops={
                                option.variant === "open"
                                  ? OPEN_RIGHT_CROPS
                                  : option.variant === "original"
                                    ? colorModuleAsset.crops
                                    : colorModuleAsset.positionAssets?.right
                                    ? {
                                        ...colorModuleAsset.crops,
                                        right: colorModuleAsset.positionAssets.right.crop,
                                      }
                                    : colorModuleAsset.crops
                              }
                              heightAdjustmentPx={
                                option.variant === "dicht" || option.variant === "nieuw"
                                  ? colorModuleAsset.positionAssets?.right?.heightAdjustmentPx
                                  : undefined
                              }
                              bottomTrimPx={
                                option.variant === "dicht" || option.variant === "nieuw"
                                  ? colorModuleAsset.positionAssets?.right?.bottomTrimPx
                                  : undefined
                              }
                              translateY={
                                option.variant === "dicht" || option.variant === "nieuw"
                                  ? (colorModuleAsset.positionAssets?.right?.offsetYPx ?? 0)
                                  : 0
                              }
                            />
                          </div>
                          <span className="text-[14px] font-semibold text-[#071426]">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

            </div>
          </div>
          </section>

          <aside className="relative z-[2] mx-0 -mt-[92px] mb-0 overflow-hidden rounded-none border-0 bg-white p-0 shadow-none lg:mx-0 lg:my-0 lg:mb-5 lg:h-full lg:w-[492px] lg:justify-self-start lg:overflow-hidden lg:rounded-[22px] lg:border lg:border-[#e8e2dc] lg:bg-white lg:px-4 lg:pb-3 lg:pt-0 lg:shadow-[0_18px_48px_rgba(3,12,26,0.09)]">

            <section className="overflow-hidden bg-[#fef9f5] lg:-mx-4 lg:mb-3">
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
                  <Img
                    src={dutchDesignIcon.url}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-5 shrink-0 object-contain opacity-80"
                  />
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
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-5 right-5 w-[84px] select-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="rounded-none bg-white p-4 lg:rounded-none lg:p-0">

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
                  <strong className="whitespace-nowrap text-[23px] font-bold leading-none text-[#ff5a00]">
                    {euro(total)}
                  </strong>
                </div>

                <div className="flex items-center text-[#4f5966]/78">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-3 w-3 fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="ml-2 text-[10px] text-[#071426]/30">(1000+)</span>
                </div>
                <span aria-hidden="true" />
              </div>

              <PaymentOptionsBadges price={total} />
            </div>

            <div className="mt-3 grid min-h-[52px] grid-cols-[80px_minmax(0,1fr)] items-center gap-2 rounded-[12px] border border-[#eeeeee] px-3 lg:grid-cols-[80px_minmax(0,1fr)_auto]">
              <strong className="text-[15px] font-[750] leading-none text-[#071426]">Kleur</strong>
              <div className="flex min-w-0 items-center justify-end gap-2 lg:justify-start">
                {colors.map((colorName) => (
                  <button
                    key={colorName}
                    type="button"
                    onClick={() => selectColor(colorName)}
                    aria-label={displayWandigColor(colorName)}
                    title={displayWandigColor(colorName)}
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
              <span className="hidden whitespace-nowrap text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93] lg:inline">{displayWandigColor(color)}</span>
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
                        onClick={() => selectTv(option)}
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
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="group mt-3 h-12 w-full translate-y-0 overflow-hidden rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] px-6 text-sm font-bold text-white shadow-none transition hover:translate-y-0 hover:from-[#e36820] hover:to-[#d8601b] hover:shadow-none active:translate-y-0 active:scale-100"
              >

                <span className="relative block h-full w-full overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center gap-1.5 font-[200] tracking-[0.03em] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />Voeg samenstelling toe
                  </span>
                  <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-1.5 font-[200] tracking-[0.03em] transition-transform duration-300 ease-out group-hover:translate-y-0">
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
                      <Img src={benefit.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
                      <h4 className="absolute inset-x-0 top-0 px-3 pt-5 text-center text-[13px] font-normal leading-tight tracking-[0.03em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                        {benefit.title}
                      </h4>
                    </article>
                  ))}
                </div>
              </section>
            </div>
            </div>
          </aside>
        </div>
      </div>
      <section className="w-full border-t border-[#eeeeee] bg-[#faf8f4]">
        <div
          className="mx-auto grid min-h-[198px] max-w-[1500px] grid-cols-1 gap-8 px-7 py-10 text-[#1b1d20] sm:grid-cols-2 lg:grid-cols-[1.05fr_repeat(4,1fr)] lg:items-start lg:gap-7 lg:px-12 lg:py-[52px] xl:px-16"
          style={{ fontFamily: '"Circular-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          {showReviews && (
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
          )}

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

      </section>
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-10">
        <SpecificationsSection
          widthLabel={width}
          heightLabel={String(tv.wallHeight)}
          modelLabel={hasLeft && hasRight ? "Full House" : hasLeft || hasRight ? "Duo" : "Solo"}
          configSummary={{
            colorLabel: displayWandigColor(color),
            tvSizeLabel: tv.shopifyValue,
            modulesLabel:
              hasLeft && hasRight
                ? `Midden + links (${moduleVariantLabel(leftVariant)}) + rechts (${moduleVariantLabel(rightVariant)})`
                : hasLeft
                  ? `Midden + links (${moduleVariantLabel(leftVariant)})`
                  : hasRight
                    ? `Midden + rechts (${moduleVariantLabel(rightVariant)})`
                    : "Alleen midden (1)",
          }}
          preview={
            <WandigSpecPreview
              color={color}
              source={colorModuleSource}
              crops={colorModuleAsset.crops}
              positionAssets={selectedPositionAssets}
              hasLeft={hasLeft}
              hasRight={hasRight}
            />
          }
        />
        <UniqueSection />
        <BeforeAfterSection />

        <CustomerGallerySection />
      </div>

      <BuiltToLastSection />

      <FaqSection />

      {showReviews && <ReviewsSection />}

      <NewsletterContactSection />

      <TrustBannerSection />
    </main>
  );
}
