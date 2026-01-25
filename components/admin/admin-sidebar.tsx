"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FountainLogoIcon } from "@/components/ui/fountain-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FileText,
  LogOut,
  ChevronLeft,
  BarChart3
} from "lucide-react"

const sidebarItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/templates", label: "Templates", icon: ClipboardList },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/30">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fountain-500 to-ocean-500 text-white shadow-md">
            <FountainLogoIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display font-semibold">Admin</span>
            <p className="text-xs text-muted-foreground">Fountain</p>
          </div>
        </div>
        <ThemeToggle variant="toggle" />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-gradient-to-r from-fountain-500 to-ocean-500 text-white shadow-md"
                  : "text-muted-foreground hover:bg-fountain-50 dark:hover:bg-fountain-950/50 hover:text-fountain-600 dark:hover:text-fountain-400"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Link
          href="/app"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-fountain-50 dark:hover:bg-fountain-950/50 hover:text-fountain-600 dark:hover:text-fountain-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to App
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-coral-500 hover:text-coral-600 hover:bg-coral-50 dark:hover:bg-coral-950/30"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
