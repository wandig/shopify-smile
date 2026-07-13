import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import swatchDofroze from "@/assets/swatches/dofroze.jpg";
import swatchEikengrijs from "@/assets/swatches/eikengrijs.jpg";
import swatchEikenzwart from "@/assets/swatches/eikenzwart.jpg";
import swatchKatoengrijs from "@/assets/swatches/katoengrijs.jpg";
import swatchKleibeige from "@/assets/swatches/kleibeige.jpg";
import swatchTruffelbruin from "@/assets/swatches/truffelbruin.jpg";
import swatchWalnootbruin from "@/assets/swatches/walnootbruin.jpg";
import swatchZandsteen from "@/assets/swatches/zandsteen.jpg";

export const Route = createFileRoute("/producten")({
  head: () => ({
    meta: [
      { title: "Alle modellen — Wandig" },
      { name: "description", content: "Ontdek alle Wandig TV cinewalls. Plug & play modellen voor elk interieur." },
      { property: "og:title", content: "Alle modellen — Wandig" },
      { property: "og:description", content: "Ontdek alle Wandig plug & play TV cinewalls." },
    ],
  }),
  component: Producten,
});

type ProductNode = ShopifyProduct["node"];
type VariantNode = ProductNode["variants"]["edges"][number]["node"];

const SERIES_ORDER = ["solo", "duo", "full-house"];

const SERIES_COPY: Record<string, {
  eyebrow: string;
  title: string;
  intro: string;
  specs: string[];
}> = {
  solo: {
    eyebrow: "Compact en rustig",
    title: "Wandig Solo",
    intro: "Voor wie een strak tv-meubel wil zonder dat de wand te vol wordt. Minimalistisch, zwevend en makkelijk te combineren.",
    specs: ["Compact formaat", "Zwevend of staand", "Ideaal voor kleinere ruimtes"],
  },
  duo: {
    eyebrow: "De meest gekozen balans",
    title: "Wandig Duo",
    intro: "Meer opbergruimte en een bredere uitstraling, zonder dat het zwaar oogt. Een rustige basis voor bijna elke woonkamer.",
    specs: ["Ruimte voor decoratie", "Strakke kabelafwerking", "Mooi in middelgrote woonkamers"],
  },
  "full-house": {
    eyebrow: "Volledige wand-look",
    title: "Wandig Full House",
    intro: "De meest complete opstelling met een ingebouwde, luxe uitstraling. Gemaakt voor woonkamers waar de tv-wand echt het middelpunt mag zijn.",
    specs: ["Maximale opbergruimte", "Wandvullende uitstraling", "Onze meest complete serie"],
  },
};

const COLOR_MAP: Record<string, string> = {
  zwart: "#1a1a1a", black: "#1a1a1a",
  wit: "#f5f5f5", white: "#f5f5f5",
  grijs: "#9ca3af", grey: "#9ca3af", gray: "#9ca3af",
  bruin: "#8b5a2b", brown: "#8b5a2b",
  eik: "#c8a877", oak: "#c8a877", eiken: "#c8a877",
  noten: "#5b3a22", walnut: "#5b3a22", walnoot: "#5b3a22",
  beige: "#d8c9a8", zand: "#d8c9a8", sand: "#d8c9a8",
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

  return (
    <>
      <img src={shown} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      {incoming && incoming !== shown && (
        <img
          key={incoming}
          src={incoming}
          alt={alt}
          onLoad={() => requestAnimationFrame(() => setFadeIn(true))}
          onTransitionEnd={() => {
            setShown(incoming);
            setIncoming(null);
            setFadeIn(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${fadeIn ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}

function productSort(a: ShopifyProduct, b: ShopifyProduct) {
  const aIndex = SERIES_ORDER.indexOf(a.node.handle);
  const bIndex = SERIES_ORDER.indexOf(b.node.handle);
  return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
}

function Producten() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const filteredProducts = useMemo(
    () => (data ?? [])
      .filter((p) => SERIES_ORDER.includes(p.node.handle))
      .sort(productSort),
    [data],
  );

  return (
    <div className="bg-[#fbfaf8]">
      <section className="mx-auto max-w-[1200px] px-5 md:px-10 pt-16 md:pt-20 pb-10 md:pb-12">
        <span className="text-xs tracking-[0.2em] uppercase text-[#f56e16]">Collectie</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05] text-[#1f1915]">
          Kies je Wandig serie
        </h1>
        <p className="mt-4 max-w-xl text-base text-[#1f1915]/60 leading-relaxed">
          Vergelijk Solo, Duo en Full House. Wissel tussen de kleurstalen en stel je favoriete serie samen.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 pb-20 md:pb-28">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[420px] rounded-2xl bg-[#f4f1ed] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">Geen producten gevonden</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <CollectionSeriesCard key={p.node.id} product={p.node} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CollectionSeriesCard({ product }: { product: ProductNode }) {
  const variants = useMemo(() => product.variants.edges.map((edge) => edge.node), [product]);
  const colorOption = product.options.find((option) => /kleur|color/i.test(option.name));
  const colorValues = colorOption?.values ?? [];
  const [selectedColor, setSelectedColor] = useState(colorValues[0] ?? "");

  useEffect(() => {
    if (colorValues.length > 0 && !colorValues.includes(selectedColor)) {
      setSelectedColor(colorValues[0]);
    }
  }, [colorValues, selectedColor]);

  useEffect(() => {
    variants.forEach((variant) => {
      if (variant.image?.url) {
        const img = new Image();
        img.src = variant.image.url;
      }
    });
  }, [variants]);

  const selectedVariant = useMemo(() => {
    if (!colorOption || !selectedColor) return variants.find((variant) => variant.availableForSale) ?? variants[0];
    return variants.find((variant) =>
      variant.availableForSale &&
      variant.selectedOptions.some((option) => option.name === colorOption.name && option.value === selectedColor),
    ) ?? variants.find((variant) =>
      variant.selectedOptions.some((option) => option.name === colorOption.name && option.value === selectedColor),
    ) ?? variants[0];
  }, [colorOption, selectedColor, variants]);

  const image = selectedVariant?.image ?? product.images.edges[0]?.node;
  const copy = SERIES_COPY[product.handle] ?? {
    eyebrow: "Serie",
    title: product.title,
    intro: product.description,
    specs: ["Plug & play", "Gratis levering", "5 jaar garantie"],
  };
  const price = product.priceRange.minVariantPrice;
  const hasVisiblePrice = parseFloat(price.amount) > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="relative block aspect-[4/3] overflow-hidden bg-[#f4f1ed]"
      >
        {image && <CrossfadeImage src={image.url} alt={image.altText || product.title} />}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-2xl leading-none text-[#1f1915]">{copy.title}</h2>
          <span className="shrink-0 text-sm font-semibold text-[#1f1915]">
            {hasVisiblePrice ? formatPrice(price.amount, price.currencyCode) : "Samenstellen"}
          </span>
        </div>

        {colorValues.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {colorValues.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  aria-label={`Kies ${color}`}
                  className={`relative h-7 w-7 overflow-hidden rounded-full border-2 bg-transparent p-0 transition-[border-color,transform] duration-150 active:scale-95 ${active ? "border-[#ef7027]" : "border-transparent hover:border-[#ef7027]/45"}`}
                >
                  <span
                    className="block h-full w-full rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),inset_0_-3px_5px_rgba(0,0,0,0.18)]"
                    style={swatchStyle(color)}
                  />
                </button>
              );
            })}
          </div>
        )}

        <Link
          to="/product/$handle"
          params={{ handle: product.handle }}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f1915] transition hover:text-[#f56e16]"
        >
          Zelf samenstellen
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
