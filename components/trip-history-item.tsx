import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Clock, MapPin } from "lucide-react"
import { useMemo } from 'react'

interface TripHistoryItemProps {
  date: string
  distance: string
  duration: string
  score: number
}

export function TripHistoryItem({ date, distance, duration, score }: TripHistoryItemProps) {
  // Formatear la fecha de manera consistente tanto en cliente como en servidor
  const formattedDate = useMemo(() => {
    try {
      // Convertir el timestamp a número si es un string
      const timestamp = typeof date === 'string' ? parseInt(date, 10) : date;
      // Usar una fecha fija para server-side rendering para evitar errores de hidratación
      return typeof window === 'undefined' 
        ? 'Fecha del viaje' 
        : new Date(timestamp).toLocaleString();
    } catch (error) {
      return 'Fecha no disponible';
    }
  }, [date]);

  return (
    <Card className="p-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <p className="font-medium text-sm">{formattedDate}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{distance}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Car className="h-3 w-3" />
              <span
                className={`font-medium ${
                  score >= 90
                    ? "text-green-600 dark:text-green-400"
                    : score >= 80
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                }`}
              >
                Puntaje: {score}
              </span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">
          Ver Detalles
        </Button>
      </div>
    </Card>
  )
}
