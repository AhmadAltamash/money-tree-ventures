import { AdminAccessDenied } from "@/components/admin/AdminAccessDenied";
import { Container } from "@/components/ui/Container";
import { getAdminAccess } from "@/lib/session";

// Temporary page. The real admin dashboard is built in Phase 8.
export default async function AdminPage() {
  const { user, isAdmin } = await getAdminAccess("/admin");

  if (!isAdmin) {
    return <AdminAccessDenied email={user.email} />;
  }

  return (
    <section className="pt-24 pb-20">
      <Container className="flex flex-col gap-2">
        <h1 className="heading-3">Admin</h1>
        <p className="body-3 text-muted">Aap {user.email} se admin ke roop mein login hain.</p>
        <p className="body-3 text-muted">Admin dashboard jaldi aa raha hai.</p>
      </Container>
    </section>
  );
}
