import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block w-full max-w-[280px] border border-border/70 bg-background overflow-hidden"
    >
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        {img && (
          <img
            src={img.url}
            alt={img.altText || p.title}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>
      <div className="border-t border-border/70 py-4 px-3 text-center">
        <h3 className="font-serif text-base md:text-lg">{p.title}</h3>
      </div>
    </Link>
  );
}
