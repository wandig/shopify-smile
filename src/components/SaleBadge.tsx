import { formatPrice } from "@/lib/shopify";

export function SalePrice({
  price,
  compareAtPrice,
  currencyCode,
  size = "md",
  align = "right",
}: {
  price: { amount: string; currencyCode: string } | null;
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  currencyCode?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
}) {
  if (!price || parseFloat(price.amount) <= 0) {
    return <span className="text-[#071426]/55">Samenstellen</span>;
  }

  const hasCompare =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const sizeClasses = {
    sm: { sale: "text-[22px]", compare: "text-[15px]" },
    md: { sale: "text-[26px]", compare: "text-[16px]" },
    lg: { sale: "text-[32px]", compare: "text-[18px]" },
  };

  const cc = currencyCode ?? price.currencyCode;

  return (
    <div
      className={`flex flex-col leading-none ${align === "left" ? "items-start" : "items-end"}`}
    >

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
  const leftBadges = [
    { left: "2%", rotate: "-12deg", top: "12%" },
    { left: "10%", rotate: "8deg", top: "62%" },
    { left: "18%", rotate: "-6deg", top: "28%" },
  ];

  const rightBadges = [
    { right: "12%", rotate: "6deg", top: "68%" },
    { right: "6%", rotate: "-10deg", top: "38%" },
    { right: "4%", rotate: "-4deg", top: "4%" },
  ];

  return (
    <div className="sticky top-0 z-50 relative overflow-hidden bg-[#7f919b] px-4 py-2.5 text-left md:text-center text-[13px] font-light tracking-[0.01em] text-white">

      <span className="relative z-10 inline-flex w-full md:w-auto items-center justify-start md:justify-center gap-2 px-0 md:px-6">
        <span><strong className="font-medium">Verjaardagssale</strong>: 30% korting op alle Wandig cinewalls</span>
      </span>


      {leftBadges.map((badge, i) => (
        <span
          key={`l-${i}`}
          className="pointer-events-none absolute hidden md:inline-flex items-center justify-center rounded-lg border border-[#ef7027] px-1.5 py-0.5 text-[11px] font-medium text-white opacity-85"
          style={{ left: badge.left, top: badge.top, transform: `rotate(${badge.rotate})` }}
        >
          -30%
        </span>
      ))}

      {rightBadges.map((badge, i) => (
        <span
          key={`r-${i}`}
          className="pointer-events-none absolute inline-flex items-center justify-center rounded-lg border border-[#ef7027] px-1.5 py-0.5 text-[11px] font-medium text-white opacity-85"
          style={{ right: badge.right, top: badge.top, transform: `rotate(${badge.rotate})` }}
        >
          -30%
        </span>
      ))}
    </div>
  );
}


