import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { ProductsSkeleton } from "@/components/products/ProductsSkeleton";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Explore kits",
  description:
    "MoneyTreeVenture ke saare digital kits dekhein. Search aur filters se apne liye sahi guide, video ya bundle chuniye.",
  alternates: { canonical: "/products" },
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <section className="pt-24 pb-20">
      <Container>
        <header className="mb-8">
          <h1 className="heading-3 max-w-170">Explore kits</h1>
          <p className="body-3 mt-2 max-w-170 text-muted">
            Apne hisaab ka kit chuniye. Search karein ya filters se apni zaroorat ke kit dhoondhein.
          </p>
        </header>

        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsExplorer searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}
