"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { sendAccountApprovedEmail, sendWelcomeEmail } from "@/lib/email"
import { cloneTemplateToUser } from "@/lib/checklist"
import type { Role, UserStatus } from "@prisma/client"

interface CreateUserInput {
  name: string
  email: string
  password: string
  role: Role
}

interface UpdateUserInput {
  name: string
  email: string
  role: Role
}

export async function createUser(input: CreateUserInput) {
  try {
    await requireAdmin()

    // Check if user already exists
    const existing = await db.user.findUnique({
      where: { email: input.email.toLowerCase() },
    })

    if (existing) {
      return { success: false, error: "User with this email already exists" }
    }

    const passwordHash = await bcrypt.hash(input.password, 12)

    const user = await db.user.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash,
        role: input.role,
        status: "APPROVED", // Admin-created users are auto-approved
      },
    })

    // Clone checklist from template
    await cloneTemplateToUser(user.id, user.role)

    // Send welcome email
    await sendWelcomeEmail({
      to: user.email,
      name: user.name || "User",
      role: user.role,
    })

    revalidatePath("/admin/users")

    return { success: true, user }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error: "Failed to create user" }
  }
}

export async function updateUser(userId: string, input: UpdateUserInput) {
  try {
    await requireAdmin()

    // Check if email is being changed and if it's taken
    const existing = await db.user.findFirst({
      where: {
        email: input.email.toLowerCase(),
        NOT: { id: userId },
      },
    })

    if (existing) {
      return { success: false, error: "Email is already in use" }
    }

    const user = await db.user.update({
      where: { id: userId },
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        role: input.role,
      },
    })

    revalidatePath("/admin/users")

    return { success: true, user }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error: "Failed to update user" }
  }
}

export async function deleteUser(userId: string) {
  try {
    await requireAdmin()

    await db.user.delete({
      where: { id: userId },
    })

    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { success: false, error: "Failed to delete user" }
  }
}

export async function resetPassword(userId: string) {
  try {
    await requireAdmin()

    // Generate a random temporary password
    const tempPassword = `Temp${Math.random().toString(36).slice(2, 8)}!`
    const passwordHash = await bcrypt.hash(tempPassword, 12)

    await db.user.update({
      where: { id: userId },
      data: { passwordHash },
    })

    revalidatePath("/admin/users")

    return { success: true, tempPassword }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { success: false, error: "Failed to reset password" }
  }
}

export async function approveUser(userId: string) {
  try {
    await requireAdmin()

    const user = await db.user.update({
      where: { id: userId },
      data: { status: "APPROVED" },
    })

    // Clone checklist from template if user doesn't have one
    const existingChecklist = await db.userChecklist.findUnique({
      where: { userId },
    })

    if (!existingChecklist) {
      await cloneTemplateToUser(userId, user.role)
    }

    // Send approval email
    await sendAccountApprovedEmail({
      to: user.email,
      name: user.name || "User",
    })

    // Create notification
    await db.notification.create({
      data: {
        userId,
        type: "ACCOUNT_APPROVED",
        title: "Account Approved!",
        message: "Your account has been approved. You can now access your onboarding portal.",
        link: "/app",
      },
    })

    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error approving user:", error)
    return { success: false, error: "Failed to approve user" }
  }
}

export async function rejectUser(userId: string) {
  try {
    await requireAdmin()

    await db.user.update({
      where: { id: userId },
      data: { status: "REJECTED" },
    })

    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error rejecting user:", error)
    return { success: false, error: "Failed to reject user" }
  }
}

export async function updateUserStatus(userId: string, status: UserStatus) {
  try {
    await requireAdmin()

    const user = await db.user.update({
      where: { id: userId },
      data: { status },
    })

    if (status === "APPROVED") {
      // Clone checklist if needed
      const existingChecklist = await db.userChecklist.findUnique({
        where: { userId },
      })

      if (!existingChecklist) {
        await cloneTemplateToUser(userId, user.role)
      }

      // Send approval email
      await sendAccountApprovedEmail({
        to: user.email,
        name: user.name || "User",
      })

      // Create notification
      await db.notification.create({
        data: {
          userId,
          type: "ACCOUNT_APPROVED",
          title: "Account Approved!",
          message: "Your account has been approved. You can now access your onboarding portal.",
          link: "/app",
        },
      })
    }

    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error updating user status:", error)
    return { success: false, error: "Failed to update user status" }
  }
}
