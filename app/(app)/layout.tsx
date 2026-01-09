import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AppHeader } from "@/components/app/app-header"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={session.user} />
      <main className="flex-1 container px-4 md:px-6 py-8">{children}</main>
    </div>
  )
}

