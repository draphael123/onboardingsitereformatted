"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FountainLogo } from "@/components/ui/fountain-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SearchCommand } from "@/components/ui/search-command"
import { NotificationsDropdown } from "@/components/app/notifications-dropdown"
import { 
  LayoutDashboard, 
  CheckSquare, 
  LogOut,
  Settings,
  Menu,
  X,
  User,
  Users
} from "lucide-react"
import { useState } from "react"
import type { Role, NotificationType } from "@prisma/client"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  link: string | null
  createdAt: Date
}

interface AppHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    role: Role
  }
  notifications?: Notification[]
  unreadCount?: number
}

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/app/directory", label: "Directory", icon: Users },
  { href: "/app/settings", label: "Settings", icon: Settings },
]

export function AppHeader({ user, notifications = [], unreadCount = 0 }: AppHeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/app" className="flex items-center group transition-transform hover:scale-[1.02]">
            <FountainLogo 
              showText={true} 
              textClassName="font-display hidden sm:inline-block" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Directory Button - Prominent */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:flex gap-2"
          >
            <Link href="/app/directory">
              <Users className="h-4 w-4" />
              Directory
            </Link>
          </Button>

          {/* Search */}
          <div className="hidden md:flex">
            <SearchCommand isAuthenticated isAdmin={user.role === "ADMIN"} />
          </div>

          {/* Notifications */}
          <NotificationsDropdown
            initialNotifications={notifications}
            initialUnreadCount={unreadCount}
          />

          {/* Theme Toggle */}
          <ThemeToggle variant="toggle" />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Role: {user.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/app/settings" className="w-full cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              {user.role === "ADMIN" && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="w-full cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-sm z-40 transition-all duration-300 ease-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="container flex flex-col py-6 px-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-4 text-lg font-medium rounded-lg transition-all",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent/50",
                "transform transition-all duration-300",
                isMenuOpen 
                  ? "translate-x-0 opacity-100" 
                  : "-translate-x-4 opacity-0",
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 px-4 py-4 text-lg font-medium rounded-lg transition-all",
                "text-foreground hover:bg-accent/50",
                "transform transition-all duration-300",
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
              )}
              style={{ transitionDelay: `${navItems.length * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              Admin Dashboard
            </Link>
          )}
          <div className="pt-6 mt-4 border-t">
            <Button 
              variant="destructive" 
              className="w-full" 
              size="lg"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
