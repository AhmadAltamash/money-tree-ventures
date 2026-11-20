import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PriceTag } from "@/components/products/PriceTag";
import { Button } from "@/components/ui/Button";
import type { ProductDetail } from "@/types/product";

type PurchasePanelProps = {
  product: ProductDetail;
};

// The cart is built in a later phase. Until then the button stays disabled.
export function AddToCartButton({ className }: { className?: string }) {
  return (
    <Button disabled className={className}>
      Cart mein add karein
    </Button>
  );
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const isCall = product.format === "consultation";

  const assurances = isCall
    ? ["Payment ke baad booking ki details milengi", "Secure payment Cashfree se"]
    : ["Payment confirm hote hi kit aapki library mein", "Lifetime access, kabhi bhi download ya dekhein", "Secure payment Cashfree se"];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
      <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" />
      {product.formatDetail ? <p className="body-5 text-muted">{product.formatDetail}</p> : null}
      <AddToCartButton className="w-full" />
      <ul className="flex flex-col gap-2">
        {assurances.map((assurance) => (
          <li key={assurance} className="body-6 flex items-start gap-2 text-muted">
            <CheckCircle aria-hidden="true" size={20} weight="fill" className="mt-0.5 shrink-0 text-brand" />
            {assurance}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Sticks to the bottom of the screen on phones and tablets while the visitor reads the page.
export function MobilePurchaseBar({ product }: PurchasePanelProps) {
  return (
    <div className="sticky bottom-4 z-30 mx-4 mt-12 lg:hidden">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 p-3 backdrop-blur-md">
        <PriceTag price={product.price} originalPrice={product.originalPrice} />
        <AddToCartButton />
      </div>
    </div>
  );
}
