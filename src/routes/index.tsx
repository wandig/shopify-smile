import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, Hammer, BadgeCheck, ShieldCheck } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wandig — Maatwerk TV cinewalls uit eigen werkplaats" },
      { name: "description", content: "Tijdloze TV cinewalls op maat gemaakt. Bepaal je eigen maatvoering, indeling en kleur. Gratis levering en 5 jaar garantie." },
      { property: "og:title", content: "Wandig — Maatwerk TV cinewalls" },
      { property: "og:description", content: "Tijdloze TV cinewalls op maat gemaakt. Bepaal je eigen maatvoering, indeling en kleur." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const products = data ?? [];
  const hero = products[0];
  const heroImg = hero?.node.images.edges[0]?.node.url;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        {heroImg && (
          <img src={heroImg} alt="Wandig cinewall" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="relative h-full mx-auto max-w-[1600px] px-5 md:px-10 flex flex-col justify-end pb-16 md:pb-24 text-background">
          <span className="text-xs md:text-sm tracking-[0.25em] uppercase mb-5 opacity-90">Voor elk interieur</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-[14ch]">
            Tijdloze<br />maatwerk<br />cinewalls
          </h1>
          <div className="mt-10">
            <Button asChild size="lg" className="rounded-none bg-background text-foreground hover:bg-background/90 h-12 px-8 text-sm tracking-[0.18em] uppercase">
              <Link to="/producten">Alle modellen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* USP bar */}
      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            { icon: Truck, label: "Gratis levering aan huis" },
            { icon: Hammer, label: "Maatwerk uit eigen werkplaats" },
            { icon: BadgeCheck, label: "Hoge kwaliteit, eerlijke prijs" },
            { icon: ShieldCheck, label: "5 jaar garantie" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 justify-center md:justify-start">
              <Icon className="h-4 w-4 opacity-70" strokeWidth={1.5} />
              <span className="text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 md:px-10 py-24 md:py-32 text-center">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground/85">
          Maak je woonkamer persoonlijk met een unieke TV cinewall op maat. Ontdek onze collectie:
          bepaal je eigen maatvoering, indeling en kleur. Zwevend of staand. Precies zoals jij dat wilt.
          Voel je thuis met Wandig.
        </p>
      </section>

      {/* Categories / Collection */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-3xl md:text-5xl">Onze collectie</h2>
          <Link to="/producten" className="hidden md:inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase hover:opacity-60">
            Bekijk alles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-x-10 md:gap-y-16">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Featured story */}
      {products[1] && (
        <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={products[1].node.images.edges[0]?.node.url} alt={products[1].node.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Uitgelicht</span>
              <h3 className="font-serif text-4xl md:text-6xl mt-4 leading-[1]">{products[1].node.title}</h3>
              <p className="mt-6 text-foreground/75 leading-relaxed max-w-md">
                Gemaakt om te blijven. Elk paneel met de hand afgewerkt in onze Nederlandse werkplaats,
                samengesteld op de millimeter voor jouw ruimte.
              </p>
              <Button asChild className="mt-10 rounded-none h-12 px-8 text-sm tracking-[0.18em] uppercase">
                <Link to="/product/$handle" params={{ handle: products[1].node.handle }}>Bekijk model</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
