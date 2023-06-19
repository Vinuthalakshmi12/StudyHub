import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const NextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        userId: {
          label: "username or email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      type: "credentials",
      authorize: async (credentials, req) => {
        //if email or password is not present
        if (!credentials?.userId || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            mail_id: credentials.userId,
          },
        });

        //if user is not found in the database
        if (!user || !user.password) return null;

        //decrypt password
        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        //if is not valid password
        if (!isValidPassword) return null;

        return {
          email: user.mail_id,
          id: user.id,
          image: user.prof_image,
          name: user.first_name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // signOut: "/sign-out",
    // error: '/error', // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    newUser: "/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        const user = await prisma.user.findUnique({ where: { id: token.uid } });
        if (user?.role) session.user.role = user.role;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        const userRes = await prisma.user.findUnique({
          where: { id: user.id },
        });
        if (userRes?.role) token.role = userRes.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
