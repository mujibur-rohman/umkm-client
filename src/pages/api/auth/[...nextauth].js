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
        // console.log(credentials.email);
        // console.log(credentials.password);

        try {
          const user = await AuthService.login({
            email: credentials?.email,
            password: credentials?.password,
          });
          console.log(user);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log("HAHAHA");
          throw new Error(error);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    maxAge: 60 * 60 * 2,
  },
  pages: {
    signIn: "/auth",
    // error: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
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
