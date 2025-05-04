import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowRight, HelpCircle, MessageSquareText, Phone, Shield, Home, Car } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"
import { Logo } from "@/components/brand/logo"

export function AssistantCenter() {
  return (
    <div className="container p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Centro de Asistencia</h1>
          <p className="text-muted-foreground text-sm">Tu asistente virtual para resolver dudas y emergencias</p>
        </div>
        <Logo size="sm" />
      </div>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
            <Phone className="h-5 w-5" />
            Asistencia de Emergencia
          </CardTitle>
          <CardDescription>Ayuda inmediata en caso de emergencia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-3">
            <Button variant="destructive" size="lg" className="gap-2 mb-3">
              <Phone className="h-5 w-5" />
              Llamar a Emergencias
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Utiliza este botón solo en caso de emergencia real. Se iniciará una llamada al número de emergencias
              configurado.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Verificación de Cobertura
          </CardTitle>
          <CardDescription>Consulta rápida sobre tus seguros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full justify-between text-sm h-9">
                <span>¿Qué incluye mi seguro de vida?</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full justify-between text-sm h-9">
                <span>¿Cómo funciona mi seguro de auto?</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full justify-between text-sm h-9">
                <span>¿Qué cubre mi seguro de hogar?</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5 text-primary" />
            Simulación "Qué pasaría si..."
          </CardTitle>
          <CardDescription>Explora escenarios hipotéticos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Car className="h-4 w-4 text-primary" />
                  Accidente de auto
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Simula qué ocurriría en caso de un accidente automovilístico y cómo proceder.
                </p>
                <Button variant="outline" className="w-full text-sm h-8">
                  Ver escenario
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  Daños en el hogar
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Simula qué ocurriría en caso de daños a tu hogar y cómo activar tu seguro.
                </p>
                <Button variant="outline" className="w-full text-sm h-8">
                  Ver escenario
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5 text-primary" />
            Guía de Reclamación
          </CardTitle>
          <CardDescription>Pasos para realizar una reclamación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                1
              </div>
              <div>
                <h3 className="font-medium text-sm">Notificar el incidente</h3>
                <p className="text-xs text-muted-foreground">
                  Contacta con nosotros lo antes posible para informar del incidente.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium text-sm">Documentar</h3>
                <p className="text-xs text-muted-foreground">
                  Recopila toda la información relevante: fotos, informes, testigos, etc.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium text-sm">Enviar reclamación</h3>
                <p className="text-xs text-muted-foreground">
                  Completa el formulario de reclamación con toda la documentación.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquareText className="h-5 w-5 text-primary" />
            Asistente Virtual
          </CardTitle>
          <CardDescription>Habla con nuestro asistente "Jarvis"</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  )
}
