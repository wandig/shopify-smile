import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/producten")({
  head: () => ({
    meta: [
      { title: "Alle modellen — Wandig" },
      { name: "description", content: "Ontdek alle Wandig TV cinewalls. Maatwerk modellen voor elk interieur." },
      { property: "og:title", content: "Alle modellen — Wandig" },
      { property: "og:description", content: "Ontdek alle Wandig TV cinewalls op maat." },
    ],
  }),
  component: Producten,
});

function Producten() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const filteredProducts = (data ?? []).filter((p) => {
    const t = p.node.title.toLowerCase();
    return t.includes("solo") || t.includes("duo") || t.includes("full house");
  });

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-2xl mb-14">
        <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Collectie</span>
        <h1 className="font-serif text-5xl md:text-7xl mt-4 leading-[0.95]">Alle modellen</h1>
        <p className="mt-6 text-foreground/75 leading-relaxed">
          Van een minimalistische Solo tot een complete Full House — kies het model dat bij jouw ruimte past
          en stel hem in eigen maat en kleur samen.
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center">No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-x-10 md:gap-y-16">
          {filteredProducts.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
