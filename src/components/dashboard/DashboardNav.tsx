"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/config/navigation";
import { joinClasses } from "@/lib/utils";

const dashboardLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Library", href: "/dashboard/library" },
  { label: "My Purchases", href: "/dashboard/purchases" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Profile", href: "/dashboard/profile" },
];

// On small screens the links scroll sideways inside this strip, so the page itself never does.
export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Account" className="overflow-x-auto">
      <ul className="flex w-max gap-1">
        {dashboardLinks.map((link) => {
          const isActive = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={joinClasses(
                  "title-4 flex min-h-11 items-center rounded-lg px-3 transition duration-300 ease-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  isActive ? "bg-foreground/5 text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
