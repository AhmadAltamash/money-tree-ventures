"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { messages } from "@/content/messages";

// Shows "login done" for a moment, then sends the visitor on. The button is there in case they do not want to wait.
export function RedirectNotice({ destination }: { destination: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => router.replace(destination), 1800);
    return () => window.clearTimeout(timer);
  }, [destination, router]);

  return (
    <div role="status" className="flex flex-col items-start gap-4">
      <CheckCircle aria-hidden="true" size={40} weight="fill" className="text-success" />
      <h1 className="heading-4">Login ho gaya</h1>
      <p className="body-3 text-muted">{messages.auth.loginSuccess}</p>
      <p className="caption-1 text-muted">{messages.auth.redirecting}</p>
      <ButtonLink href={destination}>Abhi aage badhein</ButtonLink>
    </div>
  );
}
