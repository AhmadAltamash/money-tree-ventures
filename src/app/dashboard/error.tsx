"use client";

import { Button } from "@/components/ui/Button";
import { messages } from "@/content/messages";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="heading-5">Yeh page load nahi ho paya</h1>
      <p className="body-6 max-w-170 text-muted">{messages.common.somethingWentWrong}</p>
      <Button onClick={reset}>Dobara try karein</Button>
    </div>
  );
}
