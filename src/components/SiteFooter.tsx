import { Link } from "@tanstack/react-router";
import footerLogoAsset from "@/assets/Untitled_design_24.svg.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-[#0f1f2a] text-white">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <img src={footerLogoAsset.url} alt="Wandig" className="mb-4 h-auto w-[152px]" loading="lazy" />
          <p className="text-sm text-white/70 leading-relaxed">
            Plug & play TV cinewalls uit eigen werkplaats. Tijdloos design, gemaakt om generaties mee te gaan.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white mb-4">Collectie</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/product/$handle" params={{ handle: "solo" }} className="hover:text-white">Solo</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "duo" }} className="hover:text-white">Duo</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "trio" }} className="hover:text-white">Trio</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "prestige" }} className="hover:text-white">Prestige</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "full-house" }} className="hover:text-white">Full House</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white mb-4">Service</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/klantenservice" className="hover:text-white">Klantenservice</Link></li>
            <li><Link to="/bezoek" className="hover:text-white">Bezoek ons</Link></li>
            <li><Link to="/retour" className="hover:text-white">Retour</Link></li>
            <li><Link to="/algemene-voorwaarden" className="hover:text-white">Algemene voorwaarden</Link></li>
            <li><span className="text-white/70">Gratis levering</span></li>
            <li><span className="text-white/70">10 jaar garantie</span></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>info@wandig.nl</li>
            <li>De Tongelreep 1 - 7<br />5684 PZ Best</li>
            <li>ma — vr · 09:00 – 17:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-6 text-xs text-white/60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Wandig. Alle rechten voorbehouden.</span>
          <span>Gemaakt in Nederland</span>
        </div>
      </div>
    </footer>
  );
}
