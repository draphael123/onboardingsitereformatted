"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { trackEvent } from "@/lib/analytics"
import { cache, CacheKeys } from "@/lib/cache"
import type { ItemStatus } from "@prisma/client"

export async function updateItemStatus(itemId: string, status: ItemStatus) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Verify the item belongs to the user
    const item = await db.userItem.findUnique({
      where: { id: itemId },
      include: {
        userSection: {
          include: {
            userChecklist: true,
          },
        },
      },
    })

    if (!item) {
      return { success: false, error: "Item not found" }
    }

    if (item.userSection.userChecklist.userId !== session.user.id) {
      return { success: false, error: "Forbidden" }
    }

    // Update the item
    await db.userItem.update({
      where: { id: itemId },
      data: {
        status,
        completedAt: status === "COMPLETE" ? new Date() : null,
      },
    })

    // Track analytics
    if (status === "COMPLETE") {
      await trackEvent("task_complete", session.user.id, {
        itemId,
        itemTitle: item.title,
      })
    } else if (status === "IN_PROGRESS") {
      await trackEvent("task_start", session.user.id, {
        itemId,
        itemTitle: item.title,
      })
    }

    // Clear cache
    cache.delete(CacheKeys.userChecklist(session.user.id))
    cache.delete(CacheKeys.userProgress(session.user.id))

    revalidatePath("/app")
    revalidatePath("/app/checklist")

    return { success: true }
  } catch (error) {
    console.error("Error updating item status:", error)
    return { success: false, error: "Failed to update item status" }
  }
}


