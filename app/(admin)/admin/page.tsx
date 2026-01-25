import Link from "next/link"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  ClipboardList, 
  FileText, 
  HelpCircle,
  ArrowRight,
  TrendingUp
} from "lucide-react"

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  const [userCount, templateCount, docCount, faqCount, roleStats] = await Promise.all([
    db.user.count(),
    db.roleTemplate.count(),
    db.publicDoc.count(),
    db.fAQ.count(),
    db.user.groupBy({
      by: ["role"],
      _count: true,
    }),
  ])

  return { userCount, templateCount, docCount, faqCount, roleStats }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    {
      title: "Total Users",
      value: stats.userCount,
      description: "Registered team members",
      icon: Users,
      href: "/admin/users",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Role Templates",
      value: stats.templateCount,
      description: "Onboarding templates configured",
      icon: ClipboardList,
      href: "/admin/templates",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Public Documents",
      value: stats.docCount,
      description: "Resources available",
      icon: FileText,
      href: "/admin/content",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      title: "FAQs",
      value: stats.faqCount,
      description: "Questions answered",
      icon: HelpCircle,
      href: "/admin/content",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage users, templates, and content for Fountain Vitality.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link href={card.href}>
                  Manage <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users by Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Users by Role
          </CardTitle>
          <CardDescription>
            Distribution of team members across different roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {["ADMIN", "CS", "MA_BACKOFFICE", "RN", "PROVIDER", "MA_PHARMACY", "OTHER"].map((role) => {
              const stat = stats.roleStats.find((s) => s.role === role)
              return (
                <div key={role} className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <Badge variant="secondary" className="mb-2">
                    {role}
                  </Badge>
                  <span className="text-2xl font-bold">{stat?._count || 0}</span>
                  <span className="text-xs text-muted-foreground">users</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/admin/users?action=create">
              <Users className="mr-2 h-4 w-4" />
              Add New User
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/templates">
              <ClipboardList className="mr-2 h-4 w-4" />
              Edit Templates
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/content">
              <FileText className="mr-2 h-4 w-4" />
              Manage Content
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/analytics/insights">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Insights
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

