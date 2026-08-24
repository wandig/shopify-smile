import { formatPrice } from "@/lib/shopify";

export function SalePrice({
  price,
  compareAtPrice,
  currencyCode,
  size = "md",
}: {
  price: { amount: string; currencyCode: string } | null;
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  currencyCode?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (!price || parseFloat(price.amount) <= 0) {
    return <span className="text-[#071426]/55">Samenstellen</span>;
  }

  const hasCompare =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const sizeClasses = {
    sm: { sale: "text-[16px]", compare: "text-[12px]" },
    md: { sale: "text-[23px]", compare: "text-[14px]" },
    lg: { sale: "text-[26px]", compare: "text-[15px]" },
  };

  const cc = currencyCode ?? price.currencyCode;

  return (
    <div className="flex flex-col items-end leading-none">
      {hasCompare && (
        <span
          className={`${sizeClasses[size].compare} font-normal text-[#071426]/40 line-through`}
          aria-label={`Oorspronkelijke prijs ${formatPrice(compareAtPrice!.amount, cc)}`}
        >
          {formatPrice(compareAtPrice!.amount, cc)}
        </span>
      )}
      <span className={`${sizeClasses[size].sale} font-bold text-[#ff5a00]`}>
        {formatPrice(price.amount, cc)}
      </span>
    </div>
  );
}

export function SaleAnnouncementBar() {
  const badges = [
    { left: "4%", rotate: "-12deg", top: "10%" },
    { left: "14%", rotate: "8deg", top: "55%" },
    { left: "74%", rotate: "-8deg", top: "12%" },
    { left: "88%", rotate: "6deg", top: "55%" },
  ];

  return (
    <div className="relative overflow-hidden bg-[#7f919b] px-4 py-2.5 text-center text-[13px] font-light tracking-[0.01em] text-white">
      <span className="relative z-10 inline-flex items-center justify-center gap-2 bg-[#7f919b] px-4">
        <span>Verjaardagsale: 30% korting op alle Wandig cinewalls</span>
      </span>


      {badges.map((badge, i) => (
        <span
          key={i}
          className="pointer-events-none absolute inline-flex items-center justify-center rounded-lg border border-[#ef7027] px-1.5 py-0.5 text-[11px] font-medium text-white opacity-85"
          style={{ left: badge.left, top: badge.top, transform: `rotate(${badge.rotate})` }}
        >
          -30%
        </span>
      ))}
    </div>
  );
}


