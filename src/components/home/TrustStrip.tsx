import { DeviceMobile, Infinity as InfinityIcon, ShieldCheck, Translate } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";

const trustItems = [
  { icon: ShieldCheck, title: "Secure payment", text: "Cashfree ke secure checkout se" },
  { icon: InfinityIcon, title: "Lifetime access", text: "Kit aapki library mein hamesha rahega" },
  { icon: Translate, title: "Simple Hinglish", text: "Hindi aur English ka aasan mix" },
  { icon: DeviceMobile, title: "Phone par bhi", text: "Video aur PDF kahin bhi kholein" },
];

export function TrustStrip() {
  return (
    <section aria-label="Hum par bharosa kyun karein" className="py-10">
      <Container>
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {trustItems.map((item) => (
            <li key={item.title} className="flex flex-col gap-2">
              <item.icon aria-hidden="true" size={32} className="text-brand" />
              <p className="title-3">{item.title}</p>
              <p className="body-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
