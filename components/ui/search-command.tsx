"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Search,
  Home,
  FileText,
  HelpCircle,
  Mail,
  LayoutDashboard,
  CheckSquare,
  Settings,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react"

interface SearchCommandProps {
  isAdmin?: boolean
  isAuthenticated?: boolean
}

export function SearchCommand({ isAdmin = false, isAuthenticated = false }: SearchCommandProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Public Pages */}
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/programs"))}>
              <FileText className="mr-2 h-4 w-4" />
              Programs
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
              <FileText className="mr-2 h-4 w-4" />
              About Us
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/faqs"))}>
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQs
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/docs"))}>
              <FileText className="mr-2 h-4 w-4" />
              Resources
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/contact"))}>
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </CommandItem>
          </CommandGroup>

          {/* Authenticated Pages */}
          {isAuthenticated && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Dashboard">
                <CommandItem onSelect={() => runCommand(() => router.push("/app"))}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/app/checklist"))}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  My Checklist
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/app/settings"))}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </CommandItem>
              </CommandGroup>
            </>
          )}

          {/* Admin Pages */}
          {isAdmin && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Admin">
                <CommandItem onSelect={() => runCommand(() => router.push("/admin"))}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/admin/users"))}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/admin/templates"))}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Manage Templates
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/admin/content"))}>
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Content
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/admin/analytics"))}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

