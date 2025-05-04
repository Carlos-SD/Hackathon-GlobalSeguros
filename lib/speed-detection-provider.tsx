"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Trip {
  startTime: number
  endTime: number
  duration: number // in seconds
  distance: number // in kilometers
  score: number
  maxSpeed: number
}

interface SpeedDetectionContextType {
  isSpeedDetectionEnabled: boolean
  toggleSpeedDetection: () => void
  currentSpeed: number
  isOnTrip: boolean
  startTrip: () => void
  endTrip: () => void
  tripHistory: Trip[]
  speedThreshold: number
  setSpeedThreshold: (threshold: number) => void
  usingMockData: boolean
  hasShownNotification: boolean
  resetNotificationState: () => void
}

const SpeedDetectionContext = createContext<SpeedDetectionContextType | undefined>(undefined)

export function SpeedDetectionProvider({ children }: { children: React.ReactNode }) {
  const [isSpeedDetectionEnabled, setIsSpeedDetectionEnabled] = useState(true)
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [isOnTrip, setIsOnTrip] = useState(false)
  const [tripStart, setTripStart] = useState<number | null>(null)
  const [tripDistance, setTripDistance] = useState(0)
  const [maxSpeed, setMaxSpeed] = useState(0)
  const [lastPosition, setLastPosition] = useState<GeolocationPosition | null>(null)
  const [tripHistory, setTripHistory] = useState<Trip[]>([
    // Añadir un viaje simulado para mostrar historial
    {
      startTime: Date.now() - 86400000, // Ayer
      endTime: Date.now() - 84600000,
      duration: 1800, // 30 minutos
      distance: 15.7,
      score: 92,
      maxSpeed: 110,
    },
    {
      startTime: Date.now() - 172800000, // Hace 2 días
      endTime: Date.now() - 171000000,
      duration: 1800, // 30 minutos
      distance: 12.3,
      score: 88,
      maxSpeed: 95,
    },
  ])
  const [speedThreshold, setSpeedThreshold] = useState(10) // km/h
  const [hasShownNotification, setHasShownNotification] = useState(false)
  const { toast } = useToast()
  const [usingMockData, setUsingMockData] = useState(false)
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetNotificationState = useCallback(() => {
    setHasShownNotification(false)
  }, [])

  const toggleSpeedDetection = useCallback(() => {
    setIsSpeedDetectionEnabled((prev) => !prev)
    // Resetear el estado de notificación cuando se cambia la configuración
    setHasShownNotification(false)

    // Limpiar cualquier timeout pendiente
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
      notificationTimeoutRef.current = null
    }
  }, [])

  const startTrip = useCallback(() => {
    if (!isOnTrip) {
      setIsOnTrip(true)
      setTripStart(Date.now())
      setTripDistance(0)
      setMaxSpeed(0)

      // Mostrar notificación de inicio de viaje
      toast({
        title: "Viaje iniciado",
        description: "Tu viaje ha comenzado. Conduce con seguridad.",
        duration: 3000,
      })
    }
  }, [isOnTrip, toast])

  const endTrip = useCallback(() => {
    if (isOnTrip && tripStart) {
      const endTime = Date.now()
      const duration = (endTime - tripStart) / 1000 // convert to seconds

      // Generate a random score between 80 and 100
      const score = Math.floor(Math.random() * 21) + 80

      const newTrip: Trip = {
        startTime: tripStart,
        endTime,
        duration,
        distance: tripDistance,
        score,
        maxSpeed,
      }

      setTripHistory((prev) => [newTrip, ...prev].slice(0, 10)) // Keep only the last 10 trips
      setIsOnTrip(false)
      setTripStart(null)

      // Mostrar notificación de fin de viaje
      toast({
        title: "Viaje finalizado",
        description: `Has completado tu viaje. Distancia: ${tripDistance.toFixed(1)} km, Duración: ${Math.round(duration / 60)} min.`,
        duration: 3000,
      })

      // Resetear el estado de notificación para permitir futuras notificaciones
      setHasShownNotification(false)
    }
  }, [isOnTrip, tripStart, tripDistance, maxSpeed, toast])

  // Function to calculate distance between two coordinates
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }, [])

  // Function to show trip start notification
  const showTripStartNotification = useCallback(() => {
    // Solo mostrar la notificación si no se ha mostrado antes y la detección está habilitada
    if (!hasShownNotification && isSpeedDetectionEnabled && !isOnTrip) {
      toast({
        title: "¿Iniciando un viaje?",
        description: "Parece que estás en movimiento. ¿Deseas iniciar un viaje?",
        action: (
          <div className="flex gap-2 mt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                startTrip()
                setHasShownNotification(true)
              }}
            >
              Sí, iniciar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSpeedDetectionEnabled(false)
                setHasShownNotification(true)
              }}
            >
              No, desactivar
            </Button>
          </div>
        ),
        duration: 10000,
      })

      // Marcar que ya se ha mostrado la notificación
      setHasShownNotification(true)

      // Establecer un temporizador para resetear el estado después de 5 minutos
      notificationTimeoutRef.current = setTimeout(
        () => {
          setHasShownNotification(false)
        },
        5 * 60 * 1000,
      )
    }
  }, [hasShownNotification, isSpeedDetectionEnabled, isOnTrip, toast, startTrip])

  // Monitor speed using geolocation
  useEffect(() => {
    if (typeof window === "undefined") return

    let watchId: number | null = null
    let mockInterval: NodeJS.Timeout | null = null

    // Check if geolocation is available
    const isGeolocationAvailable = navigator.geolocation && typeof navigator.geolocation.watchPosition === "function"

    if (isGeolocationAvailable) {
      try {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            // Calculate speed
            if (lastPosition) {
              const timeDiff = (position.timestamp - lastPosition.timestamp) / 1000 // seconds
              if (timeDiff > 0) {
                const distance = calculateDistance(
                  lastPosition.coords.latitude,
                  lastPosition.coords.longitude,
                  position.coords.latitude,
                  position.coords.longitude,
                )

                // Speed in km/h
                const speed = (distance / timeDiff) * 3600
                setCurrentSpeed(speed)

                // Update trip distance if on a trip
                if (isOnTrip) {
                  setTripDistance((prev) => prev + distance)
                  if (speed > maxSpeed) {
                    setMaxSpeed(speed)
                  }
                }

                // Auto-detect trip start if enabled
                if (isSpeedDetectionEnabled && !isOnTrip && speed >= speedThreshold) {
                  showTripStartNotification()
                }
              }
            }

            setLastPosition(position)
          },
          (error) => {
            console.warn("Error getting location:", error.message)
            // Fall back to mock data if geolocation fails
            startMockSpeedSimulation()
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
          },
        )
      } catch (error) {
        console.warn("Failed to initialize geolocation:", error)
        // Fall back to mock data if geolocation fails
        startMockSpeedSimulation()
      }
    } else {
      console.warn("Geolocation is not available in this browser or context")
      // Fall back to mock data if geolocation is not available
      startMockSpeedSimulation()
    }

    // Function to start mock speed simulation
    function startMockSpeedSimulation() {
      if (mockInterval) return // Prevent duplicate intervals

      console.info("Using mock speed data for simulation")
      setUsingMockData(true)
      mockInterval = setInterval(() => {
        // Generate random speed between 0 and 30 km/h
        const mockSpeed = Math.random() * 30
        setCurrentSpeed(mockSpeed)

        // Auto-detect trip start if enabled
        if (isSpeedDetectionEnabled && !isOnTrip && mockSpeed >= speedThreshold && !hasShownNotification) {
          showTripStartNotification()
        }

        // Update trip distance if on a trip
        if (isOnTrip) {
          // Simulate distance based on speed
          const timeInHours = 5 / 3600 // 5 seconds in hours
          const distance = mockSpeed * timeInHours
          setTripDistance((prev) => prev + distance)

          if (mockSpeed > maxSpeed) {
            setMaxSpeed(mockSpeed)
          }
        }
      }, 5000)
    }

    return () => {
      // Clean up
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
      if (mockInterval !== null) {
        clearInterval(mockInterval)
      }
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
    }
  }, [
    lastPosition,
    isOnTrip,
    calculateDistance,
    isSpeedDetectionEnabled,
    speedThreshold,
    showTripStartNotification,
    maxSpeed,
    hasShownNotification,
  ])

  return (
    <SpeedDetectionContext.Provider
      value={{
        isSpeedDetectionEnabled,
        toggleSpeedDetection,
        currentSpeed,
        isOnTrip,
        startTrip,
        endTrip,
        tripHistory,
        speedThreshold,
        setSpeedThreshold,
        usingMockData,
        hasShownNotification,
        resetNotificationState,
      }}
    >
      {children}
    </SpeedDetectionContext.Provider>
  )
}

export function useSpeedDetection() {
  const context = useContext(SpeedDetectionContext)
  if (context === undefined) {
    throw new Error("useSpeedDetection must be used within a SpeedDetectionProvider")
  }
  return context
}

// Helper Button component for the toast
function Button({
  variant = "default",
  size = "default",
  children,
  onClick,
}: {
  variant?: "default" | "outline"
  size?: "default" | "sm"
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      className={`
        px-4 py-2 rounded-md font-medium text-sm
        ${variant === "default" ? "bg-primary text-primary-foreground" : "border border-input bg-background"}
        ${size === "sm" ? "text-xs px-3 py-1" : ""}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
