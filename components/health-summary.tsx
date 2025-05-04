import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Heart } from "lucide-react"

export function HealthSummary() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          Resumen de Salud
        </CardTitle>
        <CardDescription>Datos de hoy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Pasos</p>
              <p className="text-xl font-bold">6,248</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Meta: 10,000</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Heart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Frecuencia Cardíaca</p>
              <p className="text-xl font-bold">
                72 <span className="text-xs font-normal text-muted-foreground">bpm</span>
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Promedio</div>
        </div>
      </CardContent>
    </Card>
  )
}
