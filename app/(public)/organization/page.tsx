import { Metadata } from "next"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Building2, 
  UserCog,
  Search,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

export const metadata: Metadata = {
  title: "Staff Directory | Fountain Vitality",
  description: "View our organizational structure and team hierarchy at Fountain Vitality.",
}

interface UserWithRole {
  id: string
  name: string | null
  email: string
  role: string
  status: string
}

async function getUsersByRole() {
  const users = await db.user.findMany({
    where: { status: "APPROVED" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
    orderBy: [
      { role: "asc" },
      { name: "asc" },
    ],
  })

  return users as UserWithRole[]
}

// Group users by role for organizational chart
function groupByRole(users: UserWithRole[]) {
  const grouped: Record<string, UserWithRole[]> = {}
  
  for (const user of users) {
    if (!grouped[user.role]) {
      grouped[user.role] = []
    }
    grouped[user.role].push(user)
  }
  
  return grouped
}

const roleLabels: Record<string, { label: string; description: string; color: string }> = {
  ADMIN: {
    label: "Administration",
    description: "System administrators and management",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  },
  CS: {
    label: "Customer Service",
    description: "Customer support and service team",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  MA_BACKOFFICE: {
    label: "Medical Assistant - Back Office",
    description: "Back office medical assistants",
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  },
  RN: {
    label: "Registered Nurse",
    description: "Registered nursing staff",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  PROVIDER: {
    label: "Healthcare Provider",
    description: "Medical providers and physicians",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
  MA_PHARMACY: {
    label: "Medical Assistant - Pharmacy",
    description: "Pharmacy team medical assistants",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  },
  OTHER: {
    label: "Other",
    description: "Other team members",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  },
}

export default async function OrganizationPage() {
  const users = await getUsersByRole()
  const groupedByRole = groupByRole(users)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Building2 className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Staff <span className="text-primary">Directory</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our organizational structure and find team members by role and department.
            </p>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {Object.keys(groupedByRole).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No team members available yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedByRole)
                  .sort(([roleA], [roleB]) => {
                    // Sort ADMIN first, then alphabetically
                    if (roleA === "ADMIN") return -1
                    if (roleB === "ADMIN") return 1
                    return roleA.localeCompare(roleB)
                  })
                  .map(([role, roleUsers]) => {
                    const roleInfo = roleLabels[role] || {
                      label: role,
                      description: `${role} team members`,
                      color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
                    }

                    return (
                      <Card key={role} className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <UserCog className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl">{roleInfo.label}</CardTitle>
                                <CardDescription>{roleInfo.description}</CardDescription>
                              </div>
                            </div>
                            <Badge className={roleInfo.color}>
                              {roleUsers.length} {roleUsers.length === 1 ? "member" : "members"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roleUsers.map((user) => (
                              <div
                                key={user.id}
                                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-semibold text-primary">
                                    {user.name
                                      ? user.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()
                                          .slice(0, 2)
                                      : user.email.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">
                                    {user.name || "Unknown"}
                                  </p>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{users.length}</p>
                      <p className="text-sm text-muted-foreground">Total Team Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{Object.keys(groupedByRole).length}</p>
                      <p className="text-sm text-muted-foreground">Departments/Roles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UserCog className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {Math.round(users.length / Object.keys(groupedByRole).length)}
                      </p>
                      <p className="text-sm text-muted-foreground">Avg per Department</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

