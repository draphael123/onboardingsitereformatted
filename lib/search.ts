import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export interface SearchResult {
  type: "task" | "document" | "faq" | "user" | "section"
  id: string
  title: string
  description?: string
  url: string
  metadata?: Record<string, any>
}

/**
 * Global search across all content types
 */
export async function globalSearch(query: string, userId?: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return []
  }

  const searchTerm = query.toLowerCase().trim()
  const results: SearchResult[] = []

  const session = userId ? await auth() : null

  // Search user's checklist tasks
  if (session?.user) {
    const checklist = await db.userChecklist.findUnique({
      where: { userId: session.user.id },
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    })

    if (checklist) {
      for (const section of checklist.sections) {
        // Search section titles
        if (section.title.toLowerCase().includes(searchTerm)) {
          results.push({
            type: "section",
            id: section.id,
            title: section.title,
            description: `Section with ${section.items.length} tasks`,
            url: `/app/checklist#section-${section.id}`,
            metadata: { sectionId: section.id },
          })
        }

        // Search task items
        for (const item of section.items) {
          const matchesTitle = item.title.toLowerCase().includes(searchTerm)
          const matchesDescription = item.description?.toLowerCase().includes(searchTerm)

          if (matchesTitle || matchesDescription) {
            results.push({
              type: "task",
              id: item.id,
              title: item.title,
              description: item.description || undefined,
              url: `/app/checklist#item-${item.id}`,
              metadata: {
                sectionId: section.id,
                sectionTitle: section.title,
                status: item.status,
                itemId: item.id,
              },
            })
          }
        }
      }
    }
  }

  // Search public documents
  const documents = await db.publicDoc.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { category: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    take: 10,
  })

  for (const doc of documents) {
    results.push({
      type: "document",
      id: doc.id,
      title: doc.title,
      description: doc.description || undefined,
      url: doc.url,
      metadata: { category: doc.category },
    })
  }

  // Search FAQs
  const faqs = await db.fAQ.findMany({
    where: {
      OR: [
        { question: { contains: searchTerm, mode: "insensitive" } },
        { answer: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    take: 10,
  })

  for (const faq of faqs) {
    results.push({
      type: "faq",
      id: faq.id,
      title: faq.question,
      description: faq.answer.substring(0, 150) + (faq.answer.length > 150 ? "..." : ""),
      url: `/faqs#faq-${faq.id}`,
    })
  }

  // Search users (admin only)
  if (session?.user?.role === "ADMIN") {
    const users = await db.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      take: 10,
    })

    for (const user of users) {
      results.push({
        type: "user",
        id: user.id,
        title: user.name || user.email,
        description: `${user.role} • ${user.email}`,
        url: `/admin/users?userId=${user.id}`,
        metadata: { role: user.role, email: user.email },
      })
    }
  }

  // Sort by relevance (exact matches first, then partial)
  return results.sort((a, b) => {
    const aExact = a.title.toLowerCase() === searchTerm
    const bExact = b.title.toLowerCase() === searchTerm
    if (aExact && !bExact) return -1
    if (!aExact && bExact) return 1

    const aStarts = a.title.toLowerCase().startsWith(searchTerm)
    const bStarts = b.title.toLowerCase().startsWith(searchTerm)
    if (aStarts && !bStarts) return -1
    if (!aStarts && bStarts) return 1

    return 0
  })
}

/**
 * Quick search for command palette (faster, limited results)
 */
export async function quickSearch(query: string, userId?: string): Promise<SearchResult[]> {
  const results = await globalSearch(query, userId)
  return results.slice(0, 8) // Limit to 8 results for command palette
}




