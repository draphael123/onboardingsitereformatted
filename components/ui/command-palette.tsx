"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command as CommandPrimitive } from "cmdk"
import { Search, FileText, CheckSquare, HelpCircle, Users, FolderOpen, Loader2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface SearchResult {
  type: "task" | "document" | "faq" | "user" | "section"
  id: string
  title: string
  description?: string
  url: string
  metadata?: Record<string, any>
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeIcons = {
  task: CheckSquare,
  document: FileText,
  faq: HelpCircle,
  user: Users,
  section: FolderOpen,
}

const typeLabels = {
  task: "Task",
  document: "Document",
  faq: "FAQ",
  user: "User",
  section: "Section",
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const handleSearch = async () => {
      if (search.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(search)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data.results || [])
        }
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(handleSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [search])

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false)
    setSearch("")
    router.push(result.url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <CommandPrimitive shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search tasks, documents, FAQs..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <ScrollArea className="max-h-[300px]">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
              {search.length < 2
                ? "Type at least 2 characters to search"
                : loading
                ? "Searching..."
                : "No results found."}
            </CommandPrimitive.Empty>
            <CommandPrimitive.Group>
              {results.map((result) => {
                const Icon = typeIcons[result.type] || FileText
                return (
                  <CommandPrimitive.Item
                    key={`${result.type}-${result.id}`}
                    value={`${result.type}-${result.id}`}
                    onSelect={() => handleSelect(result)}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{result.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {typeLabels[result.type]}
                        </Badge>
                      </div>
                      {result.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {result.description}
                        </p>
                      )}
                      {result.metadata?.sectionTitle && (
                        <p className="text-xs text-muted-foreground">
                          Section: {result.metadata.sectionTitle}
                        </p>
                      )}
                    </div>
                  </CommandPrimitive.Item>
                )
              })}
            </CommandPrimitive.Group>
          </ScrollArea>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Hook to use command palette with keyboard shortcut
 */
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

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

  return { open, setOpen }
}

