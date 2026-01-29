import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Search, 
  Mail, 
  UserCog,
  Building2,
  Filter
} from "lucide-react"
import { DirectoryClient } from "./directory-client"

export const metadata: Metadata = {
  title: "Employee Directory | Fountain Vitality",
  description: "Search and find team members in the Fountain Vitality organization.",
}

async function getAllUsers() {
  const users = await db.user.findMany({
    where: { status: "APPROVED" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
    orderBy: [
      { role: "asc" },
      { name: "asc" },
    ],
  })

  return users
}

const roleLabels: Record<string, string> = {
  ADMIN: "Administration",
  CS: "Customer Service",
  MA_BACKOFFICE: "Medical Assistant - Back Office",
  RN: "Registered Nurse",
  PROVIDER: "Healthcare Provider",
  MA_PHARMACY: "Medical Assistant - Pharmacy",
  OTHER: "Other",
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  CS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  MA_BACKOFFICE: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  RN: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  PROVIDER: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  MA_PHARMACY: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  OTHER: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
}

export default async function DirectoryPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const users = await getAllUsers()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Employee Directory</h1>
            <p className="text-muted-foreground mt-1">
              Find and connect with team members across Fountain Vitality.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {new Set(users.map((u) => u.role)).size}
                </p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {users.filter((u) => u.name).length}
                </p>
                <p className="text-sm text-muted-foreground">Profiles Complete</p>
              </div>
              <UserCog className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Directory */}
      <DirectoryClient 
        initialUsers={users.map((u) => ({
          id: u.id,
          name: u.name || "Unknown",
          email: u.email,
          role: u.role,
          roleLabel: roleLabels[u.role] || u.role,
          roleColor: roleColors[u.role] || roleColors.OTHER,
          image: u.image,
        }))}
      />
    </div>
  )
}




