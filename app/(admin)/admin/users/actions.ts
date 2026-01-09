"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import bcrypt from "bcryptjs"
import type { Role } from "@prisma/client"

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
      },
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

