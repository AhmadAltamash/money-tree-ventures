import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { connectToDatabase } from "@/lib/db";
import { getAdminEmails } from "@/lib/env.server";
import { UserModel } from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,

    // Only accept Google accounts whose email Google itself has verified.
    async signIn({ account, profile }) {
      if (account?.provider !== "google") {
        return false;
      }
      return Boolean(profile?.email && profile.email_verified);
    },

    // "account" exists only at the moment of login. That is when we save or update the user.
    async jwt({ token, account, profile }) {
      if (account && profile?.email) {
        await connectToDatabase();

        const email = profile.email.toLowerCase();
        // Being in ADMIN_EMAILS is the only way to become an admin. Google login alone never is.
        const role = getAdminEmails().includes(email) ? "admin" : "customer";

        const user = await UserModel.findOneAndUpdate(
          { email },
          {
            $set: {
              name: profile.name ?? email,
              googleId: profile.sub,
              role,
              lastLoginAt: new Date(),
              ...(profile.picture ? { image: profile.picture } : {}),
            },
          },
          { upsert: true, new: true },
        );

        token.userId = user._id.toString();
        token.role = user.role;
      }
      return token;
    },

    // The role here is only a hint for the interface (for example to show the Admin link).
    // Real permission checks always read the database, see src/lib/session.ts.
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId;
        session.user.role = token.role ?? "customer";
      }
      return session;
    },
  },
});
