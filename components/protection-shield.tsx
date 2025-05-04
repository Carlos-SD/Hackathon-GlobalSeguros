"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield, Info, AlertTriangle, CheckCircle, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProtectionCategory {
  id: string
  name: string
  description: string
  coverage: number
  icon: React.ReactNode
  color: string
}

interface ProtectionShieldProps {
  className?: string
}

export function ProtectionShield({ className }: ProtectionShieldProps) {
  const [categories, setCategories] = useState<ProtectionCategory[]>([
    {
      id: "life",
      name: "Vida",
      description: "Protección para ti y tu familia",
      coverage: 75,
      icon: <Shield className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: "health",
      name: "Salud",
      description: "Cobertura médica y hospitalaria",
      coverage: 60,
      icon: <Shield className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      id: "property",
      name: "Propiedad",
      description: "Protección para tus bienes",
      coverage: 40,
      icon: <Shield className="h-5 w-5" />,
      color: "bg-amber-500",
    },
    {
      id: "retirement",
      name: "Jubilación",
      description: "Planificación para el futuro",
      coverage: 25,
      icon: <Shield className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ])

  const [overallProtection, setOverallProtection] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Calcular la protección general basada en las categorías
    const totalCoverage = categories.reduce((sum, category) => sum + category.coverage, 0)
    const avgCoverage = totalCoverage / categories.length
    setOverallProtection(avgCoverage)
  }, [categories])

  const getProtectionLevel = (coverage: number) => {
    if (coverage >= 80) return { label: "Excelente", color: "text-green-600" }
    if (coverage >= 60) return { label: "Bueno", color: "text-blue-600" }
    if (coverage >= 40) return { label: "Moderado", color: "text-amber-600" }
    if (coverage >= 20) return { label: "Básico", color: "text-orange-600" }
    return { label: "Insuficiente", color: "text-red-600" }
  }

  const getProtectionIcon = (coverage: number) => {
    if (coverage >= 60) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (coverage >= 30) return <AlertTriangle className="h-5 w-5 text-amber-600" />
    return <AlertTriangle className="h-5 w-5 text-red-600" />
  }

  const handleImproveProtection = () => {
    router.push("/seguros/asesor")
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Tu Escudo de Protección</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Información sobre el Escudo de Protección</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  El Escudo de Protección muestra tu nivel de cobertura en diferentes áreas de seguros. Un mayor
                  porcentaje indica mejor protección.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          Tu nivel general de protección es{" "}
          <span className={getProtectionLevel(overallProtection).color + " font-medium"}>
            {getProtectionLevel(overallProtection).label}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Protección General</span>
            </div>
            <span className="text-sm font-medium">{Math.round(overallProtection)}%</span>
          </div>
          <Progress value={overallProtection} className="h-2" />
        </div>

        <div className="space-y-3 mt-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <div className={`${category.color} p-1.5 rounded-full`}>{category.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getProtectionIcon(category.coverage)}
                    <span className="text-sm font-medium">{category.coverage}%</span>
                  </div>
                </div>
                <Progress value={category.coverage} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleImproveProtection} className="w-full flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Mejorar mi protección
        </Button>
      </CardFooter>
    </Card>
  )
}
