import { Container } from "@/components/ui/Container";
import { business } from "@/config/business";
import type { LegalDocument } from "@/content/legal/types";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <article className="pt-24 pb-20">
      <Container>
        <header className="flex flex-col gap-2">
          <h1 className="heading-3 max-w-170">{document.title}</h1>
          <p className="caption-1 text-muted">Last updated: {business.lastUpdated}</p>
        </header>

        <div className="mt-8 flex max-w-170 flex-col gap-10">
          <p className="body-3 text-muted">{document.intro}</p>

          {document.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="heading-6">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="body-3 text-muted">
                  {paragraph}
                </p>
              ))}
              {section.items ? (
                <ul className="flex list-disc flex-col gap-2 pl-6">
                  {section.items.map((item) => (
                    <li key={item} className="body-3 text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
