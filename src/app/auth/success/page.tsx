import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RedirectNotice } from "@/components/auth/RedirectNotice";
import { Container } from "@/components/ui/Container";
import { getSafeRedirectPath } from "@/lib/safe-redirect";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Login ho gaya",
  robots: { index: false, follow: false },
};

type AuthSuccessPageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export default async function AuthSuccessPage({ searchParams }: AuthSuccessPageProps) {
  const { next } = await searchParams;

  // This page only makes sense right after a real login.
  if (!(await getCurrentUser())) {
    redirect("/login");
  }

  return (
    <section className="pt-24 pb-20">
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8">
          <RedirectNotice destination={getSafeRedirectPath(next)} />
        </div>
      </Container>
    </section>
  );
}
