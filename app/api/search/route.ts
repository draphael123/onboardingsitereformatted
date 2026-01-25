import { NextRequest, NextResponse } from "next/server"
import { globalSearch } from "@/lib/search"
import { auth } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] })
    }

    const results = await globalSearch(query, session?.user?.id)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}

