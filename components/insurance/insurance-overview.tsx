"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getAllInsuranceTypes } from "@/lib/services/insurance-service"
import type { InsuranceTypeInfo, InsurancePolicy } from "@/lib/types/insurance"
import { InsuranceCards } from "@/components/insurance/insurance-cards"
import { Logo } from "@/components/brand/logo"
import Link from "next/link"
import { ArrowRight, Check, BrainCircuit } from "lucide-react"

export function InsuranceOverview() {
  const [insuranceTypes, setInsuranceTypes] = useState<InsuranceTypeInfo[]>([])
  const [userPolicies, setUserPolicies] = useState<InsurancePolicy[]>([
    // Pólizas simuladas
    {
      id: "auto-policy-1",
      type: "auto",
      name: "Seguro Automovilístico Premium",
      policyNumber: "AUTO-2023-12345",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      coverageAmount: 500000,
      premium: 4800,
      paymentFrequency: "monthly",
      status: "active",
    },
    {
      id: "life-policy-1",
      type: "life",
      name: "Seguro de Vida Familiar",
      policyNumber: "VIDA-2023-67890",
      startDate: "2023-03-10",
      endDate: "2043-03-10",
      coverageAmount: 1000000,
      premium: 3600,
      paymentFrequency: "annual",
      status: "active",
      beneficiaries: ["Cónyuge (70%)", "Hijos (30%)"],
    },
  ])

  useEffect(() => {
    setInsuranceTypes(getAllInsuranceTypes())
  }, [])

  return (
    <div className="container p-4 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mis Seguros</h1>
          <Logo size="sm" />
        </div>
        <p className="text-muted-foreground text-sm">Explora y gestiona tus soluciones de protección</p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BrainCircuit className="h-5 w-5 text-primary" />
            Asesor Inteligente
          </CardTitle>
          <CardDescription>Obtén recomendaciones personalizadas para tu perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Nuestro asesor inteligente analizará tu perfil personal, familiar y financiero para recomendarte los seguros
            que mejor se adapten a tus necesidades específicas.
          </p>
          <Button asChild>
            <Link href="/seguros/asesor">
              Iniciar asesoría personalizada
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Mis Pólizas</CardTitle>
          <CardDescription>Resumen de tus seguros contratados</CardDescription>
        </CardHeader>
        <CardContent>
          {userPolicies.length > 0 ? (
            <div className="space-y-3">
              {userPolicies.map((policy) => (
                <Link key={policy.id} href={`/seguros/${policy.type}`}>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-sm flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          {policy.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Póliza: {policy.policyNumber} | Vence: {new Date(policy.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <div className="text-center mt-4">
                <Button>Contratar Nuevo Seguro</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm mb-4">No tienes pólizas contratadas actualmente</p>
              <Button>Contratar Seguro</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-3">Seguros Disponibles</h2>
        <InsuranceCards />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">¿Necesitas ayuda para elegir?</CardTitle>
          <CardDescription>Nuestros asesores están disponibles para ti</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Si no estás seguro de qué seguro se adapta mejor a tus necesidades, nuestros asesores pueden ayudarte a
            encontrar la solución perfecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">Solicitar Asesoría</Button>
            <Button variant="outline" className="flex-1">
              Llamar a Ventas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
