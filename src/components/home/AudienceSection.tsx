import Link from "next/link";
import { ArrowRight, Armchair, Briefcase, House, Student, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audienceLabels, type ProductAudience } from "@/lib/product-options";

const audienceCards: { audience: ProductAudience; icon: typeof Student; text: string }[] = [
  { audience: "students", icon: Student, text: "Padhai ke saath nayi skill seekhein aur apna agla step plan karein." },
  { audience: "housewives", icon: House, text: "Ghar sambhalte hue, apne time par seekhne wale kits." },
  { audience: "job_seekers", icon: Briefcase, text: "Nayi skills seekhein aur fake offers se bachne ke tareeke jaanein." },
  { audience: "retired", icon: Armchair, text: "Apna anubhav aur samay kisi naye kaam mein lagayein." },
  { audience: "everyone", icon: UsersThree, text: "Aise kits jo kisi ke bhi kaam aa sakte hain." },
];

export function AudienceSection() {
  return (
    <section aria-labelledby="audience-heading" className="py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          id="audience-heading"
          title="Kahan se shuru karein, yeh samajhna mushkil lagta hai?"
          description="Online kaam ke bahut options hain, lekin kis par bharosa karein aur kahan se shuru karein, yeh pata nahi hota. Apne hisaab se chuniye, hum wahi kits dikhayenge."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audienceCards.map((card) => (
            <li key={card.audience}>
              <Link
                href={`/products?audience=${card.audience}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition duration-300 ease-base hover:bg-surface-raised active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <card.icon aria-hidden="true" size={32} className="text-brand" />
                <h3 className="title-1">{audienceLabels[card.audience]}</h3>
                <p className="body-6 text-muted">{card.text}</p>
                <span className="button-sm mt-auto inline-flex items-center gap-2 pt-2 text-brand">
                  Kits dekhein
                  <ArrowRight aria-hidden="true" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
