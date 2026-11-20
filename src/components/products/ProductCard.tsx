import Link from "next/link";
import { ProductCover } from "@/components/products/ProductCover";
import { PriceTag } from "@/components/products/PriceTag";
import { formatLabels } from "@/lib/product-options";
import type { ProductSummary } from "@/types/product";

type ProductCardProps = {
  product: ProductSummary;
  // Use "h2" when the cards sit directly under the page title and "h3" under a section heading.
  headingLevel?: "h2" | "h3";
};

export function ProductCard({ product, headingLevel = "h2" }: ProductCardProps) {
  const Heading = headingLevel;

  return (
    <li>
      <Link
        href={`/products/${product.slug}`}
        className="flex h-full flex-col rounded-2xl border border-border bg-surface p-2 transition duration-300 ease-base hover:bg-surface-raised active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ProductCover format={product.format} leafNumber={product.leafNumber} />
        <div className="flex flex-1 flex-col gap-2 p-3">
          <p className="caption-1 text-muted">
            {product.categoryName} · {formatLabels[product.format]}
          </p>
          {product.badge ? <p className="caption-3 text-brand">{product.badge}</p> : null}
          <Heading className="title-2">{product.title}</Heading>
          <p className="body-6 text-muted">{product.shortDescription}</p>
          <div className="mt-auto pt-2">
            <PriceTag price={product.price} originalPrice={product.originalPrice} />
          </div>
        </div>
      </Link>
    </li>
  );
}
