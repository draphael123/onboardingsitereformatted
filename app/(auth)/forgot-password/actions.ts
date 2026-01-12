"use server"

import { db } from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/email"
import { randomBytes } from "crypto"

export async function requestPasswordReset(email: string) {
  try {
    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`)
      return { success: true }
    }

    // Generate token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Delete any existing tokens for this user
    await db.passwordResetToken.deleteMany({
      where: { userId: user.id },
    })

    // Create new token
    await db.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    })

    // Send email
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name || "User",
      token,
    })

    return { success: true }
  } catch (error) {
    console.error("Password reset request error:", error)
    return { success: false, error: "Failed to process request" }
  }
}


