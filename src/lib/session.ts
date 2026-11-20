import { cache } from "react";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { getAdminEmails } from "@/lib/env.server";
import type { UserRole } from "@/lib/roles";
import { UserModel } from "@/models/User";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

// Finds the logged in user in the database, so a deleted user or a removed admin loses access
// right away, even if their login cookie is still valid. cache() makes it run once per request.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || !isValidObjectId(userId)) {
    return null;
  }

  await connectToDatabase();
  const user = await UserModel.findById(userId).lean();

  if (!user) {
    return null;
  }

  // Admin needs both: the admin role in the database AND the email still listed in ADMIN_EMAILS.
  const isAdmin = user.role === "admin" && getAdminEmails().includes(user.email);

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: isAdmin ? "admin" : "customer",
  };
});

// Use at the top of every page or action that needs a logged in customer.
export async function requireUser(returnPath: string): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(returnPath)}`);
  }

  return user;
}

// Use at the top of every admin page and admin action. Logged out visitors go to login.
// Logged in visitors without admin rights get isAdmin: false, and the page shows "no access".
export async function getAdminAccess(returnPath: string) {
  const user = await requireUser(returnPath);
  return { user, isAdmin: user.role === "admin" };
}
