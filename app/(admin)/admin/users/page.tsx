import { Suspense } from "react"
import { db } from "@/lib/db"
import { UsersTable } from "./users-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

async function getUsers() {
  return db.user.findMany({
    orderBy: { createdAt: "desc" },
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
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">
          Create, edit, and manage user accounts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage team members and their onboarding status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoadingSkeleton />}>
            <UsersTable users={users} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

