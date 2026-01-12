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
  role: z.enum(["CS", "MA_BACKOFFICE", "RN", "PROVIDER", "MA_PHARMACY", "OTHER"]),
})

export async function signUp(data: {
  name: string
  email: string
  password: string
  role: "CS" | "MA_BACKOFFICE" | "RN" | "PROVIDER" | "MA_PHARMACY" | "OTHER"
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

    // Create user - try with status first, fallback without it
    let user
    try {
      user = await db.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          passwordHash,
          role,
          status: "PENDING", // Requires admin approval
        },
      })
    } catch {
      // Fallback if status column doesn't exist yet (db not migrated)
      user = await db.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          passwordHash,
          role,
        },
      })
    }

    // Try to create email verification token (optional - may fail if table doesn't exist)
    try {
      const verificationToken = randomBytes(32).toString("hex")
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      await db.emailVerificationToken.create({
        data: {
          token: verificationToken,
          userId: user.id,
          expires,
        },
      })

      // Send email verification
      await sendEmailVerification({
        to: email,
        name,
        token: verificationToken,
      })
    } catch (e) {
      console.log("Email verification token creation skipped:", e)
    }

    // Send welcome email (non-blocking)
    sendWelcomeEmail({
      to: email,
      name,
      role,
    }).catch(console.error)

    // Try to notify admins (optional - may fail if table doesn't exist)
    try {
      const admins = await db.user.findMany({
        where: { role: "ADMIN" },
        select: { id: true },
      })

      if (admins.length > 0) {
        await db.notification.createMany({
          data: admins.map((admin) => ({
            userId: admin.id,
            type: "INFO",
            title: "New User Registration",
            message: `${name} (${email}) has registered as ${role} and is pending approval.`,
            link: "/admin/users",
          })),
        })
      }
    } catch (e) {
      console.log("Admin notification skipped:", e)
    }

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: "Failed to create account. Please try again." }
  }
}
