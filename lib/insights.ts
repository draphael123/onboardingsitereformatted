import { db } from "@/lib/db"
import { calculateProgress } from "./checklist"

export interface UserRiskProfile {
  userId: string
  name: string | null
  email: string
  role: string
  progress: number
  riskLevel: "low" | "medium" | "high"
  riskFactors: string[]
  predictedCompletionDate: Date | null
  daysSinceStart: number
}

/**
 * Identify users at risk of not completing onboarding
 */
export async function identifyAtRiskUsers(): Promise<UserRiskProfile[]> {
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

  const riskProfiles: UserRiskProfile[] = []
  const now = new Date()

  for (const user of users) {
    if (!user.checklist) continue

    const progress = calculateProgress(user.checklist)
    const items = user.checklist.sections.flatMap((s) => s.items)
    
    // Calculate days since onboarding started
    const startDate = new Date(user.checklist.createdAt)
    const daysSinceStart = Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Risk factors
    const riskFactors: string[] = []
    let riskLevel: "low" | "medium" | "high" = "low"

    // Low progress after significant time
    if (daysSinceStart > 14 && progress.percentage < 25) {
      riskFactors.push("Low progress after 2+ weeks")
      riskLevel = "high"
    } else if (daysSinceStart > 7 && progress.percentage < 50) {
      riskFactors.push("Below expected progress")
      riskLevel = "medium"
    }

    // Overdue tasks
    const overdueTasks = items.filter(
      (item) =>
        item.dueDate &&
        new Date(item.dueDate) < now &&
        item.status !== "COMPLETE"
    )
    if (overdueTasks.length > 0) {
      riskFactors.push(`${overdueTasks.length} overdue task(s)`)
      if (overdueTasks.length >= 3) {
        riskLevel = "high"
      } else if (riskLevel === "low") {
        riskLevel = "medium"
      }
    }

    // No activity in last 7 days
    const lastActivity = user.checklist.updatedAt
    const daysSinceActivity = Math.floor(
      (now.getTime() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysSinceActivity > 7 && progress.percentage < 100) {
      riskFactors.push("No activity in last 7 days")
      if (riskLevel === "low") riskLevel = "medium"
    }

    // Stuck on same progress for a while
    if (daysSinceStart > 10 && progress.percentage < 50) {
      const recentCompletions = items.filter(
        (item) =>
          item.status === "COMPLETE" &&
          item.completedAt &&
          new Date(item.completedAt) >
            new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      )
      if (recentCompletions.length === 0) {
        riskFactors.push("No recent task completions")
        if (riskLevel === "low") riskLevel = "medium"
      }
    }

    // Predict completion date based on current rate
    let predictedCompletionDate: Date | null = null
    if (progress.percentage > 0 && progress.percentage < 100) {
      const completionRate = progress.percentage / daysSinceStart // % per day
      if (completionRate > 0) {
        const remainingPercentage = 100 - progress.percentage
        const estimatedDaysRemaining = Math.ceil(remainingPercentage / completionRate)
        predictedCompletionDate = new Date(
          now.getTime() + estimatedDaysRemaining * 24 * 60 * 60 * 1000
        )
      }
    }

    riskProfiles.push({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      progress: progress.percentage,
      riskLevel,
      riskFactors,
      predictedCompletionDate,
      daysSinceStart,
    })
  }

  // Sort by risk level (high first) and progress (low first)
  return riskProfiles
    .filter((p) => p.riskLevel !== "low" || p.progress < 100)
    .sort((a, b) => {
      const riskOrder = { high: 3, medium: 2, low: 1 }
      if (riskOrder[a.riskLevel] !== riskOrder[b.riskLevel]) {
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel]
      }
      return a.progress - b.progress
    })
}

/**
 * Forecast completion dates for all users
 */
export async function forecastCompletions() {
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

  const forecasts: Array<{
    userId: string
    name: string | null
    email: string
    role: string
    currentProgress: number
    predictedCompletionDate: Date | null
    confidence: "high" | "medium" | "low"
  }> = []

  const now = new Date()

  for (const user of users) {
    if (!user.checklist) continue

    const progress = calculateProgress(user.checklist)
    if (progress.percentage === 100) continue

    const startDate = new Date(user.checklist.createdAt)
    const daysSinceStart = Math.max(
      1,
      Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    )

    let predictedCompletionDate: Date | null = null
    let confidence: "high" | "medium" | "low" = "low"

    if (progress.percentage > 0) {
      const completionRate = progress.percentage / daysSinceStart
      if (completionRate > 0) {
        const remainingPercentage = 100 - progress.percentage
        const estimatedDaysRemaining = Math.ceil(remainingPercentage / completionRate)
        predictedCompletionDate = new Date(
          now.getTime() + estimatedDaysRemaining * 24 * 60 * 60 * 1000
        )

        // Confidence based on data points
        if (daysSinceStart >= 7 && progress.percentage >= 25) {
          confidence = "high"
        } else if (daysSinceStart >= 3 && progress.percentage >= 10) {
          confidence = "medium"
        }
      }
    }

    forecasts.push({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      currentProgress: progress.percentage,
      predictedCompletionDate,
      confidence,
    })
  }

  return forecasts.sort((a, b) => {
    if (!a.predictedCompletionDate && !b.predictedCompletionDate) return 0
    if (!a.predictedCompletionDate) return 1
    if (!b.predictedCompletionDate) return -1
    return a.predictedCompletionDate.getTime() - b.predictedCompletionDate.getTime()
  })
}

/**
 * Get comparative analytics across roles
 */
export async function getComparativeAnalytics() {
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

  const roleStats: Record<
    string,
    {
      totalUsers: number
      averageProgress: number
      averageCompletionTime: number
      completionRate: number
      totalTasks: number
    }
  > = {}

  for (const user of users) {
    if (!user.checklist) continue

    const progress = calculateProgress(user.checklist)
    const items = user.checklist.sections.flatMap((s) => s.items)
    const completedItems = items.filter((i) => i.status === "COMPLETE" && i.completedAt)

    if (!roleStats[user.role]) {
      roleStats[user.role] = {
        totalUsers: 0,
        averageProgress: 0,
        averageCompletionTime: 0,
        completionRate: 0,
        totalTasks: 0,
      }
    }

    roleStats[user.role].totalUsers += 1
    roleStats[user.role].averageProgress += progress.percentage
    roleStats[user.role].totalTasks += items.length

    if (completedItems.length === items.length && completedItems.length > 0) {
      const firstCompletion = completedItems
        .map((i) => i.completedAt!)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0]
      const lastCompletion = completedItems
        .map((i) => i.completedAt!)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]

      const daysToComplete = Math.ceil(
        (new Date(lastCompletion).getTime() - new Date(user.checklist.createdAt).getTime()) /
          (1000 * 60 * 60 * 24)
      )
      roleStats[user.role].averageCompletionTime += daysToComplete
      roleStats[user.role].completionRate += 1
    }
  }

  // Calculate averages
  return Object.entries(roleStats).map(([role, stats]) => ({
    role,
    totalUsers: stats.totalUsers,
    averageProgress: Math.round(stats.averageProgress / stats.totalUsers),
    averageCompletionTime:
      stats.completionRate > 0
        ? Math.round(stats.averageCompletionTime / stats.completionRate)
        : 0,
    completionRate: Math.round((stats.completionRate / stats.totalUsers) * 100),
    averageTasksPerUser: Math.round(stats.totalTasks / stats.totalUsers),
  }))
}




