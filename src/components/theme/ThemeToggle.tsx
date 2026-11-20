"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeToggle() {
  function handleToggle() {
    const root = document.documentElement;

    // This class turns on a smooth color fade for a moment, only while switching.
    root.classList.add("theme-transition");
    const isNowDark = root.classList.toggle("dark");

    try {
      localStorage.setItem(THEME_STORAGE_KEY, isNowDark ? "dark" : "light");
    } catch {
      // Some browsers block storage. The theme still changes, it just will not be remembered.
    }

    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
  }

  // Both icons are in the page and CSS shows the right one, so the server and the
  // browser always render the same HTML.
  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Light ya dark theme badlein"
      className="flex size-11 items-center justify-center rounded-lg transition duration-300 ease-base hover:bg-foreground/5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <Sun aria-hidden="true" size={20} className="hidden dark:block" />
      <Moon aria-hidden="true" size={20} className="block dark:hidden" />
    </button>
  );
}
