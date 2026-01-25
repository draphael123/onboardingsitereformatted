import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard | Fountain Vitality",
  description: "View your onboarding progress and upcoming tasks.",
}
import { getUserChecklist, calculateProgress } from "@/lib/checklist"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  Clock, 
  Circle,
  ArrowRight,
  Calendar,
  TrendingUp,
  Trophy,
  Target,
  Flame
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  try {
    const checklist = await getUserChecklist(session.user.id, session.user.role)
    const progress = calculateProgress(checklist)

    // Get upcoming due items
    const upcomingItems = checklist?.sections
      .flatMap((s) => s.items)
      .filter((item) => item.dueDate && item.status !== "COMPLETE")
      .sort((a, b) => {
        if (!a.dueDate || !b.dueDate) return 0
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
      .slice(0, 5) || []

    // Get recently completed items
    const recentlyCompleted = checklist?.sections
      .flatMap((s) => s.items)
      .filter((item) => item.status === "COMPLETE" && item.completedAt)
      .sort((a, b) => {
        if (!a.completedAt || !b.completedAt) return 0
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      })
      .slice(0, 5) || []

    // Get unread notifications count
    const unreadNotifications = await db.notification.count({
      where: {
        userId: session.user.id,
        read: false,
      },
    })

  // Calculate streak (consecutive days with completed items)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (progress.percentage === 100) return "🎉 Amazing! You&apos;ve completed all tasks!"
    if (progress.percentage >= 75) return "🔥 Almost there! Keep up the momentum!"
    if (progress.percentage >= 50) return "💪 Halfway done! You&apos;re doing great!"
    if (progress.percentage >= 25) return "🚀 Great start! Keep going!"
    return "✨ Let&apos;s begin your onboarding journey!"
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">
            Welcome back, {session.user.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {getMotivationalMessage()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="w-fit">
            {session.user.role} Onboarding
          </Badge>
          {unreadNotifications > 0 && (
            <Badge variant="destructive">
              {unreadNotifications} new notification{unreadNotifications > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-fountain-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-fountain-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fountain-600 dark:text-fountain-400">{progress.percentage}%</div>
            <Progress value={progress.percentage} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {progress.total - progress.completed} tasks remaining
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {progress.total} tasks
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">
              tasks started
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-muted rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Started</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.notStarted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              tasks remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Banner */}
      {progress.percentage === 100 && (
        <Card className="bg-gradient-to-r from-fountain-500/10 via-ocean-500/10 to-fountain-500/10 border-fountain-500/20">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-fountain-500/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-fountain-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Onboarding Complete! 🎉</h3>
              <p className="text-muted-foreground">
                Congratulations! You&apos;ve successfully completed all your onboarding tasks.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Tasks
                </CardTitle>
                <CardDescription>Tasks with approaching due dates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingItems.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No upcoming due dates
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingItems.map((item) => {
                  const dueDate = item.dueDate ? new Date(item.dueDate) : null
                  const isOverdue = dueDate && dueDate < new Date()
                  const isDueSoon = dueDate && dueDate < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                  
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        {dueDate && (
                          <p className={`text-xs ${isOverdue ? "text-red-500" : isDueSoon ? "text-yellow-600" : "text-muted-foreground"}`}>
                            {isOverdue ? "Overdue: " : "Due: "}
                            {dueDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={
                          isOverdue ? "destructive" :
                          item.status === "IN_PROGRESS" ? "warning" : "outline"
                        }
                      >
                        {isOverdue ? "Overdue" :
                         item.status === "IN_PROGRESS" ? "In Progress" : "Not Started"}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest completed tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {recentlyCompleted.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No completed tasks yet. Get started with your checklist!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentlyCompleted.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 border-b last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      {item.completedAt && (
                        <p className="text-xs text-muted-foreground">
                          Completed {new Date(item.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-fountain-500/5 via-fountain-500/10 to-ocean-500/5 border-fountain-500/20">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-semibold text-lg">Ready to continue?</h3>
            <p className="text-muted-foreground">
              {progress.percentage === 100
                ? "Review your completed checklist anytime."
                : `You&apos;re ${progress.percentage}% through your onboarding. Keep up the great work!`}
            </p>
          </div>
          <Button asChild size="lg" className="group btn-aqua border-0">
            <Link href="/app/checklist">
              {progress.percentage === 100 ? "View Checklist" : "Continue Checklist"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
    )
  } catch (error) {
    console.error("Error loading dashboard:", error)
    // Return a basic dashboard with error message
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Welcome back, {session.user.name?.split(" ")[0] || "there"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              ✨ Let&apos;s begin your onboarding journey!
            </p>
          </div>
        </div>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Unable to load dashboard data. Please try refreshing the page.
              </p>
              <Button asChild>
                <Link href="/app/checklist">Go to Checklist</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
