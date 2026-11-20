import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { getButtonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { business, isFilled } from "@/config/business";

export const metadata: Metadata = {
  title: "Contact",
  description: "MoneyTreeVenture se sampark karein. Kits, payment ya access se jude sawal ke liye hume likhein.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  // Only details that have been filled in business.ts are shown.
  const details = [
    { label: "Email", value: business.supportEmail, href: `mailto:${business.supportEmail}` },
    { label: "Phone", value: business.supportPhone, href: `tel:${business.supportPhone.replace(/\s/g, "")}` },
    { label: "Address", value: business.registeredAddress, href: undefined },
  ].filter((detail) => isFilled(detail.value));

  return (
    <section className="pt-24 pb-20">
      <Container className="grid gap-12 lg:grid-cols-5">
        <header className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <h1 className="heading-3">Hume likhein</h1>
            <p className="body-3 text-muted">
              Kisi kit, payment ya access ke baare mein sawal hai? Form bharein, hum jaldi jawab denge.
            </p>
          </div>

          {details.length > 0 ? (
            <dl className="flex flex-col gap-4">
              {details.map((detail) => (
                <div key={detail.label} className="flex flex-col gap-1">
                  <dt className="caption-1 text-muted">{detail.label}</dt>
                  <dd className="body-2">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="rounded-lg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {isFilled(business.whatsappNumber) ? (
            <a
              href={`https://wa.me/${business.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClasses({ variant: "secondary", className: "self-start" })}
            >
              WhatsApp par baat karein
            </a>
          ) : null}
        </header>

        <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-3">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
