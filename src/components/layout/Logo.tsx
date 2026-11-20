import Link from "next/link";
import { siteConfig } from "@/config/site";

// Simple leaf mark for now. We can swap in the final brand logo later.
export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-lg px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8 text-brand">
        <path d="M16 3C9.5 8 6 13.5 6 19a10 10 0 0 0 20 0C26 13.5 22.5 8 16 3Z" fill="currentColor" />
        <path
          d="M16 28V11M16 21l-4-3M16 17l4-3"
          fill="none"
          stroke="var(--background)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="title-2">{siteConfig.name}</span>
    </Link>
  );
}
