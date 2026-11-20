"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ButtonLink } from "@/components/ui/Button";

const menuItemStyles =
  "body-5 flex min-h-11 w-full items-center rounded-lg px-3 text-left transition duration-300 ease-base hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-brand";

// Shown in the desktop header: a Login button, or the account menu once the visitor is logged in.
export function AccountMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the menu on Escape or when the visitor clicks somewhere else.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Keeps the space reserved while we find out if someone is logged in.
  if (status === "loading") {
    return <div aria-hidden="true" className="h-11 w-16" />;
  }

  if (!session?.user) {
    return (
      <ButtonLink href="/login" variant="ghost" size="sm">
        Login
      </ButtonLink>
    );
  }

  const displayName = session.user.name ?? session.user.email ?? "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="account-menu"
        aria-label="Mera account menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-11 items-center justify-center rounded-lg transition duration-300 ease-base hover:bg-foreground/5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span
          aria-hidden="true"
          className="caption-3 flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground"
        >
          {initial}
        </span>
      </button>

      {isOpen ? (
        <div
          id="account-menu"
          className="absolute top-full right-0 mt-2 flex w-64 flex-col gap-1 rounded-2xl border border-border bg-background p-2"
        >
          <div className="px-3 py-2">
            <p className="title-4 truncate">{displayName}</p>
            {session.user.email ? <p className="caption-2 truncate text-muted">{session.user.email}</p> : null}
          </div>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className={menuItemStyles}>
            Mera account
          </Link>
          {session.user.role === "admin" ? (
            <Link href="/admin" onClick={() => setIsOpen(false)} className={menuItemStyles}>
              Admin panel
            </Link>
          ) : null}
          <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className={menuItemStyles}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
