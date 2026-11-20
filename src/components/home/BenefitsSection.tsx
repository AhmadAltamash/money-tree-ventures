import { DeviceMobile, Infinity as InfinityIcon, ShieldWarning, Translate } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    icon: Translate,
    title: "Bina mushkil words ke",
    text: "Har kit simple Hinglish mein hai, isliye pehli baar seekhne wale bhi aaram se samajh jate hain.",
  },
  {
    icon: InfinityIcon,
    title: "Ek baar kharidein, hamesha apna",
    text: "Kit aapki library mein lifetime rehta hai. Jab chahein download karein ya dobara dekhein.",
  },
  {
    icon: DeviceMobile,
    title: "Apne phone par, apni speed se",
    text: "Video aur PDF phone ya laptop par kholein aur apne time ke hisaab se aage badhein.",
  },
  {
    icon: ShieldWarning,
    title: "Scam se pehle ruk kar check karein",
    text: "Real vs Scam Job Checker aapko kisi bhi offer ke baare mein sahi sawal poochhna sikhata hai.",
  },
];

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-heading" className="py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          id="benefits-heading"
          title="Kyun MoneyTreeVenture"
          description="Seekhna aasan ho, aur kharidne ke baad kit hamesha aapke paas rahe. Hum yahi dhyan mein rakhte hain."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
              <benefit.icon aria-hidden="true" size={32} className="text-brand" />
              <h3 className="title-1">{benefit.title}</h3>
              <p className="body-6 text-muted">{benefit.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
