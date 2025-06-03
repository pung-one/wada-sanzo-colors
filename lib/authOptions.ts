import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { AuthOptions } from "next-auth";

export const validProviders = ["google", "apple"];

export const authOptions: AuthOptions = {
  providers: [
    Google({
      id: "google",
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    Apple({
      id: "apple",
      clientId: process.env.APPLE_WEB_ID ?? "",
      clientSecret: process.env.APPLE_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id_token = account.id_token;
        token.idProvider = account.provider;
        token.user = user;
      }
      if (!token.idProvider) {
        console.warn("JWT callback: token.idProvider is missing!", {
          token,
          account,
          user,
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token as string;
      session.idProvider = token.idProvider as "google" | "apple";

      if (!session.idProvider) {
        console.warn("Session callback: session.idProvider is missing!", {
          session,
          token,
        });
      }
      return session;
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
};
