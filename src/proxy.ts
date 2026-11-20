import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// First gate: visitors who are not logged in are sent to /login before the page even loads.
// This is only the first layer. Every protected page and action also checks again on the server.
export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/checkout/:path*", "/payment/:path*"],
};
