"use client"

import { useSpeedDetection } from "@/lib/speed-detection-provider"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function TripStatusBanner() {
  const { isOnTrip, currentSpeed, endTrip } = useSpeedDetection()
  const { toast } = useToast()

  if (!isOnTrip) return null

  const handleEndTrip = () => {
    endTrip()
    toast({
      title: "Viaje finalizado",
      description: "Has finalizado tu viaje manualmente.",
    })
  }

  return (
    <div className="bg-primary text-primary-foreground p-3 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Car className="h-5 w-5" />
        <div>
          <p className="font-medium text-sm">Viaje en curso</p>
          <p className="text-xs opacity-90">{currentSpeed.toFixed(1)} km/h</p>
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={handleEndTrip}>
        Finalizar
      </Button>
    </div>
  )
}
