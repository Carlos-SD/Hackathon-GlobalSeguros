"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2 } from "lucide-react"

interface QuickQuoteProps {
  insuranceType: string
  insuranceName: string
}

export function QuickQuote({ insuranceType, insuranceName }: QuickQuoteProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    coverageAmount: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)

      toast({
        title: "Cotización enviada",
        description: "Te contactaremos pronto con tu cotización personalizada.",
      })
    }, 1500)
  }

  const handleReset = () => {
    setStep(1)
    setIsComplete(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      coverageAmount: "",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Solicitar Cotización</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Cotización Rápida</DialogTitle>
              <DialogDescription>
                Solicita una cotización personalizada para tu {insuranceName.toLowerCase()}
              </DialogDescription>
            </DialogHeader>

            {step === 1 ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <Select onValueChange={(value) => handleSelectChange("age", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu rango de edad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 años</SelectItem>
                      <SelectItem value="26-35">26-35 años</SelectItem>
                      <SelectItem value="36-45">36-45 años</SelectItem>
                      <SelectItem value="46-55">46-55 años</SelectItem>
                      <SelectItem value="56+">56+ años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverageAmount">Cobertura deseada</Label>
                  <Select onValueChange={(value) => handleSelectChange("coverageAmount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el monto de cobertura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100000">$100,000</SelectItem>
                      <SelectItem value="250000">$250,000</SelectItem>
                      <SelectItem value="500000">$500,000</SelectItem>
                      <SelectItem value="1000000">$1,000,000</SelectItem>
                      <SelectItem value="2000000">$2,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              {step === 1 ? (
                <Button onClick={handleNext}>Continuar</Button>
              ) : (
                <div className="flex w-full justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Atrás
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Solicitar Cotización"}
                  </Button>
                </div>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <DialogTitle>¡Solicitud Enviada!</DialogTitle>
            <DialogDescription>
              Hemos recibido tu solicitud de cotización para {insuranceName}. Un asesor se pondrá en contacto contigo en
              las próximas 24 horas.
            </DialogDescription>
            <Button onClick={handleReset}>Cerrar</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
