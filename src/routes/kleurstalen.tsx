import { Img } from "@/components/Img";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/kleurstalen")({
  head: () => ({
    meta: [
      { title: "Gratis kleurstalen bestellen — Wandig" },
      {
        name: "description",
        content:
          "Bestel gratis Wandig kleurstalen en bekijk de afwerkingen thuis bij je eigen muur en lichtinval. Kies je stalen en voeg ze gratis toe aan je winkelmand.",
      },
      { property: "og:title", content: "Gratis kleurstalen bestellen — Wandig" },
      {
        property: "og:description",
        content: "Kies je favoriete Wandig kleurstalen en ontvang ze gratis thuis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KleurstalenPage,
});

const SAMPLE_HANDLES = ["walnootbruin", "donkereiken", "cashmeregrijs", "kristalwit", "dofroze"] as const;

function KleurstalenPage() {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => storefrontApiRequest(PRODUCTS_QUERY, { first: 50 }),
    staleTime: 5 * 60 * 1000,
  });

  const samples = useMemo(() => {
    const edges: ShopifyProduct[] = data?.data?.products?.edges ?? [];
    return SAMPLE_HANDLES.map((handle) => edges.find((e) => e.node.handle === handle)).filter(
      (p): p is ShopifyProduct => Boolean(p),
    );
  }, [data]);

  const toggle = (handle: string) =>
    setSelected((cur) => (cur.includes(handle) ? cur.filter((h) => h !== handle) : [...cur, handle]));

  const handleAdd = async () => {
    const chosen = samples.filter((p) => selected.includes(p.node.handle));
    if (!chosen.length) return;
    setBusy(true);
    try {
      for (const product of chosen) {
        const variant = product.node.variants.edges[0]?.node;
        if (!variant) continue;
        const alreadyInCart = cartItems.some((i) => i.variantId === variant.id);
        if (alreadyInCart) continue;
        await addItem({
          product,
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: [{ name: "Kleurstaal", value: product.node.title }],
        });
      }
      toast.success("Kleurstalen toegevoegd", {
        description: "Je gratis kleurstalen staan in je winkelmand.",
      });
      setSelected([]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="bg-[#faf8f5] pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-[1456px] px-5 md:px-10">
        <div className="max-w-[620px]">
          <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">
            Gratis thuis bezorgd
          </span>
          <h1 className="mt-3 text-[30px] font-[600] leading-tight tracking-[0.01em] text-[#071426] md:text-[42px]">
            Bestel gratis kleurstalen
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed tracking-[0.01em] text-[#071426]/70">
            Kies de afwerkingen die je thuis wil bekijken. Je kunt er zoveel kiezen als je wil — de
            kleurstalen zijn volledig gratis en worden zonder verzendkosten geleverd.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
          {isLoading && samples.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-[20px] bg-[#ede7e0]" />
              ))
            : samples.map((product) => {
                const handle = product.node.handle;
                const image = product.node.images?.edges?.[0]?.node?.url;
                const isSelected = selected.includes(handle);
                const inCart = cartItems.some(
                  (i) => i.variantId === product.node.variants.edges[0]?.node?.id,
                );
                return (
                  <button
                    key={handle}
                    type="button"
                    onClick={() => toggle(handle)}
                    aria-pressed={isSelected}
                    className={`group relative overflow-hidden rounded-[20px] bg-white p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 ${
                      isSelected ? "ring-2 ring-[#ef7027]" : "ring-1 ring-black/5"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[14px] bg-[#f7f7f7]">
                      {image ? (
                        <Img
                          src={image}
                          alt={`Kleurstaal ${product.node.title}`}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-[4/5] w-full" />
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 px-1 pb-1">
                      <span className="text-[13px] font-[500] tracking-[0.01em] text-[#071426]">
                        {product.node.title}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[#ef7027]">
                        Gratis
                      </span>
                    </div>
                    {(isSelected || inCart) && (
                      <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#ef7027] text-white">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selected.length || busy}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#ff6e15] px-7 text-[13px] font-[300] tracking-[0.02em] text-white transition-opacity disabled:opacity-40"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
            )}
            {selected.length > 1
              ? `${selected.length} kleurstalen gratis toevoegen`
              : "Kleurstaal gratis toevoegen"}
          </button>
          <p className="text-[12px] tracking-[0.01em] text-[#071426]/60">
            Geen verzendkosten. Reken af zonder betaling om je stalen te ontvangen.
          </p>
        </div>
      </div>
    </main>
  );
}
