import { Metadata } from "next"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { UsersTable } from "./users-table"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Manage Users | Admin",
  description: "Manage team members and their onboarding progress",
}

export default async function UsersPage() {
  await requireAdmin()

  const users = await db.user.findMany({
    orderBy: [
      { status: "asc" }, // Pending first
      { createdAt: "desc" },
    ],
    include: {
      checklist: {
        include: {
          sections: {
            include: {
              items: {
                select: { status: true },
              },
            },
          },
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground mt-1">
          Create, edit, and manage team member accounts.
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  )
}
