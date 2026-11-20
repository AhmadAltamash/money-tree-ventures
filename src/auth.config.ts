import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Settings shared by the proxy and the main login code.
// AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET are read from .env.local automatically.
export const authConfig = {
  providers: [
    // "select_account" always shows the Google account chooser, so the admin can pick the right account.
    Google({ authorization: { params: { prompt: "select_account" } } }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login", error: "/auth/error" },
  callbacks: {
    // Used by the proxy: only logged in visitors may open the protected pages.
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;
