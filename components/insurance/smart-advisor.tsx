"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, MessageSquare, User } from "lucide-react"
import { useRouter } from "next/navigation"

// Importamos el componente de formulario de estilo de vida
import { LifestyleProfile } from "../lifestyle-profile"

interface InsuranceRecommendation {
  id: string
  name: string
  type: string
  description: string
  matchScore: number
  price: number
  frequency: string
  benefits: string[]
}

export function SmartAdvisor() {
  const [activeTab, setActiveTab] = useState("profile")
  const [recommendations, setRecommendations] = useState<InsuranceRecommendation[]>([
    {
      id: "rec-1",
      name: "Seguro de Vida Familiar Plus",
      type: "life",
      description: "Protección completa para ti y tu familia con coberturas adicionales para enfermedades graves.",
      matchScore: 95,
      price: 45.99,
      frequency: "mensual",
      benefits: [
        "Cobertura por fallecimiento",
        "Indemnización por invalidez",
        "Cobertura para enfermedades graves",
        "Asistencia médica telefónica",
      ],
    },
    {
      id: "rec-2",
      name: "Seguro de Salud Integral",
      type: "health",
      description: "Acceso a la mejor atención médica con amplia red de especialistas y hospitales.",
      matchScore: 87,
      price: 89.5,
      frequency: "mensual",
      benefits: [
        "Consultas médicas ilimitadas",
        "Hospitalización",
        "Medicamentos con descuento",
        "Segunda opinión médica internacional",
      ],
    },
    {
      id: "rec-3",
      name: "Seguro de Accidentes Personales",
      type: "accident",
      description: "Protección económica ante accidentes con indemnizaciones rápidas.",
      matchScore: 78,
      price: 22.75,
      frequency: "mensual",
      benefits: [
        "Indemnización por accidente",
        "Gastos médicos por accidente",
        "Incapacidad temporal",
        "Asistencia en viajes",
      ],
    },
  ])
  const router = useRouter()

  const handleProfileSubmit = (profileData: any) => {
    console.log("Perfil enviado:", profileData)
    // Aquí se procesaría el perfil y se actualizarían las recomendaciones
    // Por ahora solo cambiamos a la pestaña de recomendaciones
    setActiveTab("recommendations")
  }

  const handleChatAdvisor = () => {
    router.push("/asistente?topic=seguros")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Asesor Inteligente de Seguros</h1>
          <p className="text-muted-foreground mt-1">
            Obtén recomendaciones personalizadas basadas en tu perfil y estilo de vida
          </p>
        </div>
        <Button onClick={handleChatAdvisor} className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Consultar con Jarvis
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>¿Cómo funciona?</CardTitle>
          <CardDescription>
            Nuestro asesor inteligente analiza tu perfil y estilo de vida para recomendarte los seguros que mejor se
            adaptan a tus necesidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Completa tu perfil</h3>
              <p className="text-sm text-muted-foreground">
                Proporciona información sobre tu estilo de vida, ocupación y necesidades.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Análisis inteligente</h3>
              <p className="text-sm text-muted-foreground">
                Nuestro sistema analiza tus datos y evalúa los riesgos específicos.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Recomendaciones personalizadas</h3>
              <p className="text-sm text-muted-foreground">
                Recibe sugerencias de seguros adaptados a tu perfil y presupuesto.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completa tu perfil</CardTitle>
              <CardDescription>
                Cuéntanos sobre tu estilo de vida para ofrecerte las mejores recomendaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LifestyleProfile onSubmit={handleProfileSubmit} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tus recomendaciones personalizadas</h2>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {recommendations.length} seguros recomendados
              </Badge>
            </div>

            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{recommendation.name}</CardTitle>
                      <CardDescription>{recommendation.description}</CardDescription>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">{recommendation.matchScore}% Match</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Compatibilidad con tu perfil</span>
                      <span className="text-sm font-medium">{recommendation.matchScore}%</span>
                    </div>
                    <Progress value={recommendation.matchScore} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Precio</p>
                      <p className="font-medium">
                        €{recommendation.price}/{recommendation.frequency}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium capitalize">{recommendation.type}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <p className="text-sm font-medium mb-2">Principales beneficios:</p>
                    <ul className="space-y-1">
                      {recommendation.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {recommendation.benefits.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          + {recommendation.benefits.length - 3} beneficios más
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 pt-2">
                  <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button variant="default" className="flex-1">
                      Solicitar cotización
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Ver detalles
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
