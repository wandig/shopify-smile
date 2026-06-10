import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, Hammer, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-reel.mp4.asset.json";
import werkplaatsImg from "@/assets/werkplaats.png.asset.json";
import kleurstalenImg from "@/assets/kleurstalen.png.asset.json";
import detailDesignImg from "@/assets/detail-design.jpg";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import detailGeleverdImg from "@/assets/detail-geleverd.jpg";

function RatingStars({ value, small, dark }: { value: number; small?: boolean; dark?: boolean }) {
  const size = small ? "h-3 w-3" : "h-3.5 w-3.5";
  const color = dark ? "fill-[#d97706] text-[#d97706]" : "fill-white text-white";
  const empty = dark ? "text-[#d97706]/30" : "text-white/40";
  return (
    <span className="flex gap-0.5" aria-label={`${value} sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} ${i < Math.round(value) ? color : empty}`} strokeWidth={1.5} />
      ))}
    </span>
  );
}

function CartIconBtn() {
  return (
    <span className="h-9 w-9 rounded-full bg-[#f18972] text-white flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
    </span>
  );
}

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

const COLLECTION_META: {
  title: string;
  description: string;
  korting: string;
  tags: string[];
  highlight?: boolean;
}[] = [
  {
    title: "Wandig Solo",
    description: "De compacte cinewall — strak en tijdloos voor elke woonkamer.",
    korting: "€100,-",
    tags: ["Compact", "Zwevend of staand", "Op maat"],
  },
  {
    title: "Wandig Duo",
    description: "Extra opbergruimte links én rechts van je TV, in perfecte symmetrie.",
    korting: "€150,-",
    tags: ["Populair", "Symmetrisch", "Veel opbergruimte"],
    highlight: true,
  },
  {
    title: "Wandig Full House",
    description: "Een volledige wand op maat — van vloer tot plafond, helemaal jouw stijl.",
    korting: "€250,-",
    tags: ["Aanbevolen", "Wand-vullend", "Maximaal maatwerk"],
    highlight: true,
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
      {/* Hero — full-bleed video */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative h-full w-full flex flex-col items-center justify-center text-center text-background px-5">
          <h1 className="font-serif font-thin text-background text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
            Onze bestsellers
          </h1>
          <div className="mt-10">
            <Button
              asChild
              className="rounded-full bg-[#f18972] text-white hover:bg-[#e87a62] h-10 px-8 text-sm font-medium"
            >
              <Link to="/producten">Bekijk bestsellers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers — category tiles + product carousel */}
      <section className="bg-[#fbecdd]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-12 md:pt-16 pb-16 md:pb-20">
          {/* Category tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-14">
            {[
              { title: "Wandig Solo", handle: "solo", img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_Solo_Camera_Side_Wandig_1_Authentic_Black_Oak.jpg?v=1744100488" },
              { title: "Wandig Duo", handle: "duo", img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/blackoak1.jpg?v=1748854179" },
              { title: "Wandig Full House", handle: "full-house", img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_FullHouse_Camera_Side_Wandig_4_Truffle_Brown_Oak.jpg?v=1744181267" },
            ].map((c) => (
              <Link
                key={c.handle}
                to="/product/$handle"
                params={{ handle: c.handle }}
                className="group flex items-center gap-4 bg-[#fdf4ea] rounded-2xl pr-5 pl-2 py-2 hover:bg-[#fbeedf] transition"
              >
                <div className="h-16 w-16 md:h-[72px] md:w-[72px] rounded-xl overflow-hidden bg-[#f0d9c4] shrink-0">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="flex-1 text-[15px] md:text-base text-[#0a2540]">{c.title}</span>
                <ArrowRight className="h-4 w-4 text-[#0a2540]/60 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
              </Link>
            ))}
          </div>

          {/* Bestsellers carousel panel */}
          <div className="relative rounded-3xl bg-[#f3d3b1] p-3 md:p-4">
            <div className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Vertical label */}
              <div className="hidden md:flex shrink-0 w-12 items-center justify-center">
                <span
                  className="font-serif tracking-[0.35em] text-[#0a2540] text-sm"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  BESTSELLERS
                </span>
              </div>

              {/* Featured large card */}
              {(() => {
                const card = {
                  handle: "full-house",
                  badge: "Incl. Standaard hoofdbord",
                  img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_FullHouse_Camera_Side_Wandig_4_Truffle_Brown_Oak_cce209b3-4e39-4361-8613-433de00bec9b.jpg?v=1750342787",
                  title: "Venus",
                  price: "1.699 €",
                  rating: 4.5,
                  reviews: 2524,
                  size: "180x200",
                  cat: "Boxspring",
                };
                return (
                  <Link
                    to="/product/$handle"
                    params={{ handle: card.handle }}
                    className="relative shrink-0 snap-start basis-[88%] sm:basis-[60%] md:basis-[42%] rounded-2xl overflow-hidden bg-[#f5b88d] aspect-[3/4] md:aspect-auto md:h-[640px] group"
                  >
                    <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <span className="absolute top-4 left-4 z-10 rounded-full bg-white/15 backdrop-blur-md text-white text-xs px-3 py-1.5">
                      {card.badge}
                    </span>
                    <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 text-white">
                      <h3 className="font-serif text-5xl md:text-6xl leading-tight">{card.title}</h3>
                      <div className="font-serif text-3xl md:text-4xl mt-2">{card.price}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between text-white">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs opacity-95 mb-2">
                          <RatingStars value={card.rating} small />
                          <span>({card.reviews})</span>
                        </div>
                        <div className="text-xs"><span className="opacity-90">{card.size}</span> &nbsp;·&nbsp; <span className="underline underline-offset-2">{card.cat}</span></div>
                      </div>
                      <CartIconBtn />
                    </div>
                  </Link>
                );
              })()}

              {/* Smaller cards */}
              {[
                {
                  handle: "duo",
                  img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/blackoak1.jpg?v=1748854179",
                  title: "Vivo",
                  price: "749 €",
                  rating: 3.5,
                  reviews: 8,
                  size: "90x200 cm.",
                  cat: "Mini-meubels",
                },
                {
                  handle: "full-house",
                  img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_FullHouse_Camera_Side_Wandig_6_Cotton_Taupe_f43a3337-8a33-4212-9868-e524d0eff1f5.jpg?v=1750342787",
                  title: "Mollis",
                  price: "1.499 €",
                  rating: 4.5,
                  reviews: 56,
                  size: "180x200",
                  cat: "Bedframes",
                },
                {
                  handle: "solo",
                  img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_Solo_Camera_Side_Wandig_4_Truffle_Brown_Oak.jpg?v=1744100488",
                  title: "Moma",
                  price: "1.499 €",
                  rating: 4.5,
                  reviews: 14,
                  size: "140x200",
                  cat: "Slaapbanken",
                },
              ].map((card) => (
                <Link
                  key={card.title}
                  to="/product/$handle"
                  params={{ handle: card.handle }}
                  className="shrink-0 snap-start basis-[80%] sm:basis-[42%] md:basis-[26%] rounded-2xl overflow-hidden bg-white flex flex-col group"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#f5b88d]">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-serif text-2xl md:text-3xl text-[#0a2540]">{card.title}</h3>
                    <div className="font-serif text-xl md:text-2xl text-[#0a2540] mt-1">{card.price}</div>
                    <div className="mt-auto pt-6 flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#0a2540]/70 mb-1.5">
                          <RatingStars value={card.rating} small dark />
                          <span>({card.reviews})</span>
                        </div>
                        <div className="text-[11px] text-[#0a2540]/80">
                          {card.size} &nbsp;·&nbsp; <span className="underline underline-offset-2 text-[#d97706]">{card.cat}</span>
                        </div>
                      </div>
                      <CartIconBtn />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
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
              src={kleurstalenImg.url}
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
