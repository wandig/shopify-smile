import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, Hammer, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-reel.mp4.asset.json";
import werkplaatsImg from "@/assets/werkplaats.jpg";
import kleurstalenImg from "@/assets/kleurstalen.jpg";

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

const REVIEWS = [
  {
    quote:
      "De wand staat strak tot op de millimeter. Het ziet eruit alsof hij altijd in de woonkamer heeft gezeten.",
    name: "Lotte M.",
    location: "Utrecht",
  },
  {
    quote:
      "Persoonlijk advies, snelle reactie en een afwerking die echt boven verwachting was. Aanrader.",
    name: "Jeroen V.",
    location: "Amsterdam",
  },
  {
    quote:
      "Vanaf het kleurstaal tot de installatie: alles klopte. Een rustig, tijdloos eindresultaat.",
    name: "Sanne D.",
    location: "Eindhoven",
  },
];

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const allProducts = data ?? [];
  const products = allProducts.filter((p) => {
    const t = p.node.title.toLowerCase();
    return !t.includes("prestige") && !t.includes("trio");
  });
  const hero = products[0];
  const heroImg = hero?.node.images.edges[0]?.node.url;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
        <div className="relative h-full mx-auto max-w-[1600px] px-5 md:px-10 pb-10 md:pb-12 flex flex-col justify-end text-background">
          <span className="text-xs md:text-sm tracking-[0.05em] mb-6 opacity-95">Voor elk interieur</span>
          <h1 className="text-5xl md:text-7xl leading-[1.05] tracking-tight opacity-90 font-thin font-serif lg:text-6xl">
            Tijdloze<br />maatwerk<br />meubels
          </h1>
          <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
            <Button
              asChild
              className="rounded-full bg-background text-foreground hover:bg-background/90 h-12 px-8 text-sm font-normal"
            >
              <Link to="/producten">Alle modellen</Link>
            </Button>
            {hero && (
              <Link
                to="/product/$handle"
                params={{ handle: hero.node.handle }}
                className="group flex items-stretch bg-foreground/85 backdrop-blur-sm text-background hover:bg-foreground transition-colors overflow-hidden"
              >
                {heroImg && (
                  <div className="w-16 md:w-20 bg-muted shrink-0">
                    <img src={heroImg} alt={hero.node.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-8 md:gap-12 px-5 md:px-7 py-4">
                  <div>
                    <div className="text-base md:text-lg font-serif">{hero.node.title}</div>
                    <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-80 mt-0.5">
                      Bekijk onze collectie
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-90 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )}
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
            <div key={label} className="flex items-center gap-3 justify-start">
              <Icon className="h-4 w-4 opacity-70" strokeWidth={1.5} />
              <span className="text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 md:px-10 py-24 md:py-32 text-left">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground/85">
          Maak je woonkamer persoonlijk met een unieke TV cinewall op maat. Ontdek onze collectie:
          bepaal je eigen maatvoering, indeling en kleur. Zwevend of staand. Precies zoals jij dat wilt.
          Voel je thuis met Wandig.
        </p>
      </section>

      {/* Categories / Collection */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-24">
        <div className="flex flex-col items-start text-left mb-14">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">Collectie</span>
          <h2 className="font-serif text-3xl md:text-5xl">Onze collectie</h2>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse max-w-[380px] mx-auto w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground py-20 text-left">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16 justify-items-center">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
        <div className="flex justify-start mt-14">
          <Link to="/producten" className="inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase hover:opacity-60">
            Bekijk alles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Uit eigen werkplaats — image left, text right (full-bleed) */}
      <section className="w-full">
        <div className="grid md:grid-cols-[1.4fr_1fr] min-h-[560px] md:min-h-[640px]">
          <div className="overflow-hidden bg-muted h-full">
            <img
              src={werkplaatsImg}
              alt="Maatwerk uit de Wandig werkplaats"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center bg-[#3d2424] text-[#f5ece6] px-8 md:px-20 py-16 md:py-24">
            <div className="max-w-md">
              <span className="text-[11px] tracking-[0.3em] uppercase opacity-70">Handgemaakt</span>
              <h2 className="font-serif text-5xl md:text-6xl mt-8 leading-[1.05] font-thin">
                Uit eigen<br />werkplaats
              </h2>
              <p className="mt-8 text-[15px] leading-relaxed opacity-85">
                Bij Wandig maken wij alle meubels vanuit onze eigen werkplaats in Nederland.
                In ons productieproces combineren wij slimme technieken met ambachtelijk vakwerk.
                Zo kun jij profiteren van toegankelijk en betaalbare maatwerk meubels van hoge kwaliteit.
              </p>
              <Link
                to="/bezoek"
                className="inline-block mt-10 text-sm tracking-wide underline underline-offset-[6px] hover:opacity-70"
              >
                Meer over Wandig
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Reviews */}
      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28">
          <div className="flex flex-col items-start text-left mb-14">
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">Klanten</span>
            <h2 className="font-serif text-3xl md:text-5xl font-thin">Wat klanten zeggen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="text-left">
                <div className="flex gap-1 mb-6" aria-label="5 sterren">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {r.name} — {r.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gratis kleurstalen — text left, image right (full-bleed) */}
      <section className="w-full">
        <div className="grid md:grid-cols-[1fr_1.4fr] min-h-[560px] md:min-h-[640px]">
          <div className="flex items-center bg-[#3d2424] text-[#f5ece6] px-8 md:px-20 py-16 md:py-24 order-2 md:order-1">
            <div className="max-w-md">
              <span className="text-[11px] tracking-[0.3em] uppercase opacity-70">Gratis service</span>
              <h2 className="font-serif text-5xl md:text-6xl mt-8 leading-[1.05] font-thin">
                Gratis<br />kleurstalen
              </h2>
              <p className="mt-8 text-[15px] leading-relaxed opacity-85">
                Twijfel je tussen warm eiken, donker walnoot of een strak mat zwart?
                Vraag kosteloos onze kleurstalen aan en voel het materiaal in je eigen
                interieur, bij jouw licht. Zo kies je met vertrouwen de afwerking die
                past bij jouw woonkamer — vóór je bestelt.
              </p>
              <Link
                to="/klantenservice"
                className="inline-block mt-10 text-sm tracking-wide underline underline-offset-[6px] hover:opacity-70"
              >
                Vraag stalen aan
              </Link>
            </div>
          </div>
          <div className="overflow-hidden bg-muted h-full order-1 md:order-2">
            <img
              src={kleurstalenImg}
              alt="Gratis kleurstalen van Wandig"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
