import AuthService from "@/network/features/auth.api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ALUR => AuthService => NextAuth => LoginClient
        try {
          const user = await AuthService.login({
            email: credentials?.email,
            password: credentials?.password,
          });
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log(trigger);
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
