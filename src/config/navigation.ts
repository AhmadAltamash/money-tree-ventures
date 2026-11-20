export type NavLink = {
  label: string;
  href: string;
};

// Links shown in the header and the mobile menu.
export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore Kits", href: "/products" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

// Link columns shown in the footer.
export const footerLinkGroups: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Explore Kits", href: "/products" },
      { label: "About", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms" },
      { label: "Refund and Cancellation", href: "/refund-policy" },
    ],
  },
];

// Used to mark the current page in the navigation.
export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
