"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { messages } from "@/content/messages";

export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <section className="pt-24 pb-20">
      <Container>
        <h1 className="heading-4">Kits load nahi ho paye</h1>
        <p className="body-3 mt-2 max-w-170 text-muted">{messages.common.somethingWentWrong}</p>
        <Button className="mt-6" onClick={reset}>
          Dobara try karein
        </Button>
      </Container>
    </section>
  );
}
