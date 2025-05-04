"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  ShieldAlert,
  PiggyBank,
  Wallet,
  CalendarClock,
  Car,
  Home,
  Stethoscope,
  Check,
  HelpCircle,
  ArrowLeft,
  FileText,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getInsuranceTypeInfo } from "@/lib/services/insurance-service"
import type { InsuranceType, InsuranceTypeInfo } from "@/lib/types/insurance"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { QuickQuote } from "@/components/insurance/quick-quote"
import { Logo } from "@/components/brand/logo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface InsuranceDetailProps {
  type: InsuranceType
}

export function InsuranceDetail({ type }: InsuranceDetailProps) {
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceTypeInfo | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const info = getInsuranceTypeInfo(type)
    if (info) {
      setInsuranceInfo(info)
    }
  }, [type])

  // Función para obtener el icono correspondiente
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return <Heart className="h-6 w-6" />
      case "shield-alert":
        return <ShieldAlert className="h-6 w-6" />
      case "piggy-bank":
        return <PiggyBank className="h-6 w-6" />
      case "wallet":
        return <Wallet className="h-6 w-6" />
      case "calendar-clock":
        return <CalendarClock className="h-6 w-6" />
      case "car":
        return <Car className="h-6 w-6" />
      case "home":
        return <Home className="h-6 w-6" />
      case "stethoscope":
        return <Stethoscope className="h-6 w-6" />
      default:
        return <ShieldAlert className="h-6 w-6" />
    }
  }

  // Información detallada adicional según el tipo de seguro
  const getDetailedInfo = () => {
    switch (type) {
      case "life":
        return {
          requirements: [
            "Edad entre 18 y 70 años",
            "Declaración de salud",
            "Examen médico para sumas aseguradas altas",
            "Documento de identidad",
          ],
          process: [
            "Completar solicitud en línea o presencial",
            "Evaluación de riesgo",
            "Aprobación y emisión de póliza",
            "Pago de prima inicial",
          ],
          claims: [
            "Notificación de fallecimiento",
            "Presentación de acta de defunción",
            "Identificación de beneficiarios",
            "Pago de suma asegurada en 5-10 días hábiles",
          ],
          exclusions: [
            "Suicidio durante el primer año",
            "Actos ilegales o delictivos",
            "Participación en deportes extremos (salvo contratación adicional)",
            "Guerra o conflicto armado",
          ],
        }
      case "accident":
        return {
          requirements: ["Edad entre 18 y 65 años", "Documento de identidad", "Declaración de actividades de riesgo"],
          process: [
            "Selección de plan de cobertura",
            "Completar formulario de solicitud",
            "Pago de prima",
            "Activación inmediata",
          ],
          claims: [
            "Reporte del accidente dentro de las 48 horas",
            "Documentación médica del evento",
            "Formulario de reclamación",
            "Evaluación y pago según tabla de indemnización",
          ],
          exclusions: [
            "Accidentes bajo influencia de alcohol o drogas",
            "Lesiones autoinfligidas",
            "Enfermedades preexistentes",
            "Accidentes en actividades ilegales",
          ],
        }
      case "auto":
        return {
          requirements: [
            "Licencia de conducción vigente",
            "Tarjeta de propiedad del vehículo",
            "Inspección del vehículo (según valor)",
            "Historial de siniestralidad",
          ],
          process: [
            "Cotización según características del vehículo",
            "Selección de coberturas",
            "Inspección (si aplica)",
            "Emisión y activación de póliza",
          ],
          claims: [
            "Reporte inmediato del siniestro",
            "Documentación fotográfica",
            "Declaración del incidente",
            "Evaluación de daños y autorización de reparación",
          ],
          exclusions: [
            "Conducción bajo efectos de alcohol o drogas",
            "Uso del vehículo para fines no declarados",
            "Conductor no autorizado",
            "Daños por guerra o terrorismo",
          ],
        }
      case "home":
        return {
          requirements: [
            "Escritura o contrato de arrendamiento",
            "Inventario de bienes valiosos",
            "Fotografías del inmueble (opcional)",
            "Ubicación y características de la vivienda",
          ],
          process: [
            "Evaluación del inmueble y contenidos",
            "Selección de coberturas",
            "Emisión de póliza",
            "Activación tras pago inicial",
          ],
          claims: [
            "Reporte del siniestro en 24-48 horas",
            "Documentación fotográfica de daños",
            "Inventario de bienes afectados",
            "Evaluación por perito y autorización de reparación/reembolso",
          ],
          exclusions: [
            "Daños por falta de mantenimiento",
            "Bienes no declarados de alto valor",
            "Actos malintencionados del asegurado",
            "Daños previos a la contratación",
          ],
        }
      case "pension":
        return {
          requirements: ["Edad entre 18 y 60 años", "Documento de identidad", "Información financiera básica"],
          process: [
            "Definición de aportes y periodicidad",
            "Selección de plan de inversión",
            "Firma de contrato",
            "Inicio de aportes",
          ],
          claims: [
            "Solicitud de pensión al cumplir requisitos",
            "Documentación de identidad y supervivencia",
            "Selección de modalidad de pago",
            "Inicio de pagos periódicos",
          ],
          exclusions: [
            "Retiros anticipados sujetos a penalización",
            "Cambios de plan con restricciones",
            "Suspensión por falta de aportes",
          ],
        }
      default:
        return {
          requirements: ["Documento de identidad", "Información personal básica", "Declaración de necesidades"],
          process: [
            "Evaluación de necesidades",
            "Selección de cobertura",
            "Emisión de póliza",
            "Activación tras pago inicial",
          ],
          claims: [
            "Notificación del evento",
            "Presentación de documentación",
            "Evaluación del caso",
            "Resolución y pago",
          ],
          exclusions: [
            "Eventos previos a la contratación",
            "Actos dolosos o fraudulentos",
            "Situaciones específicas detalladas en la póliza",
          ],
        }
    }
  }

  const detailedInfo = getDetailedInfo()

  if (!insuranceInfo) {
    return (
      <div className="container p-4 space-y-4">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Cargando información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/seguros">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{insuranceInfo.name}</h1>
        </div>
        <Logo size="sm" />
      </div>
      <p className="text-muted-foreground text-sm">{insuranceInfo.description}</p>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="process">Proceso</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Coberturas Principales</CardTitle>
              <CardDescription>Beneficios incluidos en este seguro</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insuranceInfo.coverageDetails.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planes Disponibles</CardTitle>
              <CardDescription>Opciones de cobertura según tus necesidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-1">Básico</Badge>
                    <CardTitle className="text-lg">Plan Esencial</CardTitle>
                    <CardDescription>Cobertura fundamental</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold">$150.000</span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Cobertura básica</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Asistencia telefónica</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        <span>Sin coberturas adicionales</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Cotizar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-1 bg-primary">Recomendado</Badge>
                    <CardTitle className="text-lg">Plan Plus</CardTitle>
                    <CardDescription>Equilibrio perfecto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold">$280.000</span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Cobertura completa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Asistencia 24/7</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Beneficios adicionales</span>
                      </li>
                    </ul>
                    <Button className="w-full">Cotizar</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-1 bg-slate-600">Premium</Badge>
                    <CardTitle className="text-lg">Plan Total</CardTitle>
                    <CardDescription>Máxima protección</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold">$450.000</span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Cobertura total</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Asistencia VIP</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Beneficios exclusivos</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Cotizar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Requisitos
              </CardTitle>
              <CardDescription>Documentación y condiciones necesarias</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {detailedInfo.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Vigencia y Renovación
              </CardTitle>
              <CardDescription>Información sobre plazos y renovaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Vigencia</h3>
                  <p className="text-sm text-muted-foreground">
                    La póliza tiene una vigencia anual con renovación automática, salvo aviso de cancelación con 30 días
                    de anticipación.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Periodo de gracia</h3>
                  <p className="text-sm text-muted-foreground">
                    Dispones de un periodo de gracia de 30 días para el pago de la renovación, durante el cual mantienes
                    la cobertura.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ajustes en renovación</h3>
                  <p className="text-sm text-muted-foreground">
                    En cada renovación se pueden actualizar coberturas y primas según el perfil de riesgo y la
                    siniestralidad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                Primas y Pagos
              </CardTitle>
              <CardDescription>Información sobre costos y formas de pago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Formas de pago</h3>
                  <p className="text-sm text-muted-foreground">
                    Aceptamos pagos mensuales, trimestrales, semestrales o anuales mediante tarjeta de crédito, débito
                    automático o transferencia bancaria.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Descuentos disponibles</h3>
                  <p className="text-sm text-muted-foreground">
                    Ofrecemos descuentos por pago anual (10%), por contratación de múltiples pólizas (15%) y por buen
                    historial (hasta 20%).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ajustes de prima</h3>
                  <p className="text-sm text-muted-foreground">
                    Las primas pueden ajustarse según la inflación, cambios en el perfil de riesgo o modificaciones en
                    la cobertura.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
                Exclusiones
              </CardTitle>
              <CardDescription>Situaciones no cubiertas por la póliza</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {detailedInfo.exclusions.map((exclusion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>{exclusion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Proceso de Contratación</CardTitle>
              <CardDescription>Pasos para adquirir tu seguro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedInfo.process.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Proceso de Reclamación</CardTitle>
              <CardDescription>Pasos para reportar un siniestro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedInfo.claims.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Canales de Atención</CardTitle>
              <CardDescription>Formas de contactarnos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Línea de atención 24/7</h3>
                  <p className="text-sm text-muted-foreground">800-SEGUROS (800-734-8767)</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Correo electrónico</h3>
                  <p className="text-sm text-muted-foreground">atencion@globalseguros.com</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Chat en línea</h3>
                  <p className="text-sm text-muted-foreground">
                    Disponible en nuestra página web y aplicación móvil de lunes a viernes de 8:00 a 20:00 hrs.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Oficinas físicas</h3>
                  <p className="text-sm text-muted-foreground">
                    Consulta nuestra red de oficinas en globalseguros.com/oficinas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Preguntas Frecuentes</CardTitle>
              <CardDescription>Dudas comunes sobre este seguro</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {insuranceInfo.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
                <AccordionItem value="item-additional-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span>¿Puedo cancelar mi póliza en cualquier momento?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-6">
                    Sí, puedes cancelar tu póliza en cualquier momento enviando una solicitud por escrito con 30 días de
                    anticipación. Si cancelas antes del vencimiento anual, se aplicará un reembolso proporcional de la
                    prima no devengada, menos gastos administrativos.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-additional-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span>¿Qué sucede si me atraso en un pago?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-6">
                    Tienes un periodo de gracia de 30 días para realizar el pago sin perder la cobertura. Pasado este
                    periodo, la póliza se suspenderá automáticamente. Para reactivarla, deberás pagar el monto pendiente
                    y posiblemente pasar por un nuevo proceso de evaluación.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">¿Interesado en este seguro?</CardTitle>
          <CardDescription>Solicita una cotización personalizada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Nuestros asesores te contactarán para brindarte información detallada y una cotización ajustada a tus
            necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <QuickQuote insuranceType={type} insuranceName={insuranceInfo.name} />
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/asistente">Hablar con Asistente</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
