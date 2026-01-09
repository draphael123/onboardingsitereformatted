"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function validateToken(token: string) {
  try {
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return { valid: false }
    }

    if (resetToken.used) {
      return { valid: false }
    }

    if (new Date() > resetToken.expires) {
      return { valid: false }
    }

    return { valid: true }
  } catch (error) {
    console.error("Token validation error:", error)
    return { valid: false }
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Find and validate token
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken) {
      return { success: false, error: "Invalid reset token" }
    }

    if (resetToken.used) {
      return { success: false, error: "This reset link has already been used" }
    }

    if (new Date() > resetToken.expires) {
      return { success: false, error: "This reset link has expired" }
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12)

    // Update user password and mark token as used
    await db.$transaction([
      db.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      db.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ])

    return { success: true }
  } catch (error) {
    console.error("Password reset error:", error)
    return { success: false, error: "Failed to reset password" }
  }
}

