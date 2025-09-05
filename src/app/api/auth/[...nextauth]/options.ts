import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import type { User as NextAuthUser } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "identifier",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"identifier" | "password", string> | undefined): Promise<NextAuthUser | null> {

        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await dbconnect();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user as NextAuthUser;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (err) {
          if (err instanceof Error) throw err;
          throw new Error("Something went wrong during login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
