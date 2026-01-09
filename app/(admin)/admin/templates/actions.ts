"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { generateStableKey } from "@/lib/utils"
import type { Role } from "@prisma/client"

// Section Actions
export async function createSection(input: { roleTemplateId: string; title: string }) {
  try {
    await requireAdmin()

    // Get the highest order in this template
    const lastSection = await db.templateSection.findFirst({
      where: { roleTemplateId: input.roleTemplateId },
      orderBy: { order: "desc" },
    })

    const section = await db.templateSection.create({
      data: {
        roleTemplateId: input.roleTemplateId,
        title: input.title,
        order: (lastSection?.order ?? -1) + 1,
      },
    })

    revalidatePath("/admin/templates")
    return { success: true, section }
  } catch (error) {
    console.error("Error creating section:", error)
    return { success: false, error: "Failed to create section" }
  }
}

export async function updateSection(sectionId: string, input: { title: string }) {
  try {
    await requireAdmin()

    await db.templateSection.update({
      where: { id: sectionId },
      data: { title: input.title },
    })

    revalidatePath("/admin/templates")
    return { success: true }
  } catch (error) {
    console.error("Error updating section:", error)
    return { success: false, error: "Failed to update section" }
  }
}

export async function deleteSection(sectionId: string) {
  try {
    await requireAdmin()

    await db.templateSection.delete({
      where: { id: sectionId },
    })

    revalidatePath("/admin/templates")
    return { success: true }
  } catch (error) {
    console.error("Error deleting section:", error)
    return { success: false, error: "Failed to delete section" }
  }
}

// Item Actions
export async function createItem(input: {
  templateSectionId: string
  title: string
  description?: string | null
  linkUrl?: string | null
  dueInDays?: number | null
}) {
  try {
    await requireAdmin()

    // Get the highest order in this section
    const lastItem = await db.templateItem.findFirst({
      where: { templateSectionId: input.templateSectionId },
      orderBy: { order: "desc" },
    })

    const item = await db.templateItem.create({
      data: {
        templateSectionId: input.templateSectionId,
        title: input.title,
        description: input.description,
        linkUrl: input.linkUrl,
        dueInDays: input.dueInDays,
        order: (lastItem?.order ?? -1) + 1,
      },
    })

    revalidatePath("/admin/templates")
    return { success: true, item }
  } catch (error) {
    console.error("Error creating item:", error)
    return { success: false, error: "Failed to create item" }
  }
}

export async function updateItem(
  itemId: string,
  input: {
    title: string
    description?: string | null
    linkUrl?: string | null
    dueInDays?: number | null
  }
) {
  try {
    await requireAdmin()

    const item = await db.templateItem.update({
      where: { id: itemId },
      data: {
        title: input.title,
        description: input.description,
        linkUrl: input.linkUrl,
        dueInDays: input.dueInDays,
      },
    })

    revalidatePath("/admin/templates")
    return { success: true, item }
  } catch (error) {
    console.error("Error updating item:", error)
    return { success: false, error: "Failed to update item" }
  }
}

export async function deleteItem(itemId: string) {
  try {
    await requireAdmin()

    await db.templateItem.delete({
      where: { id: itemId },
    })

    revalidatePath("/admin/templates")
    return { success: true }
  } catch (error) {
    console.error("Error deleting item:", error)
    return { success: false, error: "Failed to delete item" }
  }
}

// Sync Template to Users
// Options:
// - updateContent: if true, also update description/links for existing items (preserves completion status)
export async function syncTemplateToUsers(role: Role, options?: { updateContent?: boolean }) {
  try {
    await requireAdmin()

    const updateContent = options?.updateContent ?? false

    // Get the template with all sections and items
    const template = await db.roleTemplate.findUnique({
      where: { role },
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    })

    if (!template) {
      return { success: false, error: "Template not found" }
    }

    // Get all users with this role who have a checklist
    const users = await db.user.findMany({
      where: { role },
      include: {
        checklist: {
          include: {
            sections: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    })

    let usersUpdated = 0
    let itemsAdded = 0
    let itemsUpdated = 0

    for (const user of users) {
      if (!user.checklist) continue

      // Build a map of existing items by stable key for this user
      const existingItemsByKey = new Map<string, { id: string; status: string }>()
      for (const section of user.checklist.sections) {
        for (const item of section.items) {
          existingItemsByKey.set(item.stableKey, { id: item.id, status: item.status })
        }
      }

      // Build a map of user sections by title
      const userSectionsByTitle = new Map<string, string>()
      for (const section of user.checklist.sections) {
        userSectionsByTitle.set(section.title, section.id)
      }

      let userItemsAdded = 0
      let userItemsUpdated = 0

      for (const templateSection of template.sections) {
        // Get or create the user section
        let userSectionId = userSectionsByTitle.get(templateSection.title)

        if (!userSectionId) {
          // Create the section for the user
          const newSection = await db.userSection.create({
            data: {
              userChecklistId: user.checklist.id,
              title: templateSection.title,
              order: templateSection.order,
            },
          })
          userSectionId = newSection.id
          userSectionsByTitle.set(templateSection.title, userSectionId)
        }

        // Check each template item
        for (const templateItem of templateSection.items) {
          const stableKey = generateStableKey(templateSection.title, templateItem.title)
          const existingItem = existingItemsByKey.get(stableKey)

          if (!existingItem) {
            // Add this item to the user's checklist
            await db.userItem.create({
              data: {
                userSectionId,
                title: templateItem.title,
                description: templateItem.description,
                linkUrl: templateItem.linkUrl,
                fileUrl: templateItem.fileUrl,
                dueDate: templateItem.dueInDays
                  ? new Date(Date.now() + templateItem.dueInDays * 24 * 60 * 60 * 1000)
                  : null,
                status: "NOT_STARTED",
                stableKey,
                order: templateItem.order,
              },
            })
            userItemsAdded++
            itemsAdded++
          } else if (updateContent) {
            // Update content but preserve status and completedAt
            await db.userItem.update({
              where: { id: existingItem.id },
              data: {
                description: templateItem.description,
                linkUrl: templateItem.linkUrl,
                fileUrl: templateItem.fileUrl,
                order: templateItem.order,
                // Note: We do NOT update title (it's part of stableKey), status, or completedAt
              },
            })
            userItemsUpdated++
            itemsUpdated++
          }
        }
      }

      if (userItemsAdded > 0 || userItemsUpdated > 0) {
        usersUpdated++
      }
    }

    revalidatePath("/admin/templates")
    return { success: true, usersUpdated, itemsAdded, itemsUpdated }
  } catch (error) {
    console.error("Error syncing template:", error)
    return { success: false, error: "Failed to sync template" }
  }
}

