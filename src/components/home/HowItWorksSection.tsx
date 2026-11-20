import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Apna kit chuniye",
    text: "Search ya filters se apne liye sahi kit dhoondhein aur uska poora description padhein. Dekhne ke liye login ki zaroorat nahi.",
  },
  {
    title: "Google se login karke payment karein",
    text: "Cart mein kit daalein, Google se login karein aur Cashfree ke secure checkout se payment karein.",
  },
  {
    title: "Library se download ya dekhein",
    text: "Payment confirm hote hi kit aapki library mein aa jata hai. Wahan se jab chahein, lifetime access ke saath use karein.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-24 py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading id="how-heading" title="Kaise kaam karta hai" description="Sirf teen simple steps." />
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
              <p className="caption-3 text-brand">Step {index + 1}</p>
              <h3 className="title-1">{step.title}</h3>
              <p className="body-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
