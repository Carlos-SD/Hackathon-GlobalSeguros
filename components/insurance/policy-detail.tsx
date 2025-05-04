"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Calendar,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Phone,
  MessageSquare,
  ArrowLeft,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface PolicyDetailProps {
  policy: any
}

export function PolicyDetail({ policy }: PolicyDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
  }

  // Función para calcular días restantes
  const getDaysRemaining = () => {
    const today = new Date()
    const endDate = new Date(policy.endDate)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining()

  // Función para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(amount)
  }

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-amber-500"
      case "expired":
        return "bg-red-500"
      case "cancelled":
        return "bg-slate-500"
      default:
        return "bg-blue-500"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "pending":
        return "Pendiente"
      case "expired":
        return "Vencida"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  // Función para obtener la frecuencia de pago
  const getPaymentFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "monthly":
        return "Mensual"
      case "quarterly":
        return "Trimestral"
      case "semiannual":
        return "Semestral"
      case "annual":
        return "Anual"
      default:
        return frequency
    }
  }

  // Función para simular la descarga de un documento
  const handleDownload = (documentName: string) => {
    toast({
      title: "Descarga iniciada",
      description: `El documento ${documentName} se está descargando.`,
    })
  }

  // Función para simular el envío de un documento por correo
  const handleSendByEmail = () => {
    toast({
      title: "Documento enviado",
      description: "La póliza ha sido enviada a tu correo electrónico.",
    })
  }

  // Función para simular una llamada al servicio al cliente
  const handleCallCustomerService = () => {
    toast({
      title: "Llamando al servicio al cliente",
      description: "Conectando con un asesor...",
    })
  }

  // Función para simular el inicio de un chat con un asesor
  const handleChatWithAgent = () => {
    toast({
      title: "Chat con asesor",
      description: "Iniciando chat con un asesor especializado...",
    })
  }

  // Función para simular la renovación de la póliza
  const handleRenew = () => {
    toast({
      title: "Renovación iniciada",
      description: "Se ha iniciado el proceso de renovación de tu póliza.",
    })
  }

  // Función para simular la cancelación de la póliza
  const handleCancel = () => {
    toast({
      title: "Solicitud recibida",
      description: "Tu solicitud de cancelación ha sido recibida. Un asesor te contactará pronto.",
    })
  }

  // Función para simular la modificación de la póliza
  const handleModify = () => {
    toast({
      title: "Modificación iniciada",
      description: "Se ha iniciado el proceso de modificación de tu póliza.",
    })
  }

  // Función para simular la presentación de una reclamación
  const handleClaim = () => {
    toast({
      title: "Reclamación iniciada",
      description: "Se ha iniciado el proceso de reclamación.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/seguros">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Detalles de Póliza</h1>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{policy.name}</CardTitle>
              <CardDescription>Póliza: {policy.policyNumber}</CardDescription>
            </div>
            <Badge className={getStatusColor(policy.status)}>{getStatusText(policy.status)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">Vigencia:</span>
              </div>
              <span className="text-sm font-medium">
                {formatDate(policy.startDate)} - {formatDate(policy.endDate)}
              </span>
            </div>

            {policy.status === "active" && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Tiempo restante:</span>
                  <span>{daysRemaining} días</span>
                </div>
                <Progress value={Math.max(0, Math.min(100, (daysRemaining / 365) * 100))} className="h-2" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm">Cobertura:</span>
              </div>
              <span className="text-sm font-medium">{formatCurrency(policy.coverageAmount)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Prima:</span>
              </div>
              <span className="text-sm font-medium">
                {formatCurrency(policy.premium)} ({getPaymentFrequencyText(policy.paymentFrequency)})
              </span>
            </div>

            {policy.beneficiaries && policy.beneficiaries.length > 0 && (
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Beneficiarios:</span>
                </div>
                <div className="text-right">
                  {policy.beneficiaries.map((beneficiary: string, index: number) => (
                    <div key={index} className="text-sm">
                      {beneficiary}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex gap-2 w-full">
            <Button className="flex-1" asChild>
              <Link href={`/seguros/${policy.type}`}>
                <Shield className="mr-2 h-4 w-4" />
                Ver Cobertura
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Descargar Póliza
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="claims">Reclamaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detalles de Cobertura</CardTitle>
              <CardDescription>Coberturas incluidas en tu póliza</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Cobertura Principal</p>
                    <p className="text-sm text-muted-foreground">
                      {policy.type === "life" && "Indemnización por fallecimiento"}
                      {policy.type === "auto" && "Daños materiales y responsabilidad civil"}
                      {policy.type === "home" && "Daños estructurales e incendio"}
                      {policy.type === "health" && "Hospitalización y cirugías"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Coberturas Adicionales</p>
                    <p className="text-sm text-muted-foreground">
                      {policy.type === "life" && "Enfermedades graves, invalidez total y permanente"}
                      {policy.type === "auto" && "Asistencia en viajes, grúa y vehículo de reemplazo"}
                      {policy.type === "home" && "Robo, inundación y responsabilidad civil"}
                      {policy.type === "health" && "Consultas médicas y medicamentos"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Exclusiones Principales</p>
                    <p className="text-sm text-muted-foreground">
                      {policy.type === "life" && "Suicidio durante el primer año, actos ilegales"}
                      {policy.type === "auto" && "Conducción bajo efectos de alcohol o drogas"}
                      {policy.type === "home" && "Daños por falta de mantenimiento, guerra"}
                      {policy.type === "health" && "Condiciones preexistentes no declaradas"}
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Próximos Pagos</CardTitle>
              <CardDescription>Calendario de pagos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Próximo pago</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(new Date().setDate(new Date().getDate() + 15)).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(policy.premium)}</p>
                    <Badge variant="outline" className="mt-1">
                      Pendiente
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Segundo pago</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(new Date().setDate(new Date().getDate() + 45)).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(policy.premium)}</p>
                    <Badge variant="outline" className="mt-1">
                      Programado
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Acciones</CardTitle>
              <CardDescription>Gestiona tu póliza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start" onClick={handleRenew}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Renovar póliza
                </Button>
                <Button variant="outline" className="justify-start" onClick={handleModify}>
                  <FileText className="mr-2 h-4 w-4" />
                  Modificar póliza
                </Button>
                <Button variant="outline" className="justify-start" onClick={handleClaim}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Presentar reclamación
                </Button>
                <Button variant="outline" className="justify-start text-red-500" onClick={handleCancel}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Cancelar póliza
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Documentos de la Póliza</CardTitle>
              <CardDescription>Documentos importantes relacionados con tu póliza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Contrato de Póliza</p>
                      <p className="text-xs text-muted-foreground">PDF - 2.4 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload("Contrato de Póliza.pdf")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Condiciones Generales</p>
                      <p className="text-xs text-muted-foreground">PDF - 1.8 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload("Condiciones Generales.pdf")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Recibo de Pago</p>
                      <p className="text-xs text-muted-foreground">PDF - 0.5 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload("Recibo de Pago.pdf")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Anexos y Cláusulas</p>
                      <p className="text-xs text-muted-foreground">PDF - 1.2 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload("Anexos y Cláusulas.pdf")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">¿Necesitas tus documentos por correo electrónico?</p>
                <Button variant="outline" onClick={handleSendByEmail}>
                  Enviar documentos por correo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Asistencia</CardTitle>
              <CardDescription>Contacta con nuestro equipo de soporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start" onClick={handleCallCustomerService}>
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar a servicio al cliente
                </Button>
                <Button variant="outline" className="justify-start" onClick={handleChatWithAgent}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat con un asesor
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4 mt-4">
          {policy.claims && policy.claims.length > 0 ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Historial de Reclamaciones</CardTitle>
                <CardDescription>Reclamaciones presentadas para esta póliza</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policy.claims.map((claim: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Reclamación #{claim.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(claim.date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm mt-1">{claim.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(claim.amount)}</p>
                        <Badge
                          className={
                            claim.status === "approved"
                              ? "bg-green-500"
                              : claim.status === "rejected"
                                ? "bg-red-500"
                                : claim.status === "in_review"
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                          }
                        >
                          {claim.status === "approved"
                            ? "Aprobada"
                            : claim.status === "rejected"
                              ? "Rechazada"
                              : claim.status === "in_review"
                                ? "En revisión"
                                : "Pendiente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Historial de Reclamaciones</CardTitle>
                <CardDescription>No hay reclamaciones para esta póliza</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No has presentado reclamaciones para esta póliza.</p>
                  <Button className="mt-4" onClick={handleClaim}>
                    Presentar una reclamación
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Proceso de Reclamación</CardTitle>
              <CardDescription>Pasos para presentar una reclamación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Notificar el incidente</h3>
                    <p className="text-sm text-muted-foreground">
                      Contacta con nosotros lo antes posible para informar del incidente.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Documentar</h3>
                    <p className="text-sm text-muted-foreground">
                      Recopila toda la información relevante: fotos, informes, testigos, etc.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Enviar reclamación</h3>
                    <p className="text-sm text-muted-foreground">
                      Completa el formulario de reclamación con toda la documentación.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Seguimiento</h3>
                    <p className="text-sm text-muted-foreground">
                      Nuestro equipo evaluará tu caso y te mantendrá informado del proceso.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4" onClick={handleClaim}>
                Iniciar reclamación
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
