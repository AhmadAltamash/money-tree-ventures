import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { messages } from "@/content/messages";

export const metadata: Metadata = {
  title: "Login mein problem",
  robots: { index: false, follow: false },
};

type AuthErrorPageProps = {
  searchParams: Promise<{ error?: string }>;
};

// Auth.js sends the reason in the address, for example /auth/error?error=AccessDenied
function getErrorMessage(error: string | undefined) {
  if (error === "AccessDenied") return messages.auth.accessDenied;
  if (error === "Configuration") return messages.auth.configuration;
  return messages.auth.loginError;
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;

  return (
    <section className="pt-24 pb-20">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8">
          <h1 className="heading-5">Login nahi ho paya</h1>
          <p role="alert" className="body-6 text-muted">
            {getErrorMessage(error)}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/login">Dobara login karein</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Homepage
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
