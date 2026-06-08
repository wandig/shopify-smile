import { Link } from "@tanstack/react-router";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const price = parseFloat(p.priceRange.minVariantPrice.amount) > 0
    ? `vanaf ${formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}`
    : "Prijs op aanvraag";

  return (
    <Link to="/product/$handle" params={{ handle: p.handle }} className="group block">
      <div className="aspect-[4/5] bg-muted overflow-hidden mb-4">
        {img && (
          <img
            src={img.url}
            alt={img.altText || p.title}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4 px-1">
        <h3 className="font-serif text-xl md:text-2xl">{p.title}</h3>
        <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">{price}</span>
      </div>
    </Link>
  );
}
