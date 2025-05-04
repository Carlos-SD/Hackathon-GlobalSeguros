import { NextResponse } from "next/server"
import { processSearchQuery } from "@/lib/assistant/search-integration"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const query = url.searchParams.get("q")
    const source = url.searchParams.get("source") as "spotlight" | "android-search"

    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 })
    }

    if (!source || (source !== "spotlight" && source !== "android-search")) {
      return NextResponse.json(
        { error: "Valid source parameter is required (spotlight or android-search)" },
        { status: 400 },
      )
    }

    // Procesar la consulta de búsqueda
    const result = await processSearchQuery({
      query,
      source,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing search query:", error)
    return NextResponse.json({ error: "Failed to process search query" }, { status: 500 })
  }
}
