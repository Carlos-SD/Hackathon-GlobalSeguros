"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSpeedDetection } from "@/lib/speed-detection-provider"

export function NotificationsList() {
  const { isSpeedDetectionEnabled } = useSpeedDetection()

  const notifications = [
    {
      id: 1,
      title: "Datos de salud incompletos",
      description: "Conecta tu dispositivo para sincronizar tus datos de salud",
      type: "warning",
    },
    ...(isSpeedDetectionEnabled
      ? []
      : [
          {
            id: 2,
            title: "Detección de viajes desactivada",
            description: "Activa la detección de viajes para obtener cobertura automática",
            type: "warning",
          },
        ]),
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-primary" />
          Notificaciones
        </CardTitle>
        <CardDescription>Alertas y mensajes importantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  notification.type === "warning"
                    ? "bg-amber-50 dark:bg-amber-950/30"
                    : "bg-blue-50 dark:bg-blue-950/30"
                }`}
              >
                <Info
                  className={`h-5 w-5 mt-0.5 ${
                    notification.type === "warning"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    notification.type === "warning"
                      ? "text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  }
                >
                  Acción
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">No hay notificaciones nuevas</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
