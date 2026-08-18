import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, formatPrice, lowestPaidPrice, type ShopifyProduct } from "@/lib/shopify";
import { wandigSwatchStyle } from "@/lib/wandig-colors";

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
    <div className="bg-[#faf8f5]">
      <section className="mx-auto max-w-[1200px] px-5 md:px-10 pt-16 md:pt-24">
        <div className="flex flex-col gap-8 border-b border-[#0f1f2a]/10 pb-10 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ef7027]">Collectie</p>
            <h1 className="mt-4 text-4xl font-light leading-[1.02] tracking-tight text-[#0f1f2a] md:text-6xl lg:text-[68px]">
              Vind jouw <span className="font-serif italic text-[#1f1915]">perfecte</span> opstelling
            </h1>
          </div>
          <p className="text-base font-light leading-relaxed text-[#0f1f2a]/60 md:max-w-xs md:text-lg">
            Vergelijk Solo, Duo en Full House. Wissel tussen de kleurstalen en stel je favoriete serie samen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 pt-14 pb-20 md:pt-20 md:pb-28">
        {isLoading ? (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#f6f3ee] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">Geen producten gevonden</p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {filteredProducts.map((p, i) => (
              <CollectionSeriesCard key={p.node.id} product={p.node} offset={i === 1} />
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

  const sizeOption = product.options.find((option) => /maat|size|inch/i.test(option.name));
  const preferredSizeValue = sizeOption
    ? sizeOption.values.find((v) => /58/.test(v)) ?? sizeOption.values[1] ?? sizeOption.values[0]
    : undefined;

  const selectedVariant = useMemo(() => {
    const matchesColor = (variant: VariantNode) =>
      !colorOption ||
      !selectedColor ||
      variant.selectedOptions.some((option) => option.name === colorOption.name && option.value === selectedColor);
    const matchesSize = (variant: VariantNode) =>
      !sizeOption ||
      !preferredSizeValue ||
      variant.selectedOptions.some((option) => option.name === sizeOption.name && option.value === preferredSizeValue);

    return (
      variants.find((v) => v.availableForSale && matchesColor(v) && matchesSize(v)) ??
      variants.find((v) => matchesColor(v) && matchesSize(v)) ??
      variants.find((v) => v.availableForSale && matchesColor(v)) ??
      variants.find(matchesColor) ??
      variants.find((v) => v.availableForSale) ??
      variants[0]
    );
  }, [colorOption, selectedColor, sizeOption, preferredSizeValue, variants]);

  const image = selectedVariant?.image ?? product.images.edges[0]?.node;
  const copy = SERIES_COPY[product.handle] ?? {
    eyebrow: "Serie",
    title: product.title,
    intro: product.description,
    specs: ["Plug & play", "Gratis levering", "5 jaar garantie"],
  };
  const price = lowestPaidPrice(product);
  const hasVisiblePrice = price !== null;

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
            {hasVisiblePrice ? formatPrice(price!.amount, price!.currencyCode) : "Samenstellen"}
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
                    style={wandigSwatchStyle(color)}
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
