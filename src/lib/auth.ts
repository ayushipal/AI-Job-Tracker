import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        console.log("FOUND USER:", user)

        if (!user) {
          throw new Error("No user found")
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )

        console.log("PASSWORD MATCH:", isPasswordCorrect)

        if (!isPasswordCorrect) {
          throw new Error("Wrong password")
        }

        return {
  id: user.id,
  email: user.email,
  name: user.email,
};
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}