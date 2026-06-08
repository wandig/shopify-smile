import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="font-serif text-2xl tracking-[0.2em] uppercase mb-4">wandig</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Maatwerk TV cinewalls uit eigen werkplaats. Tijdloos design, gemaakt om generaties mee te gaan.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Collectie</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/product/$handle" params={{ handle: "solo" }} className="hover:opacity-60">Solo</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "duo" }} className="hover:opacity-60">Duo</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "trio" }} className="hover:opacity-60">Trio</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "prestige" }} className="hover:opacity-60">Prestige</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "full-house" }} className="hover:opacity-60">Full House</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Service</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/klantenservice" className="hover:opacity-60">Klantenservice</Link></li>
            <li><Link to="/bezoek" className="hover:opacity-60">Bezoek ons</Link></li>
            <li><span className="text-muted-foreground">Gratis levering</span></li>
            <li><span className="text-muted-foreground">5 jaar garantie</span></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>info@wandig.nl</li>
            <li>ma — vr · 09:00 – 17:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Wandig. Alle rechten voorbehouden.</span>
          <span>Maatwerk uit Nederland</span>
        </div>
      </div>
    </footer>
  );
}
