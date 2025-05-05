"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Clock, Play, Settings, CircleStopIcon as Stop } from "lucide-react"
import { TripHistoryItem } from "@/components/trip-history-item"
import { useSpeedDetection } from "@/lib/speed-detection-provider"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/brand/logo"

export function MobilityCenter() {
  const {
    isOnTrip,
    startTrip,
    endTrip,
    tripHistory,
    isSpeedDetectionEnabled,
    toggleSpeedDetection,
    speedThreshold,
    setSpeedThreshold,
    usingMockData,
    resetNotificationState,
  } = useSpeedDetection()
  const { toast } = useToast()

  const handleStartTrip = () => {
    startTrip()
    toast({
      title: "Viaje iniciado",
      description: "Has iniciado un viaje manualmente.",
    })
  }

  const handleEndTrip = () => {
    endTrip()
    toast({
      title: "Viaje finalizado",
      description: "Has finalizado tu viaje manualmente.",
    })
  }

  const handleToggleDetection = () => {
    toggleSpeedDetection()
    resetNotificationState()
    toast({
      title: isSpeedDetectionEnabled ? "Detección desactivada" : "Detección activada",
      description: isSpeedDetectionEnabled
        ? "La detección automática de viajes ha sido desactivada."
        : "La detección automática de viajes ha sido activada.",
    })
  }

  return (
    <div className="container p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Movilidad Segura</h1>
          <p className="text-muted-foreground text-sm">Gestión de viajes y rutas</p>
        </div>
        <Logo size="sm" />
      </div>

      {usingMockData && (
        <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 p-2 rounded-md text-xs">
          Usando datos simulados de velocidad. La geolocalización no está disponible en este navegador o contexto.
        </div>
      )}

      <Card className={`border-primary/20 ${isOnTrip ? "bg-primary/5" : ""}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-primary" />
            Estado Actual
          </CardTitle>
          <CardDescription>Detección automática de viaje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-4">
            <div className="mb-4 text-center">
              <p className={`text-base font-medium mb-1 ${isOnTrip ? "text-primary" : ""}`}>
                {isOnTrip ? "Viaje en curso" : "No hay viaje en curso"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isSpeedDetectionEnabled ? "Detección automática activada" : "Detección automática desactivada"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="gap-2" onClick={handleStartTrip} disabled={isOnTrip} size="lg">
                <Play className="h-4 w-4" />
                Iniciar Viaje
              </Button>
              <Button
                variant={isOnTrip ? "destructive" : "outline"}
                className="gap-2"
                onClick={handleEndTrip}
                disabled={!isOnTrip}
                size="lg"
              >
                <Stop className="h-4 w-4" />
                Finalizar Viaje
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5 text-primary" />
            Configuración de Detección
          </CardTitle>
          <CardDescription>Umbrales de velocidad para inicio/fin de viaje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-detection" className="font-medium text-sm">
                Detección automática de viajes
              </Label>
              <Switch id="auto-detection" checked={isSpeedDetectionEnabled} onCheckedChange={handleToggleDetection} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Velocidad de inicio (km/h)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={speedThreshold}
                  onChange={(e) => setSpeedThreshold(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-12 text-center font-medium text-sm">{speedThreshold} km/h</span>
              </div>
              <p className="text-xs text-muted-foreground">
                El viaje se inicia automáticamente cuando superas esta velocidad
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Historial de Viajes
          </CardTitle>
          <CardDescription>Últimos recorridos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tripHistory.length > 0 ? (
              tripHistory.map((trip, index) => (
                <TripHistoryItem
                  key={index}
                  date={trip.endTime.toString()}
                  distance={`${trip.distance.toFixed(1)} km`}
                  duration={`${Math.round(trip.duration / 60)} min`}
                  score={trip.score}
                />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                No hay viajes registrados aún. Tus viajes aparecerán aquí cuando realices uno.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
