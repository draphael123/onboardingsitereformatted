import { db } from "@/lib/db"
import { generateStableKey } from "@/lib/utils"
import type { Role } from "@prisma/client"

/**
 * Clone a role template to create a user's checklist
 */
export async function cloneTemplateForUser(userId: string, role: Role) {
  // Get the template for the user's role
  const template = await db.roleTemplate.findUnique({
    where: { role },
    include: {
      sections: {
        include: {
          items: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  })

  if (!template) {
    console.warn(`No template found for role: ${role}`)
    return null
  }

  // Create the user's checklist
  const checklist = await db.userChecklist.create({
    data: {
      userId,
      sections: {
        create: template.sections.map((section) => ({
          title: section.title,
          order: section.order,
          items: {
            create: section.items.map((item) => ({
              title: item.title,
              description: item.description,
              linkUrl: item.linkUrl,
              fileUrl: item.fileUrl,
              dueDate: item.dueInDays
                ? new Date(Date.now() + item.dueInDays * 24 * 60 * 60 * 1000)
                : null,
              status: "NOT_STARTED",
              stableKey: generateStableKey(section.title, item.title),
              order: item.order,
            })),
          },
        })),
      },
    },
    include: {
      sections: {
        include: {
          items: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  })

  return checklist
}

/**
 * Get user's checklist, creating from template if it doesn't exist
 */
export async function getUserChecklist(userId: string, role: Role) {
  let checklist = await db.userChecklist.findUnique({
    where: { userId },
    include: {
      sections: {
        include: {
          items: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  })

  if (!checklist) {
    checklist = await cloneTemplateForUser(userId, role)
  }

  return checklist
}

/**
 * Calculate progress statistics for a checklist
 */
export function calculateProgress(checklist: {
  sections: {
    items: { status: string }[]
  }[]
} | null) {
  if (!checklist) {
    return { total: 0, completed: 0, inProgress: 0, notStarted: 0, percentage: 0 }
  }

  const allItems = checklist.sections.flatMap((s) => s.items)
  const total = allItems.length
  const completed = allItems.filter((i) => i.status === "COMPLETE").length
  const inProgress = allItems.filter((i) => i.status === "IN_PROGRESS").length
  const notStarted = allItems.filter((i) => i.status === "NOT_STARTED").length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return { total, completed, inProgress, notStarted, percentage }
}


