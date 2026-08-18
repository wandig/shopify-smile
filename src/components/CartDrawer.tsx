import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, X, Loader2, ChevronDown, Truck, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(
    Math.round(amount),
  );
}

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showCode, setShowCode] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const vat = totalAmount - totalAmount / 1.21;

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-none hover:bg-transparent">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-foreground text-background">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full sm:max-w-[440px] flex flex-col gap-0 p-0 border-0 bg-[#faf3ea] rounded-l-[28px] overflow-hidden [&>button]:hidden"
      >
        <SheetHeader className="px-6 pt-6 pb-4 space-y-0">
          <div className="flex items-center justify-between gap-4">
            <SheetTitle className="text-[22px] font-semibold tracking-[0.01em] text-[#1c1c1c]">
              Jouw winkelmandje ({totalItems})
            </SheetTitle>
            <button
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
              className="h-10 w-10 shrink-0 rounded-full bg-[#a99e93] text-white flex items-center justify-center hover:bg-[#948a80] transition-colors"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <ShoppingBag className="h-10 w-10 mx-auto mb-3 text-[#c9bfb5]" strokeWidth={1} />
              <p className="text-sm text-[#8a8078]">Nog geen artikelen toegevoegd</p>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const options = item.selectedOptions.filter((o) => o.value !== "Default Title");
                const isOpenRow = expanded[item.variantId];
                const visible = isOpenRow ? options : options.slice(0, 3);
                const image = item.product.node.images?.edges?.[0]?.node;

                return (
                  <div key={item.variantId} className="rounded-2xl bg-white p-4">
                    <div className="flex gap-4">
                      <div className="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl bg-[#f7f7f7]">
                        {image && (
                          <img src={image.url} alt={item.product.node.title} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[17px] leading-snug text-[#1c1c1c]">{item.product.node.title}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Verwijderen"
                        className="h-7 w-7 shrink-0 rounded-full border border-[#e5ded6] text-[#8a8078] flex items-center justify-center hover:text-[#1c1c1c] transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {options.length > 0 && (
                      <div className="mt-4">
                        {visible.map((o) => (
                          <div
                            key={o.name}
                            className="flex items-center justify-between gap-4 border-t border-[#efeae4] py-2.5 text-sm"
                          >
                            <span className="text-[#1c1c1c]">{o.name}</span>
                            <span className="text-[#9b938c] text-right">{o.value}</span>
                          </div>
                        ))}
                        {options.length > 3 && (
                          <button
                            onClick={() =>
                              setExpanded((p) => ({ ...p, [item.variantId]: !p[item.variantId] }))
                            }
                            className="flex w-full items-center justify-between border-t border-[#efeae4] py-2.5 text-sm font-semibold text-[#1c1c1c]"
                          >
                            {isOpenRow ? "Minder tonen" : "Meer tonen"}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isOpenRow ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-[#efeae4] pt-4">
                      <div className="flex items-center rounded-full border border-[#e5ded6]">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="h-9 w-10 rounded-l-full flex items-center justify-center text-[#1c1c1c] hover:bg-[#faf8f5]"
                          aria-label="Minder"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="h-9 w-10 rounded-r-full flex items-center justify-center text-[#1c1c1c] hover:bg-[#faf8f5]"
                          aria-label="Meer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-[19px] text-[#ef7027]">
                        {formatEuro(parseFloat(item.price.amount) * item.quantity)},-
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl bg-white px-4 py-3.5 flex items-center justify-between text-sm">
                <span className="text-[#9b938c]">Vroegst mogelijke levering:</span>
                <span className="text-[#1c1c1c]">7-14 werkdagen</span>
              </div>

              <div className="rounded-2xl bg-white px-4">
                <div className="flex items-center justify-between py-3.5 text-sm">
                  <span className="text-[#9b938c]">Levering:</span>
                  <span className="text-[#1c1c1c]">Gratis</span>
                </div>
                <button
                  onClick={() => setShowCode((v) => !v)}
                  className="flex w-full items-center justify-between border-t border-[#efeae4] py-3.5 text-sm font-semibold text-[#1c1c1c]"
                >
                  Cadeaubon/kortingscode gebruiken
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCode ? "rotate-180" : ""}`} />
                </button>
                {showCode && (
                  <p className="pb-4 text-xs text-[#9b938c]">
                    Je kunt je cadeaubon of kortingscode invullen tijdens het afrekenen.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 text-xs text-[#8a8078]">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-[#ef7027]" strokeWidth={1.5} /> Gratis levering
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#ef7027]" strokeWidth={1.5} /> 10 jaar garantie
                </span>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-4 pb-4">
            <div className="rounded-2xl bg-white p-5 shadow-[0_-6px_24px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <span className="text-[19px] font-semibold text-[#1c1c1c]">Totaalprijs</span>
                <div className="text-right">
                  <div className="text-[24px] font-semibold text-[#ef7027]">{formatEuro(totalAmount)},-</div>
                  <div className="text-xs text-[#9b938c]">Btw {formatEuro(vat)},-</div>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="mt-4 h-14 w-full rounded-full bg-[#ef7027] text-[17px] font-normal text-white hover:bg-[#e2661f]"
              >
                {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Naar de kassa"}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
