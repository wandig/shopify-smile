import { Img } from "@/components/Img";
// Vervang deze import zodra het definitieve keurmerk-logo is geüpload.
import badgeLogo from "@/assets/wandig-logo-header.png.asset.json";

/**
 * Vast, puur visueel keurmerk-embleem linksonder in beeld.
 * Geen link, geen state — alleen presentatie.
 */
export function TrustBadge() {
  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-30 md:bottom-4 md:left-4">
      <div className="flex items-center justify-center rounded-xl border border-[#ede7e0] bg-white px-3 py-2.5 shadow-[0_6px_20px_rgba(31,25,21,0.10)]">
        <Img
          src={badgeLogo.url}
          alt="Keurmerk"
          className="h-auto w-[56px] md:w-[72px]"
          w={144}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default TrustBadge;
