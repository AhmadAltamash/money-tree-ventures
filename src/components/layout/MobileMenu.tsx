"use client";

import { useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { isActivePath, mainNavLinks } from "@/config/navigation";
import { joinClasses } from "@/lib/utils";

type MobileMenuProps = {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
};

const baseEase = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({ isOpen, pathname, onClose }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();
  const { data: session, status } = useSession();

  // While the menu is open: stop the page behind it from scrolling and let Escape close it.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Each item comes up one after another. The whole sequence stays under 400ms.
  function getItemTransition(index: number) {
    return { duration: 0.5, ease: baseEase, delay: Math.min(index * 0.06, 0.4) };
  }
  const startOffset = shouldReduceMotion ? 0 : 24;

  function handleLogout() {
    onClose();
    signOut({ callbackUrl: "/" });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile menu"
          className="fixed inset-0 z-40 flex flex-col gap-6 overflow-y-auto bg-background/95 px-4 pt-24 pb-8 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: baseEase }}
        >
          <ul className="flex flex-col gap-2">
            {mainNavLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: startOffset }}
                animate={{ opacity: 1, y: 0 }}
                transition={getItemTransition(index)}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                  className={joinClasses(
                    "heading-5 block rounded-lg px-3 py-3 transition duration-300 ease-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    isActivePath(pathname, link.href) ? "bg-foreground/5 text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: startOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={getItemTransition(mainNavLinks.length)}
          >
            <ButtonLink href="/products" size="md" className="w-full" onClick={onClose}>
              Kits dekhein
            </ButtonLink>

            {status === "loading" ? null : session?.user ? (
              <>
                <ButtonLink href="/dashboard" variant="secondary" className="w-full" onClick={onClose}>
                  Mera account
                </ButtonLink>
                {session.user.role === "admin" ? (
                  <ButtonLink href="/admin" variant="secondary" className="w-full" onClick={onClose}>
                    Admin panel
                  </ButtonLink>
                ) : null}
                <Button variant="ghost" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <ButtonLink href="/login" variant="secondary" className="w-full" onClick={onClose}>
                Login
              </ButtonLink>
            )}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
