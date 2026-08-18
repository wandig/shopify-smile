import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import footerLogoAsset from "@/assets/Untitled_design_24.svg.asset.json";


export function SiteFooter() {
  return (
    <footer className="bg-[#0f1f2a] text-white overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          {/* Logo + tagline */}
          <div>
            <img
              src={footerLogoAsset.url}
              alt="Wandig"
              className="h-auto w-[48px]"
              loading="lazy"
            />
            <p className="mt-6 max-w-[260px] text-sm leading-relaxed text-white/60">
              Plug & play TV cinewalls uit eigen werkplaats. Tijdloos design, gemaakt om generaties mee te gaan.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-white mb-4">
                Collectie
              </div>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li>
                  <Link to="/product/$handle" params={{ handle: "solo" }} className="hover:text-white transition-colors">
                    Solo
                  </Link>
                </li>
                <li>
                  <Link to="/product/$handle" params={{ handle: "duo" }} className="hover:text-white transition-colors">
                    Duo
                  </Link>
                </li>
                <li>
                  <Link to="/product/$handle" params={{ handle: "trio" }} className="hover:text-white transition-colors">
                    Trio
                  </Link>
                </li>
                <li>
                  <Link to="/product/$handle" params={{ handle: "prestige" }} className="hover:text-white transition-colors">
                    Prestige
                  </Link>
                </li>
                <li>
                  <Link to="/product/$handle" params={{ handle: "full-house" }} className="hover:text-white transition-colors">
                    Full House
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-white mb-4">
                Service
              </div>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li>
                  <Link to="/klantenservice" className="hover:text-white transition-colors">
                    Klantenservice
                  </Link>
                </li>
                <li>
                  <Link to="/bezoek" className="hover:text-white transition-colors">
                    Bezoek ons
                  </Link>
                </li>
                <li>
                  <Link to="/retour" className="hover:text-white transition-colors">
                    Retour
                  </Link>
                </li>
                <li>
                  <Link to="/algemene-voorwaarden" className="hover:text-white transition-colors">
                    Algemene voorwaarden
                  </Link>
                </li>
                <li><span className="text-white/70">Gratis levering</span></li>
                <li><span className="text-white/70">10 jaar garantie</span></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-white mb-4">
                Contact
              </div>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li>
                  <a href="mailto:support@wandig.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    support@wandig.com
                  </a>
                </li>
                <li>
                  <a href="tel:+31853030990" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    +31 85 303 0990
                  </a>
                </li>
                <li>
                  De Tongelreep 1 - 7
                  <br />
                  5684 PZ Best
                </li>
                <li>ma — vr · 09:00 – 17:00</li>
              </ul>

            </div>
          </div>
        </div>
      </div>

      {/* Large watermark */}
      <div className="relative -mb-[0.18em]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="text-[18vw] md:text-[16vw] font-medium leading-[0.78] tracking-[-0.04em] text-[#8a9aaa] select-none">
            wandig
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/70">
          <a href="mailto:support@wandig.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            support@wandig.com
          </a>
          <a href="tel:+31853030990" className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            +31 85 303 0990
          </a>
          <span className="text-white/50 ml-auto">© {new Date().getFullYear()} Wandig. Alle rechten voorbehouden.</span>
          <span className="text-white/50">Gemaakt in Nederland</span>
        </div>
      </div>

    </footer>
  );
}
