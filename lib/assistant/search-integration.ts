// Este archivo maneja la integración con la búsqueda del dispositivo

import { processAssistantQuery, type AssistantQuery } from "./assistant-service"

// Interfaz para manejar consultas desde la búsqueda del dispositivo
export interface SearchQuery {
  query: string
  source: "spotlight" | "android-search"
}

// Función para procesar consultas desde la búsqueda del dispositivo
export async function processSearchQuery(searchQuery: SearchQuery): Promise<{
  responseText: string
  deepLink?: string
}> {
  // Convertir la consulta de búsqueda a una consulta para el asistente
  const assistantQuery: AssistantQuery = {
    text: searchQuery.query,
    source: "search",
    timestamp: Date.now(),
  }

  // Procesar la consulta con el servicio del asistente
  const response = await processAssistantQuery(assistantQuery)

  // Generar deeplink según la acción requerida
  let deepLink: string | undefined

  if (response.actionRequired && response.actionType) {
    switch (response.actionType) {
      case "open_app":
        deepLink = "segurapp://assistant"
        break
      case "call_emergency":
        deepLink = "segurapp://emergency"
        break
      case "check_coverage":
        deepLink = "segurapp://coverage"
        break
      case "start_trip":
        deepLink = "segurapp://mobility/start-trip"
        break
      case "end_trip":
        deepLink = "segurapp://mobility/end-trip"
        break
      default:
        deepLink = "segurapp://"
    }
  }

  return {
    responseText: response.text,
    deepLink,
  }
}

// Contenido indexable para la búsqueda del dispositivo
export const searchableContent = [
  {
    title: "Iniciar Viaje",
    description: "Inicia un viaje y activa la cobertura de viaje",
    keywords: ["viaje", "iniciar", "cobertura", "conducir", "manejo"],
    deepLink: "segurapp://mobility/start-trip",
  },
  {
    title: "Finalizar Viaje",
    description: "Finaliza tu viaje actual",
    keywords: ["viaje", "finalizar", "terminar", "conducir", "manejo"],
    deepLink: "segurapp://mobility/end-trip",
  },
  {
    title: "Asistencia de Emergencia",
    description: "Obtén asistencia inmediata en caso de emergencia",
    keywords: ["emergencia", "ayuda", "asistencia", "urgente", "accidente"],
    deepLink: "segurapp://emergency",
  },
  {
    title: "Verificar Cobertura",
    description: "Consulta los detalles de tu cobertura actual",
    keywords: ["cobertura", "póliza", "seguro", "verificar", "consultar"],
    deepLink: "segurapp://coverage",
  },
  {
    title: "Estado de Salud",
    description: "Revisa tu estado de salud y actividad física",
    keywords: ["salud", "actividad", "pasos", "corazón", "bienestar"],
    deepLink: "segurapp://vitality",
  },
  {
    title: "Asistente Virtual",
    description: "Habla con Jarvis, tu asistente virtual",
    keywords: ["asistente", "jarvis", "ayuda", "consulta", "preguntar"],
    deepLink: "segurapp://assistant",
  },
]
