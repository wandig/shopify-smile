import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, Hammer, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-reel.mp4.asset.json";
import werkplaatsImg from "@/assets/werkplaats.webp.asset.json";
import kleurstalenImg from "@/assets/kleurstalen.webp.asset.json";
import detailDesignImg from "@/assets/detail-design.jpg";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import detailGeleverdImg from "@/assets/detail-geleverd.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wandig — Maatwerk TV cinewalls uit eigen werkplaats" },
      {
        name: "description",
        content:
          "Tijdloze TV cinewalls op maat gemaakt. Bepaal je eigen maatvoering, indeling en kleur. Gratis levering en 5 jaar garantie.",
      },
      { property: "og:title", content: "Wandig — Maatwerk TV cinewalls" },
      {
        property: "og:description",
        content: "Tijdloze TV cinewalls op maat gemaakt. Bepaal je eigen maatvoering, indeling en kleur.",
      },
    ],
  }),
  component: Home,
});

const REVIEWS = [
  {
    quote: "De wand staat strak tot op de millimeter. Het ziet eruit alsof hij altijd in de woonkamer heeft gezeten.",
    name: "Lotte M.",
    location: "Utrecht",
  },
  {
    quote: "Persoonlijk advies, snelle reactie en een afwerking die echt boven verwachting was. Aanrader.",
    name: "Jeroen V.",
    location: "Amsterdam",
  },
  {
    quote: "Vanaf het kleurstaal tot de installatie: alles klopte. Een rustig, tijdloos eindresultaat.",
    name: "Sanne D.",
    location: "Eindhoven",
  },
];

function Home() {
  const USPS = [
    { icon: Truck, label: "Gratis levering aan huis" },
    { icon: Hammer, label: "Maatwerk uit eigen werkplaats" },
    { icon: BadgeCheck, label: "Hoge kwaliteit, eerlijke prijs" },
    { icon: ShieldCheck, label: "5 jaar garantie" },
  ];
  const [uspIdx, setUspIdx] = useState(0);
  const [uspVisible, setUspVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setUspVisible(false);
      setTimeout(() => {
        setUspIdx((i) => (i + 1) % USPS.length);
        setUspVisible(true);
      }, 700);
    }, 5000);
    return () => clearInterval(id);
  }, []);

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
        <div className="relative h-full mx-auto max-w-[1600px] px-5 md:px-10 pb-[30px] md:pb-12 flex flex-col justify-end items-center md:items-start text-center md:text-left text-background">
          <span className="text-xs md:text-sm tracking-[0.05em] mb-6 opacity-95">Voor elk interieur</span>
          <h1 className="text-5xl md:text-7xl leading-[1.05] tracking-tight opacity-90 font-thin font-serif lg:text-6xl">
            Tijdloze
            <br />
            maatwerk
            <br />
            meubels
          </h1>
          <div className="mt-10 flex items-end justify-center md:justify-between gap-6 flex-wrap w-full">
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
                className="group hidden md:flex items-stretch bg-foreground/85 backdrop-blur-sm text-background hover:bg-foreground transition-colors overflow-hidden"
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
      <section className="border-y border-border/60 bg-background overflow-hidden">
        {/* Desktop: grid */}
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-6 hidden md:grid grid-cols-4 gap-6 text-sm">
          {[
            { icon: Truck, label: "Gratis levering aan huis" },
            { icon: Hammer, label: "Maatwerk uit eigen werkplaats" },
            { icon: BadgeCheck, label: "Hoge kwaliteit, eerlijke prijs" },
            { icon: ShieldCheck, label: "5 jaar garantie" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 justify-center">
              <Icon className="h-4 w-4 opacity-70" strokeWidth={1.5} />
              <span className="text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
        {/* Mobile: fade between USPs */}
        <div className="md:hidden py-6 text-sm relative h-12">
          {USPS.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`absolute inset-0 flex items-center gap-3 justify-center transition-opacity duration-700 ease-in-out ${
                i === uspIdx && uspVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Icon className="h-4 w-4 opacity-70" strokeWidth={1.5} />
              <span className="text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32 text-left md:pr-[400px]">
        <p className="font-serif text-2xl leading-relaxed text-foreground/85 md:text-lg text-left">
          Maak je woonkamer persoonlijk met een unieke TV cinewall op maat. Ontdek onze collectie: bepaal je eigen
          maatvoering, indeling en kleur. Zwevend of staand. Precies zoals jij dat wilt. Voel je thuis met Wandig.
        </p>
      </section>

      {/* Categories / Collection */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-24">
        <div className="flex flex-col items-start text-left mb-10">
          <h2 className="font-serif text-3xl md:text-5xl">Onze collectie</h2>
        </div>
        {isLoading ? (
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 md:max-w-[900px] overflow-x-auto md:overflow-visible snap-x snap-mandatory">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-muted animate-pulse shrink-0 basis-[78%] md:basis-auto snap-start"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-muted-foreground py-20 text-left">No products found</p>
        ) : (
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 md:max-w-[900px] overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((p) => (
              <div key={p.node.id} className="shrink-0 basis-[78%] md:basis-auto snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Details maken het verschil */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-24 md:pb-32">
        <h2 className="font-serif text-3xl md:text-5xl mb-12 md:mb-16">
          Details maken
          <br />
          het verschil
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-8 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            {
              img: detailDesignImg,
              title: "Gepersonaliseerd design",
              text: "Stel eenvoudig je eigen meubel samen. Ervaar het gemak van bestellen bij Wandig.",
            },
            {
              img: detailMaatwerkImg,
              title: "Betaalbaar maatwerk",
              text: "De hoogste kwaliteit meubels voor een eerlijke prijs, rechtstreeks van de maker.",
            },
            {
              img: detailGeleverdImg,
              title: "Afgemonteerd geleverd",
              text: "Onze meubels worden gebruiksklaar geleverd. Géén bouwpakketten.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col shrink-0 basis-[80%] md:basis-auto snap-start">
              <div className="aspect-[4/5] overflow-hidden bg-muted max-h-[320px]">
                <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-lg md:text-xl mt-6">{item.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/75 mt-3 max-w-[320px]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Uit eigen werkplaats — image left, text right (full-bleed) */}
      <section className="w-full">
        <div className="grid md:grid-cols-2 md:h-[500px]">
          <div className="hidden md:block overflow-hidden bg-muted h-full">
            <img
              src={werkplaatsImg.url}
              alt="Maatwerk uit de Wandig werkplaats"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center bg-[#3d2424] text-[#f5ece6] px-8 md:px-16 py-16 md:py-0">
            <div className="max-w-md text-center md:text-left mx-auto md:mx-0">
              <span className="text-[11px] tracking-[0.3em] uppercase opacity-70">Handgemaakt</span>
              <h2 className="font-serif text-5xl md:text-5xl mt-6 leading-[1.05] font-thin">
                Uit eigen
                <br />
                werkplaats
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed opacity-85">
                Bij Wandig maken wij alle meubels vanuit onze eigen werkplaats in Nederland. In ons productieproces
                combineren wij slimme technieken met ambachtelijk vakwerk. Zo kun jij profiteren van toegankelijk en
                betaalbare maatwerk meubels van hoge kwaliteit.
              </p>
              <Link
                to="/bezoek"
                className="inline-block mt-8 text-sm tracking-wide underline underline-offset-[6px] hover:opacity-70"
              >
                Meer over Wandig
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#fbf1ea]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28">
          <div className="flex items-start justify-between gap-8 mb-12">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl font-thin text-[#3d2424] leading-[1.05]">
                Wat klanten zeggen
              </h2>
              <div className="mt-8 flex items-center gap-8 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#d4a574] text-[#d4a574]" />
                    ))}
                  </div>
                  <span className="text-sm text-foreground/80">4.9 · 1180 beoordelingen</span>
                </div>
                <Link to="/" className="text-sm underline underline-offset-[6px] text-foreground/80 hover:opacity-70">
                  Bekijk alle reviews
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                aria-label="Vorige"
                className="h-12 w-12 rounded-full bg-background/70 flex items-center justify-center hover:bg-background transition"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                aria-label="Volgende"
                className="h-12 w-12 rounded-full bg-background/70 flex items-center justify-center hover:bg-background transition"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REVIEWS.map((r, idx) => (
              <figure
                key={r.name}
                className="border border-border/60 bg-background/40 p-8 flex flex-col min-h-[360px] shrink-0 basis-[85%] md:basis-auto snap-start"
              >
                <div className="flex gap-1 mb-6" aria-label="5 sterren">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#d4a574] text-[#d4a574]" />
                  ))}
                </div>
                <blockquote className="text-[15px] leading-relaxed text-foreground/85 flex-1">{r.quote}</blockquote>
                <div className="border-t border-border/50 mt-8 pt-5">
                  <div className="text-sm text-foreground/90">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">0{4 + idx} jun 2026</div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gratis kleurstalen — text left, image right (full-bleed) */}
      <section className="w-full">
        <div className="grid md:grid-cols-2 md:h-[500px]">
          <div className="flex items-center bg-[#3d2424] text-[#f5ece6] px-8 md:px-16 py-16 md:py-0 order-2 md:order-1">
            <div className="max-w-md text-center md:text-left mx-auto md:mx-0">
              <span className="text-[11px] tracking-[0.3em] uppercase opacity-70">Gratis service</span>
              <h2 className="font-serif text-5xl md:text-5xl mt-6 leading-[1.05] font-thin">
                Gratis
                <br />
                kleurstalen
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed opacity-85">
                Twijfel je tussen warm eiken, donker walnoot of een strak mat zwart? Vraag kosteloos onze kleurstalen
                aan en voel het materiaal in je eigen interieur, bij jouw licht. Zo kies je met vertrouwen de afwerking
                die past bij jouw woonkamer — vóór je bestelt.
              </p>
              <Link
                to="/klantenservice"
                className="inline-block mt-8 text-sm tracking-wide underline underline-offset-[6px] hover:opacity-70"
              >
                Vraag stalen aan
              </Link>
            </div>
          </div>
          <div className="hidden md:block overflow-hidden bg-muted h-full order-1 md:order-2">
            <img
              src={kleurstalenImg}
              alt="Gratis kleurstalen van Wandig"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* We helpen je graag */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-thin text-foreground leading-[1.05]">
            We helpen je graag
          </h2>
          <p className="mt-8 text-[15px] leading-relaxed text-foreground/75 max-w-xl mx-auto">
            Een maatwerk meubel bestellen was nog nooit zo makkelijk. Maar soms is het fijn om toch even contact te
            hebben. Bel of bezoek ons voor goed advies of hulp bij bestellen.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <a
              href="tel:0123456789"
              className="rounded-full bg-[#fbf1ea] text-foreground hover:bg-[#f3e3d6] transition-colors h-11 px-6 text-sm flex items-center"
            >
              Bel 012 345 6789
            </a>
            <a
              href="mailto:info@wandig.nl"
              className="rounded-full bg-[#fbf1ea] text-foreground hover:bg-[#f3e3d6] transition-colors h-11 px-6 text-sm flex items-center"
            >
              info@wandig.nl
            </a>
            <Link
              to="/bezoek"
              className="rounded-full bg-[#3d2424] text-[#f5ece6] hover:bg-[#2e1b1b] transition-colors h-11 px-6 text-sm flex items-center"
            >
              Bezoek ons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
