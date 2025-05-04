import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase-config"
import type { InsurancePolicy, InsuranceType, InsuranceTypeInfo } from "../types/insurance"

// Información sobre los tipos de seguros
export const insuranceTypes: InsuranceTypeInfo[] = [
  {
    id: "life",
    name: "Seguros de Vida",
    description:
      "Este seguro permite que te asegures, o asegures a tu grupo familiar para proteger su bienestar a futuro.",
    icon: "heart",
    color: "insurance-life",
    coverageDetails: [
      "Cobertura por fallecimiento",
      "Indemnización por diagnóstico de enfermedades graves",
      "Gastos funerarios",
      "Protección de ingresos para dependientes",
      "Anticipo de suma asegurada por enfermedad terminal",
    ],
    faqs: [
      {
        question: "¿Quiénes pueden ser beneficiarios de mi seguro de vida?",
        answer:
          "Puedes designar como beneficiarios a cualquier persona, ya sean familiares o no. Es importante mantener actualizada esta información.",
      },
      {
        question: "¿Qué sucede si no designo beneficiarios?",
        answer:
          "Si no designas beneficiarios, la suma asegurada se pagará a tu sucesión legal según las leyes vigentes.",
      },
    ],
  },
  {
    id: "accident",
    name: "Seguro de Accidentes Personales",
    description:
      "Esta solución te permite asegurarte ante un accidente y de esta forma proteger tu estabilidad económica.",
    icon: "shield-alert",
    color: "insurance-accident",
    coverageDetails: [
      "Indemnización por muerte accidental",
      "Reembolso de gastos médicos por accidente",
      "Indemnización por invalidez permanente",
      "Cobertura de gastos hospitalarios",
      "Asistencia médica telefónica",
    ],
    faqs: [
      {
        question: "¿Qué se considera un accidente para efectos de la cobertura?",
        answer:
          "Se considera accidente a toda lesión corporal producida por la acción directa y violenta de una fuerza externa, independiente de la voluntad del asegurado.",
      },
      {
        question: "¿Cubre accidentes durante la práctica de deportes?",
        answer:
          "La cobertura básica incluye accidentes en deportes recreativos. Para deportes de alto riesgo o profesionales, se requiere una cobertura adicional.",
      },
    ],
  },
  {
    id: "pension",
    name: "Seguro de Pensión Voluntaria",
    description: "Con esta solución puedes asegurar una pensión cierta para disfrutar de tu vejez de la mejor manera.",
    icon: "piggy-bank",
    color: "insurance-pension",
    coverageDetails: [
      "Renta vitalicia al momento del retiro",
      "Opciones de retiro anticipado",
      "Protección contra inflación",
      "Beneficios fiscales",
      "Opciones de inversión personalizadas",
    ],
    faqs: [
      {
        question: "¿A qué edad puedo comenzar a recibir mi pensión?",
        answer:
          "Puedes comenzar a recibir tu pensión a partir de los 60 años, aunque existen opciones de retiro anticipado con ciertas condiciones.",
      },
      {
        question: "¿Qué sucede con mi pensión si fallezco antes de comenzar a recibirla?",
        answer:
          "El monto acumulado se entregará a tus beneficiarios designados según las condiciones establecidas en tu póliza.",
      },
    ],
  },
  {
    id: "income",
    name: "Seguro Rentas Voluntarias",
    description: "Si necesitas una renta para cubrir tus gastos a futuro, esta es la solución que buscas.",
    icon: "wallet",
    color: "insurance-income",
    coverageDetails: [
      "Pagos periódicos garantizados",
      "Opciones de renta creciente",
      "Protección contra inflación",
      "Flexibilidad en la frecuencia de pagos",
      "Opciones de renta para beneficiarios",
    ],
    faqs: [
      {
        question: "¿Puedo modificar la frecuencia de los pagos de mi renta?",
        answer: "Sí, puedes elegir entre pagos mensuales, trimestrales, semestrales o anuales según tus necesidades.",
      },
      {
        question: "¿Qué opciones tengo al vencimiento del plazo de mi renta?",
        answer:
          "Al vencimiento, puedes renovar tu plan, solicitar el capital acumulado o convertirlo en una renta vitalicia.",
      },
    ],
  },
  {
    id: "annuity",
    name: "Seguro Renta Vitalicia",
    description:
      "Vive tu vida al máximo incluso después de pensionarte, esta solución se encarga de brindarte tranquilidad a futuro.",
    icon: "calendar-clock",
    color: "insurance-annuity",
    coverageDetails: [
      "Ingresos garantizados de por vida",
      "Protección contra la longevidad",
      "Opciones de renta para cónyuge",
      "Pagos ajustados por inflación",
      "Garantía de pago mínimo",
    ],
    faqs: [
      {
        question: "¿Qué sucede con mi renta vitalicia si fallezco prematuramente?",
        answer:
          "Dependiendo de la modalidad contratada, tus beneficiarios podrían recibir pagos por un período garantizado o un porcentaje de tu renta.",
      },
      {
        question: "¿Puedo contratar una renta vitalicia en cualquier momento?",
        answer:
          "Sí, aunque los beneficios son mayores cuando se contrata con anticipación debido a la acumulación de capital.",
      },
    ],
  },
  {
    id: "auto",
    name: "Seguro Automovilístico",
    description: "Protege tu vehículo y viaja con tranquilidad sabiendo que estás cubierto ante cualquier imprevisto.",
    icon: "car",
    color: "insurance-auto",
    coverageDetails: [
      "Responsabilidad civil",
      "Daños materiales",
      "Robo total",
      "Asistencia en viajes",
      "Gastos médicos para ocupantes",
    ],
    faqs: [
      {
        question: "¿Qué debo hacer en caso de accidente?",
        answer:
          "Mantén la calma, verifica si hay lesionados, contacta a las autoridades y reporta el siniestro a través de nuestra app o línea telefónica.",
      },
      {
        question: "¿La póliza cubre a otros conductores de mi vehículo?",
        answer: "Sí, la póliza cubre a cualquier conductor autorizado que utilice el vehículo con tu consentimiento.",
      },
    ],
  },
  {
    id: "home",
    name: "Seguro de Hogar",
    description: "Protege tu hogar y tus pertenencias contra daños, robos y otros imprevistos.",
    icon: "home",
    color: "insurance-home",
    coverageDetails: [
      "Daños por incendio",
      "Daños por fenómenos naturales",
      "Robo de contenidos",
      "Responsabilidad civil familiar",
      "Asistencia domiciliaria",
    ],
    faqs: [
      {
        question: "¿Qué bienes están cubiertos por el seguro de hogar?",
        answer:
          "El seguro cubre tanto el inmueble (estructura) como los contenidos (muebles, electrodomésticos, objetos personales) según la modalidad contratada.",
      },
      {
        question: "¿Cubre daños causados por mascotas?",
        answer:
          "Los daños que tus mascotas causen a terceros están cubiertos por la responsabilidad civil familiar, pero no los daños que causen a tu propio hogar.",
      },
    ],
  },
  {
    id: "health",
    name: "Seguro de Salud",
    description: "Cuida tu salud y la de tu familia con cobertura médica integral y de calidad.",
    icon: "stethoscope",
    color: "insurance-health",
    coverageDetails: [
      "Hospitalización",
      "Consultas médicas",
      "Medicamentos",
      "Estudios de diagnóstico",
      "Cirugías programadas",
    ],
    faqs: [
      {
        question: "¿Existe período de carencia para ciertas enfermedades?",
        answer:
          "Sí, algunas condiciones como maternidad o enfermedades preexistentes pueden tener períodos de carencia específicos.",
      },
      {
        question: "¿Puedo incluir a mi familia en mi póliza de salud?",
        answer:
          "Sí, puedes incluir a tu cónyuge e hijos dependientes en tu póliza familiar con tarifas preferenciales.",
      },
    ],
  },
]

// Obtener todas las pólizas de un usuario
export async function getUserPolicies(userId: string): Promise<InsurancePolicy[]> {
  if (!db) return []

  try {
    const q = query(collection(db, "policies"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<InsurancePolicy, "id">
      return {
        id: doc.id,
        ...data,
      }
    })
  } catch (error) {
    console.error("Error fetching user policies:", error)
    return []
  }
}

// Obtener una póliza específica
export async function getPolicy(policyId: string): Promise<InsurancePolicy | null> {
  if (!db) return null

  try {
    const docRef = doc(db, "policies", policyId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<InsurancePolicy, "id">
      return {
        id: docSnap.id,
        ...data,
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching policy:", error)
    return null
  }
}

// Obtener pólizas por tipo
export async function getPoliciesByType(userId: string, type: InsuranceType): Promise<InsurancePolicy[]> {
  if (!db) return []

  try {
    const q = query(collection(db, "policies"), where("userId", "==", userId), where("type", "==", type))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<InsurancePolicy, "id">
      return {
        id: doc.id,
        ...data,
      }
    })
  } catch (error) {
    console.error(`Error fetching ${type} policies:`, error)
    return []
  }
}

// Obtener información de un tipo de seguro
export function getInsuranceTypeInfo(type: InsuranceType): InsuranceTypeInfo | undefined {
  return insuranceTypes.find((t) => t.id === type)
}

// Obtener todos los tipos de seguro
export function getAllInsuranceTypes(): InsuranceTypeInfo[] {
  return insuranceTypes
}
