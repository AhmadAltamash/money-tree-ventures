import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { messages } from "@/content/messages";

// Temporary page for checking the design. Delete this folder before the site goes live.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "background", className: "bg-background" },
  { name: "surface", className: "bg-surface" },
  { name: "surface raised", className: "bg-surface-raised" },
  { name: "brand", className: "bg-brand" },
  { name: "accent", className: "bg-accent" },
  { name: "danger", className: "bg-danger" },
  { name: "success", className: "bg-success" },
  { name: "border", className: "bg-border" },
];

const textStyles = [
  { name: "Heading 1", className: "heading-1" },
  { name: "Heading 2", className: "heading-2" },
  { name: "Heading 3", className: "heading-3" },
  { name: "Heading 4", className: "heading-4" },
  { name: "Heading 5", className: "heading-5" },
  { name: "Heading 6", className: "heading-6" },
  { name: "Title 1", className: "title-1" },
  { name: "Title 2", className: "title-2" },
  { name: "Title 3", className: "title-3" },
  { name: "Title 4", className: "title-4" },
  { name: "Title 5", className: "title-5" },
  { name: "Body 1", className: "body-1" },
  { name: "Body 2", className: "body-2" },
  { name: "Body 3", className: "body-3" },
  { name: "Body 4", className: "body-4" },
  { name: "Body 5", className: "body-5" },
  { name: "Body 6", className: "body-6" },
  { name: "Caption 1", className: "caption-1" },
  { name: "Caption 2", className: "caption-2" },
  { name: "Caption 3", className: "caption-3" },
  { name: "Caption 4", className: "caption-4" },
  { name: "Caption 5", className: "caption-5" },
];

export default function DesignSystemPage() {
  return (
    <div className="pt-24 pb-20">
      <Container className="flex flex-col gap-16">
        <header>
          <h1 className="heading-3">Design system</h1>
          <p className="body-3 mt-2 max-w-170 text-muted">
            Colors, text styles aur buttons ek jagah. Upar theme button se light aur dark dono check karein.
          </p>
        </header>

        <section aria-labelledby="colors-heading">
          <h2 id="colors-heading" className="heading-5">
            Colors
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colors.map((color) => (
              <li key={color.name}>
                <div className={`h-16 rounded-lg border border-border ${color.className}`} />
                <p className="caption-1 mt-2">{color.name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="buttons-heading">
          <h2 id="buttons-heading" className="heading-5">
            Buttons
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
            <ButtonLink href="/design-system" variant="secondary">
              Link button
            </ButtonLink>
          </div>
        </section>

        <section aria-labelledby="messages-heading">
          <h2 id="messages-heading" className="heading-5">
            Messages
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[messages.payment.success, messages.payment.failure, messages.payment.pending, messages.library.empty].map(
              (message) => (
                <li key={message} className="body-6 rounded-lg border border-border bg-surface p-4">
                  {message}
                </li>
              ),
            )}
          </ul>
        </section>

        <section aria-labelledby="text-heading">
          <h2 id="text-heading" className="heading-5">
            Text styles
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {textStyles.map((style) => (
              <li key={style.name} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="caption-2 w-24 shrink-0 text-muted">{style.name}</span>
                <span className={style.className}>Seekhein, plan karein, shuru karein</span>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
