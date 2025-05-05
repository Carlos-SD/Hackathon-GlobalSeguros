"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, SettingsIcon, Smartphone, Watch, Car } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useSpeedDetection } from "@/lib/speed-detection-provider"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/brand/logo"

export function Settings() {
  const { isSpeedDetectionEnabled, toggleSpeedDetection, speedThreshold, setSpeedThreshold } = useSpeedDetection()
  const { toast } = useToast()
  const [startSpeed, setStartSpeed] = useState(speedThreshold)
  const [stopSpeed, setStopSpeed] = useState(speedThreshold / 2)

  const handleToggleDetection = () => {
    toggleSpeedDetection()
    toast({
      title: isSpeedDetectionEnabled ? "Detección desactivada" : "Detección activada",
      description: isSpeedDetectionEnabled
        ? "La detección automática de viajes ha sido desactivada."
        : "La detección automática de viajes ha sido activada.",
    })
  }

  const handleSaveThresholds = () => {
    setSpeedThreshold(startSpeed)
    toast({
      title: "Umbrales actualizados",
      description: `Umbral de inicio: ${startSpeed} km/h, Umbral de fin: ${stopSpeed} km/h`,
    })
  }

  return (
    <div className="container p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mi Ecosistema</h1>
          <p className="text-muted-foreground text-sm">Configuración de la aplicación</p>
        </div>
        <Logo size="sm" />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Watch className="h-5 w-5 text-primary" />
            Dispositivos Conectados
          </CardTitle>
          <CardDescription>Sincronización con wearables y servicios de salud</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Apple Health</p>
                <p className="text-xs text-muted-foreground">Sincroniza pasos y frecuencia cardíaca</p>
              </div>
            </div>
            <Switch id="apple-health" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Watch className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Google Fit</p>
                <p className="text-xs text-muted-foreground">Sincroniza pasos y frecuencia cardíaca</p>
              </div>
            </div>
            <Switch id="google-fit" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Watch className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Smartwatch</p>
                <p className="text-xs text-muted-foreground">Conecta tu reloj inteligente</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Conectar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-primary" />
            Umbrales de Velocidad
          </CardTitle>
          <CardDescription>Configuración para la detección de viajes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start-speed" className="font-medium text-sm">
              Velocidad de inicio de viaje ({startSpeed} km/h)
            </Label>
            <div className="flex items-center gap-2">
              <Slider 
                id="start-speed"
                min={5} 
                max={30} 
                step={1}
                value={[startSpeed]}
                onValueChange={(value) => setStartSpeed(value[0])}
              />
              <Input 
                type="number" 
                min={5}
                max={30}
                value={startSpeed}
                onChange={(e) => setStartSpeed(Number(e.target.value))}
                className="w-16"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Un viaje comenzará automáticamente cuando superes esta velocidad.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stop-speed" className="font-medium text-sm">
              Velocidad de fin de viaje ({stopSpeed} km/h)
            </Label>
            <div className="flex items-center gap-2">
              <Slider 
                id="stop-speed"
                min={1} 
                max={15} 
                step={1}
                value={[stopSpeed]}
                onValueChange={(value) => setStopSpeed(value[0])}
              />
              <Input 
                type="number" 
                min={1}
                max={15}
                value={stopSpeed}
                onChange={(e) => setStopSpeed(Number(e.target.value))}
                className="w-16"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Un viaje terminará automáticamente cuando estés por debajo de esta velocidad por 2 minutos.
            </p>
          </div>

          <Button 
            onClick={handleSaveThresholds}
            className="w-full mt-2"
          >
            Guardar configuración
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Notificaciones
          </CardTitle>
          <CardDescription>Preferencias de notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="notif-critical" className="font-medium text-sm">
                Alertas críticas
              </Label>
              <p className="text-xs text-muted-foreground">Notificaciones de emergencia y alertas importantes</p>
            </div>
            <Switch id="notif-critical" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="notif-trips" className="font-medium text-sm">
                Detección de viajes
              </Label>
              <p className="text-xs text-muted-foreground">Notificaciones cuando se detecta un viaje</p>
            </div>
            <Switch id="notif-trips" checked={isSpeedDetectionEnabled} onCheckedChange={handleToggleDetection} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="notif-health" className="font-medium text-sm">
                Recordatorios de salud
              </Label>
              <p className="text-xs text-muted-foreground">Recordatorios para chequeos y actividad física</p>
            </div>
            <Switch id="notif-health" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <SettingsIcon className="h-5 w-5 text-primary" />
            Preferencias Generales
          </CardTitle>
          <CardDescription>Configuración general de la aplicación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="dark-mode" className="font-medium text-sm">
                Modo oscuro
              </Label>
              <p className="text-xs text-muted-foreground">Cambiar entre modo claro y oscuro</p>
            </div>
            <Switch id="dark-mode" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="data-saving" className="font-medium text-sm">
                Ahorro de datos
              </Label>
              <p className="text-xs text-muted-foreground">Reduce el uso de datos móviles</p>
            </div>
            <Switch id="data-saving" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <Label htmlFor="location" className="font-medium text-sm">
                Ubicación en segundo plano
              </Label>
              <p className="text-xs text-muted-foreground">Permite la detección automática de viajes</p>
            </div>
            <Switch id="location" checked={isSpeedDetectionEnabled} onCheckedChange={handleToggleDetection} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
