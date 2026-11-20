"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// Lets the header and menus know who is logged in, without making every page slow or dynamic.
export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
}
