import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ProfileSettings } from "./profile-settings"

export const metadata: Metadata = {
  title: "Settings | Fountain",
  description: "Manage your account settings",
}

export default async function SettingsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <ProfileSettings user={user} />
    </div>
  )
}

