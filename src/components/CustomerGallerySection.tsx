import { Link } from "@tanstack/react-router";

import klantWoonkamer1Img from "@/assets/klant-woonkamer-1.png.asset.json";
import klantWoonkamer2Img from "@/assets/klant-woonkamer-2.png.asset.json";
import klantWoonkamer3Img from "@/assets/klant-woonkamer-3.png.asset.json";
import klantWoonkamer4Img from "@/assets/klant-woonkamer-4.png.asset.json";
import klantWoonkamer5_2Img from "@/assets/klant-woonkamer-5-2.png.asset.json";
import klantWoonkamer6Img from "@/assets/klant-woonkamer-6.png.asset.json";
import klantWoonkamer7Img from "@/assets/klant-woonkamer-7.png.asset.json";
import klantWoonkamer8Img from "@/assets/klant-woonkamer-8.png.asset.json";
import klantWoonkamer9Img from "@/assets/klant-woonkamer-9.png.asset.json";
import klantWoonkamer10Img from "@/assets/klant-woonkamer-10.png.asset.json";

const ASSET_HOST = "https://shopify-smile.lovable.app";

function resolveAssetUrl(url: string) {
  return url.startsWith("/__l5e/") ? `${ASSET_HOST}${url}` : url;
}

function PuzzleCornerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.5 0 2.7 1.2 2.7 2.7S5 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
    </svg>
  );
}

const CUSTOMER_GALLERY_COLUMNS = [
  {
    width: "w-[240px] md:w-[340px]",
    items: [{ src: resolveAssetUrl(klantWoonkamer1Img.url), alt: "Woonkamer met Full House cinewall" }],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      { src: resolveAssetUrl(klantWoonkamer2Img.url), alt: "Roze cinewall met tv in woonkamer" },
      { src: resolveAssetUrl(klantWoonkamer3Img.url), alt: "Kinderen spelen voor houten cinewall" },
    ],
  },
  {
    width: "w-[220px] md:w-[300px]",
    items: [{ src: resolveAssetUrl(klantWoonkamer6Img.url), alt: "Donkere houten cinewall met tv en vakken" }],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      { src: resolveAssetUrl(klantWoonkamer4Img.url), alt: "Roze cinewall in moderne woonkamer" },
      { src: resolveAssetUrl(klantWoonkamer7Img.url), alt: "Lichte cinewall in moderne woonkamer" },
    ],
  },
  {
    width: "w-[240px] md:w-[340px]",
    items: [
      {
        src: resolveAssetUrl(klantWoonkamer5_2Img.url),
        alt: "Houten cinewall met tv en decoratie in lichte woonkamer",
      },
    ],
  },
  {
    width: "w-[200px] md:w-[280px]",
    items: [
      {
        src: resolveAssetUrl(klantWoonkamer8Img.url),
        alt: "Donkere houten cinewall met tv en decoratie in moderne woonkamer",
      },
      { src: resolveAssetUrl(klantWoonkamer10Img.url), alt: "Roze cinewall met tv en vakken in lichte woonkamer" },
    ],
  },
  {
    width: "w-[240px] md:w-[340px]",
    items: [{ src: resolveAssetUrl(klantWoonkamer9Img.url), alt: "Witte cinewall met tv in lichte woonkamer" }],
  },
];

export function CustomerGallerySection({ backgroundClassName = "bg-[#ffc79d]" }: { backgroundClassName?: string }) {
  return (
    <section className={`${backgroundClassName} py-10 md:py-14`}>
      <div className="mx-auto max-w-[1456px] px-5 md:px-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-[22px] font-bold leading-tight text-[#0e1f2a] md:text-[26px]">
            Binnenkijken bij onze klanten
          </h2>
          <p className="mt-2 text-[13px] text-[#0e1f2a] md:text-[14px]">
            Echte interieurs, echte inspiratie. Gemaakt door onze klanten.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex h-[420px] gap-3 pl-5 md:h-[560px] md:gap-4 md:pl-10">
          {CUSTOMER_GALLERY_COLUMNS.map((column, columnIndex) => (
            <div key={columnIndex} className={`flex h-full shrink-0 flex-col gap-3 md:gap-4 ${column.width}`}>
              {column.items.map((image, imageIndex) => (
                <figure key={imageIndex} className="group relative min-h-0 flex-1 overflow-hidden rounded-[14px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <Link
                    to="/product/$handle"
                    params={{ handle: "full-house" }}
                    className="group/pill absolute bottom-2 left-2 flex h-7 items-center gap-0 rounded-full bg-[#ff843a] pl-1 pr-1 text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[padding,gap] duration-300 ease-out hover:gap-2 hover:pl-3 hover:pr-2 md:bottom-3 md:left-3 md:h-8"
                  >
                    <span className="grid max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-[330] leading-none tracking-[0.04em] opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover/pill:max-w-[180px] group-hover/pill:opacity-100 md:text-[13px]">
                      Bestel Full House
                    </span>
                    <span className="pill-shimmer relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff843a] text-white md:h-6 md:w-6">
                      <PuzzleCornerIcon className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/pill:rotate-90 md:h-4 md:w-4" />
                    </span>
                  </Link>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
