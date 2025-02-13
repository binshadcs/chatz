import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Email and password are required.");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.username,
            },
          });

          if (!user) {
            throw new Error("User not found.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password.");
          }

          return {
            id: user.id.toString(), // Ensure ID is a string
            name: user.firstName,
            email: user.email,
          };
        } catch (error: any) {
          console.error("Authentication error:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.uid = user.id; // Set the user ID in the token
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.uid; // Add the user ID to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
};