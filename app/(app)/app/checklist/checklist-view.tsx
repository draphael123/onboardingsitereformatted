"use client"

import { useState, useTransition } from "react"
import { updateItemStatus } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { cn, formatDate } from "@/lib/utils"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink, 
  Search,
  ChevronDown,
  ChevronRight,
  FileText
} from "lucide-react"
import type { Role, ItemStatus } from "@prisma/client"

interface ChecklistItem {
  id: string
  title: string
  description: string | null
  linkUrl: string | null
  fileUrl: string | null
  dueDate: Date | null
  status: ItemStatus
  completedAt: Date | null
  stableKey: string
  order: number
}

interface ChecklistSection {
  id: string
  title: string
  order: number
  items: ChecklistItem[]
}

interface ChecklistViewProps {
  checklist: {
    id: string
    sections: ChecklistSection[]
  } | null
  progress: {
    total: number
    completed: number
    inProgress: number
    notStarted: number
    percentage: number
  }
  userRole: Role
}

const statusConfig = {
  NOT_STARTED: {
    label: "Not Started",
    icon: Circle,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    badge: "outline" as const,
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    badge: "warning" as const,
  },
  COMPLETE: {
    label: "Complete",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    badge: "success" as const,
  },
}

export function ChecklistView({ checklist, progress, userRole }: ChecklistViewProps) {
  const [filter, setFilter] = useState<"all" | ItemStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(checklist?.sections.map((s) => s.id) || [])
  )
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  if (!checklist) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            No checklist found. Please contact your administrator.
          </p>
        </CardContent>
      </Card>
    )
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const handleStatusChange = async (itemId: string, newStatus: ItemStatus) => {
    startTransition(async () => {
      const result = await updateItemStatus(itemId, newStatus)
      if (result.success) {
        toast({
          variant: "success",
          title: "Task Updated",
          description: `Task marked as ${statusConfig[newStatus].label.toLowerCase()}`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to update task status",
        })
      }
    })
  }

  const getNextStatus = (current: ItemStatus): ItemStatus => {
    if (current === "NOT_STARTED") return "IN_PROGRESS"
    if (current === "IN_PROGRESS") return "COMPLETE"
    return "NOT_STARTED"
  }

  // Filter items based on search and status filter
  const filteredSections = checklist.sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      const matchesFilter = filter === "all" || item.status === filter
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    }),
  })).filter((section) => section.items.length > 0)

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">
                  {progress.percentage}%
                </span>
                <span className="text-muted-foreground">complete</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {progress.completed} of {progress.total} tasks completed
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>{progress.completed} Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>{progress.inProgress} In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span>{progress.notStarted} Not Started</span>
              </div>
            </div>
          </div>
          <Progress value={progress.percentage} className="mt-4 h-3" />
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="NOT_STARTED">Not Started</TabsTrigger>
            <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
            <TabsTrigger value="COMPLETE">Complete</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Sections */}
      {filteredSections.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No tasks match your current filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSections.map((section) => {
            const sectionCompleted = section.items.filter(
              (i) => i.status === "COMPLETE"
            ).length
            const isExpanded = expandedSections.has(section.id)

            return (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                    <Badge variant="secondary">
                      {sectionCompleted} / {section.items.length}
                    </Badge>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="divide-y">
                      {section.items.map((item) => {
                        const config = statusConfig[item.status]
                        const StatusIcon = config.icon

                        return (
                          <div
                            key={item.id}
                            className={cn(
                              "py-4 first:pt-0 last:pb-0 transition-colors",
                              isPending && "opacity-50"
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() =>
                                  handleStatusChange(item.id, getNextStatus(item.status))
                                }
                                disabled={isPending}
                                className={cn(
                                  "mt-0.5 rounded-full p-1 transition-colors",
                                  config.bgColor,
                                  "hover:opacity-80"
                                )}
                              >
                                <StatusIcon className={cn("h-5 w-5", config.color)} />
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4
                                      className={cn(
                                        "font-medium",
                                        item.status === "COMPLETE" &&
                                          "line-through text-muted-foreground"
                                      )}
                                    >
                                      {item.title}
                                    </h4>
                                    {item.description && (
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {item.description}
                                      </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                      {item.dueDate && (
                                        <span className="text-xs text-muted-foreground">
                                          Due: {formatDate(item.dueDate)}
                                        </span>
                                      )}
                                      {item.completedAt && (
                                        <span className="text-xs text-green-600">
                                          Completed: {formatDate(item.completedAt)}
                                        </span>
                                      )}
                                      {item.linkUrl && (
                                        <a
                                          href={item.linkUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center text-xs text-primary hover:underline"
                                        >
                                          <ExternalLink className="h-3 w-3 mr-1" />
                                          Open Resource
                                        </a>
                                      )}
                                      {item.fileUrl && (
                                        <a
                                          href={item.fileUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center text-xs text-primary hover:underline"
                                        >
                                          <FileText className="h-3 w-3 mr-1" />
                                          View File
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  <Badge variant={config.badge}>{config.label}</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

