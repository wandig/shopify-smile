import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Star, Globe } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="absolute top-0 left-0 right-0 z-40 text-white">
        {/* Top trust bar */}
        <div className="border-b border-white/20 bg-black/10 backdrop-blur-sm">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-10 flex items-center justify-between text-[12px] tracking-wide relative">
            <div className="hidden md:flex items-center gap-8 opacity-95">
              <span>Proefperiode van 100 nachten</span>
              <span>Gratis levering &amp; retourneren</span>
              <span>Tot 25 jaar garantie</span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#f18972] text-[#f18972]" />
                ))}
              </div>
              <span className="opacity-95">23.000+ beoordelingen</span>
            </div>
            <div className="hidden md:flex items-center gap-1 opacity-95">
              <span>NL | Dutch</span>
              <Globe className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="border-b border-white/20">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-20 flex items-center justify-between relative">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="flex items-center justify-center h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 transition backdrop-blur-sm"
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

            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase text-white"
            >
              wandig
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/producten"
                className="hidden sm:inline-flex items-center h-9 px-5 rounded-full bg-[#f18972] hover:bg-[#e87a62] text-white text-sm font-medium transition"
              >
                Favorieten
              </Link>
              <button
                className="flex items-center justify-center h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 transition backdrop-blur-sm"
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
            <Link to="/producten" className="hover:opacity-60 transition">Alle modellen</Link>
            <Link to="/bezoek" className="hover:opacity-60 transition">Bezoek ons</Link>
            <Link to="/klantenservice" className="hover:opacity-60 transition">Klantenservice</Link>
          </nav>
        </div>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase">
          wandig
        </Link>
        <div className="flex items-center gap-4">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
