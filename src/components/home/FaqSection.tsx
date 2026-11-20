import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generalFaqs } from "@/content/faqs";

// The homepage shows the first six questions. The FAQs page shows all of them.
const homepageFaqs = generalFaqs.slice(0, 6);

export function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="py-20">
      <JsonLd data={faqSchema} />
      <Container className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-6 lg:col-span-1">
          <SectionHeading
            id="faq-heading"
            title="Aksar pooche jaane wale sawal"
            description="Kharidne se pehle ke zyadatar sawal yahan hain."
          />
          <ButtonLink href="/faqs" variant="secondary">
            Saare sawal dekhein
          </ButtonLink>
        </div>
        <div className="lg:col-span-2">
          <FaqList faqs={homepageFaqs} />
        </div>
      </Container>
    </section>
  );
}
