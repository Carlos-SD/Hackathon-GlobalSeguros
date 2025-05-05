"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Clock, MapPin } from "lucide-react"
import { useSpeedDetection } from "@/lib/speed-detection-provider"
import { useMemo } from "react"

export function DrivingSummary() {
  const { tripHistory } = useSpeedDetection()

  const lastTrip = tripHistory.length > 0 ? tripHistory[0] : null

  // Formatear la fecha de manera consistente entre servidor y cliente
  const formattedDate = useMemo(() => {
    if (!lastTrip) return "Sin viajes recientes";
    
    // En el servidor, usar una cadena fija para evitar errores de hidratación
    if (typeof window === 'undefined') {
      return "Último viaje registrado";
    }
    
    // En el cliente, formatear la fecha normalmente
    return `Último viaje: ${new Date(lastTrip.endTime).toLocaleString()}`;
  }, [lastTrip]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Car className="h-5 w-5 text-primary" />
          Resumen de Conducción
        </CardTitle>
        <CardDescription>
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastTrip ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Distancia</p>
                  <p className="text-xl font-bold">
                    {lastTrip.distance.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">km</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Duración</p>
                  <p className="text-xl font-bold">
                    {Math.round(lastTrip.duration / 60)}{" "}
                    <span className="text-xs font-normal text-muted-foreground">min</span>
                  </p>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-medium">
                Puntaje: {lastTrip.score}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No hay viajes registrados aún. Tus viajes aparecerán aquí cuando realices uno.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
