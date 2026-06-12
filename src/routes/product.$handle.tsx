import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, ChevronRight, ChevronLeft, Check, Star, Truck, Hammer, ShieldCheck, Sparkles, Ruler, Leaf } from "lucide-react";

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

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `Wandig ${params.handle.charAt(0).toUpperCase() + params.handle.slice(1)} — Maatwerk cinewall` },
      { name: "description", content: `Bekijk de Wandig ${params.handle} cinewall. Op maat gemaakt in onze werkplaats.` },
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
  "Volledig op maat voor jouw woonkamer",
  "Inclusief gratis levering & montage",
];

function ProductView({ product }: { product: ProductNode }) {
  const variants = useMemo(
    () => product.variants.edges.map((e) => e.node as typeof e.node & { image?: { url: string; altText: string | null } | null }),
    [product],
  );
  const [activeImg, setActiveImg] = useState(0);
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

  const images = useMemo(() => {
    if (!selectedColor || !colorKey) return allImages;
    const colorImageUrls = new Set(
      variants
        .filter((v) => v.selectedOptions.some((o) => o.name === colorKey && o.value === selectedColor))
        .map((v) => v.image?.url)
        .filter(Boolean) as string[],
    );
    const filtered = allImages.filter((img) => colorImageUrls.has(img.node.url));
    return filtered.length > 0 ? filtered : allImages;
  }, [allImages, variants, selectedColor, colorKey]);

  // Only auto-set image when the color (image group) changes — not on every render
  // and not when the user clicks a thumbnail.
  const prevColorRef = useRef<string | undefined>(selectedColor);
  useEffect(() => {
    if (prevColorRef.current !== selectedColor) {
      prevColorRef.current = selectedColor;
      setActiveImg(0);
    }
  }, [selectedColor]);

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

  const hasOptions = product.options.some((o) => o.values.length > 1 || o.name !== "Title");

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

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-14">
        {/* Gallery */}
        <div>
          <div
            className="relative mx-auto w-full bg-muted overflow-hidden rounded-2xl mb-3 aspect-[4/5]"
            style={{ maxWidth: "calc((100svh - 200px) * 4 / 5)" }}
          >
            {images[activeImg] && (
              <img src={images[activeImg].node.url} alt={images[activeImg].node.altText || product.title} className="w-full h-full object-cover" />
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

        {/* Info */}
        <div className="md:sticky md:top-28 md:self-start">
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

          {/* USPs */}
          <ul className="mt-5 space-y-2">
            {PRODUCT_USPS.map((u) => (
              <li key={u} className="flex items-start gap-2 text-sm text-foreground/80">
                <Check className="h-4 w-4 mt-0.5 text-[#ff6e15] shrink-0" strokeWidth={2.5} />
                <span>{u}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-2xl font-serif">
            {activeVariant ? formatPrice(activeVariant.price.amount, activeVariant.price.currencyCode) : "Prijs op aanvraag"}
          </p>

          {hasOptions && product.options.map((opt) => {
            if (opt.name === "Title" && opt.values.length === 1) return null;
            const isColor = /kleur|color/i.test(opt.name);
            return (
              <div key={opt.name} className="mt-8">
                <div className="mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{opt.name}</span>
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
                          className={`h-10 w-10 rounded-full active:scale-90 transition-transform duration-150 ${active ? "border-2 border-[#ef8874] p-0.5" : "border border-border p-0.5 hover:border-[#ef8874]/60"}`}
                        >
                          <span
                            className="block h-full w-full rounded-full"
                            style={{ background: colorToCss(v) }}
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((v) => {
                      const active = selected[opt.name] === v;
                      return (
                        <button
                          key={v}
                          onClick={() => setSelected((s) => ({ ...s, [opt.name]: v }))}
                          className={`px-4 py-2 text-sm rounded-xl bg-[#f7f7f7] active:scale-[0.96] transition-transform duration-150 ${active ? "border-2 border-[#ef8874]" : "border-2 border-transparent hover:border-[#ef8874]/50"}`}
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

          <Button
            onClick={handleAdd}
            disabled={isLoading || !activeVariant?.availableForSale}
            className="mt-10 w-full rounded-full h-14 text-sm tracking-[0.2em] uppercase bg-[#ff6e15] hover:bg-[#ff6e15]/90 text-white shadow-none"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : activeVariant?.availableForSale ? "In winkelmand" : "Uitverkocht"}
          </Button>

          <div className="mt-4 flex items-center gap-2 text-sm text-foreground/80">
            <Check className="h-4 w-4 text-[#ff6e15]" strokeWidth={2.5} />
            <span>30 dagen bedenktijd</span>
          </div>

          {product.description && (
            <p className="mt-6 text-foreground/75 leading-relaxed">{product.description}</p>
          )}

          {/* Accordion */}
          <Accordion type="single" collapsible className="mt-8 border-t border-border/60">
            <AccordionItem value="details">
              <AccordionTrigger className="text-xs tracking-[0.2em] uppercase">Details & formaat</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/75 leading-relaxed space-y-2">
                <p>Massief houten frame, op maat gemaakt voor jouw tv en woonkamer. Kabels onzichtbaar weggewerkt en geluidsdoorlatend front.</p>
                <p>Standaard hoogte 240 cm — andere afmetingen op aanvraag mogelijk.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-xs tracking-[0.2em] uppercase">Verzending & retour</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/75 leading-relaxed space-y-2">
                <p>Gratis levering en montage bij jou thuis door onze eigen monteurs. Levertijd 4–6 weken na bestelling.</p>
                <p>30 dagen bedenktijd — niet tevreden? Wij halen de cinewall kosteloos op.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      </div>

      {/* Selling points section */}
      <section className="border-t border-border/60 bg-[#faf8f5]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Waarom Wandig</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 leading-[1.05]">Eén cinewall, eindeloos verfijnd</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Hammer, title: "Met de hand gemaakt", body: "Elk paneel wordt in onze werkplaats in Nederland op maat geschaafd, gelijmd en afgewerkt." },
              { icon: Ruler, title: "Volledig op maat", body: "Van schermformaat tot kabelgoten — wij bouwen rondom jouw tv en jouw muur, niet andersom." },
              { icon: Leaf, title: "Duurzaam massief hout", body: "FSC-gecertificeerd hout uit Europese bossen. Geen plaatmateriaal, geen plastic afwerking." },
              { icon: Truck, title: "Gratis levering & montage", body: "Onze eigen monteurs plaatsen jouw cinewall netjes en strak — jij hoeft niets te doen." },
              { icon: ShieldCheck, title: "5 jaar garantie", body: "Wij staan achter ons werk: vijf jaar garantie op constructie en afwerking." },
              { icon: Sparkles, title: "30 dagen bedenktijd", body: "Niet helemaal tevreden? Wij halen de cinewall binnen 30 dagen kosteloos op." },
            ].map(({ icon: I, title, body }) => (
              <div key={title} className="flex flex-col">
                <I className="h-6 w-6 text-[#ff6e15] mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-2">{title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
