import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
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
        <div className="overflow-hidden rounded-b-[28px] border-x border-b border-white bg-white text-[#15110d] shadow-[0_30px_80px_rgba(31,25,21,0.14)]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-[0.85fr_2.4fr] items-center gap-12 px-6 py-9 lg:px-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#15110d]">Collectie</span>
              <h3 className="mt-3 font-serif text-3xl leading-[1.05]">Kies je Wandig serie</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#15110d]/65">
                Solo, Duo en Full House — plug &amp; play tv-wanden, samen te stellen in jouw kleur.
              </p>
              <Link
                to="/producten"
                className="group/all mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#15110d] transition hover:text-[#15110d]"
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
                        <div className="mt-3 flex items-baseline justify-between gap-2 text-[#15110d]">
                          <p className="font-serif text-xl leading-none">{node.title}</p>
                          <span className="shrink-0 text-sm text-[#15110d]/58">
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
  const [modelsMenuOpen, setModelsMenuOpen] = useState(false);

  if (isHome) {
    return (
      <header className={`absolute top-0 left-0 right-0 z-40 transition-colors duration-300 ease-out ${modelsMenuOpen ? "text-[#15110d]" : "text-white"}`}>
        {/* Top trust bar */}
        <div
          className={`border-b transition-[background-color,border-color] duration-300 ease-out ${
            modelsMenuOpen
              ? "border-black/10 bg-white"
              : "border-white/20 bg-black/10 backdrop-blur-sm"
          }`}
        >
          <div className="px-5 md:px-10 h-10 flex items-center justify-between text-[12px] tracking-wide relative transition-colors duration-300 ease-out">
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
        <div
          className={`border-b transition-[background-color,border-color] duration-300 ease-out ${
            modelsMenuOpen
              ? "border-white bg-white"
              : "border-white/20"
          }`}
        >
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

            <nav className="hidden h-full md:flex items-center gap-8 text-sm font-medium tracking-wide">
              <ModelsMenu
                panelTopClass="top-[122px]"
                linkClassName={`relative py-2 transition-colors duration-300 ease-out after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:transition-all hover:after:w-full ${modelsMenuOpen ? "hover:text-[#15110d] after:bg-[#15110d]" : "hover:text-white/75 after:bg-white"}`}
                onOpenChange={setModelsMenuOpen}
              />
              <Link to="/bezoek" className={`relative py-2 transition-colors duration-300 ease-out after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:transition-all hover:after:w-full ${modelsMenuOpen ? "hover:text-[#15110d] after:bg-[#15110d]" : "hover:text-white/75 after:bg-white"}`}>
                Bezoek ons
              </Link>
              <Link to="/klantenservice" className={`relative py-2 transition-colors duration-300 ease-out after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:transition-all hover:after:w-full ${modelsMenuOpen ? "hover:text-[#15110d] after:bg-[#15110d]" : "hover:text-white/75 after:bg-white"}`}>
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
                className="hidden md:inline-flex items-center h-10 px-5 rounded-full bg-[#ef7027] hover:bg-[#d55f1e] text-white text-sm font-semibold transition-colors duration-300 ease-out"
              >
                Bekijk collectie
              </Link>
              <button
                className={`hidden sm:flex items-center justify-center h-11 w-11 rounded-full transition-colors duration-300 ease-out ${modelsMenuOpen ? "bg-white text-[#15110d] hover:bg-white" : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"}`}
                aria-label="Zoeken"
              >
                <Search className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <div className={`[&_button]:rounded-full [&_button]:h-11 [&_button]:w-11 [&_button]:transition-colors [&_button]:duration-300 ${modelsMenuOpen ? "[&_button]:bg-white [&_button]:text-[#15110d] [&_button]:hover:bg-white" : "[&_button]:bg-white/15 [&_button]:text-white [&_button]:hover:bg-white/25 [&_button]:backdrop-blur-sm"}`}>
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,color] duration-300 ease-out ${
        modelsMenuOpen
          ? "border-white bg-white text-[#15110d]"
          : "border-border/60 bg-background/85 backdrop-blur"
      }`}
    >
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
          <nav className="hidden h-full md:flex items-center gap-8 text-sm tracking-wide">
            <ModelsMenu panelTopClass="top-[81px]" linkClassName="hover:opacity-60 transition" onOpenChange={setModelsMenuOpen} />
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
