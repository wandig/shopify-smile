import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight, Truck, Hammer, ShieldCheck } from "lucide-react";

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
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 grid md:grid-cols-2 gap-10">
        <div className="aspect-[4/5] bg-muted animate-pulse" />
        <div className="space-y-4">
          <div className="h-10 w-2/3 bg-muted animate-pulse" />
          <div className="h-6 w-1/3 bg-muted animate-pulse" />
        </div>
      </div>
    );
  }
  if (error || !data) throw notFound();

  return <ProductView product={data} />;
}

function ProductView({ product }: { product: ProductNode }) {
  const variants = product.variants.edges.map((e) => e.node);
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

  const images = product.images.edges;
  const hasOptions = product.options.some((o) => o.values.length > 1 || o.name !== "Title");

  return (
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
          <div className="aspect-[4/5] bg-muted overflow-hidden mb-3">
            {images[activeImg] && (
              <img src={images[activeImg].node.url} alt={images[activeImg].node.altText || product.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square overflow-hidden border ${i === activeImg ? "border-foreground" : "border-transparent"}`}>
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
            return (
              <div key={opt.name} className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{opt.name}</span>
                  <span className="text-sm">{selected[opt.name]}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((v) => {
                    const active = selected[opt.name] === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setSelected((s) => ({ ...s, [opt.name]: v }))}
                        className={`px-4 py-2 text-sm border transition ${active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
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
