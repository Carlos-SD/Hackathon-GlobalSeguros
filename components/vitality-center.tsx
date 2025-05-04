import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, Heart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VitalityCenter() {
  return (
    <div className="container p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Centro de Vitalidad</h1>
        <p className="text-muted-foreground text-sm">Monitoreo de salud y bienestar</p>
      </div>

      <Tabs defaultValue="diario" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="diario">Diario</TabsTrigger>
          <TabsTrigger value="semanal">Semanal</TabsTrigger>
          <TabsTrigger value="mensual">Mensual</TabsTrigger>
        </TabsList>
        <TabsContent value="diario" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-primary" />
                  Pasos
                </CardTitle>
                <CardDescription>Hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <div className="text-3xl font-bold mb-2">6,248</div>
                  <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "62.5%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">62.5% de tu meta diaria (10,000)</p>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 mt-2 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>12% más que ayer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  Frecuencia Cardíaca
                </CardTitle>
                <CardDescription>Promedio de hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <div className="text-3xl font-bold mb-2">
                    72 <span className="text-lg font-normal">bpm</span>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Mínima</p>
                      <p className="font-medium text-sm">58 bpm</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Máxima</p>
                      <p className="font-medium text-sm">124 bpm</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">En reposo</p>
                      <p className="font-medium text-sm">62 bpm</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Recordatorios de Chequeos
              </CardTitle>
              <CardDescription>Próximos chequeos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <h4 className="font-medium text-sm">Chequeo médico general</h4>
                    <p className="text-xs text-muted-foreground">Programado para: 15 de junio, 2025</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Recordar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <h4 className="font-medium text-sm">Control de presión arterial</h4>
                    <p className="text-xs text-muted-foreground">Programado para: 30 de mayo, 2025</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Recordar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="semanal" className="text-center py-12 text-muted-foreground">
          Los datos semanales estarán disponibles pronto
        </TabsContent>
        <TabsContent value="mensual" className="text-center py-12 text-muted-foreground">
          Los datos mensuales estarán disponibles pronto
        </TabsContent>
      </Tabs>
    </div>
  )
}
