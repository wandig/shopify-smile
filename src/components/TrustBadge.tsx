import { Img } from "@/components/Img";
import { useRouter } from "@tanstack/react-router";
import badgeLogo from "@/assets/dutch-design-winner-2026-v2.jpeg.asset.json";

/**
 * Vast, puur visueel keurmerk-embleem linksonder in beeld.
 * Alleen zichtbaar op productpagina's.
 */
export function TrustBadge() {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isProductPage = pathname.startsWith("/product/");

  if (!isProductPage) return null;

  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-30 md:bottom-4 md:left-4">
      <div className="flex items-center justify-center rounded-lg bg-white shadow-[0_6px_20px_rgba(31,25,21,0.10)]">
        <Img
          src={badgeLogo.url}
          alt="Dutch Design Winner 2026 - 10 jaar garantie"
          className="h-auto w-[72px] md:w-[92px] rounded-lg"
          w={220}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default TrustBadge;
