"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Activity, Car, Briefcase, Heart, Home, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Definir el esquema de validación
const lifestyleFormSchema = z.object({
  // Datos personales
  age: z.string().min(1, "La edad es requerida"),
  gender: z.string().min(1, "El género es requerido"),
  maritalStatus: z.string().min(1, "El estado civil es requerido"),
  dependents: z.string().min(1, "El número de dependientes es requerido"),

  // Salud
  smoker: z.boolean().default(false),
  chronicConditions: z.boolean().default(false),
  exerciseFrequency: z.string().min(1, "La frecuencia de ejercicio es requerida"),

  // Finanzas
  annualIncome: z.string().min(1, "El ingreso anual es requerido"),
  savings: z.string().min(1, "Los ahorros son requeridos"),
  homeOwnership: z.string().min(1, "El tipo de vivienda es requerido"),

  // Estilo de vida
  occupation: z.string().min(1, "La ocupación es requerida"),
  riskTolerance: z.number().min(1).max(10),
  hobbies: z.array(z.string()).default([]),
  travelFrequency: z.string().min(1, "La frecuencia de viajes es requerida"),
})

type LifestyleFormValues = z.infer<typeof lifestyleFormSchema>

interface LifestyleProfileProps {
  onSubmit?: (data: LifestyleFormValues) => void
}

export function LifestyleProfile({ onSubmit }: LifestyleProfileProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [profile, setProfile] = useState({
    // Datos personales
    occupation: "",
    workType: "",
    commute: "",

    // Estilo de vida
    exerciseFrequency: "",
    sports: [] as string[],
    smoking: "",
    alcohol: "",

    // Vivienda
    homeType: "",
    homeOwnership: "",
    homeLocation: "",

    // Vehículos
    vehicleType: "",
    vehicleUsage: "",
    vehicleAge: "",

    // Salud
    chronicConditions: "",
    familyHistory: "",

    // Objetivos
    financialGoals: "",
    protectionPriorities: [] as string[],
  })

  // Definir valores por defecto
  const defaultValues: Partial<LifestyleFormValues> = {
    age: "",
    gender: "",
    maritalStatus: "",
    dependents: "0",
    smoker: false,
    chronicConditions: false,
    exerciseFrequency: "",
    annualIncome: "",
    savings: "",
    homeOwnership: "",
    occupation: "",
    riskTolerance: 5,
    hobbies: [],
    travelFrequency: "",
  }

  const form = useForm<LifestyleFormValues>({
    resolver: zodResolver(lifestyleFormSchema),
    defaultValues,
  })

  const handleSubmit = (data: LifestyleFormValues) => {
    console.log("Datos del formulario:", data)
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)

      toast({
        title: "Perfil actualizado",
        description: "Tu información de estilo de vida ha sido guardada correctamente.",
      })
    }, 1500)
    if (onSubmit) {
      onSubmit(data)
    }
  }

  const occupationOptions = [
    { value: "office", label: "Trabajo de oficina" },
    { value: "physical", label: "Trabajo físico" },
    { value: "travel", label: "Trabajo con viajes frecuentes" },
    { value: "remote", label: "Trabajo remoto" },
    { value: "healthcare", label: "Profesional de la salud" },
    { value: "education", label: "Educación" },
    { value: "other", label: "Otro" },
  ]

  const workTypeOptions = [
    { value: "employee", label: "Empleado" },
    { value: "freelance", label: "Freelance/Independiente" },
    { value: "business_owner", label: "Dueño de negocio" },
    { value: "retired", label: "Jubilado" },
    { value: "student", label: "Estudiante" },
  ]

  const commuteOptions = [
    { value: "car", label: "Automóvil" },
    { value: "public", label: "Transporte público" },
    { value: "bike", label: "Bicicleta" },
    { value: "walk", label: "A pie" },
    { value: "mixed", label: "Mixto" },
    { value: "none", label: "No me desplazo" },
  ]

  const exerciseOptions = [
    { value: "daily", label: "Diariamente" },
    { value: "several", label: "Varias veces por semana" },
    { value: "weekly", label: "Una vez por semana" },
    { value: "rarely", label: "Raramente" },
    { value: "never", label: "Nunca" },
  ]

  const sportsOptions = [
    { id: "running", label: "Correr" },
    { id: "cycling", label: "Ciclismo" },
    { id: "swimming", label: "Natación" },
    { id: "gym", label: "Gimnasio" },
    { id: "team_sports", label: "Deportes de equipo" },
    { id: "extreme", label: "Deportes extremos" },
    { id: "martial", label: "Artes marciales" },
    { id: "other", label: "Otros" },
  ]

  const smokingOptions = [
    { value: "never", label: "Nunca he fumado" },
    { value: "former", label: "Ex fumador" },
    { value: "occasional", label: "Fumador ocasional" },
    { value: "regular", label: "Fumador regular" },
  ]

  const alcoholOptions = [
    { value: "never", label: "No consumo" },
    { value: "rarely", label: "Ocasionalmente" },
    { value: "weekly", label: "Semanalmente" },
    { value: "frequently", label: "Frecuentemente" },
  ]

  const homeTypeOptions = [
    { value: "apartment", label: "Apartamento" },
    { value: "house", label: "Casa" },
    { value: "condo", label: "Condominio" },
    { value: "rural", label: "Propiedad rural" },
  ]

  const homeOwnershipOptions = [
    { value: "own", label: "Propia" },
    { value: "mortgage", label: "Hipotecada" },
    { value: "rent", label: "Alquilada" },
    { value: "family", label: "Familiar" },
  ]

  const vehicleTypeOptions = [
    { value: "sedan", label: "Sedán" },
    { value: "suv", label: "SUV" },
    { value: "truck", label: "Camioneta" },
    { value: "luxury", label: "Vehículo de lujo" },
    { value: "motorcycle", label: "Motocicleta" },
    { value: "none", label: "No tengo vehículo" },
  ]

  const vehicleUsageOptions = [
    { value: "daily", label: "Uso diario" },
    { value: "occasional", label: "Uso ocasional" },
    { value: "weekend", label: "Fines de semana" },
    { value: "work", label: "Trabajo" },
    { value: "none", label: "No aplica" },
  ]

  const protectionPriorityOptions = [
    { id: "family", label: "Protección familiar" },
    { id: "health", label: "Salud" },
    { id: "property", label: "Bienes materiales" },
    { id: "retirement", label: "Jubilación" },
    { id: "education", label: "Educación" },
    { id: "travel", label: "Viajes" },
    { id: "business", label: "Negocio" },
  ]

  const hobbiesOptions = [
    { id: "sports", label: "Deportes" },
    { id: "travel", label: "Viajes" },
    { id: "extreme_sports", label: "Deportes extremos" },
    { id: "reading", label: "Lectura" },
    { id: "cooking", label: "Cocina" },
    { id: "technology", label: "Tecnología" },
    { id: "arts", label: "Arte y música" },
    { id: "outdoor", label: "Actividades al aire libre" },
  ]

  // Función para manejar cambios en el formulario
  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (field: string, value: string) => {
    setProfile((prev) => {
      const currentValues = [...prev[field as keyof typeof prev]] as string[]

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value],
        }
      }
    })
  }

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      handleSubmit(form.getValues())
    }
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // Función para enviar el formulario
  const handleReset = () => {
    setIsComplete(false)
    setStep(1)
  }

  // Renderizar el paso actual
  const renderStep = () => {
    switch (step) {
      case 1: // Datos personales y laborales
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Briefcase className="h-5 w-5" />
              <h3 className="font-medium">Información Laboral</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Ocupación principal</Label>
              <Select value={profile.occupation} onValueChange={(value) => handleChange("occupation", value)}>
                <SelectTrigger id="occupation">
                  <SelectValue placeholder="Selecciona tu tipo de trabajo" />
                </SelectTrigger>
                <SelectContent>
                  {occupationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workType">Tipo de empleo</Label>
              <Select value={profile.workType} onValueChange={(value) => handleChange("workType", value)}>
                <SelectTrigger id="workType">
                  <SelectValue placeholder="Selecciona tu tipo de empleo" />
                </SelectTrigger>
                <SelectContent>
                  {workTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commute">¿Cómo te desplazas habitualmente?</Label>
              <Select value={profile.commute} onValueChange={(value) => handleChange("commute", value)}>
                <SelectTrigger id="commute">
                  <SelectValue placeholder="Selecciona tu medio de transporte habitual" />
                </SelectTrigger>
                <SelectContent>
                  {commuteOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2: // Estilo de vida
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Activity className="h-5 w-5" />
              <h3 className="font-medium">Estilo de Vida</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseFrequency">Frecuencia de ejercicio</Label>
              <Select
                value={profile.exerciseFrequency}
                onValueChange={(value) => handleChange("exerciseFrequency", value)}
              >
                <SelectTrigger id="exerciseFrequency">
                  <SelectValue placeholder="¿Con qué frecuencia haces ejercicio?" />
                </SelectTrigger>
                <SelectContent>
                  {exerciseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Deportes o actividades físicas que practicas</Label>
              <div className="grid grid-cols-2 gap-2">
                {sportsOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`sport-${option.id}`}
                      checked={profile.sports.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleCheckboxChange("sports", option.id)
                        } else {
                          handleCheckboxChange("sports", option.id)
                        }
                      }}
                    />
                    <Label htmlFor={`sport-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="smoking">Hábito de fumar</Label>
              <Select value={profile.smoking} onValueChange={(value) => handleChange("smoking", value)}>
                <SelectTrigger id="smoking">
                  <SelectValue placeholder="Selecciona tu hábito de fumar" />
                </SelectTrigger>
                <SelectContent>
                  {smokingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alcohol">Consumo de alcohol</Label>
              <Select value={profile.alcohol} onValueChange={(value) => handleChange("alcohol", value)}>
                <SelectTrigger id="alcohol">
                  <SelectValue placeholder="Selecciona tu consumo de alcohol" />
                </SelectTrigger>
                <SelectContent>
                  {alcoholOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3: // Vivienda y vehículos
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Home className="h-5 w-5" />
              <h3 className="font-medium">Vivienda</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeType">Tipo de vivienda</Label>
              <Select value={profile.homeType} onValueChange={(value) => handleChange("homeType", value)}>
                <SelectTrigger id="homeType">
                  <SelectValue placeholder="Selecciona tu tipo de vivienda" />
                </SelectTrigger>
                <SelectContent>
                  {homeTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeOwnership">Propiedad de la vivienda</Label>
              <Select value={profile.homeOwnership} onValueChange={(value) => handleChange("homeOwnership", value)}>
                <SelectTrigger id="homeOwnership">
                  <SelectValue placeholder="Selecciona el tipo de propiedad" />
                </SelectTrigger>
                <SelectContent>
                  {homeOwnershipOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeLocation">Ubicación de la vivienda</Label>
              <Input
                id="homeLocation"
                placeholder="Ciudad, barrio o zona"
                value={profile.homeLocation}
                onChange={(e) => handleChange("homeLocation", e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-primary mt-6 mb-4">
              <Car className="h-5 w-5" />
              <h3 className="font-medium">Vehículos</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Tipo de vehículo principal</Label>
              <Select value={profile.vehicleType} onValueChange={(value) => handleChange("vehicleType", value)}>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Selecciona tu tipo de vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleUsage">Uso del vehículo</Label>
              <Select
                value={profile.vehicleUsage}
                onValueChange={(value) => handleChange("vehicleUsage", value)}
                disabled={profile.vehicleType === "none"}
              >
                <SelectTrigger id="vehicleUsage">
                  <SelectValue placeholder="Selecciona el uso principal" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleUsageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleAge">Antigüedad del vehículo</Label>
              <Input
                id="vehicleAge"
                placeholder="Ej: 3 años"
                value={profile.vehicleAge}
                onChange={(e) => handleChange("vehicleAge", e.target.value)}
                disabled={profile.vehicleType === "none"}
              />
            </div>
          </div>
        )

      case 4: // Salud
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Heart className="h-5 w-5" />
              <h3 className="font-medium">Información de Salud</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chronicConditions">Condiciones médicas crónicas</Label>
              <Textarea
                id="chronicConditions"
                placeholder="Describe cualquier condición médica crónica que tengas (diabetes, hipertensión, etc.)"
                value={profile.chronicConditions}
                onChange={(e) => handleChange("chronicConditions", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyHistory">Antecedentes familiares relevantes</Label>
              <Textarea
                id="familyHistory"
                placeholder="Describe antecedentes familiares relevantes para tu evaluación de riesgo"
                value={profile.familyHistory}
                onChange={(e) => handleChange("familyHistory", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        )

      case 5: // Objetivos
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-4">
              <User className="h-5 w-5" />
              <h3 className="font-medium">Objetivos y Prioridades</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialGoals">Objetivos financieros</Label>
              <Textarea
                id="financialGoals"
                placeholder="Describe tus principales objetivos financieros (jubilación, educación de hijos, compra de vivienda, etc.)"
                value={profile.financialGoals}
                onChange={(e) => handleChange("financialGoals", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Prioridades de protección</Label>
              <div className="grid grid-cols-2 gap-2">
                {protectionPriorityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${option.id}`}
                      checked={profile.protectionPriorities.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleCheckboxChange("protectionPriorities", option.id)
                        } else {
                          handleCheckboxChange("protectionPriorities", option.id)
                        }
                      }}
                    />
                    <Label htmlFor={`priority-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isComplete) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Perfil de Estilo de Vida</CardTitle>
          <CardDescription>Información para personalizar tus recomendaciones de seguros</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6 text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <div>
            <h3 className="text-xl font-bold mb-2">¡Perfil Actualizado!</h3>
            <p className="text-muted-foreground">
              Tu información de estilo de vida ha sido guardada correctamente. Utilizaremos estos datos para ofrecerte
              recomendaciones personalizadas.
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleReset} variant="outline">
              Editar información
            </Button>
            <Button asChild>
              <a href="/seguros/asesor">Ver recomendaciones</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil de Estilo de Vida</CardTitle>
        <CardDescription>Información para personalizar tus recomendaciones de seguros</CardDescription>
        <div className="flex items-center gap-2 mt-4">
          <div className="h-2 flex-1 bg-muted overflow-hidden rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium">{step}/5</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* {renderStep()} */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="health">Salud</TabsTrigger>
                <TabsTrigger value="finances">Finanzas</TabsTrigger>
                <TabsTrigger value="lifestyle">Estilo de Vida</TabsTrigger>
              </TabsList>

              {/* Pestaña de Datos Personales */}
              <TabsContent value="personal" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edad</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ej: 35" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Género</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu género" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Masculino</SelectItem>
                              <SelectItem value="female">Femenino</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu estado civil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Soltero/a</SelectItem>
                            <SelectItem value="married">Casado/a</SelectItem>
                            <SelectItem value="divorced">Divorciado/a</SelectItem>
                            <SelectItem value="widowed">Viudo/a</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dependents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Dependientes</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ej: 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Pestaña de Salud */}
              <TabsContent value="health" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="smoker"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">¿Fumas?</FormLabel>
                        <FormDescription>Indica si eres fumador/a actualmente.</FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chronicConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">¿Tienes condiciones médicas crónicas?</FormLabel>
                        <FormDescription>
                          Indica si tienes alguna condición médica crónica diagnosticada.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exerciseFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frecuencia de Ejercicio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensual</SelectItem>
                          <SelectItem value="rarely">Raramente</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Pestaña de Finanzas */}
              <TabsContent value="finances" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingreso Anual</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ej: 50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="savings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ahorros Totales</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ej: 10000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="homeOwnership"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Vivienda</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu tipo de vivienda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="own">Propia</SelectItem>
                          <SelectItem value="rent">Alquilada</SelectItem>
                          <SelectItem value="family">Familiar</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Pestaña de Estilo de Vida */}
              <TabsContent value="lifestyle" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocupación</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Ej: Ingeniero/a" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="riskTolerance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tolerancia al Riesgo</FormLabel>
                      <FormDescription>¿Qué tan cómodo te sientes al asumir riesgos financieros?</FormDescription>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={10}
                          min={1}
                          step={1}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hobbies e Intereses</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {hobbiesOptions.map((hobby) => (
                          <FormItem
                            key={hobby.id}
                            className="flex flex-row items-center space-x-2 rounded-md border p-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(hobby.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...(field.value || []), hobby.id])
                                  } else {
                                    field.onChange(field.value?.filter((v) => v !== hobby.id))
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">{hobby.label}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frecuencia de Viajes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frequent">Frecuente</SelectItem>
                          <SelectItem value="occasional">Ocasional</SelectItem>
                          <SelectItem value="rarely">Raramente</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Atrás
          </Button>
        ) : (
          <div></div>
        )}
        <Button onClick={nextStep} disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : step === 5 ? "Guardar perfil" : "Continuar"}
        </Button>
      </CardFooter>
    </Card>
  )
}
