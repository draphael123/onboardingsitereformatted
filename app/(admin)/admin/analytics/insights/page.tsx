import { Metadata } from "next"
import { requireAdmin } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users,
  Clock,
  Target
} from "lucide-react"
import { identifyAtRiskUsers, forecastCompletions, getComparativeAnalytics } from "@/lib/insights"
import { getAverageCompletionTimeByRole, getBottleneckTasks, getCompletionTrends } from "@/lib/analytics"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Insights & Analytics | Admin",
  description: "Advanced analytics and insights for onboarding",
}

export default async function InsightsPage() {
  await requireAdmin()
  
  const [atRiskUsers, forecasts, comparative, avgCompletion, bottlenecks, trends] = await Promise.all([
    identifyAtRiskUsers(),
    forecastCompletions(),
    getComparativeAnalytics(),
    getAverageCompletionTimeByRole(),
    getBottleneckTasks(),
    getCompletionTrends(30),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Insights & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Advanced analytics, risk identification, and completion forecasting.
        </p>
      </div>

      {/* At-Risk Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            At-Risk Users
          </CardTitle>
          <CardDescription>
            Users who may need additional support to complete onboarding
          </CardDescription>
        </CardHeader>
        <CardContent>
          {atRiskUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No at-risk users identified. Great job!
            </p>
          ) : (
            <div className="space-y-4">
              {atRiskUsers.slice(0, 10).map((user) => (
                <div key={user.userId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{user.name || user.email}</span>
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge
                        variant={
                          user.riskLevel === "high"
                            ? "destructive"
                            : user.riskLevel === "medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {user.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.progress}% complete • {user.daysSinceStart} days since start
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.riskFactors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                    {user.predictedCompletionDate && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Predicted completion: {user.predictedCompletionDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completion Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Completion Forecasts
          </CardTitle>
          <CardDescription>
            Predicted completion dates for active onboarding users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {forecasts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No active onboarding users
            </p>
          ) : (
            <div className="space-y-3">
              {forecasts.slice(0, 15).map((forecast) => (
                <div key={forecast.userId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{forecast.name || forecast.email}</span>
                      <Badge variant="outline">{forecast.role}</Badge>
                      <Badge
                        variant={
                          forecast.confidence === "high"
                            ? "default"
                            : forecast.confidence === "medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {forecast.confidence} confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {forecast.currentProgress}% complete
                    </p>
                  </div>
                  <div className="text-right">
                    {forecast.predictedCompletionDate ? (
                      <>
                        <p className="text-sm font-medium">
                          {forecast.predictedCompletionDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.ceil(
                            (forecast.predictedCompletionDate.getTime() - Date.now()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">Unable to predict</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparative Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Role Comparison
            </CardTitle>
            <CardDescription>Average metrics by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparative.map((role) => (
                <div key={role.role} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{role.role}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {role.totalUsers} users
                      </span>
                    </div>
                    <span className="text-sm font-medium">{role.averageProgress}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>
                      Avg: {role.averageCompletionTime > 0 ? `${role.averageCompletionTime}d` : "N/A"}
                    </div>
                    <div>Completion: {role.completionRate}%</div>
                    <div>Tasks: {role.averageTasksPerUser}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Average Completion Time
            </CardTitle>
            <CardDescription>Time to complete onboarding by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {avgCompletion.map((role) => (
                <div key={role.role} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{role.role}</Badge>
                    <span className="text-lg font-bold">
                      {role.averageDays > 0 ? `${role.averageDays} days` : "N/A"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {role.totalUsers} users • Avg {role.averageTasks} tasks
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottleneck Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Bottleneck Tasks
          </CardTitle>
          <CardDescription>
            Tasks that take longest or have lowest completion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bottlenecks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No bottleneck data available
            </p>
          ) : (
            <div className="space-y-3">
              {bottlenecks.map((task, idx) => (
                <div key={task.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">#{idx + 1}</span>
                      <span className="font-medium">{task.title}</span>
                      <Badge variant="outline" className="text-xs">{task.section}</Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                      <span>Completion: {task.completionRate}%</span>
                      <span>Avg time: {task.averageDaysToComplete > 0 ? `${task.averageDaysToComplete}d` : "N/A"}</span>
                      <span>Assigned: {task.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completion Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Completion Trends (Last 30 Days)
          </CardTitle>
          <CardDescription>Weekly completion rates over time</CardDescription>
        </CardHeader>
        <CardContent>
          {trends.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No trend data available
            </p>
          ) : (
            <div className="space-y-3">
              {trends.map((trend) => (
                <div key={trend.week} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Week of {new Date(trend.week).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-medium">{trend.completionRate}%</span>
                  </div>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{trend.completed} / {trend.total} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

