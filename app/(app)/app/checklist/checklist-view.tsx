"use client"

import { useState, useTransition, useRef } from "react"
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
  FileText,
  Printer,
  Download,
  FileJson,
  FileSpreadsheet
} from "lucide-react"
import { exportToCSV, exportToJSON, downloadFile } from "@/lib/export"
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
    printSymbol: "○",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    badge: "warning" as const,
    printSymbol: "◐",
  },
  COMPLETE: {
    label: "Complete",
    icon: CheckCircle2,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    badge: "success" as const,
    printSymbol: "●",
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
  const printRef = useRef<HTMLDivElement>(null)

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

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast({
        variant: "destructive",
        title: "Print Error",
        description: "Please allow pop-ups to print your checklist.",
      })
      return
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Onboarding Checklist - ${userRole}</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              color: #1a1a1a;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e5e5;
            }
            .header h1 {
              font-size: 24px;
              margin-bottom: 8px;
              color: #0066cc;
            }
            .header p {
              color: #666;
              font-size: 14px;
            }
            .progress-bar {
              background: #e5e5e5;
              border-radius: 10px;
              height: 20px;
              margin: 15px 0;
              overflow: hidden;
            }
            .progress-fill {
              background: #0066cc;
              height: 100%;
              border-radius: 10px;
            }
            .stats {
              display: flex;
              justify-content: center;
              gap: 30px;
              margin-top: 15px;
              font-size: 14px;
            }
            .stat {
              text-align: center;
            }
            .stat-value {
              font-weight: bold;
              font-size: 18px;
            }
            .section {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
            .section-header {
              background: #f5f5f5;
              padding: 12px 16px;
              border-radius: 8px;
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .section-title {
              font-weight: 600;
              font-size: 16px;
            }
            .section-count {
              background: #e5e5e5;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
            }
            .item {
              padding: 12px 16px;
              border-bottom: 1px solid #eee;
              display: flex;
              gap: 12px;
              page-break-inside: avoid;
            }
            .item:last-child {
              border-bottom: none;
            }
            .item-status {
              font-size: 16px;
              width: 24px;
              text-align: center;
            }
            .item-content {
              flex: 1;
            }
            .item-title {
              font-weight: 500;
            }
            .item-title.complete {
              text-decoration: line-through;
              color: #888;
            }
            .item-description {
              font-size: 13px;
              color: #666;
              margin-top: 4px;
            }
            .item-meta {
              font-size: 12px;
              color: #888;
              margin-top: 6px;
            }
            .item-badge {
              font-size: 11px;
              padding: 2px 8px;
              border-radius: 10px;
              background: #e5e5e5;
            }
            .item-badge.complete {
              background: #d4edda;
              color: #155724;
            }
            .item-badge.in-progress {
              background: #fff3cd;
              color: #856404;
            }
            .legend {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e5e5e5;
              font-size: 12px;
              color: #666;
            }
            .legend-items {
              display: flex;
              gap: 20px;
              margin-top: 8px;
            }
            .legend-item {
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #888;
            }
            @media print {
              body {
                padding: 20px;
              }
              .section {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🌊 Fountain Vitality Onboarding Checklist</h1>
            <p>${userRole} Role • Printed on ${new Date().toLocaleDateString()}</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress.percentage}%"></div>
            </div>
            <div class="stats">
              <div class="stat">
                <div class="stat-value">${progress.percentage}%</div>
                <div>Complete</div>
              </div>
              <div class="stat">
                <div class="stat-value">${progress.completed}</div>
                <div>Done</div>
              </div>
              <div class="stat">
                <div class="stat-value">${progress.inProgress}</div>
                <div>In Progress</div>
              </div>
              <div class="stat">
                <div class="stat-value">${progress.notStarted}</div>
                <div>To Do</div>
              </div>
            </div>
          </div>

          ${checklist.sections
            .map((section) => {
              const sectionCompleted = section.items.filter(
                (i) => i.status === "COMPLETE"
              ).length
              return `
              <div class="section">
                <div class="section-header">
                  <span class="section-title">${section.title}</span>
                  <span class="section-count">${sectionCompleted}/${section.items.length}</span>
                </div>
                ${section.items
                  .map((item) => {
                    const config = statusConfig[item.status]
                    return `
                    <div class="item">
                      <div class="item-status">${config.printSymbol}</div>
                      <div class="item-content">
                        <div class="item-title ${item.status === 'COMPLETE' ? 'complete' : ''}">${item.title}</div>
                        ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                        <div class="item-meta">
                          <span class="item-badge ${item.status === 'COMPLETE' ? 'complete' : item.status === 'IN_PROGRESS' ? 'in-progress' : ''}">${config.label}</span>
                          ${item.dueDate ? ` • Due: ${new Date(item.dueDate).toLocaleDateString()}` : ''}
                          ${item.completedAt ? ` • Completed: ${new Date(item.completedAt).toLocaleDateString()}` : ''}
                        </div>
                      </div>
                    </div>
                  `
                  })
                  .join("")}
              </div>
            `
            })
            .join("")}

          <div class="legend">
            <strong>Legend:</strong>
            <div class="legend-items">
              <div class="legend-item">○ Not Started</div>
              <div class="legend-item">◐ In Progress</div>
              <div class="legend-item">● Complete</div>
            </div>
          </div>

          <div class="footer">
            <p>Fountain Vitality • fountain.net</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

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
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
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
              {/* Export Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="gap-2 print:hidden"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const csv = exportToCSV({
                      sections: checklist.sections,
                      progress,
                      userRole,
                    })
                    downloadFile(csv, `checklist-${userRole}-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')
                  }}
                  className="gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const json = exportToJSON({
                      sections: checklist.sections,
                      progress,
                      userRole,
                    })
                    downloadFile(json, `checklist-${userRole}-${new Date().toISOString().split('T')[0]}.json`, 'application/json')
                  }}
                  className="gap-2"
                >
                  <FileJson className="h-4 w-4" />
                  JSON
                </Button>
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
      <div ref={printRef}>
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
                                          <span className="text-xs text-blue-600">
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
    </div>
  )
}
