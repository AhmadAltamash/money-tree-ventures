import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About us",
  description:
    "MoneyTreeVenture simple Hinglish mein practical guides, videos aur checklists banata hai, taki har koi nayi skills aaram se seekh sake.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Simple bhasha",
    text: "Mushkil English aur bhaari words ki jagah hum wahi bolte hain jo aap roz bolte hain.",
  },
  {
    title: "Practical approach",
    text: "Har kit mein wahi cheezein hain jo aap seedhe use kar sakein: video, PDF, checklist ya templates.",
  },
  {
    title: "Imaandaari",
    text: "Hum income ki guarantee nahi dete. Hum seekhne ke tareeke dete hain, aur result aapki mehnat se aata hai.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-heading" className="pt-24 pb-20">
        <Container className="grid gap-12 lg:grid-cols-5 lg:items-center">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <h1 id="about-heading" className="heading-2 max-w-170">
              Seekhna aasan ho, isliye hum hain
            </h1>
            <p className="body-3 max-w-170 text-muted">
              MoneyTreeVenture ek digital kits platform hai. Hum Hinglish mein practical guides, videos aur checklists
              banate hain, taki students, housewives, job seekers aur retired log bhi nayi skills aaram se seekh sakein.
            </p>
            <p className="body-3 max-w-170 text-muted">
              Aap kit dekhne ke liye login ke bina bhi ghoom sakte hain. Kharidne ke baad kit aapki library mein hamesha
              rehta hai, jahan se aap jab chahein use dobara dekh ya download kar sakte hain.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-2">
            <Image
              src="/images/brand-badge.webp"
              alt="MoneyTreeVenture ka logo: sone ke sikkon wala ped"
              width={320}
              height={320}
              sizes="(min-width: 1024px) 320px, 240px"
              className="size-60 rounded-full lg:size-80"
              priority
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="pb-20">
        <Container className="flex flex-col gap-8">
          <h2 id="values-heading" className="heading-3 max-w-170">
            Hum kaise kaam karte hain
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
                <h3 className="title-1">{value.title}</h3>
                <p className="body-6 text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="about-cta-heading" className="pb-20">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8 text-center">
            <h2 id="about-cta-heading" className="heading-4 max-w-170">
              Apna kit chuniye
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/products">Kits dekhein</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Sawal hai? Contact karein
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
