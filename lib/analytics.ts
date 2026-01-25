import { db } from "@/lib/db"

export type AnalyticsEventType = 
  | "page_view"
  | "checklist_complete"
  | "task_complete"
  | "task_start"
  | "login"
  | "logout"
  | "document_view"
  | "search"
  | "user_created"
  | "template_synced"
  | "contact_form_submit"

export interface AnalyticsMetadata {
  [key: string]: any
}

/**
 * Track an analytics event
 */
export async function trackEvent(
  type: AnalyticsEventType,
  userId?: string,
  metadata?: AnalyticsMetadata
) {
  try {
    await db.analyticsEvent.create({
      data: {
        type,
        userId: userId || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    })
  } catch (error) {
    // Silently fail analytics tracking to not break user experience
    console.error("Analytics tracking error:", error)
  }
}

/**
 * Get analytics data for a specific event type
 */
export async function getEventStats(
  type: AnalyticsEventType,
  startDate?: Date,
  endDate?: Date
) {
  const where: any = { type }
  
  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = startDate
    if (endDate) where.createdAt.lte = endDate
  }

  return await db.analyticsEvent.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
}

/**
 * Get user onboarding completion time
 */
export async function getUserCompletionTime(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
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

  if (!user?.checklist) return null

  const items = user.checklist.sections.flatMap((s: { items: Array<{ status: string; completedAt: Date | null }> }) => s.items)
  const completedItems = items.filter((i: { status: string; completedAt: Date | null }) => i.status === "COMPLETE" && i.completedAt)
  
  if (completedItems.length === 0) return null

  const firstCompletion = completedItems
    .map((i: { completedAt: Date }) => i.completedAt!)
    .sort((a: Date, b: Date) => new Date(a).getTime() - new Date(b).getTime())[0]
  
  const lastCompletion = completedItems
    .map((i: { completedAt: Date }) => i.completedAt!)
    .sort((a: Date, b: Date) => new Date(b).getTime() - new Date(a).getTime())[0]

  const startDate = new Date(user.checklist.createdAt)
  const endDate = new Date(lastCompletion)
  const daysToComplete = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return {
    daysToComplete,
    startDate,
    endDate,
    totalItems: items.length,
    completedItems: completedItems.length,
  }
}

/**
 * Get average completion time by role
 */
export async function getAverageCompletionTimeByRole() {
  const users = await db.user.findMany({
    where: { status: "APPROVED" },
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

  const roleStats: Record<string, { total: number; totalDays: number; users: number }> = {}

  for (const user of users) {
    if (!user.checklist) continue

    const items = user.checklist.sections.flatMap((s: { items: Array<{ status: string; completedAt: Date | null }> }) => s.items)
    const completedItems = items.filter((i: { status: string; completedAt: Date | null }) => i.status === "COMPLETE" && i.completedAt)
    
    if (completedItems.length === 0) continue

    const lastCompletion = completedItems
      .map((i: { completedAt: Date }) => i.completedAt!)
      .sort((a: Date, b: Date) => new Date(b).getTime() - new Date(a).getTime())[0]

    const startDate = new Date(user.checklist.createdAt)
    const endDate = new Date(lastCompletion)
    const daysToComplete = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (!roleStats[user.role]) {
      roleStats[user.role] = { total: 0, totalDays: 0, users: 0 }
    }

    roleStats[user.role].totalDays += daysToComplete
    roleStats[user.role].users += 1
    roleStats[user.role].total += items.length
  }

  return Object.entries(roleStats).map(([role, stats]) => ({
    role,
    averageDays: stats.users > 0 ? Math.round(stats.totalDays / stats.users) : 0,
    totalUsers: stats.users,
    averageTasks: stats.users > 0 ? Math.round(stats.total / stats.users) : 0,
  }))
}

/**
 * Identify bottleneck tasks (tasks that take longest or are frequently skipped)
 */
export async function getBottleneckTasks() {
  const users = await db.user.findMany({
    where: { status: "APPROVED" },
    include: {
      checklist: {
        include: {
          sections: {
            include: {
              items: {
                orderBy: { order: "asc" },
              },
            },
          },
        },
      },
    },
  })

  const taskStats: Record<
    string,
    {
      title: string
      section: string
      total: number
      completed: number
      inProgress: number
      notStarted: number
      averageDaysToComplete: number
      completionTimes: number[]
    }
  > = {}

  for (const user of users) {
    if (!user.checklist) continue

    for (const section of user.checklist.sections) {
      for (const item of section.items) {
        const key = `${section.title}::${item.title}`
        
        if (!taskStats[key]) {
          taskStats[key] = {
            title: item.title,
            section: section.title,
            total: 0,
            completed: 0,
            inProgress: 0,
            notStarted: 0,
            averageDaysToComplete: 0,
            completionTimes: [],
          }
        }

        taskStats[key].total += 1

        if (item.status === "COMPLETE") {
          taskStats[key].completed += 1
          if (item.completedAt && item.createdAt) {
            const days = Math.ceil(
              (new Date(item.completedAt).getTime() - new Date(item.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )
            taskStats[key].completionTimes.push(days)
          }
        } else if (item.status === "IN_PROGRESS") {
          taskStats[key].inProgress += 1
        } else {
          taskStats[key].notStarted += 1
        }
      }
    }
  }

  // Calculate averages and completion rates
  const bottlenecks = Object.entries(taskStats)
    .map(([key, stats]) => {
      const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0
      const avgDays =
        stats.completionTimes.length > 0
          ? Math.round(
              stats.completionTimes.reduce((a, b) => a + b, 0) / stats.completionTimes.length
            )
          : 0

      return {
        key,
        ...stats,
        completionRate: Math.round(completionRate),
        averageDaysToComplete: avgDays,
      }
    })
    .filter((task) => task.total >= 3) // Only tasks assigned to at least 3 users
    .sort((a, b) => {
      // Sort by lowest completion rate, then by highest average days
      if (a.completionRate !== b.completionRate) {
        return a.completionRate - b.completionRate
      }
      return b.averageDaysToComplete - a.averageDaysToComplete
    })
    .slice(0, 10) // Top 10 bottlenecks

  return bottlenecks
}

/**
 * Get trend data for onboarding completion over time
 */
export async function getCompletionTrends(days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const users = await db.user.findMany({
    where: {
      status: "APPROVED",
      createdAt: { gte: startDate },
    },
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

  // Group by week
  const weeklyStats: Record<string, { total: number; completed: number }> = {}

  for (const user of users) {
    if (!user.checklist) continue

    const items = user.checklist.sections.flatMap((s: { items: Array<{ status: string }> }) => s.items)
    const completed = items.filter((i: { status: string }) => i.status === "COMPLETE").length
    const total = items.length
    const completionDate = user.checklist.updatedAt

    // Get week key
    const weekStart = new Date(completionDate)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    const weekKey = weekStart.toISOString().split("T")[0]

    if (!weeklyStats[weekKey]) {
      weeklyStats[weekKey] = { total: 0, completed: 0 }
    }

    weeklyStats[weekKey].total += total
    weeklyStats[weekKey].completed += completed
  }

  return Object.entries(weeklyStats)
    .map(([week, stats]) => ({
      week,
      completionRate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
      total: stats.total,
      completed: stats.completed,
    }))
    .sort((a, b) => a.week.localeCompare(b.week))
}

