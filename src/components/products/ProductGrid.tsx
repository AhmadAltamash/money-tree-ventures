import { ProductCard } from "@/components/products/ProductCard";
import { joinClasses } from "@/lib/utils";
import type { ProductSummary } from "@/types/product";

type ProductGridProps = {
  products: ProductSummary[];
  headingLevel?: "h2" | "h3";
  // Lets a page choose how many columns to use. The default is 3 on large screens.
  columnsClassName?: string;
};

export function ProductGrid({
  products,
  headingLevel,
  columnsClassName = "sm:grid-cols-2 lg:grid-cols-3",
}: ProductGridProps) {
  return (
    <ul className={joinClasses("grid gap-4", columnsClassName)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} headingLevel={headingLevel} />
      ))}
    </ul>
  );
}
