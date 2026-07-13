import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, Hammer, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import fullhouseOrange from "@/assets/fullhouse-orange.jpeg.asset.json";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-reel.mp4.asset.json";
import werkplaatsImg from "@/assets/werkplaats.png.asset.json";
import werkplaatsVideo from "@/assets/wandig-werkplaats.mov.asset.json";
import kleurstalenImg from "@/assets/kleurstalen.png.asset.json";
import tvOrangeImg from "@/assets/tv-orange.png.asset.json";
import duoOrangeStudioImg from "@/assets/duo-orange-studio.jpg";
import detailDesignImg from "@/assets/detail-design.jpg";
import detailMaatwerkImg from "@/assets/detail-maatwerk.jpg";
import plugPlayOrangeStudioImg from "@/assets/plug-play-orange-studio.jpg";

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
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
    </span>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wandig — Plug & play TV cinewalls uit eigen werkplaats" },
      {
        name: "description",
        content:
          "Tijdloze plug & play TV cinewalls. Kies je formaat, indeling en kleur. Gratis levering en 5 jaar garantie.",
      },
      { property: "og:title", content: "Wandig — Plug & play TV cinewalls" },
      {
        property: "og:description",
        content: "Tijdloze plug & play TV cinewalls. Kies je formaat, indeling en kleur.",
      },
    ],
  }),
  component: Home,
});

const REVIEWS = [
  {
    title: "Eindelijk rust rondom de tv",
    quote:
      "We wilden geen losse kastjes meer en ook geen kabels in beeld. De Wandig past precies in onze woonkamer en voelt alsof hij er altijd al hoorde. Het geheel is strak, rustig en veel warmer dan onze oude tv-hoek.",
    name: "Lotte M.",
    meta: "Full House in juni 2026",
  },
  {
    title: "Makkelijker geplaatst dan verwacht",
    quote:
      "Ik was bang dat zo'n cinewall veel gedoe zou zijn, maar alles kwam netjes voorbereid binnen. Met twee personen stond hij sneller dan gedacht. Vooral de plug & play aansluiting en weggewerkte kabels maken echt verschil.",
    name: "Jeroen V.",
    meta: "Duo in mei 2026",
  },
  {
    title: "De kleur klopt perfect",
    quote:
      "De kleurstalen thuis bekijken was precies wat we nodig hadden. Uiteindelijk gekozen voor een afwerking die mooi bij onze vloer past. Het meubel oogt maatwerk, maar bestellen bleef heel overzichtelijk.",
    name: "Sanne D.",
    meta: "Solo in mei 2026",
  },
  {
    title: "Veel opbergruimte zonder drukte",
    quote:
      "We hebben nu plek voor boeken, speakers en decoratie zonder dat het rommelig wordt. De tv valt veel rustiger weg in de wand en de afwerking is echt netjes. Bezoekers vragen steeds waar we hem hebben laten maken.",
    name: "Milan R.",
    meta: "Full House in april 2026",
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
    tags: ["Compact", "Zwevend of staand", "Plug & play"],
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
    description: "Een volledige wand-look — van vloer tot plafond, helemaal jouw stijl.",
    korting: "€250,-",
    tags: ["Aanbevolen", "Wand-vullend", "Maximaal gemak"],
    highlight: true,
  },
];

function Home() {
  const upgradeWords = ["woonkamer", "tv-wand", "rust", "stijl"];
  const USPS = [
    { icon: Truck, label: "Gratis levering aan huis" },
    { icon: Hammer, label: "Gemaakt in eigen werkplaats" },
    { icon: BadgeCheck, label: "Hoge kwaliteit, eerlijke prijs" },
    { icon: ShieldCheck, label: "5 jaar garantie" },
  ];
  const [upgradeWordIdx, setUpgradeWordIdx] = useState(0);
  const [upgradeWordVisible, setUpgradeWordVisible] = useState(true);
  const [activeUpgradeMaxIdx, setActiveUpgradeMaxIdx] = useState(-1);
  const [uspIdx, setUspIdx] = useState(0);
  const [uspVisible, setUspVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setUpgradeWordVisible(false);
      setTimeout(() => {
        setUpgradeWordIdx((i) => (i + 1) % upgradeWords.length);
        setUpgradeWordVisible(true);
      }, 220);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const updateActiveUpgrade = () => {
      const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-upgrade-row]"));
      const activationLine = window.innerHeight * 0.78;
      let next = -1;

      rows.forEach((row, index) => {
        if (row.getBoundingClientRect().top < activationLine) {
          next = index;
        }
      });

      setActiveUpgradeMaxIdx(next);
    };

    updateActiveUpgrade();
    window.addEventListener("scroll", updateActiveUpgrade, { passive: true });
    window.addEventListener("resize", updateActiveUpgrade);
    return () => {
      window.removeEventListener("scroll", updateActiveUpgrade);
      window.removeEventListener("resize", updateActiveUpgrade);
    };
  }, []);
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
          <h1 className="font-serif font-thin text-background text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
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
          <div className="mt-6 flex items-center gap-2 text-white text-[12px] tracking-wide">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#f18972] text-[#f18972]" />
              ))}
            </div>
            <span className="opacity-95">23.000+ beoordelingen</span>
          </div>
        </div>
      </section>

      <section className="bg-[#fff7ee] pt-12 md:pt-16">
        <div className="pb-16 md:pb-20">
          {/* Bestsellers carousel panel — bleeds to right edge */}
          <div className="pl-5 md:pl-[calc(18%-80px)] pr-0">
            <div className="relative rounded-l-3xl bg-[#f3d3b1] py-3 pl-3 md:py-4 md:pl-24 pr-0">
              {/* Vertical label — pinned, always visible */}
              <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-24 items-start justify-center pointer-events-none pt-8">
                <span
                  className="font-serif tracking-[0.2em] text-[#0a2540] text-[28px] leading-none"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  BESTSELLERS
                </span>
              </div>
              <div className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">


                {/* Featured large card */}
                {(() => {
                  const card = {
                    handle: "full-house",
                    badge: "Incl. Standaard hoofdbord",
                    img: fullhouseOrange.url,
                    title: "Full House",
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
                      className="relative shrink-0 snap-start basis-[88%] sm:basis-[60%] md:basis-auto md:w-[520px] rounded-2xl overflow-hidden bg-[#f5b88d] aspect-square group"
                    >
                      <img
                        src={card.img}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 z-10 rounded-full bg-white/15 backdrop-blur-md text-white text-xs px-3 py-1.5">
                        {card.badge}
                      </span>
                      <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 text-white">
                        <h3 className="font-serif text-3xl md:text-4xl leading-tight">{card.title}</h3>
                        <div className="font-serif text-3xl md:text-4xl mt-2">{card.price}</div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between text-white">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs opacity-95 mb-2">
                            <RatingStars value={card.rating} small />
                            <span>({card.reviews})</span>
                          </div>
                          <div className="text-xs">
                            <span className="opacity-90">{card.size}</span> &nbsp;·&nbsp;{" "}
                            <span className="underline underline-offset-2">{card.cat}</span>
                          </div>
                        </div>
                        <span className="shrink-0 inline-flex items-center justify-end gap-2 h-10 rounded-full bg-[#f18972] text-white overflow-hidden transition-all duration-300 ease-out w-10 group-hover:w-32 pr-3">
                          <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-4">
                            Aanpassen
                          </span>
                          <svg
                            className="w-4 h-4 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  );
                })()}

                {/* Smaller cards */}
                {[
                  {
                    handle: "duo",
                    img: tvOrangeImg.url,
                    title: "Duo",
                    price: "749 €",
                    rating: 3.5,
                    reviews: 8,
                    size: "90x200 cm.",
                    cat: "Mini-meubels",
                  },
                  {
                    handle: "full-house",
                    img: duoOrangeStudioImg,
                    title: "Full House",
                    price: "1.499 €",
                    rating: 4.5,
                    reviews: 56,
                    size: "180x200",
                    cat: "TV-wanden",
                  },
                  {
                    handle: "solo",
                    img: "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_Solo_Camera_Side_Wandig_4_Truffle_Brown_Oak.jpg?v=1744100488",
                    title: "Moma",
                    price: "1.499 €",
                    rating: 4.5,
                    reviews: 14,
                    size: "140x200",
                    cat: "Banken",
                  },
                ].map((card) => (
                  <Link
                    key={card.title}
                    to="/product/$handle"
                    params={{ handle: card.handle }}
                    className="shrink-0 snap-start basis-[85%] sm:basis-[48%] md:basis-[390px] md:w-[390px] rounded-2xl overflow-hidden bg-white flex flex-col group md:aspect-auto md:h-[520px]"
                  >
                    <div className="mt-4 mx-4 mb-2 rounded-xl overflow-hidden bg-[#f5b88d] aspect-[4/3] md:aspect-auto md:h-[55%] shrink-0">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>

                    <div className="px-5 pb-4 pt-2 flex flex-col flex-1">
                      <h3 className="font-serif text-2xl md:text-3xl text-[#0a2540]">{card.title}</h3>
                      <div className="font-serif text-xl md:text-2xl text-[#0a2540] mt-1">{card.price}</div>
                      <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-[11px] text-[#0a2540]/70 mb-1.5">
                            <RatingStars value={card.rating} small dark />
                            <span>({card.reviews})</span>
                          </div>
                          <div className="text-[11px] text-[#0a2540]/80 whitespace-nowrap">
                            {card.size} &nbsp;·&nbsp;{" "}
                            <span className="underline underline-offset-2 text-[#d97706]">{card.cat}</span>
                          </div>
                        </div>
                        <span className="shrink-0 inline-flex items-center justify-end gap-2 h-10 rounded-full bg-[#f18972] text-white overflow-hidden transition-all duration-300 ease-out w-10 group-hover:w-32 pr-3">
                          <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-4">
                            Aanpassen
                          </span>
                          <svg
                            className="w-4 h-4 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* USPs */}
          <div className="px-5 md:px-[calc(18%-80px)] pt-16 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
              {[
                {
                  kicker: "GETEST EN BEWEZEN",
                  title: "+150.000 verkochte cinewalls",
                  body: "Hoge eisen aan kwaliteit, design en functionaliteit gelden voor elk product",
                },
                {
                  kicker: "JOUW INTERIEUR IS BELANGRIJK VOOR ONS",
                  title: "97% klanttevredenheid",
                  body: "Geniet gerust — we hebben een score van 4,6 en meer dan 15.000 vijfsterrenbeoordelingen",
                },
                {
                  kicker: "KIES MET VOLLEDIGE GEMOEDSRUST",
                  title: "100 dagen bedenktijd",
                  body: "Wat je ook koopt — je krijgt 100 dagen om het thuis uit te proberen",
                },
              ].map((u) => (
                <div key={u.kicker} className="flex flex-col items-center max-w-sm mx-auto">
                  <div className="text-[9px] tracking-[0.18em] text-[#d97706] uppercase mb-3">
                    {u.kicker}
                  </div>
                  <div className="mb-3 md:min-h-[1.2em] flex items-center justify-center">
                    <h3 className="font-serif text-xl md:text-2xl text-[#0a2540] leading-tight">
                      {u.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#0a2540]/70 leading-relaxed text-center">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details maken het verschil */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-16 pb-24 md:pb-32">
        <h2 className="mb-9 md:mb-12 max-w-4xl text-[2.45rem] md:text-[3.05rem] leading-[0.98] tracking-[-0.055em] text-black">
          Details maken het verschil
        </h2>
        <div className="-mx-5 overflow-hidden pl-5 md:mx-0 md:overflow-visible md:pl-0">
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth pr-5 pb-3 md:pr-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { img: detailDesignImg, title: "Gepersonaliseerd design" },
            { img: detailMaatwerkImg, title: "Slim samen te stellen" },
            { img: plugPlayOrangeStudioImg, title: "Plug & play geleverd" },
          ].map((item) => (
            <div key={item.title} className="group flex shrink-0 basis-[69%] flex-col snap-start md:basis-auto">
              <div className="aspect-[1.45/1] w-full overflow-hidden rounded-[12px] bg-muted md:rounded-[14px]">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <h3 className="mt-5 flex items-center justify-between gap-5 text-[1.05rem] md:text-[1.12rem] font-medium leading-none tracking-[-0.035em] text-black">
                <span>{item.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
              </h3>
            </div>
          ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 md:hidden" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-black" />
          <span className="h-2 w-2 rounded-full bg-black/18" />
          <span className="h-2 w-2 rounded-full bg-black/18" />
        </div>
      </section>

      {/* Werkplaats video */}
      <section className="px-5 md:px-[calc(18%-80px)] pb-24 md:pb-32">
        <div className="overflow-hidden rounded-2xl bg-muted">
          <video
            src={werkplaatsVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Wandig upgrade */}
      <section className="bg-[#fef7ee] px-5 pt-8 pb-20 md:px-10 md:pt-14 md:pb-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 md:grid-cols-[0.86fr_1fr] md:items-start">
            <h2 className="mx-auto max-w-lg text-center text-[2.15rem] leading-[0.96] tracking-[-0.06em] text-black md:mx-0 md:text-left md:text-[4rem]">
              <span className="block">Wandig tilt jouw</span>
              <span
                className={`block min-h-[0.96em] bg-gradient-to-r from-[#ef6f7a] via-[#f56e16] to-[#f08971] bg-clip-text text-transparent transition-all duration-300 ease-out ${upgradeWordVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm"}`}
              >
                {upgradeWords[upgradeWordIdx]}
              </span>
            </h2>

            <div className="space-y-7 md:space-y-10">
              {[
                {
                  title: "Rustig beeld",
                  body: "Een strakke wand rondom je tv, zonder losse kabels of rommelige meubels die de aandacht wegtrekken.",
                  image: detailDesignImg,
                  alt: "Strakke Wandig afwerking",
                },
                {
                  title: "Kleur die klopt",
                  body: "Kies een afwerking die mooi aansluit op je vloer, bank en interieur. Subtiel aanwezig, precies genoeg karakter.",
                  image: detailMaatwerkImg,
                  alt: "Wandig kleuren en materialen",
                },
                {
                  title: "Plug & play gemak",
                  body: "Slim ontworpen om eenvoudig zelf te plaatsen en aan te sluiten, met een resultaat dat voelt alsof het altijd zo hoorde.",
                  image: plugPlayOrangeStudioImg,
                  alt: "Wandig plug and play levering",
                },
              ].map((item, index) => {
                const active = index <= activeUpgradeMaxIdx;
                return (
                <div
                  key={item.title}
                  data-upgrade-row
                  className="grid grid-cols-[5px_1fr] gap-x-3 md:grid-cols-[6px_1fr] md:gap-x-5"
                >
                  <div className={`row-span-2 rounded-full transition-colors duration-500 ${active ? "bg-[#f18972]" : "bg-black/12"}`} />
                  <div className="grid grid-cols-[1fr_92px] items-center gap-4 md:grid-cols-[1fr_132px] md:gap-6">
                    <h3 className={`text-[1.18rem] font-medium leading-[1.12] tracking-[-0.05em] transition-colors duration-500 md:text-[1.5rem] ${active ? "text-black" : "text-black/38"}`}>
                      {item.title}
                    </h3>
                    <div className="h-[51px] w-[92px] overflow-hidden rounded-[9px] bg-[#f4f1ed] md:h-[62px] md:w-[132px] md:rounded-[12px]">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className={`h-full w-full object-cover transition duration-500 ${active ? "scale-100 opacity-100 grayscale-0" : "scale-[1.02] opacity-70 grayscale"}`}
                      />
                    </div>
                  </div>
                  <p className={`col-start-2 max-w-[18.5rem] overflow-hidden text-[0.92rem] leading-[1.58] tracking-[-0.025em] text-black/58 transition-all duration-500 ease-out md:max-w-[31rem] md:text-[1rem] ${active ? "mt-3 max-h-32 opacity-100 md:mt-4" : "mt-0 max-h-0 opacity-0"}`}>
                    {item.body}
                  </p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop editorial mosaic */}
      <section className="hidden bg-[#fef7ee] px-5 py-7 md:block md:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6">
          <article className="group relative row-span-2 h-[604px] overflow-hidden rounded-[16px] bg-[#f4f1ed] shadow-[0_18px_45px_rgba(31,25,21,0.10)]">
            <img
              src={fullhouseOrange.url}
              alt="Wandig Full House in warme studio"
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/36 to-transparent" />
            <h2 className="absolute bottom-12 left-12 max-w-[520px] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[33px] font-[414] leading-[1.02] tracking-[-0.052em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.26)]">
              Een wand die meteen klopt
            </h2>
          </article>

          <div className="grid h-[604px] grid-cols-2 grid-rows-[1fr_1fr] gap-6">
            {[
              {
                title: "Kleur die rust brengt",
                img: tvOrangeImg.url,
                alt: "Wandig kleurvisualisatie op telefoon",
                className: "object-[48%_58%]",
              },
              {
                title: "Studio afwerking",
                img: duoOrangeStudioImg,
                alt: "Wandig Duo in oranje studio",
                className: "object-center",
              },
            ].map((item) => (
              <article key={item.title} className="group relative overflow-hidden rounded-[16px] bg-[#f4f1ed] shadow-[0_18px_45px_rgba(31,25,21,0.08)]">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035] ${item.className}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/34 to-transparent" />
                <h3 className="absolute bottom-7 left-7 max-w-[260px] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[23px] font-[414] leading-[1.05] tracking-[-0.0475em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.28)]">
                  {item.title}
                </h3>
              </article>
            ))}

            <article className="group relative col-span-2 overflow-hidden rounded-[16px] bg-[#f4f1ed] shadow-[0_18px_45px_rgba(31,25,21,0.08)]">
              <img
                src={plugPlayOrangeStudioImg}
                alt="Wandig plug and play systeem in oranje studio"
                loading="lazy"
                className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/36 to-transparent" />
              <h3 className="absolute bottom-12 left-12 max-w-[520px] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[33px] font-[414] leading-[1.02] tracking-[-0.052em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.26)]">
                Plug &amp; play geleverd
              </h3>
            </article>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="overflow-hidden bg-[#fbf5ec] py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 className="mx-auto max-w-5xl text-center font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[1.45rem] font-[700] leading-[1.18] tracking-[-0.035em] text-[#16202a] md:text-[1.7rem]">
            We stoppen pas als jouw tv-wand voelt alsof hij altijd al zo hoorde.
          </h2>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto px-5 pb-2 md:mt-14 md:px-[8vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex min-h-[408px] w-[82vw] max-w-[442px] shrink-0 snap-start flex-col rounded-[16px] bg-[#f3eee8] px-8 py-8 md:min-h-[408px] md:w-[442px] md:px-9 md:py-9"
            >
              <div className="mb-7 flex gap-1.5" aria-label="5 sterren">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-[18px] w-[18px] fill-[#f56e16] text-[#f56e16]" strokeWidth={1.8} />
                ))}
              </div>
              <figcaption className="mb-7 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[16px] font-[700] leading-snug tracking-[-0.02em] text-[#16202a]">
                {r.title}
              </figcaption>
              <blockquote className="flex-1 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[15px] leading-[1.48] tracking-[-0.01em] text-[#37414c]">
                {r.quote}
              </blockquote>
              <div className="mt-8 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[12px] leading-[1.35] text-[#6f7a84]">
                <div>{r.name}</div>
                <div>{r.meta}</div>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Gratis kleurstalen — text left, image right (full-bleed) */}
      <section className="w-full">
        <div className="grid md:grid-cols-2 md:h-[500px]">
          <div className="flex items-center bg-[#f18972] text-white px-8 md:px-16 py-16 md:py-0 order-2 md:order-1">
            <div className="max-w-md text-center md:text-left mx-auto md:mx-0 [text-shadow:0_2px_14px_rgba(80,35,24,0.22)]">
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
            Een plug & play cinewall bestellen was nog nooit zo makkelijk. Maar soms is het fijn om toch even contact te
            hebben. Bel of bezoek ons voor goed advies of hulp bij bestellen.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <a
              href="tel:0123456789"
              className="rounded-full bg-[#f18972] text-white hover:bg-[#e87a62] transition-colors h-11 px-6 text-sm flex items-center"
            >
              Bel 012 345 6789
            </a>
            <a
              href="mailto:info@wandig.nl"
              className="rounded-full bg-[#f18972] text-white hover:bg-[#e87a62] transition-colors h-11 px-6 text-sm flex items-center"
            >
              info@wandig.nl
            </a>
            <Link
              to="/bezoek"
              className="rounded-full bg-[#f18972] text-white hover:bg-[#e87a62] transition-colors h-11 px-6 text-sm flex items-center"
            >
              Bezoek ons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
