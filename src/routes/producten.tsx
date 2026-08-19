import { Img } from "@/components/Img";
import { optimizeImageUrl } from "@/lib/asset-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, formatPrice, lowestPaidPrice, type ShopifyProduct } from "@/lib/shopify";
import { wandigSwatchStyle } from "@/lib/wandig-colors";
import lifestyleAsset from "@/assets/producten-hero-lifestyle.png.asset.json";


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
      <Img src={shown} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      {incoming && incoming !== shown && (
        <Img
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
      {/* benefits bar */}
      <div className="border-y border-[#1f1915]/8 bg-[#f7f3ef]">
        <ul className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-3 text-[13px] text-[#1f1915]/75 md:gap-x-[140px] md:px-10">
          <li className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-[#ef7027]" /> Gratis levering</li>
          <li className="inline-flex items-center gap-2"><RotateCcw className="h-4 w-4 text-[#ef7027]" /> 100 dagen proefkijken</li>
          <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#ef7027]" /> 10 jaar garantie</li>
        </ul>
      </div>

      {/* hero */}
      <section className="bg-[#f2eee7]">
        <div className="grid sm:h-[430px] sm:grid-cols-2">
          <div className="flex items-center px-5 py-2 md:px-10 md:py-0 lg:justify-end">
            <div className="w-full lg:max-w-[520px]">
              <h1 className="font-serif text-4xl leading-[1.05] text-[#1f1915] md:text-5xl">

                Cinewalls
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#1f1915]/60">
                Vergelijk Solo, Duo en Full House. Wissel tussen de kleurstalen en stel je favoriete serie samen.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/configurator"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef7027] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d95f1c]"
                >
                  Configureer jouw kast
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/kleurstalen"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1f1915]/15 bg-white px-6 py-3 text-sm font-semibold text-[#1f1915] transition hover:border-[#ef7027] hover:text-[#ef7027]"
                >
                  Gratis kleurstalen
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#ef7027] text-[#ef7027]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#1f1915]">4,8/5</span>
                <span className="text-sm text-[#1f1915]/55">uit 1.000+ beoordelingen</span>
              </div>
            </div>
          </div>

          <div className="relative bg-[#f4f1ed]">
            <Img
              src={lifestyleAsset.url}
              w={1100}
              priority
              alt="Woonkamer met een Wandig tv-wand in gebruik"
              className="h-[200px] w-full object-cover sm:h-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 pt-14 md:pt-20 pb-20 md:pb-28">

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
    const preload = () => {
      variants.slice(0, 12).forEach((variant) => {
        const url = optimizeImageUrl(variant.image?.url, 700);
        if (url) {
          const img = new Image();
          img.src = url;
        }
      });
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) {
      idle(preload);
      return;
    }
    const timer = window.setTimeout(preload, 1200);
    return () => window.clearTimeout(timer);
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
