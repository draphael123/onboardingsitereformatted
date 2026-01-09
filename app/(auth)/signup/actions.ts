"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sendWelcomeEmail } from "@/lib/email"

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["CS", "NP", "RN", "MA"]),
})

export async function signUp(data: {
  name: string
  email: string
  password: string
  role: "CS" | "NP" | "RN" | "MA"
}) {
  try {
    // Validate input
    const parsed = signUpSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message }
    }

    const { name, email, password, role } = parsed.data

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return { success: false, error: "An account with this email already exists" }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
      },
    })

    // Send welcome email
    await sendWelcomeEmail({
      to: email,
      name,
      role,
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: "Failed to create account. Please try again." }
  }
}

