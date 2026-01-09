"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"
import { sendEmailVerification } from "@/lib/email"
import { revalidatePath } from "next/cache"

export async function updateProfile({ name }: { name: string }) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" }
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    revalidatePath("/app/settings")
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

export async function updatePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string
  newPassword: string
}) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" }
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || !user.passwordHash) {
      return { success: false, error: "User not found" }
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
    
    if (!isValid) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12)

    await db.user.update({
      where: { id: session.user.id },
      data: { passwordHash },
    })

    return { success: true }
  } catch (error) {
    console.error("Update password error:", error)
    return { success: false, error: "Failed to update password" }
  }
}

export async function resendVerificationEmail() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" }
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    if (user.emailVerified) {
      return { success: false, error: "Email is already verified" }
    }

    // Generate token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Delete any existing tokens
    await db.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    })

    // Create new token
    await db.emailVerificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    })

    // Send email
    await sendEmailVerification({
      to: user.email,
      name: user.name || "User",
      token,
    })

    return { success: true }
  } catch (error) {
    console.error("Resend verification error:", error)
    return { success: false, error: "Failed to send verification email" }
  }
}

