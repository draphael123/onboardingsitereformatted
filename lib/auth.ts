import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import type { Role } from "@prisma/client"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Trust the host header from Vercel
  trustHost: true,
  // Use JWT sessions (no database adapter needed)
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials)
          if (!parsed.success) return null

          const { email, password } = parsed.data

          const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
          })

          if (!user || !user.passwordHash) return null

          const passwordMatch = await bcrypt.compare(password, user.passwordHash)
          if (!passwordMatch) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id
        token.role = user.role as Role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
      }
      return session
    },
  },
})

// Helper to get current session on server
export async function getCurrentUser() {
  try {
    const session = await auth()
    return session?.user ?? null
  } catch {
    return null
  }
}

// Helper to require auth
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}

// Helper to require admin
export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }
  return user
}
