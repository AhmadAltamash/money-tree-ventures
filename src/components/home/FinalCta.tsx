import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="py-20">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 id="final-cta-heading" className="heading-4 max-w-170">
            Shuruaat ek kit se karein
          </h2>
          <p className="body-3 max-w-170 text-muted">
            Apne hisaab ka kit chuniye aur apni speed se seekhna shuru karein.
          </p>
          <ButtonLink href="/products" size="md">
            Kits dekhein
            <ArrowRight aria-hidden="true" size={20} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
