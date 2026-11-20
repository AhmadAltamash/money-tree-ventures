import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminAccessDenied } from "@/components/admin/AdminAccessDenied";
import { getAdminAccess } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Important: every admin page and every admin action must also call getAdminAccess() itself.
// A layout alone is not enough, because it is not checked again on every page change.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin } = await getAdminAccess("/admin");

  if (!isAdmin) {
    return <AdminAccessDenied email={user.email} />;
  }

  return children;
}
