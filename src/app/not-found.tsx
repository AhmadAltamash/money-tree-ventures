import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page nahi mila",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="pt-24 pb-20">
      <Container>
        <p className="caption-1 text-muted">Error 404</p>
        <h1 className="heading-3 mt-2 max-w-170">Yeh page nahi mila</h1>
        <p className="body-3 mt-4 max-w-170 text-muted">
          Link purana ho sakta hai ya page hata diya gaya hai. Homepage par jayein ya kits dekhein.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Homepage par jayein</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            Kits dekhein
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
