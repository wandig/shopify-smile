import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          <Link to="/producten" className="hover:opacity-60 transition">Alle modellen</Link>
          <Link to="/bezoek" className="hover:opacity-60 transition">Bezoek ons</Link>
          <Link to="/klantenservice" className="hover:opacity-60 transition">Klantenservice</Link>
        </nav>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase">
          wandig
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
