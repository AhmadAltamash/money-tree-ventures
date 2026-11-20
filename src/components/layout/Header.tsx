"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/auth/AccountMenu";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { isActivePath, mainNavLinks } from "@/config/navigation";
import { joinClasses } from "@/lib/utils";

const menuBarStyles = "block h-0.5 w-5 rounded-full bg-foreground transition duration-500 ease-base";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 rounded-2xl border border-border bg-background/80 p-2 backdrop-blur-md lg:w-fit">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNavLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={joinClasses(
                    "title-4 rounded-lg px-3 py-2 transition duration-300 ease-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    isActive ? "bg-foreground/5 text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />

            <div className="hidden lg:block">
              <AccountMenu />
            </div>

            <div className="hidden xl:block">
              <ButtonLink href="/products" size="sm">
                Kits dekhein
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Menu band karein" : "Menu kholein"}
              className="flex size-11 items-center justify-center rounded-lg transition duration-300 ease-base hover:bg-foreground/5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
            >
              <span aria-hidden="true" className="flex flex-col gap-1">
                <span className={joinClasses(menuBarStyles, isMenuOpen && "translate-y-1.5 rotate-45")} />
                <span className={joinClasses(menuBarStyles, isMenuOpen && "opacity-0")} />
                <span className={joinClasses(menuBarStyles, isMenuOpen && "-translate-y-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} pathname={pathname} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
