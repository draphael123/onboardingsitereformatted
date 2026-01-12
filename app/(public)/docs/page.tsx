import { Metadata } from "next"
import Link from "next/link"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink, FolderOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources & Documents | Fountain Vitality",
  description: "Access important documents and resources for Fountain Vitality team members.",
}

interface PublicDoc {
  id: string
  title: string
  description: string | null
  url: string
  category: string
  order: number
}

async function getPublicDocs(): Promise<PublicDoc[]> {
  try {
    const docs = await db.publicDoc.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    })
    return docs
  } catch {
    // Return default docs if database is not available
    return [
      {
        id: "1",
        title: "Employee Handbook",
        description: "Comprehensive guide covering company policies, procedures, and expectations for all team members.",
        url: "#",
        category: "Policies",
        order: 0,
      },
      {
        id: "2",
        title: "Code of Conduct",
        description: "Our ethical guidelines and professional standards that all employees are expected to follow.",
        url: "#",
        category: "Policies",
        order: 1,
      },
      {
        id: "3",
        title: "HIPAA Compliance Guide",
        description: "Essential information about patient privacy regulations and how to maintain compliance.",
        url: "#",
        category: "Compliance",
        order: 0,
      },
    ]
  }
}

// Group docs by category
function groupByCategory(docs: PublicDoc[]) {
  const grouped: Record<string, PublicDoc[]> = {}
  for (const doc of docs) {
    const category = doc.category || "General"
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(doc)
  }
  return grouped
}

const categoryColors: Record<string, string> = {
  Policies: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Compliance: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  Safety: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  HR: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  IT: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  General: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
}

export default async function DocsPage() {
  const docs = await getPublicDocs()
  const groupedDocs = groupByCategory(docs)
  const categories = Object.keys(groupedDocs)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <FolderOpen className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Resources & <span className="text-primary">Documents</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Access important documents, policies, and resources to help you succeed at Fountain Vitality.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No documents available at the moment. Please check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="font-display text-2xl font-bold">{category}</h2>
                    <Badge 
                      variant="secondary"
                      className={categoryColors[category] || categoryColors.General}
                    >
                      {groupedDocs[category].length} {groupedDocs[category].length === 1 ? 'document' : 'documents'}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedDocs[category].map((doc) => (
                      <Card 
                        key={doc.id}
                        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <CardTitle className="text-lg mt-4">{doc.title}</CardTitle>
                          <CardDescription>{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                          >
                            View Document
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Need a Document?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? Contact HR and they&apos;ll help you locate the right resource.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
            >
              Contact HR
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

