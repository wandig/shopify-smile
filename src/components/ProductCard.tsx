import { Link } from "@tanstack/react-router";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const price = parseFloat(p.priceRange.minVariantPrice.amount) > 0
    ? `vanaf ${formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}`
    : "Prijs op aanvraag";

  return (
    <Link to="/product/$handle" params={{ handle: p.handle }} className="group block text-center">
      <div className="aspect-square bg-muted overflow-hidden mb-5 max-w-[380px] mx-auto">
        {img && (
          <img
            src={img.url}
            alt={img.altText || p.title}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-1.5 px-1">
        <h3 className="font-serif text-xl md:text-2xl">{p.title}</h3>
        <span className="text-xs md:text-sm text-muted-foreground">{price}</span>
      </div>
    </Link>
  );
}
