"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { processAssistantQuery } from "@/lib/assistant/assistant-service"

export default function ShareTargetPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(true)
  const [response, setResponse] = useState<string | null>(null)
  const [actionType, setActionType] = useState<string | null>(null)

  useEffect(() => {
    async function processSharedContent() {
      try {
        const title = searchParams.get("title") || ""
        const text = searchParams.get("text") || ""
        const url = searchParams.get("url") || ""

        // Combinar el contenido compartido
        const sharedContent = [title, text, url].filter(Boolean).join(" ")

        if (!sharedContent) {
          setResponse("No se ha compartido ningún contenido.")
          setIsProcessing(false)
          return
        }

        // Procesar el contenido compartido con el asistente
        const result = await processAssistantQuery({
          text: sharedContent,
          source: "widget",
          timestamp: Date.now(),
        })

        setResponse(result.text)

        if (result.actionRequired && result.actionType) {
          setActionType(result.actionType)
        }

        setIsProcessing(false)
      } catch (error) {
        console.error("Error processing shared content:", error)
        setResponse("Ha ocurrido un error al procesar el contenido compartido.")
        setIsProcessing(false)
      }
    }

    processSharedContent()
  }, [searchParams])

  const handleAction = () => {
    switch (actionType) {
      case "start_trip":
        router.push("/movilidad?action=start")
        break
      case "end_trip":
        router.push("/movilidad?action=end")
        break
      case "call_emergency":
        router.push("/asistente?section=emergency")
        break
      case "check_coverage":
        router.push("/asistente?section=coverage")
        break
      default:
        router.push("/")
    }
  }

  return (
    <div className="container p-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Asistente SegurApp</CardTitle>
          <CardDescription>Procesando contenido compartido</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isProcessing ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <p className="text-sm">{response}</p>

              <div className="flex justify-end gap-2 pt-4">
                {actionType && (
                  <Button onClick={handleAction}>
                    {actionType === "start_trip" && "Iniciar Viaje"}
                    {actionType === "end_trip" && "Finalizar Viaje"}
                    {actionType === "call_emergency" && "Llamar a Emergencias"}
                    {actionType === "check_coverage" && "Ver Cobertura"}
                  </Button>
                )}
                <Button variant="outline" onClick={() => router.push("/")}>
                  Ir a Inicio
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
