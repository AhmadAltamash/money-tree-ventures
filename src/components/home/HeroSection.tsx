import { Suspense } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HeroKitStack } from "@/components/home/HeroKitStack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="pt-24 pb-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <h1 id="hero-heading" className="hero-heading heading-1 max-w-170">
              <span className="block">Online seekhein,</span>
              <span className="block">Hinglish mein</span>
            </h1>
            <p className="body-3 mt-6 max-w-170 text-muted">
              Practical guides, videos aur checklists. Ek baar kharidein, aur kit hamesha aapki library mein rahega.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/products" size="md">
                Kits dekhein
                <ArrowRight aria-hidden="true" size={20} />
              </ButtonLink>
              <ButtonLink href="#how-it-works" variant="ghost">
                Kaise kaam karta hai
              </ButtonLink>
            </div>
            <p className="caption-1 mt-6 text-muted">
              Students, housewives, job seekers aur retired log ke liye banaye gaye kits.
            </p>
          </div>

          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-raised" />}>
              <HeroKitStack />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
