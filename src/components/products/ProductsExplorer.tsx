import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { parseProductFilters } from "@/lib/validators/product-filters";
import { getCategories, getProducts } from "@/services/product.service";

type ProductsExplorerProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function ProductsExplorer({ searchParams }: ProductsExplorerProps) {
  const filters = parseProductFilters(await searchParams);
  const [categories, products] = await Promise.all([getCategories(), getProducts(filters)]);

  return (
    <div className="flex flex-col gap-6">
      <ProductFilters categories={categories} values={filters} resultCount={products.length} />
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title="Koi kit nahi mila"
          description="Is search ya filter se koi kit match nahi hua. Filters hatakar ya doosra keyword try karein."
          action={<ButtonLink href="/products">Saare kits dekhein</ButtonLink>}
        />
      )}
    </div>
  );
}
