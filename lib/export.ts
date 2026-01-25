/**
 * Export checklist data to various formats
 */

interface ChecklistItem {
  id: string
  title: string
  description: string | null
  status: string
  dueDate: Date | null
  completedAt: Date | null
}

interface ChecklistSection {
  title: string
  items: ChecklistItem[]
}

interface ChecklistData {
  sections: ChecklistSection[]
  progress: {
    total: number
    completed: number
    percentage: number
  }
  userRole: string
  userName?: string
}

/**
 * Export checklist to CSV format
 */
export function exportToCSV(data: ChecklistData): string {
  const rows: string[] = []
  
  // Header
  rows.push("Section,Task,Status,Due Date,Completed Date,Description")
  
  // Data rows
  data.sections.forEach((section) => {
    section.items.forEach((item) => {
      const row = [
        `"${section.title}"`,
        `"${item.title}"`,
        `"${item.status}"`,
        item.dueDate ? `"${new Date(item.dueDate).toLocaleDateString()}"` : "",
        item.completedAt ? `"${new Date(item.completedAt).toLocaleDateString()}"` : "",
        `"${(item.description || "").replace(/"/g, '""')}"`,
      ]
      rows.push(row.join(","))
    })
  })
  
  return rows.join("\n")
}

/**
 * Export checklist to JSON format
 */
export function exportToJSON(data: ChecklistData): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      user: data.userName,
      role: data.userRole,
      progress: data.progress,
      sections: data.sections.map((section) => ({
        title: section.title,
        items: section.items.map((item) => ({
          title: item.title,
          description: item.description,
          status: item.status,
          dueDate: item.dueDate,
          completedAt: item.completedAt,
        })),
      })),
    },
    null,
    2
  )
}

/**
 * Download file with given content and filename
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}


