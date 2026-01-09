"use server"

import { db } from "@/lib/db"

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await db.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken) {
      return { success: false, error: "Invalid verification token" }
    }

    if (verificationToken.used) {
      return { success: false, error: "This link has already been used" }
    }

    if (new Date() > verificationToken.expires) {
      return { success: false, error: "This link has expired" }
    }

    // Update user and mark token as used
    await db.$transaction([
      db.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      }),
      db.emailVerificationToken.update({
        where: { id: verificationToken.id },
        data: { used: true },
      }),
    ])

    return { success: true }
  } catch (error) {
    console.error("Email verification error:", error)
    return { success: false, error: "Verification failed" }
  }
}

