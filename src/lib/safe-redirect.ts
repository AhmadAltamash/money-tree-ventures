import { siteConfig } from "@/config/site";

// Turns a "go back to" address into a safe path on our own site.
// Anything pointing to another website, or back to the login pages, becomes the fallback.
export function getSafeRedirectPath(value: string | string[] | undefined, fallback = "/dashboard") {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) {
    return fallback;
  }

  try {
    const siteUrl = new URL(siteConfig.url);
    const target = new URL(rawValue, siteUrl);

    if (target.origin !== siteUrl.origin) {
      return fallback;
    }
    if (target.pathname.startsWith("/login") || target.pathname.startsWith("/auth")) {
      return fallback;
    }

    return `${target.pathname}${target.search}`;
  } catch {
    return fallback;
  }
}
