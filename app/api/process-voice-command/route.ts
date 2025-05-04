import { NextResponse } from "next/server"
import { processVoiceCommand } from "@/lib/assistant/voice-assistant-bridge"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { command, source, parameters } = body

    if (!command || !source) {
      return NextResponse.json({ error: "Command and source are required" }, { status: 400 })
    }

    // Validar la fuente
    if (source !== "siri" && source !== "google-assistant") {
      return NextResponse.json({ error: 'Invalid source. Must be "siri" or "google-assistant"' }, { status: 400 })
    }

    // Procesar el comando de voz
    const result = await processVoiceCommand({
      command,
      parameters,
      source,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing voice command:", error)
    return NextResponse.json({ error: "Failed to process voice command" }, { status: 500 })
  }
}
