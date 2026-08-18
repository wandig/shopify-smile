import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Menu, Search, Globe, ArrowRight, Star, Puzzle } from "lucide-react";
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
  lowestPaidPrice,
  type ShopifyProduct,
} from "@/lib/shopify";
import wandigLogo from "@/assets/wandig-logo-header.png.asset.json";

const MODELS_ORDER = ["solo", "duo", "full-house"];

function StarRating() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#ef7027]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-current" />
      ))}
    </span>
  );
}

function ModelsMenu({
  linkClassName,
  panelTopClass,
  onOpenChange,
}: {
  linkClassName: string;
  panelTopClass: string;
  onOpenChange?: (open: boolean) => void;
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
  const [open, setOpen] = useState(false);
  const updateOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => updateOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <div
      className="relative hidden self-stretch md:flex md:items-center"
      onBlur={() => updateOpen(false)}
      onFocus={() => updateOpen(true)}
      onMouseEnter={() => updateOpen(true)}
      onMouseLeave={() => updateOpen(false)}
    >
      <Link to="/producten" className={linkClassName} aria-expanded={open}>
        Alle modellen
      </Link>

      <div
        className={`fixed inset-x-0 ${panelTopClass} z-50 transition-[opacity,visibility] duration-200 ease-out ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="overflow-hidden rounded-b-[28px] border-x border-b border-[#faf8f5] bg-[#faf8f5] text-[#15110d] shadow-[0_30px_80px_rgba(31,25,21,0.14)]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-start gap-12 px-6 py-12 lg:gap-20 lg:px-10">
            <div className="col-span-3 flex flex-col pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#15110d]/40">Collectie</span>
              <h3 className="mt-6 text-[34px] font-medium leading-[1.1] tracking-tight">Kies je Wandig serie</h3>
              <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-[#15110d]/70">
                Solo, Duo en Full House — plug &amp; play tv-wanden, samen te stellen in jouw kleur.
              </p>
              <Link
                to="/configurator"
                className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[#0f1f2a] px-5 py-3 text-sm font-medium text-white transition-colors duration-300 ease-out hover:bg-[#1a2d3a]"
              >
                <Puzzle className="h-4 w-4" strokeWidth={1.75} />
                <span>Configureer jouw kast</span>
              </Link>
              <Link
                to="/producten"
                className="group/all mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#15110d] transition-colors hover:text-[#ef7027]"
              >
                Bekijk alle modellen
                <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-1" />
              </Link>

            </div>

            <div className="col-span-9 grid grid-cols-3 gap-6 lg:gap-10">
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
                        <div className="aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f2efeb]">
                          {image && (
                            <img
                              src={image.url}
                              alt={image.altText || node.title}
                              className="h-full w-full object-cover transition duration-700 ease-out group-hover/card:scale-[1.04]"
                            />
                          )}
                        </div>
                        <div className="mt-5 flex items-baseline justify-between gap-3 px-1 text-[#15110d]">
                          <p className="whitespace-nowrap text-[17px] font-medium tracking-tight">{node.title}</p>
                          {hasPrice ? (
                            <span className="shrink-0 text-[15px] text-[#15110d]/60">
                              {formatPrice(price.amount, price.currencyCode)}
                            </span>
                          ) : (
                            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-[#ef7027]">
                              Samenstellen
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })
                : Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                      <div className="aspect-[4/5] animate-pulse rounded-[18px] bg-[#f2efeb]" />
                      <div className="mt-5 h-4 w-24 animate-pulse rounded bg-[#f2efeb]" />
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
  const [modelsMenuOpen, setModelsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5] text-[#15110d]">
      {/* Top trust bar */}
      <div className="border-b border-[#ede7e0]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-9 md:h-10 flex items-center justify-between text-[11px] md:text-xs tracking-wide">
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <span>100 dagen proefkijken</span>
            <span>Gratis levering &amp; retourneren</span>
            <span>10 jaar garantie</span>
          </div>
          <div className="flex items-center gap-1.5 md:mx-auto md:absolute md:left-1/2 md:-translate-x-1/2">
            <StarRating />
            <span className="font-medium">1000+ beoordelingen</span>
          </div>
          <div className="hidden md:flex items-center gap-1 opacity-80">
            <span>NL | Dutch</span>
            <Globe className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-white">
        <div className="mx-auto max-w-[1600px] px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Left: mobile hamburger + desktop nav */}
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-[#d6cfc7]/60 hover:bg-[#d6cfc7] text-[#15110d] transition"
                  aria-label="Menu openen"
                >
                  <Menu className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] pt-14">
                <nav className="flex flex-col gap-6 text-lg">
                  <Link to="/producten" className="hover:opacity-60 transition">
                    Collectie
                  </Link>
                  <Link to="/bezoek" className="hover:opacity-60 transition">
                    Bezoek ons
                  </Link>
                  <Link to="/klantenservice" className="hover:opacity-60 transition">
                    Klantenservice
                  </Link>
                  <Link to="/kleurstalen" className="hover:opacity-60 transition">
                    Gratis kleurstalen ontvangen
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <nav className="hidden h-full md:flex items-center gap-8 text-sm tracking-wide">
              <ModelsMenu panelTopClass="top-[105px]" linkClassName="hover:opacity-60 transition" onOpenChange={setModelsMenuOpen} />
              <Link to="/bezoek" className="hover:opacity-60 transition">Bezoek ons</Link>
              <Link to="/klantenservice" className="hover:opacity-60 transition">Klantenservice</Link>
            </nav>
          </div>

          {/* Center: logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center" aria-label="Wandig">
            <img src={wandigLogo.url} alt="Wandig" className="h-7 md:h-9 w-auto" />
          </Link>

          {/* Right: configurator + search + cart */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link
              to="/configurator"
              className="hidden sm:inline-flex items-center gap-2 h-10 md:h-11 px-4 md:px-5 rounded-full bg-[#0f1f2a] hover:bg-[#1a2d3a] text-white text-sm font-medium transition-colors duration-300 ease-out"
            >
              <Puzzle className="h-4 w-4" strokeWidth={1.75} />
              <span>Configureer jouw tv-kast</span>
            </Link>

            <button
              className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-[#d6cfc7]/60 hover:bg-[#d6cfc7] text-[#15110d] transition"
              aria-label="Zoeken"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <div className="[&_button]:rounded-full [&_button]:h-10 [&_button]:w-10 md:[&_button]:h-11 md:[&_button]:w-11 [&_button]:bg-[#d6cfc7]/60 [&_button]:hover:bg-[#d6cfc7] [&_button]:text-[#15110d] [&_button]:transition">
              <CartDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
