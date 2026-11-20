import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/ui/FaqList";
import { generalFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "MoneyTreeVenture ke kits, payment, access aur support se jude aam sawalon ke jawab.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="pt-24 pb-20">
      <JsonLd data={faqSchema} />
      <Container className="grid gap-8 lg:grid-cols-3">
        <header className="flex flex-col items-start gap-4 lg:col-span-1">
          <h1 className="heading-3">Aksar pooche jaane wale sawal</h1>
          <p className="body-3 text-muted">Jawab nahi mila? Hume seedha likhein, hum madad karenge.</p>
          <ButtonLink href="/contact" variant="secondary">
            Contact karein
          </ButtonLink>
        </header>
        <div className="lg:col-span-2">
          <FaqList faqs={generalFaqs} />
        </div>
      </Container>
    </section>
  );
}
