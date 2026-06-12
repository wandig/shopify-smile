import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ChevronRight, Truck, Hammer, ShieldCheck } from "lucide-react";

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

function ProductView({ product }: { product: ProductNode }) {
  const variants = product.variants.edges.map((e) => e.node as typeof e.node & { image?: { url: string; altText: string | null } | null });
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

  // Filter gallery to only show images that belong to variants matching the selected color
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

  useEffect(() => {
    const vImg = activeVariant?.image?.url;
    if (!vImg) {
      setActiveImg(0);
      return;
    }
    const idx = images.findIndex((img) => img.node.url === vImg);
    setActiveImg(idx >= 0 ? idx : 0);
  }, [activeVariant, images]);

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

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] bg-muted overflow-hidden mb-3 rounded-2xl">
            {images[activeImg] && (
              <img src={images[activeImg].node.url} alt={images[activeImg].node.altText || product.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square overflow-hidden rounded-xl border-2 ${i === activeImg ? "border-[#ef8874]" : "border-transparent"}`}>
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:sticky md:top-28 md:self-start">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Cinewall</span>
          <h1 className="font-serif text-4xl md:text-6xl mt-3 leading-[1]">{product.title}</h1>
          <p className="mt-5 text-2xl font-serif">
            {activeVariant ? formatPrice(activeVariant.price.amount, activeVariant.price.currencyCode) : "Prijs op aanvraag"}
          </p>

          {product.description && (
            <p className="mt-6 text-foreground/75 leading-relaxed">{product.description}</p>
          )}

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
                          className={`h-10 w-10 rounded-full transition ${active ? "border-2 border-[#ef8874] p-0.5" : "border border-border p-0.5"}`}
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
                          className={`px-4 py-2 text-sm rounded-xl bg-[#f7f7f7] transition ${active ? "border-2 border-[#ef8874]" : "border-2 border-transparent hover:border-[#ef8874]/50"}`}
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
            className="mt-10 w-full rounded-none h-14 text-sm tracking-[0.2em] uppercase"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : activeVariant?.availableForSale ? "In winkelmand" : "Uitverkocht"}
          </Button>

          <div className="mt-10 space-y-3 text-sm text-foreground/75 border-t border-border/60 pt-6">
            {[
              { icon: Truck, label: "Gratis levering aan huis in Nederland" },
              { icon: Hammer, label: "Maatwerk uit eigen werkplaats" },
              { icon: ShieldCheck, label: "5 jaar garantie op alle modellen" },
            ].map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-3"><I className="h-4 w-4 opacity-70" strokeWidth={1.5} /> {label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
