"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Policy } from "@/lib/types/insurance"

// Datos de ejemplo - en una aplicación real, estos vendrían de una API
const mockPolicies: Policy[] = [
  {
    id: "pol-1234",
    type: "auto",
    name: "Seguro de Auto Premium",
    status: "active",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    premium: 1200,
    paymentFrequency: "monthly",
    nextPaymentDate: "2023-06-15",
    coverageAmount: 50000,
    details: {
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      vehicleYear: 2020,
      licensePlate: "ABC-1234",
      coverageType: "Completo",
    },
  },
  {
    id: "pol-5678",
    type: "life",
    name: "Seguro de Vida Familiar",
    status: "active",
    startDate: "2022-05-10",
    endDate: "2042-05-10",
    premium: 850,
    paymentFrequency: "quarterly",
    nextPaymentDate: "2023-08-10",
    coverageAmount: 500000,
    details: {
      beneficiaries: ["María López", "Juan López"],
      coverageType: "Vida Completa",
      additionalCoverage: ["Invalidez", "Enfermedades Graves"],
    },
  },
  {
    id: "pol-9012",
    type: "home",
    name: "Seguro de Hogar Básico",
    status: "pending",
    startDate: "2023-07-01",
    endDate: "2024-07-01",
    premium: 450,
    paymentFrequency: "annual",
    nextPaymentDate: "2023-07-01",
    coverageAmount: 150000,
    details: {
      address: "Calle Principal 123",
      propertyType: "Apartamento",
      squareMeters: 85,
      coverageType: "Básico",
    },
  },
]

export function MyPolicies() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulación de carga de datos
    const loadPolicies = async () => {
      // En una aplicación real, aquí se haría una llamada a la API
      setTimeout(() => {
        setPolicies(mockPolicies)
      }, 500)
    }

    loadPolicies()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Activa
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Expirada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const handleViewPolicy = (policyId: string) => {
    router.push(`/seguros/poliza/${policyId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mis Pólizas</h2>
        <Button variant="outline">Ver todas</Button>
      </div>

      {policies.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No tienes pólizas activas en este momento.</p>
            <Button className="mt-4" variant="default">
              Explorar Seguros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {policies.map((policy) => (
            <Card key={policy.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{policy.name}</CardTitle>
                    <CardDescription>Póliza #{policy.id}</CardDescription>
                  </div>
                  {getStatusBadge(policy.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Vigencia</p>
                    <p className="font-medium">
                      {formatDate(policy.startDate)} - {formatDate(policy.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prima</p>
                    <p className="font-medium">
                      {formatCurrency(policy.premium)}/
                      {policy.paymentFrequency === "monthly"
                        ? "mes"
                        : policy.paymentFrequency === "quarterly"
                          ? "trimestre"
                          : "año"}
                    </p>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Próximo pago</p>
                  <p className="font-medium">{formatDate(policy.nextPaymentDate)}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-2">
                <Button variant="ghost" className="w-full justify-between" onClick={() => handleViewPolicy(policy.id)}>
                  Ver detalles
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
