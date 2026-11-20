import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/services/product.service";

export async function FeaturedKits() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="featured-heading" className="py-20">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="featured-heading"
            title="Shuru karne ke liye kuch kits"
            description="Har kit ek alag zaroorat ke liye hai. Apne hisaab se chuniye."
          />
          <ButtonLink href="/products" variant="secondary" className="self-start sm:self-auto">
            Saare kits dekhein
          </ButtonLink>
        </div>
        <ProductGrid products={products} headingLevel="h3" columnsClassName="sm:grid-cols-2 lg:grid-cols-4" />
      </Container>
    </section>
  );
}

export function FeaturedKitsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Kits load ho rahe hain" className="py-20">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className="h-72 animate-pulse rounded-2xl bg-surface-raised" />
          ))}
        </ul>
      </Container>
    </section>
  );
}
