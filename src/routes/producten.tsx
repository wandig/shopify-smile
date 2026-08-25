import { Img } from "@/components/Img";
import { optimizeImageUrl } from "@/lib/asset-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Star, Truck, CalendarClock, ShieldCheck, Phone, MessageCircle, Plus } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, formatPrice, lowestPaidPrice, lowestPaidPriceWithCompare, type ShopifyProduct } from "@/lib/shopify";
import { wandigSwatchStyle } from "@/lib/wandig-colors";
import { WANDIG_SIZES, formatCm, wandigWidth } from "@/lib/wandig-dimensions";
import lifestyleAsset from "@/assets/producten-hero-lifestyle.png.asset.json";
import { FAQ_ITEMS } from "@/components/ProductPageSections";
import adviesAsset from "@/assets/persoonlijk-advies.png.asset.json";
import proefkijkenAsset from "@/assets/proefkijken-familie.png.asset.json";
import { SalePrice } from "@/components/SaleBadge";


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
  modules: number;
  storage: string;
  highlight?: boolean;
}> = {
  solo: {
    eyebrow: "Compact en rustig",
    title: "Wandig Solo",
    intro: "Strak tv-meubel zonder dat de wand te vol wordt. Minimalistisch en zwevend.",
    specs: ["Compact formaat", "Zwevend of staand", "Ideaal voor kleinere ruimtes"],
    modules: 0,
    storage: "Compact",
  },
  duo: {
    eyebrow: "De meest gekozen balans",
    title: "Wandig Duo",
    intro: "Meer opbergruimte en een bredere uitstraling, zonder dat het zwaar oogt.",
    specs: ["Ruimte voor decoratie", "Strakke kabelafwerking", "Mooi in middelgrote woonkamers"],
    modules: 1,
    storage: "Ruim",
    highlight: true,
  },
  "full-house": {
    eyebrow: "Volledige wand-look",
    title: "Wandig Full House",
    intro: "De meest complete opstelling met een ingebouwde, luxe uitstraling.",
    specs: ["Maximale opbergruimte", "Wandvullende uitstraling", "Onze meest complete serie"],
    modules: 2,
    storage: "Maximaal",
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
        {/* mobiel: 1 per keer, marquee */}
        <div className="overflow-hidden py-3 md:hidden">
          <div className="flex w-max animate-usp-marquee">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex" aria-hidden={dup === 1}>
                {[
                  { icon: Truck, label: "Gratis levering" },
                  { icon: CalendarClock, label: "100 dagen proefkijken" },
                  { icon: ShieldCheck, label: "10 jaar garantie" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex w-[62vw] shrink-0 items-center justify-center gap-2 text-[13px] text-[#1f1915]/75"
                  >
                    <Icon className="h-4 w-4 text-[#ef7027]" /> {label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <ul className="mx-auto hidden max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-3 text-[13px] text-[#1f1915]/75 md:flex md:gap-x-[140px] md:px-10">
          <li className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-[#ef7027]" /> Gratis levering</li>
          <li className="inline-flex items-center gap-2"><CalendarClock className="h-4 w-4 text-[#ef7027]" /> 100 dagen proefkijken</li>
          <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#ef7027]" /> 10 jaar garantie</li>
        </ul>
      </div>


      {/* hero */}
      <section className="bg-[#f2eee7]">
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex items-center px-5 py-8 md:px-10 md:py-14 lg:order-1 lg:justify-end lg:py-0">
            <div className="w-full md:text-center lg:max-w-[520px] lg:text-left">
              <div className="flex flex-wrap items-center gap-3 md:justify-center lg:justify-start">
                <p className="w-full text-[13px] font-medium uppercase tracking-[0.12em] text-[#1f1915]/60">
                  Cinewalls
                </p>
                <h1 className="font-serif text-[34px] leading-[1.05] text-[#1f1915] sm:text-4xl md:text-[44px] lg:text-5xl">
                  Verjaardagssale
                </h1>
                <span
                  className="inline-flex items-center justify-center rounded-lg border border-[#ef7027] bg-transparent px-3 py-1.5 text-[18px] font-medium text-[#ef7027] shadow-sm"
                  style={{ transform: "rotate(6deg)" }}
                >
                  -30%
                </span>
              </div>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#1f1915]/60 md:mt-4 md:text-base lg:mx-0">
                Vergelijk Solo, Duo en Full House. Wissel tussen de kleurstalen en stel je favoriete serie samen.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 md:mt-7 lg:justify-start">
                <Link
                  to="/configurator"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef7027] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d95f1c] sm:py-3"
                >
                  Configureer jouw kast
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/kleurstalen"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1f1915]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#1f1915] transition hover:border-[#ef7027] hover:text-[#ef7027] sm:py-3"
                >
                  Gratis kleurstalen
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 md:mt-7 lg:justify-start">
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

          <div className="relative order-1 hidden bg-[#f4f1ed] lg:order-2 lg:block">
            <Img
              src={lifestyleAsset.url}
              w={1100}
              priority
              alt="Woonkamer met een Wandig tv-wand in gebruik"
              className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[441px] lg:min-h-0"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 pt-14 md:pt-20 pb-20 md:pb-28">
        <div className="mb-10 max-w-[560px] md:mb-14">
          <h2 className="font-serif text-3xl leading-[1.1] text-[#1f1915] md:text-4xl">Drie modellen</h2>
          <p className="mt-3 text-base leading-relaxed text-[#1f1915]/60">
            Solo, Duo en Full House — plug &amp; play en leverbaar in meerdere kleuren.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[420px] rounded-2xl bg-[#f4f1ed] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">Geen producten gevonden</p>
        ) : (
          <>
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <CollectionSeriesCard key={p.node.id} product={p.node} />
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-[#1f1915]/60">
              Twijfel je?{" "}
              <Link to="/configurator" className="font-semibold text-[#ef7027] underline-offset-4 hover:underline">
                Stel zelf je wand samen
              </Link>
              .
            </p>
          </>
        )}
      </section>

      <CollectionFaqSection />

      <CollectionTrialSection />
    </div>
  );
}

function CollectionTrialSection() {
  return (
    <section className="bg-[#faf8f5]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-7 px-5 py-14 md:grid-cols-2 md:gap-24 md:px-10 md:py-24 lg:gap-32">
        <div className="overflow-hidden rounded-2xl bg-[#ede7e0] md:rounded-3xl">
          <Img
            src={proefkijkenAsset.url}
            w={900}
            alt="Wandig cinewall in een woonkamer"
            className="aspect-[4/3] h-full w-full object-cover md:aspect-square"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="font-serif text-[28px] leading-[1.1] text-[#1f1915] md:text-[42px]">
            <span className="italic">100 dagen</span> <span className="font-semibold not-italic">proefkijken</span>
          </h2>
          <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-[#1f1915]/60 md:mt-6 md:text-base">
            Nog niet helemaal overtuigd? Geen probleem. Bij Wandig krijg je 100 dagen de tijd om je cinewall thuis uit te
            proberen en zelf het verschil te ervaren. Kijk je favoriete films, test het uit en ontdek of het bij jouw
            interieur past.
          </p>
          <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-[#1f1915]/60 md:mt-5 md:text-base">
            Toch niet helemaal wat je zoekt? Je kunt je cinewall eenvoudig retourneren. Bekijk onze retourvoorwaarden
            voor de werkwijze, voorwaarden en kosten.
          </p>
        </div>
      </div>

    </section>
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
    modules: 0,
    storage: "Compact",
  };
  const priceInfo = lowestPaidPriceWithCompare(product);
  const hasVisiblePrice = priceInfo !== null;

  const refSize = WANDIG_SIZES.find((s) => s.label === "58 - 65 inch") ?? WANDIG_SIZES[1];
  const shortName = copy.title.replace(/^Wandig\s+/i, "");
  const width = `${formatCm(wandigWidth(refSize, copy.modules))} cm breed`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="relative block aspect-[4/3] overflow-hidden bg-[#f4f1ed]"
      >
        {image && <CrossfadeImage src={image.url} alt={image.altText || product.title} />}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl leading-none text-[#1f1915]">{copy.title}</h3>
          <span className="shrink-0 text-right">
            {hasVisiblePrice && priceInfo ? (
              <SalePrice price={priceInfo.price} compareAtPrice={priceInfo.compareAtPrice} size="sm" />
            ) : (
              <span className="text-sm font-semibold text-[#1f1915]">Samenstellen</span>
            )}
          </span>
        </div>

        <p className="mt-2 text-[13px] text-[#1f1915]/55">{width}</p>

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

        <div className="mt-auto pt-6">
          <Link
            to="/product/$handle"
            params={{ handle: product.handle }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f1915] transition hover:text-[#ef7027]"
          >
            Bekijk {shortName}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}


function CollectionFaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const items = FAQ_ITEMS.slice(0, 5);

  return (
    <section className="bg-[#f7f3ef]">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <div className="text-center md:text-left">
          <div className="mx-auto h-[112px] w-[112px] overflow-hidden rounded-full bg-[#ede7e0] md:mx-0 md:h-[136px] md:w-[136px]">
            <Img
              src={adviesAsset.url}
              w={300}
              alt="Wandig adviseur helpt je met je tv-wand"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <h2 className="mt-6 font-serif text-[28px] leading-[1.1] text-[#1f1915] md:mt-7 md:text-4xl">
            Praat met een Wandig-expert
          </h2>
          <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-[#1f1915]/60 md:mx-0 md:text-base">
            Twijfel je over het formaat, de kleur of de montage? Onze experts helpen je graag bij het kiezen van de
            juiste cinewall.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:mt-7">
            <a
              href="tel:+31853030997"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#1f1915] transition hover:text-[#ef7027] sm:py-3"
            >
              <Phone className="h-4 w-4 text-[#ef7027]" />
              +31 85 303 0997
            </a>
            <a
              href="mailto:support@wandig.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f1f2a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1c3140] sm:py-3"
            >
              <MessageCircle className="h-4 w-4" />
              Stuur ons een bericht
            </a>
          </div>
        </div>


        <div>
          <h2 className="font-serif text-[28px] leading-[1.1] text-[#1f1915] md:text-4xl">Over Wandig</h2>

          <div className="mt-8">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.question} className="border-b border-[#1f1915]/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] leading-snug text-[#1f1915]">{item.question}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#1f1915] transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : ""}`}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-10 text-[14px] leading-relaxed text-[#1f1915]/60">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/klantenservice"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f1915] transition hover:text-[#ef7027]"
          >
            Bekijk alle veelgestelde vragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
