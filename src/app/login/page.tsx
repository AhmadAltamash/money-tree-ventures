import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { Container } from "@/components/ui/Container";
import { getSafeRedirectPath } from "@/lib/safe-redirect";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const destination = getSafeRedirectPath(callbackUrl);

  // Someone who is already logged in does not need this page.
  if (await getCurrentUser()) {
    redirect(destination);
  }

  const linkStyles =
    "rounded-lg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <section className="pt-24 pb-20">
      <Container>
        <div className="mx-auto flex max-w-md flex-col gap-6 rounded-2xl border border-border bg-surface p-8">
          <div className="flex flex-col gap-2">
            <h1 className="heading-5">Google se login karein</h1>
            <p className="body-6 text-muted">
              Kit kharidne aur apni library dekhne ke liye login zaroori hai. Aapka cart login ke baad bhi saath rahega.
            </p>
          </div>

          <GoogleSignInButton destination={destination} />

          <p className="caption-2 text-muted">
            Hum aapka Google password kabhi nahi dekhte. Login karke aap{" "}
            <Link href="/terms" className={linkStyles}>
              Terms and Conditions
            </Link>{" "}
            aur{" "}
            <Link href="/privacy-policy" className={linkStyles}>
              Privacy Policy
            </Link>{" "}
            se sehmat hote hain.
          </p>
        </div>
      </Container>
    </section>
  );
}
