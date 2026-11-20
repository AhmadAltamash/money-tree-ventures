import { SignOutButton } from "@/components/auth/SignOutButton";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function AdminAccessDenied({ email }: { email: string }) {
  return (
    <section className="pt-24 pb-20">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8">
          <h1 className="heading-5">Is account ko admin access nahi hai</h1>
          <p className="body-6 text-muted">
            Aap {email} se login hain. Admin panel sirf authorised admin ke liye hai. Agar aap admin hain, toh sahi Google
            account se login karein.
          </p>
          <div className="flex flex-wrap gap-3">
            <SignOutButton label="Doosre account se login karein" callbackUrl="/login?callbackUrl=%2Fadmin" variant="primary" />
            <ButtonLink href="/" variant="secondary">
              Homepage
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
