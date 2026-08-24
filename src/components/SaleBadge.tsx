import { formatPrice } from "@/lib/shopify";

export function SaleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#ef7027] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-white ${className}`}
    >
      Verjaardagsale -30%
    </span>
  );
}

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
  return (
    <div className="bg-[#ef7027] px-4 py-2.5 text-center text-[13px] font-medium tracking-[0.01em] text-white">
      Verjaardagsale: 30% korting op alle Wandig cinewalls
    </div>
  );
}
