"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Car, X, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSpeedDetection } from "@/lib/speed-detection-provider"

export function QuickAccessFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { isOnTrip, startTrip, endTrip } = useSpeedDetection()

  const handleStartTrip = () => {
    startTrip()
    setIsOpen(false)
  }

  const handleEndTrip = () => {
    endTrip()
    setIsOpen(false)
  }

  const navigateToMobility = () => {
    router.push("/movilidad")
    setIsOpen(false)
  }

  return (
    <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="flex flex-col gap-2 items-end mb-2">
          {isOnTrip ? (
            <Button
              onClick={handleEndTrip}
              size="sm"
              className="rounded-full shadow-lg px-4 flex items-center gap-2"
              variant="destructive"
            >
              <span>Finalizar Viaje</span>
              <Car className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleStartTrip}
              size="sm"
              className="rounded-full shadow-lg px-4 flex items-center gap-2"
              variant="default"
            >
              <span>Iniciar Viaje</span>
              <Car className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={navigateToMobility}
            size="sm"
            className="rounded-full shadow-lg px-4 flex items-center gap-2"
            variant="outline"
          >
            <span>Movilidad</span>
            <Shield className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        variant={isOpen ? "secondary" : "default"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Car className="h-5 w-5" />}
      </Button>
    </div>
  )
}
