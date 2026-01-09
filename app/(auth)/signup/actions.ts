"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sendWelcomeEmail, sendEmailVerification } from "@/lib/email"
import { randomBytes } from "crypto"

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

    // Create user with PENDING status
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
        status: "PENDING", // Requires admin approval
      },
    })

    // Create email verification token
    const verificationToken = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await db.emailVerificationToken.create({
      data: {
        token: verificationToken,
        userId: user.id,
        expires,
      },
    })

    // Send welcome email
    await sendWelcomeEmail({
      to: email,
      name,
      role,
    })

    // Send email verification
    await sendEmailVerification({
      to: email,
      name,
      token: verificationToken,
    })

    // Notify admins about new user (create notification for all admins)
    const admins = await db.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    })

    await db.notification.createMany({
      data: admins.map((admin) => ({
        userId: admin.id,
        type: "INFO",
        title: "New User Registration",
        message: `${name} (${email}) has registered as ${role} and is pending approval.`,
        link: "/admin/users",
      })),
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: "Failed to create account. Please try again." }
  }
}
