import { Metadata } from "next"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  UserCheck, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Calendar,
  BarChart3,
  Activity
} from "lucide-react"

export const metadata: Metadata = {
  title: "Analytics | Admin",
  description: "View onboarding analytics and insights",
}

async function getAnalyticsData() {
  // User stats
  const totalUsers = await db.user.count()
  const pendingUsers = await db.user.count({ where: { status: "PENDING" } })
  const approvedUsers = await db.user.count({ where: { status: "APPROVED" } })
  
  // Get users with their checklist data
  const usersWithChecklists = await db.user.findMany({
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

  // Calculate completion stats
  let totalItems = 0
  let completedItems = 0
  let inProgressItems = 0
  const userProgress: { name: string; email: string; role: string; progress: number }[] = []

  for (const user of usersWithChecklists) {
    if (user.checklist) {
      const items = user.checklist.sections.flatMap((s) => s.items)
      const userTotal = items.length
      const userCompleted = items.filter((i) => i.status === "COMPLETE").length
      const userInProgress = items.filter((i) => i.status === "IN_PROGRESS").length
      
      totalItems += userTotal
      completedItems += userCompleted
      inProgressItems += userInProgress
      
      userProgress.push({
        name: user.name || "Unknown",
        email: user.email,
        role: user.role,
        progress: userTotal > 0 ? Math.round((userCompleted / userTotal) * 100) : 0,
      })
    }
  }

  // Sort users by progress
  userProgress.sort((a, b) => b.progress - a.progress)

  // Role distribution
  const roleDistribution = await db.user.groupBy({
    by: ["role"],
    _count: { role: true },
    where: { status: "APPROVED" },
  })

  // Recent signups (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const recentSignups = await db.user.count({
    where: { createdAt: { gte: weekAgo } },
  })

  // Users who completed onboarding (100%)
  const fullyCompleted = userProgress.filter((u) => u.progress === 100).length

  return {
    totalUsers,
    pendingUsers,
    approvedUsers,
    recentSignups,
    fullyCompleted,
    totalItems,
    completedItems,
    inProgressItems,
    overallProgress: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
    userProgress,
    roleDistribution: roleDistribution.map((r) => ({
      role: r.role,
      count: r._count.role,
    })),
  }
}

export default async function AnalyticsPage() {
  await requireAdmin()
  const data = await getAnalyticsData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Monitor onboarding progress and team performance.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {data.recentSignups} new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.pendingUsers}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting admin review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.overallProgress}%</div>
            <Progress value={data.overallProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fully Onboarded</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.fullyCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {data.approvedUsers > 0 
                ? `${Math.round((data.fullyCompleted / data.approvedUsers) * 100)}% of approved users`
                : "0% of approved users"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Team by Role
            </CardTitle>
            <CardDescription>Distribution of approved users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.roleDistribution.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No approved users yet
                </p>
              ) : (
                data.roleDistribution.map((role) => {
                  const percentage = data.approvedUsers > 0 
                    ? Math.round((role.count / data.approvedUsers) * 100) 
                    : 0
                  return (
                    <div key={role.role} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{role.role}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {role.count} users
                          </span>
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Task Overview
            </CardTitle>
            <CardDescription>Aggregate checklist item status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">{data.completedItems}</div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-yellow-600">{data.inProgressItems}</div>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {data.totalItems - data.completedItems - data.inProgressItems}
                  </div>
                  <p className="text-xs text-muted-foreground">Not Started</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Tasks Assigned</span>
                  <span className="font-medium">{data.totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span className="font-medium">{data.overallProgress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Progress Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            User Progress
          </CardTitle>
          <CardDescription>Individual onboarding progress for all approved users</CardDescription>
        </CardHeader>
        <CardContent>
          {data.userProgress.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No approved users with checklists yet
            </p>
          ) : (
            <div className="space-y-4">
              {data.userProgress.map((user, index) => (
                <div key={user.email} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{user.name}</span>
                        <Badge variant="outline" className="text-xs">{user.role}</Badge>
                      </div>
                      <span className="text-sm font-medium">{user.progress}%</span>
                    </div>
                    <Progress value={user.progress} className="h-2" />
                  </div>
                  {user.progress === 100 && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


