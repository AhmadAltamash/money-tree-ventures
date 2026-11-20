import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ProductCover } from "@/components/products/ProductCover";
import { ProductGrid } from "@/components/products/ProductGrid";
import { MobilePurchaseBar, PurchasePanel } from "@/components/products/PurchasePanel";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/ui/FaqList";
import { siteConfig } from "@/config/site";
import { audienceLabels, formatLabels } from "@/lib/product-options";
import { getProductBySlug, getRelatedProducts } from "@/services/product.service";

// The page is rebuilt at most every 5 minutes, so admin edits show up soon without a slow page.
export const revalidate = 300;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Kit nahi mila" };
  }

  const title = product.seoTitle ?? product.title;
  const description = product.seoDescription ?? product.shortDescription;
  const path = `/products/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="body-3 flex items-start gap-3">
          <CheckCircle aria-hidden="true" size={24} weight="fill" className="mt-0.5 shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);
  const productUrl = `${siteConfig.url}/products/${product.slug}`;

  // Helps search engines understand the page. "<" is escaped so admin text can never break out of the script.
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    url: productUrl,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
  }).replace(/</g, "\\u003c");

  return (
    <article className="pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      <Container>
        <Link
          href="/products"
          className="body-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-muted transition duration-300 ease-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Saare kits
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-12 lg:col-span-2">
            <header className="flex flex-col gap-4">
              <p className="caption-1 text-muted">
                {product.categoryName} · {formatLabels[product.format]} · {audienceLabels[product.audience]}
              </p>
              {product.badge ? <p className="caption-3 text-brand">{product.badge}</p> : null}
              <h1 className="heading-2">{product.title}</h1>
              <p className="body-3 max-w-170 text-muted">{product.shortDescription}</p>
              {product.features.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="caption-1 rounded-lg border border-border bg-surface px-3 py-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}
            </header>

            <ProductCover format={product.format} leafNumber={product.leafNumber} className="aspect-video" />

            <section aria-labelledby="about-heading" className="flex flex-col gap-4">
              <h2 id="about-heading" className="heading-5">
                Kit ke baare mein
              </h2>
              {product.description.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="body-3 max-w-170 text-muted">
                  {paragraph}
                </p>
              ))}
            </section>

            {product.included.length > 0 ? (
              <section aria-labelledby="included-heading" className="flex flex-col gap-4">
                <h2 id="included-heading" className="heading-5">
                  Isme kya milega
                </h2>
                <BulletList items={product.included} />
              </section>
            ) : null}

            {product.whoShouldBuy.length > 0 ? (
              <section aria-labelledby="audience-heading" className="flex flex-col gap-4">
                <h2 id="audience-heading" className="heading-5">
                  Yeh kit kiske liye hai
                </h2>
                <BulletList items={product.whoShouldBuy} />
              </section>
            ) : null}

            {product.benefits.length > 0 ? (
              <section aria-labelledby="benefits-heading" className="flex flex-col gap-4">
                <h2 id="benefits-heading" className="heading-5">
                  Aapko kya faayda hoga
                </h2>
                <BulletList items={product.benefits} />
              </section>
            ) : null}

            {product.faqs.length > 0 ? (
              <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
                <h2 id="faq-heading" className="heading-5">
                  Aksar pooche jaane wale sawal
                </h2>
                <FaqList faqs={product.faqs} />
              </section>
            ) : null}
          </div>

          <aside aria-label="Kit kharidein" className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <PurchasePanel product={product} />
            </div>
          </aside>
        </div>

        {relatedProducts.length > 0 ? (
          <section aria-labelledby="related-heading" className="mt-20 flex flex-col gap-6">
            <h2 id="related-heading" className="heading-5">
              Aur kits dekhein
            </h2>
            <ProductGrid products={relatedProducts} headingLevel="h3" />
          </section>
        ) : null}
      </Container>

      <MobilePurchaseBar product={product} />
      <div className="h-16" />
    </article>
  );
}
