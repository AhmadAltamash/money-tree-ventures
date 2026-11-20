"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { GoogleLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { messages } from "@/content/messages";

export function GoogleSignInButton({ destination }: { destination: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    setHasError(false);

    try {
      // After Google, the visitor lands on a short "login done" page, then goes to where they were heading.
      await signIn("google", { callbackUrl: `/auth/success?next=${encodeURIComponent(destination)}` });
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleClick} disabled={isLoading} className="w-full">
        <GoogleLogo aria-hidden="true" size={20} weight="bold" />
        {isLoading ? "Google khul raha hai..." : "Google se login karein"}
      </Button>
      {hasError ? (
        <p role="alert" className="body-6 text-danger">
          {messages.auth.loginError}
        </p>
      ) : null}
    </div>
  );
}
