import { formatPrice, getDiscountPercent } from "@/lib/format";
import { joinClasses } from "@/lib/utils";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
  size?: "md" | "lg";
};

export function PriceTag({ price, originalPrice, size = "md" }: PriceTagProps) {
  const discountPercent = getDiscountPercent(price, originalPrice);

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={joinClasses(size === "lg" ? "heading-4" : "title-1")}>{formatPrice(price)}</span>
      {discountPercent > 0 && originalPrice ? (
        <>
          <s className="body-6 text-muted">{formatPrice(originalPrice)}</s>
          <span className="caption-3 text-success">{discountPercent}% off</span>
        </>
      ) : null}
    </p>
  );
}
