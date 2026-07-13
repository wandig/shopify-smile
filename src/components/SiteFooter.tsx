import { Link } from "@tanstack/react-router";
import wandigFooterLogo from "@/assets/wandig-logo-footer.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <img src={wandigFooterLogo} alt="Wandig" className="mb-4 h-auto w-[152px]" loading="lazy" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plug & play TV cinewalls uit eigen werkplaats. Tijdloos design, gemaakt om generaties mee te gaan.
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
            <li><Link to="/retour" className="hover:opacity-60">Retour</Link></li>
            <li><Link to="/algemene-voorwaarden" className="hover:opacity-60">Algemene voorwaarden</Link></li>
            <li><span className="text-muted-foreground">Gratis levering</span></li>
            <li><span className="text-muted-foreground">5 jaar garantie</span></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>info@wandig.nl</li>
            <li>De Tongelreep 1 - 7<br />5684 PZ Best</li>
            <li>ma — vr · 09:00 – 17:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Wandig. Alle rechten voorbehouden.</span>
          <span>Gemaakt in Nederland</span>
        </div>
      </div>
    </footer>
  );
}
