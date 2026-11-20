import Link from "next/link";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const weOffer = [
  "Simple Hinglish mein guides, videos aur checklists",
  "Payment ke baad lifetime access",
  "Cashfree ka secure checkout",
];

const weDoNot = [
  "Income ya results ki guarantee nahi dete",
  "Jhoothe testimonials ya kamai ke daawe nahi karte",
  "Aapki card ya UPI details save nahi karte",
];

function PromiseList({ title, items, positive }: { title: string; items: string[]; positive: boolean }) {
  const Icon = positive ? CheckCircle : XCircle;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
      <h3 className="title-1">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="body-6 flex items-start gap-3">
            <Icon
              aria-hidden="true"
              size={20}
              weight="fill"
              className={positive ? "mt-0.5 shrink-0 text-brand" : "mt-0.5 shrink-0 text-muted"}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PromiseSection() {
  return (
    <section aria-labelledby="promise-heading" className="py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          id="promise-heading"
          title="Hum kya dete hain, aur kya nahi"
          description="Kharidne se pehle saaf pata hona chahiye ki aapko kya milega."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <PromiseList title="Hum dete hain" items={weOffer} positive />
          <PromiseList title="Hum nahi karte" items={weDoNot} positive={false} />
        </div>
        <p className="body-6 text-muted">
          Refund aur cancellation ki poori details{" "}
          <Link
            href="/refund-policy"
            className="rounded-lg text-brand underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            yahan padhein
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
