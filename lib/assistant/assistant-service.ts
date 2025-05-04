import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase-config"
import { insuranceTypes } from "../services/insurance-service"

export interface AssistantQuery {
  text: string
  source: "app" | "siri" | "google-assistant" | "search" | "widget"
  timestamp: number
}

export interface AssistantResponse {
  text: string
  timestamp: number
  actionRequired?: boolean
  actionType?: "open_app" | "call_emergency" | "check_coverage" | "start_trip" | "end_trip" | "view_insurance"
  actionData?: Record<string, any>
}

// Colección de respuestas predefinidas por categoría
const responses = {
  greeting: [
    "Hola, soy Jarvis de GlobalSeguros. ¿En qué puedo ayudarte hoy?",
    "Bienvenido a GlobalSeguros. Estoy aquí para asistirte.",
    "¿Cómo puedo ayudarte con tu seguridad y bienestar hoy?",
  ],
  coverage: [
    "Tu póliza actual incluye cobertura para accidentes personales y asistencia en viajes.",
    "Estás cubierto para emergencias médicas y asistencia en carretera.",
    "Tu cobertura básica incluye protección contra robo y daños a terceros.",
  ],
  emergency: [
    "Para asistencia de emergencia, puedo iniciar una llamada al número de emergencias. ¿Deseas que lo haga?",
    "Si estás en una situación de emergencia, puedo conectarte con nuestro servicio de asistencia 24/7.",
    "¿Necesitas asistencia inmediata? Puedo ayudarte a contactar con emergencias.",
  ],
  trip: [
    "Puedo iniciar un registro de viaje para ti. ¿Quieres comenzar un viaje ahora?",
    "¿Deseas que active la protección de viaje en este momento?",
    "Puedo registrar tu viaje actual para asegurar que estés protegido durante el trayecto.",
  ],
  health: [
    "Tus datos de salud muestran una actividad normal. Has dado 6,248 pasos hoy.",
    "Tu frecuencia cardíaca promedio hoy es de 72 bpm, dentro de tu rango normal.",
    "Según tus datos recientes, tu nivel de actividad física está dentro de lo recomendado.",
  ],
  life_insurance: [
    "Nuestro seguro de vida te permite proteger el bienestar económico de tus seres queridos en caso de fallecimiento.",
    "Con el seguro de vida de GlobalSeguros, puedes asegurar el futuro financiero de tu familia.",
    "El seguro de vida ofrece tranquilidad sabiendo que tus seres queridos estarán protegidos económicamente.",
  ],
  accident_insurance: [
    "El seguro de accidentes personales te protege económicamente en caso de lesiones accidentales.",
    "Con nuestra cobertura de accidentes, recibirás indemnización por gastos médicos y hospitalarios derivados de un accidente.",
    "El seguro de accidentes personales es ideal para complementar tu seguro de salud con protección específica para eventos accidentales.",
  ],
  pension_insurance: [
    "El seguro de pensión voluntaria te ayuda a construir un fondo para tu retiro de manera planificada.",
    "Con nuestro plan de pensión voluntaria, podrás disfrutar de una jubilación tranquila y económicamente estable.",
    "La pensión voluntaria te permite complementar tu pensión obligatoria para mantener tu nivel de vida después del retiro.",
  ],
  income_insurance: [
    "El seguro de rentas voluntarias te garantiza un ingreso periódico según tus necesidades futuras.",
    "Con este seguro, puedes planificar ingresos adicionales para momentos específicos de tu vida.",
    "Las rentas voluntarias son ideales para asegurar flujos de efectivo para proyectos o gastos futuros.",
  ],
  annuity_insurance: [
    "La renta vitalicia te garantiza un ingreso periódico de por vida, sin importar cuánto vivas.",
    "Con este seguro, tendrás la tranquilidad de contar con un ingreso fijo mensual durante toda tu vejez.",
    "La renta vitalicia es perfecta para quienes buscan seguridad financiera permanente después de la jubilación.",
  ],
  auto_insurance: [
    "Nuestro seguro de auto te protege ante accidentes, robos y daños a terceros mientras conduces.",
    "Con la cobertura de auto de GlobalSeguros, viajarás tranquilo sabiendo que estás protegido.",
    "El seguro automovilístico incluye asistencia en carretera, grúa y taller en caso de emergencia.",
  ],
  home_insurance: [
    "El seguro de hogar protege tu vivienda y pertenencias contra incendios, robos y desastres naturales.",
    "Con nuestra cobertura de hogar, tu patrimonio familiar estará protegido ante imprevistos.",
    "El seguro de hogar incluye asistencia domiciliaria para emergencias como cerrajería, plomería y electricidad.",
  ],
  health_insurance: [
    "Nuestro seguro de salud te brinda acceso a atención médica de calidad sin preocuparte por los costos.",
    "Con la cobertura de salud de GlobalSeguros, tendrás acceso a una amplia red de médicos y hospitales.",
    "El seguro de salud cubre consultas, medicamentos, hospitalización y procedimientos según el plan contratado.",
  ],
  general: [
    "En GlobalSeguros ofrecemos soluciones integrales para proteger lo que más te importa.",
    "Puedes preguntarme sobre cualquiera de nuestros seguros: vida, accidentes, pensión, rentas, auto, hogar o salud.",
    "¿Hay algo específico en lo que pueda ayudarte hoy?",
  ],
}

// Función para determinar la intención del usuario basada en su consulta
function determineIntent(query: string): {
  category: keyof typeof responses
  confidence: number
  actionRequired?: boolean
  actionType?: AssistantResponse["actionType"]
  insuranceType?: string
} {
  const lowerQuery = query.toLowerCase()

  // Patrones de coincidencia para diferentes categorías
  const patterns = {
    greeting: ["hola", "buenos días", "buenas tardes", "hey jarvis", "saludos"],
    coverage: ["cobertura", "póliza", "seguro", "cubierto", "protección"],
    emergency: ["emergencia", "ayuda", "accidente", "auxilio", "ambulancia", "urgente"],
    trip: ["viaje", "trayecto", "conduciendo", "manejo", "conducir", "iniciar viaje", "terminar viaje"],
    health: ["salud", "pasos", "corazón", "actividad", "ejercicio", "ritmo cardíaco"],
    life_insurance: ["seguro de vida", "vida", "fallecimiento", "beneficiarios", "herederos"],
    accident_insurance: ["accidentes personales", "accidente", "lesión", "indemnización por accidente"],
    pension_insurance: ["pensión voluntaria", "pensión", "jubilación", "retiro", "vejez"],
    income_insurance: ["rentas voluntarias", "renta", "ingresos futuros", "pagos periódicos"],
    annuity_insurance: ["renta vitalicia", "pensión de por vida", "ingreso vitalicio"],
    auto_insurance: ["seguro de auto", "automóvil", "coche", "vehículo", "carro"],
    home_insurance: ["seguro de hogar", "casa", "vivienda", "apartamento", "domicilio"],
    health_insurance: ["seguro de salud", "médico", "hospital", "enfermedad", "consulta"],
  }

  // Determinar la categoría con mayor coincidencia
  let bestCategory: keyof typeof responses = "general"
  let highestScore = 0
  let insuranceType: string | undefined

  for (const [category, keywords] of Object.entries(patterns)) {
    const score = keywords.reduce((acc, keyword) => {
      return lowerQuery.includes(keyword) ? acc + 1 : acc
    }, 0)

    if (score > highestScore) {
      highestScore = score
      bestCategory = category as keyof typeof responses

      // Determinar el tipo de seguro si es relevante
      if (category.includes("_insurance")) {
        insuranceType = category.split("_")[0]
      }
    }
  }

  // Determinar si se requiere una acción
  let actionRequired = false
  let actionType: AssistantResponse["actionType"] | undefined

  if (
    bestCategory === "emergency" &&
    (lowerQuery.includes("llama") || lowerQuery.includes("contacta") || lowerQuery.includes("necesito ayuda"))
  ) {
    actionRequired = true
    actionType = "call_emergency"
  } else if (bestCategory === "trip") {
    if (lowerQuery.includes("iniciar") || lowerQuery.includes("comenzar") || lowerQuery.includes("empezar")) {
      actionRequired = true
      actionType = "start_trip"
    } else if (lowerQuery.includes("terminar") || lowerQuery.includes("finalizar") || lowerQuery.includes("acabar")) {
      actionRequired = true
      actionType = "end_trip"
    }
  } else if (
    bestCategory === "coverage" &&
    (lowerQuery.includes("ver") || lowerQuery.includes("mostrar") || lowerQuery.includes("detalles"))
  ) {
    actionRequired = true
    actionType = "check_coverage"
  } else if (insuranceType) {
    actionRequired = true
    actionType = "view_insurance"
  }

  return {
    category: bestCategory,
    confidence: highestScore > 0 ? highestScore / 5 : 0.2, // Normalizar confianza
    actionRequired,
    actionType,
    insuranceType,
  }
}

// Función para obtener una respuesta aleatoria de una categoría
function getRandomResponse(category: keyof typeof responses): string {
  const categoryResponses = responses[category]
  const randomIndex = Math.floor(Math.random() * categoryResponses.length)
  return categoryResponses[randomIndex]
}

// Función para obtener información adicional sobre un tipo de seguro
function getInsuranceInfo(insuranceType: string): string {
  const insurance = insuranceTypes.find((t) => t.id === insuranceType)

  if (!insurance) return ""

  return `${insurance.name}: ${insurance.description} Coberturas principales: ${insurance.coverageDetails.slice(0, 3).join(", ")}.`
}

// Función principal para procesar consultas al asistente
export async function processAssistantQuery(query: AssistantQuery): Promise<AssistantResponse> {
  try {
    // Guardar la consulta en Firestore
    if (db) {
      await addDoc(collection(db, "assistant_queries"), {
        ...query,
        timestamp: new Date().toISOString(),
      })
    }

    // Determinar la intención del usuario
    const intent = determineIntent(query.text)

    // Generar respuesta
    let responseText = getRandomResponse(intent.category)

    // Añadir información adicional sobre el seguro si es relevante
    if (intent.insuranceType) {
      const insuranceInfo = getInsuranceInfo(intent.insuranceType)
      if (insuranceInfo) {
        responseText += " " + insuranceInfo
      }
    }

    const response: AssistantResponse = {
      text: responseText,
      timestamp: Date.now(),
    }

    // Añadir información de acción si es necesario
    if (intent.actionRequired && intent.actionType) {
      response.actionRequired = true
      response.actionType = intent.actionType

      // Datos adicionales según el tipo de acción
      if (intent.actionType === "open_app") {
        response.actionData = { screen: "assistant" }
      } else if (intent.actionType === "call_emergency") {
        response.actionData = { phoneNumber: "911" }
      } else if (intent.actionType === "view_insurance" && intent.insuranceType) {
        response.actionData = { insuranceType: intent.insuranceType }
      }
    }

    // Guardar la respuesta en Firestore
    if (db) {
      await addDoc(collection(db, "assistant_responses"), {
        query: query.text,
        response: responseText,
        source: query.source,
        timestamp: new Date().toISOString(),
        actionRequired: response.actionRequired || false,
        actionType: response.actionType || null,
        insuranceType: intent.insuranceType || null,
      })
    }

    return response
  } catch (error) {
    console.error("Error processing assistant query:", error)
    return {
      text: "Lo siento, estoy teniendo problemas para procesar tu consulta en este momento. Por favor, intenta de nuevo más tarde.",
      timestamp: Date.now(),
    }
  }
}

// Función para obtener el historial de conversaciones recientes
export async function getRecentConversations(
  limit = 10,
): Promise<Array<{ query: string; response: string; timestamp: string }>> {
  if (!db) return []

  try {
    const q = query(collection(db, "assistant_responses"), orderBy("timestamp", "desc"), limit(limit))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        query: data.query,
        response: data.response,
        timestamp: data.timestamp,
      }
    })
  } catch (error) {
    console.error("Error fetching recent conversations:", error)
    return []
  }
}
