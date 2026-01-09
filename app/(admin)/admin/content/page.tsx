import { db } from "@/lib/db"
import { ContentManager } from "./content-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getContent() {
  const [docs, faqs] = await Promise.all([
    db.publicDoc.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
    db.fAQ.findMany({ orderBy: { order: "asc" } }),
  ])
  return { docs, faqs }
}

export default async function ContentPage() {
  const { docs, faqs } = await getContent()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage public documents and FAQs displayed on the website.
        </p>
      </div>

      <ContentManager docs={docs} faqs={faqs} />
    </div>
  )
}

