import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, formatPrice, lowestPaidPrice, type ShopifyProduct } from "@/lib/shopify";
import { FULL_HOUSE_COLORS, displayWandigColor } from "@/lib/wandig-colors";
import heroImage from "@/assets/after-livingroom.jpg.asset.json";

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

const SERIES_COPY: Record<string, { title: string; intro: string; badge: string }> = {
  solo: {
    title: "Wandig Solo",
    intro: "Compact en rustig. Strak zwevend meubel voor kleinere woonkamers.",
    badge: "Compact",
  },
  duo: {
    title: "Wandig Duo",
    intro: "De meest gekozen balans tussen opbergruimte en een rustige look.",
    badge: "Meest gekozen",
  },
  "full-house": {
    title: "Wandig Full House",
    intro: "Wandvullend en compleet. Voor wie de tv-wand het middelpunt maakt.",
    badge: "Compleet",
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

  const [activeColor, setActiveColor] = useState<string | null>(null);

  const filteredProducts = useMemo(
    () => (data ?? []).filter((p) => SERIES_ORDER.includes(p.node.handle)).sort(productSort),
    [data],
  );

  return (
    <div className="bg-[#faf8f5]">
      <CollectionHero />

      <section className="mx-auto max-w-[1456px] px-5 pt-10 md:px-10 md:pt-14">
        <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ColorPill label="Alle kleuren" active={activeColor === null} onClick={() => setActiveColor(null)} />
          {FULL_HOUSE_COLORS.map((color) => (
            <ColorPill
              key={color}
              label={displayWandigColor(color)}
              active={activeColor === color}
              onClick={() => setActiveColor(color)}
            />
          ))}
        </div>
      </section>

      <section id="modellen" className="mx-auto max-w-[1456px] px-5 pb-20 pt-8 md:px-10 md:pb-28 md:pt-10">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[460px] rounded-[20px] bg-[#f1ece5] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="py-20 text-center text-[#1f1915]/60">Geen producten gevonden</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <CollectionSeriesCard key={p.node.id} product={p.node} activeColor={activeColor} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CollectionHero() {
  return (
    <section className="mx-auto max-w-[1456px] px-5 pt-8 md:px-10 md:pt-12">
      <div className="grid overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.05] lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-10 md:px-12 md:py-16 lg:order-1">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#ef7027]">Collectie</span>
          <h1 className="mt-3 text-[34px] font-[600] leading-[1.05] tracking-[0.01em] text-[#1f1915] md:text-[46px]">
            Alle modellen
          </h1>
          <p className="mt-4 max-w-[440px] text-[14px] leading-relaxed text-[#1f1915]/65 md:text-[15px]">
            Solo, Duo en Full House. Drie formaten, vijf kleuren en altijd plug &amp; play geleverd uit onze
            eigen werkplaats.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/configurator"
              className="inline-flex items-center rounded-full bg-[#ef7027] px-6 py-3 text-[14px] font-[500] text-white transition hover:brightness-95"
            >
              Configureer jouw kast
            </Link>
            <a
              href="#modellen"
              className="inline-flex items-center rounded-full border border-[#1f1915]/15 bg-white px-6 py-3 text-[14px] font-[500] text-[#1f1915] transition hover:border-[#1f1915]/35"
            >
              Bekijk modellen
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[12px] tracking-[0.01em] text-[#1f1915]/70">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#ef7027] text-[#ef7027]" />
              ))}
            </span>
            <span>1000+ beoordelingen</span>
          </div>
        </div>

        <div className="order-1 min-h-[260px] bg-[#f1ece5] md:min-h-[380px] lg:order-2 lg:min-h-[520px]">
          <img
            src={heroImage.url}
            alt="Wandig tv-wand in een woonkamer"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ColorPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-5 py-2.5 text-[13px] font-[500] transition ${
        active
          ? "border-[#ef7027] bg-white text-[#ef7027]"
          : "border-[#1f1915]/12 bg-white text-[#1f1915]/75 hover:border-[#1f1915]/30"
      }`}
    >
      {label}
    </button>
  );
}

function CollectionSeriesCard({ product, activeColor }: { product: ProductNode; activeColor: string | null }) {
  const variants = useMemo(() => product.variants.edges.map((edge) => edge.node), [product]);
  const colorOption = product.options.find((option) => /kleur|color/i.test(option.name));
  const colorValues = colorOption?.values ?? [];

  const selectedColor = useMemo(() => {
    if (activeColor) {
      const match = colorValues.find(
        (value) => value.toLocaleLowerCase("nl-NL") === activeColor.toLocaleLowerCase("nl-NL"),
      );
      if (match) return match;
    }
    return colorValues[0] ?? "";
  }, [activeColor, colorValues]);

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
    title: product.title,
    intro: product.description,
    badge: "Nieuw",
  };
  const price = lowestPaidPrice(product);

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="group flex h-full flex-col self-stretch overflow-hidden rounded-[20px] bg-white shadow-[0_1px_3px_rgba(31,25,21,0.05),0_10px_30px_-24px_rgba(31,25,21,0.35)] ring-1 ring-black/[0.05] transition hover:shadow-[0_2px_6px_rgba(31,25,21,0.06),0_18px_40px_-26px_rgba(31,25,21,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f1ed]">
        {image && <CrossfadeImage src={image.url} alt={image.altText || product.title} />}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-[500] tracking-[0.01em] text-[#1f1915]">
          {copy.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center px-6 py-7 text-center">
        <h2 className="text-[20px] font-[600] leading-tight text-[#1f1915]">{copy.title}</h2>
        <p className="mt-3 max-w-[280px] text-[13.5px] leading-relaxed text-[#1f1915]/60">{copy.intro}</p>
        <p className="mt-auto pt-6 text-[15px] font-[600] text-[#1f1915]">
          {price ? `vanaf ${formatPrice(price.amount, price.currencyCode)}` : "Samenstellen"}
        </p>
      </div>
    </Link>
  );
}
