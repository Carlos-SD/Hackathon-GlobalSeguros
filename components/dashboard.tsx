"use client"
import { useSpeedDetection } from "@/lib/speed-detection-provider"
import { ProtectionShield } from "./protection-shield"
import { HealthSummary } from "./health-summary"
import { DrivingSummary } from "./driving-summary"
import { TripStatusBanner } from "./trip-status-banner"
import { QuickAccessFAB } from "./quick-access-fab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Shield, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Logo } from "./brand/logo"

export function Dashboard() {
  const { isOnTrip, currentSpeed, usingMockData } = useSpeedDetection()
  const router = useRouter()

  const myPolicies = [
    {
      id: "vida-001",
      type: "Vida",
      name: "Seguro de Vida Premium",
      coverage: "500,000€",
      expiration: "15/05/2026",
      status: "Activo",
      color: "bg-blue-500"
    },
    {
      id: "auto-001",
      type: "Auto",
      name: "Cobertura Total Vehículo",
      coverage: "30,000€",
      expiration: "23/11/2025",
      status: "Activo",
      color: "bg-green-500"
    },
    {
      id: "hogar-001",
      type: "Hogar",
      name: "Protección Hogar Plus",
      coverage: "150,000€",
      expiration: "07/03/2026",
      status: "Activo",
      color: "bg-amber-500"
    }
  ]

  const handlePolicyClick = (id: string) => {
    router.push(`/seguros/poliza/${id}`)
  }

  const navigateToLifestyleProfile = () => {
    router.push("/configuracion/perfil-estilo-vida")
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      {/* Cabecera con logo */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Panel Principal</h1>
        <Logo size="sm" />
      </div>
      
      {isOnTrip && <TripStatusBanner />}
      <ProtectionShield />
      <HealthSummary />
      <DrivingSummary />

      {/* Sección de Mis Pólizas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Mis Pólizas
          </CardTitle>
          <CardDescription>Tus seguros activos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {myPolicies.map((policy) => (
            <div 
              key={policy.id}
              onClick={() => handlePolicyClick(policy.id)}
              className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <div className={`${policy.color} p-2 rounded-full`}>
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{policy.name}</p>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Tipo: {policy.type}</span>
                  <span className="text-xs text-muted-foreground">Vence: {policy.expiration}</span>
                </div>
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={navigateToLifestyleProfile}
          >
            Completar mi perfil de estilo de vida
          </Button>
        </CardContent>
      </Card>
      
      <QuickAccessFAB />
    </div>
  )
} 