import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Menu, Search, Globe, ArrowRight } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  storefrontApiRequest,
  PRODUCTS_QUERY,
  formatPrice,
  type ShopifyProduct,
} from "@/lib/shopify";
import wandigLogo from "@/assets/wandig-logo.png.asset.json";

const MODELS_ORDER = ["solo", "duo", "full-house"];

function ModelsMenu({
  linkClassName,
  panelTopClass,
}: {
  linkClassName: string;
  panelTopClass: string;
}) {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const models = useMemo(
    () =>
      (data ?? [])
        .filter((p) => MODELS_ORDER.includes(p.node.handle))
        .sort(
          (a, b) =>
            MODELS_ORDER.indexOf(a.node.handle) - MODELS_ORDER.indexOf(b.node.handle),
        ),
    [data],
  );

  return (
    <div className="group relative hidden md:block">
      <Link to="/producten" className={linkClassName}>
        Alle modellen
      </Link>

      {/* invisible bridge so the mouse can travel from link to panel without closing */}
      <div className="pointer-events-none absolute left-0 top-full h-8 w-full group-hover:pointer-events-auto" />

      <div
        className={`invisible fixed inset-x-0 ${panelTopClass} z-50 -translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <div className="overflow-hidden rounded-b-[28px] border-y border-black/[0.06] bg-white text-[#1f1915] shadow-[0_30px_80px_rgba(31,25,21,0.16)]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-[0.85fr_2.4fr] items-center gap-12 px-6 py-9 lg:px-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#f56e16]">Collectie</span>
              <h3 className="mt-3 font-serif text-3xl leading-[1.05]">Kies je Wandig serie</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#1f1915]/55">
                Solo, Duo en Full House — plug &amp; play tv-wanden, samen te stellen in jouw kleur.
              </p>
              <Link
                to="/producten"
                className="group/all mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:text-[#f56e16]"
              >
                Bekijk alle modellen
                <ArrowRight className="h-4 w-4 transition group-hover/all:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {models.length > 0
                ? models.map((p) => {
                    const node = p.node;
                    const image = node.images.edges[0]?.node;
                    const price = node.priceRange.minVariantPrice;
                    const hasPrice = parseFloat(price.amount) > 0;
                    return (
                      <Link
                        key={node.id}
                        to="/product/$handle"
                        params={{ handle: node.handle }}
                        className="group/card"
                      >
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#f4f1ed]">
                          {image && (
                            <img
                              src={image.url}
                              alt={image.altText || node.title}
                              className="h-full w-full object-cover transition duration-500 ease-out group-hover/card:scale-105"
                            />
                          )}
                        </div>
                        <div className="mt-3 flex items-baseline justify-between gap-2">
                          <p className="font-serif text-xl leading-none">{node.title}</p>
                          <span className="shrink-0 text-sm text-[#1f1915]/55">
                            {hasPrice ? formatPrice(price.amount, price.currencyCode) : "Samenstellen"}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                : Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                      <div className="aspect-[4/3] animate-pulse rounded-xl bg-[#f4f1ed]" />
                      <div className="mt-3 h-4 w-24 animate-pulse rounded bg-[#f4f1ed]" />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="absolute top-0 left-0 right-0 z-40 text-white">
        {/* Top trust bar */}
        <div className="border-b border-white/20 bg-black/10 backdrop-blur-sm">
          <div className="px-5 md:px-10 h-10 flex items-center justify-between text-[12px] tracking-wide relative">
            <div className="hidden md:flex items-center gap-8 opacity-95">
              <span>Proefperiode van 100 dagen</span>
              <span>Gratis levering &amp; retourneren</span>
              <span>Tot 5 jaar garantie</span>
            </div>
            <div className="hidden md:flex items-center gap-1 opacity-95">
              <span>NL | Dutch</span>
              <Globe className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="border-b border-white/20">
          <div className="px-5 md:px-10 h-20 flex items-center justify-between relative">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="md:hidden flex items-center justify-center h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 transition backdrop-blur-sm"
                  aria-label="Menu openen"
                >
                  <Menu className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] pt-14">
                <nav className="flex flex-col gap-6 text-lg">
                  <Link to="/producten" className="hover:opacity-60 transition">Alle modellen</Link>
                  <Link to="/bezoek" className="hover:opacity-60 transition">Bezoek ons</Link>
                  <Link to="/klantenservice" className="hover:opacity-60 transition">Klantenservice</Link>
                </nav>
              </SheetContent>
            </Sheet>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
              <ModelsMenu
                panelTopClass="top-[120px]"
                linkClassName="relative py-2 transition hover:text-white/75 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full"
              />
              <Link to="/bezoek" className="relative py-2 transition hover:text-white/75 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Bezoek ons
              </Link>
              <Link to="/klantenservice" className="relative py-2 transition hover:text-white/75 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Klantenservice
              </Link>
            </nav>

            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
              aria-label="Wandig"
            >
              <img src={wandigLogo.url} alt="Wandig" className="h-8 md:h-10 w-auto" />
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/producten"
                className="hidden md:inline-flex items-center h-10 px-5 rounded-full bg-[#f18972] hover:bg-[#e87a62] text-white text-sm font-semibold transition"
              >
                Bekijk collectie
              </Link>
              <button
                className="hidden sm:flex items-center justify-center h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 transition backdrop-blur-sm"
                aria-label="Zoeken"
              >
                <Search className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <div className="[&_button]:bg-white/15 [&_button]:hover:bg-white/25 [&_button]:rounded-full [&_button]:h-11 [&_button]:w-11 [&_button]:backdrop-blur-sm">
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center h-10 w-10 -ml-2"
                aria-label="Menu openen"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] pt-14">
              <nav className="flex flex-col gap-6 text-lg">
                <Link to="/producten" className="hover:opacity-60 transition">
                  Collectie
                </Link>
                <Link to="/klantenservice" className="hover:opacity-60 transition">
                  Klantenservice
                </Link>
                <Link to="/klantenservice" className="hover:opacity-60 transition">
                  Gratis kleurstalen ontvangen
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <ModelsMenu panelTopClass="top-20" linkClassName="hover:opacity-60 transition" />
            <Link to="/bezoek" className="hover:opacity-60 transition">Bezoek ons</Link>
            <Link to="/klantenservice" className="hover:opacity-60 transition">Klantenservice</Link>
          </nav>
        </div>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center" aria-label="Wandig">
          <img src={wandigLogo.url} alt="Wandig" className="h-7 md:h-9 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
