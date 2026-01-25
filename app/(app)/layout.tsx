import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AppHeader } from "@/components/app/app-header"
import { KeyboardShortcutsProvider } from "@/components/providers/keyboard-shortcuts-provider"
import { db } from "@/lib/db"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Check if user is approved
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { status: true },
  })

  if (user?.status === "PENDING") {
    redirect("/pending-approval")
  }

  if (user?.status === "REJECTED") {
    redirect("/account-rejected")
  }

  // Get notifications
  const notifications = await db.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  const unreadCount = await db.notification.count({
    where: {
      userId: session.user.id,
      read: false,
    },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader 
        user={session.user} 
        notifications={notifications}
        unreadCount={unreadCount}
      />
      <main className="flex-1 container py-8 px-4 md:px-6">{children}</main>
      <KeyboardShortcutsProvider />
    </div>
  )
}
