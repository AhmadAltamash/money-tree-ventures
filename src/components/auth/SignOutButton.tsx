"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

type SignOutButtonProps = {
  label?: string;
  // Where to go after logging out.
  callbackUrl?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function SignOutButton({ label = "Logout", callbackUrl = "/", variant = "secondary", className }: SignOutButtonProps) {
  return (
    <Button variant={variant} className={className} onClick={() => signOut({ callbackUrl })}>
      {label}
    </Button>
  );
}
