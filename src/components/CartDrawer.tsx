import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "EUR";

  useEffect(() => { if (open) syncCart(); }, [open, syncCart]);

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
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Winkelmand</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Je winkelmand is leeg" : `${totalItems} ${totalItems === 1 ? "artikel" : "artikelen"}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-3" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Nog geen artikelen toegevoegd</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-5">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 pb-5 border-b border-border/60">
                    <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-lg leading-tight">{item.product.node.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.selectedOptions.filter((o) => o.value !== "Default Title").map((o) => o.value).join(" · ")}
                      </p>
                      <p className="text-sm mt-2">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-2 py-1 hover:bg-muted">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2 py-1 hover:bg-muted">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-foreground">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 pt-5 space-y-4 border-t border-border/60">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotaal</span>
                  <span>{formatPrice(totalAmount.toString(), currency)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Verzending en belastingen worden bij afrekenen berekend.</p>
                <Button onClick={handleCheckout} className="w-full rounded-none h-12 text-sm tracking-[0.15em] uppercase" disabled={isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Afrekenen"}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
