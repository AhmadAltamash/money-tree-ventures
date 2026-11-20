import { Suspense } from "react";
import type { Metadata } from "next";
import { AudienceSection } from "@/components/home/AudienceSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedKits, FeaturedKitsSkeleton } from "@/components/home/FeaturedKits";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PromiseSection } from "@/components/home/PromiseSection";
import { TaglineReveal } from "@/components/home/TaglineReveal";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

// The homepage is rebuilt at most every 5 minutes, so admin changes show up soon.
export const revalidate = 300;

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} | Hinglish digital kits`,
    description: siteConfig.description,
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* The hero is above the fold, so it loads right away without the scroll animation. */}
      <HeroSection />

      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <Suspense fallback={<FeaturedKitsSkeleton />}>
          <FeaturedKits />
        </Suspense>
      </Reveal>
      <TaglineReveal />
      <Reveal>
        <AudienceSection />
      </Reveal>
      <Reveal>
        <BenefitsSection />
      </Reveal>
      <Reveal>
        <HowItWorksSection />
      </Reveal>
      <Reveal>
        <PromiseSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
