import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getUserChecklist, calculateProgress } from "@/lib/checklist"
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
  TrendingUp
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

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
    .slice(0, 3) || []

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">
            Welcome back, {session.user.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your onboarding progress.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {session.user.role} Onboarding
        </Badge>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{progress.percentage}%</div>
            <Progress value={progress.percentage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {progress.total} tasks
            </p>
          </CardContent>
        </Card>

        <Card>
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

        <Card>
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
              <p className="text-sm text-muted-foreground text-center py-8">
                No upcoming due dates
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      {item.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={item.status === "IN_PROGRESS" ? "warning" : "outline"}
                    >
                      {item.status === "IN_PROGRESS" ? "In Progress" : "Not Started"}
                    </Badge>
                  </div>
                ))}
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
                  <CheckCircle2 className="h-5 w-5" />
                  Recently Completed
                </CardTitle>
                <CardDescription>Your latest achievements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {recentlyCompleted.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No completed tasks yet. Get started with your checklist!
              </p>
            ) : (
              <div className="space-y-4">
                {recentlyCompleted.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 border-b last:border-0"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
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
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-semibold text-lg">Ready to continue?</h3>
            <p className="text-muted-foreground">
              {progress.percentage === 100
                ? "Congratulations! You've completed all onboarding tasks."
                : `You're ${progress.percentage}% through your onboarding. Keep up the great work!`}
            </p>
          </div>
          <Button asChild>
            <Link href="/app/checklist">
              {progress.percentage === 100 ? "View Checklist" : "Continue Checklist"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

