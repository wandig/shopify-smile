import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const SAMPLE_HANDLES = ["walnootbruin", "donkereiken", "cashmeregrijs", "kristalwit", "dofroze"] as const;
const MAX_SAMPLES = 4;

export function FreeColorSamples() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);

  const { data, isLoading } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => storefrontApiRequest(PRODUCTS_QUERY, { first: 50 }),
    staleTime: 5 * 60 * 1000,
    enabled: open,
  });

  const samples = useMemo(() => {
    const edges: ShopifyProduct[] = data?.data?.products?.edges ?? [];
    return SAMPLE_HANDLES.map((handle) => edges.find((e) => e.node.handle === handle)).filter(
      (p): p is ShopifyProduct => Boolean(p),
    );
  }, [data]);

  const toggle = (handle: string) =>
    setSelected((cur) => {
      if (cur.includes(handle)) return cur.filter((h) => h !== handle);
      if (cur.length >= MAX_SAMPLES) {
        toast.info(`Je kunt maximaal ${MAX_SAMPLES} kleurstalen kiezen.`);
        return cur;
      }
      return [...cur, handle];
    });

  const handleAdd = async () => {
    const chosen = samples.filter((p) => selected.includes(p.node.handle));
    if (!chosen.length) return;
    setBusy(true);
    try {
      for (const product of chosen) {
        const variant = product.node.variants.edges[0]?.node;
        if (!variant) continue;
        if (cartItems.some((i) => i.variantId === variant.id)) continue;
        await addItem({
          product,
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: [{ name: "Kleurstaal", value: product.node.title }],
        });
      }
      toast.success("Gratis kleurstalen toegevoegd", {
        description: "Je kleurstalen staan in je winkelmand.",
      });
      setSelected([]);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-2 h-12 w-full rounded-full border border-[#eeeeee] bg-white text-[14px] font-[300] tracking-[0.02em] text-[#071426] transition-colors hover:bg-[#faf8f5]"
        >
          Ontvang gratis kleurstalen
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[560px] rounded-[20px] bg-white p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-[20px] font-[600] tracking-[0.01em] text-[#071426]">
            Gratis kleurstalen
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed text-[#071426]/65">
            Kies maximaal {MAX_SAMPLES} kleurstalen en bekijk de afwerking thuis bij je eigen muur en
            lichtinval. Volledig gratis, zonder verzendkosten.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {isLoading && samples.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-[12px] bg-[#f0ece7]" />
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
                    className={`relative overflow-hidden rounded-[12px] bg-[#f7f7f7] p-1.5 text-left transition-all ${
                      isSelected ? "ring-2 ring-[#ef7027]" : "ring-1 ring-[#eeeeee]"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[9px] bg-white">
                      {image ? (
                        <img
                          src={image}
                          alt={`Kleurstaal ${product.node.title}`}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-[4/3] w-full" />
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-1 px-1 py-1.5">
                      <span className="text-[12px] font-[500] text-[#071426]">{product.node.title}</span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[#ef7027]">Gratis</span>
                    </div>
                    {(isSelected || inCart) && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ef7027] text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selected.length || busy}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff6e15] text-[14px] font-[300] tracking-[0.02em] text-white transition-opacity disabled:opacity-40"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {selected.length > 1
              ? `${selected.length} kleurstalen gratis toevoegen`
              : "Kleurstaal gratis toevoegen"}
          </button>
          <p className="text-center text-[12px] text-[#071426]/55">
            {selected.length}/{MAX_SAMPLES} gekozen · binnen 2 werkdagen in huis
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
