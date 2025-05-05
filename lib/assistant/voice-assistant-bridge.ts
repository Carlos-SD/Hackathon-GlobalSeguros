// Este archivo maneja la integración con asistentes de voz nativos

import { processAssistantQuery, type AssistantQuery } from "./assistant-service"

// Interfaz para manejar comandos de voz desde asistentes nativos
export interface VoiceCommand {
  command: string
  parameters?: Record<string, string>
  source: "siri" | "google-assistant"
}

// Función para procesar comandos de voz desde asistentes nativos
export async function processVoiceCommand(voiceCommand: VoiceCommand): Promise<{
  responseText: string
  shouldOpenApp: boolean
  actionType?: string
}> {
  // Convertir el comando de voz a una consulta para el asistente
  const assistantQuery: AssistantQuery = {
    text: voiceCommand.command,
    source: voiceCommand.source,
    timestamp: Date.now(),
  }

  // Procesar la consulta con el servicio del asistente
  const response = await processAssistantQuery(assistantQuery)

  // Determinar si se debe abrir la aplicación
  const shouldOpenApp =
    response.actionRequired &&
    (response.actionType === "open_app" ||
      response.actionType === "call_emergency" ||
      response.actionType === "check_coverage" ||
      response.actionType === "start_trip" ||
      response.actionType === "end_trip")

  return {
    responseText: response.text,
    shouldOpenApp,
    actionType: response.actionType,
  }
}

// Definición de los comandos de voz disponibles para Siri
export const siriShortcuts = [
  {
    name: "Iniciar Viaje",
    phrase: "Iniciar viaje con SegurApp",
    command: "iniciar viaje",
  },
  {
    name: "Finalizar Viaje",
    phrase: "Finalizar viaje con SegurApp",
    command: "finalizar viaje",
  },
  {
    name: "Verificar Cobertura",
    phrase: "Verificar mi cobertura en SegurApp",
    command: "verificar cobertura",
  },
  {
    name: "Asistencia de Emergencia",
    phrase: "Necesito asistencia de emergencia con SegurApp",
    command: "necesito asistencia de emergencia",
  },
  {
    name: "Estado de Salud",
    phrase: "Verificar mi estado de salud en SegurApp",
    command: "verificar estado de salud",
  },
]

// Definición de los comandos de voz disponibles para Google Assistant
export const googleAssistantActions = [
  {
    name: "Iniciar Viaje",
    invocation: "iniciar viaje con SegurApp",
    command: "iniciar viaje",
  },
  {
    name: "Finalizar Viaje",
    invocation: "finalizar viaje con SegurApp",
    command: "finalizar viaje",
  },
  {
    name: "Verificar Cobertura",
    invocation: "verificar mi cobertura en SegurApp",
    command: "verificar cobertura",
  },
  {
    name: "Asistencia de Emergencia",
    invocation: "necesito asistencia de emergencia con SegurApp",
    command: "necesito asistencia de emergencia",
  },
  {
    name: "Estado de Salud",
    invocation: "verificar mi estado de salud en SegurApp",
    command: "verificar estado de salud",
  },
]
