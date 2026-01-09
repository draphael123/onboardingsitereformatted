import { db } from "@/lib/db"
import { TemplatesManager } from "./templates-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getTemplates() {
  return db.roleTemplate.findMany({
    include: {
      sections: {
        include: {
          items: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { role: "asc" },
  })
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Onboarding Templates</h1>
        <p className="text-muted-foreground mt-1">
          Manage role-specific onboarding checklists and tasks.
        </p>
      </div>

      <TemplatesManager templates={templates} />
    </div>
  )
}

