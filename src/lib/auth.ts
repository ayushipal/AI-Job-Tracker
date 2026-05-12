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
        try {
          // Check if email and password are provided
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          console.log("FOUND USER:", user)

          // User not found
          if (!user) {
            return null
          }

          // Compare password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          )

          console.log("PASSWORD MATCH:", isPasswordCorrect)

          // Wrong password
          if (!isPasswordCorrect) {
            return null
          }

          // Successful login
          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
          }
        } catch (error) {
          console.error("AUTH ERROR:", error)
          return null
        }
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