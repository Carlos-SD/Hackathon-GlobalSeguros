import { MobileNavigation } from "@/components/mobile-navigation"
import { VitalityCenter } from "@/components/vitality-center"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Centro de Vitalidad - SeguritoBacanito",
  description: "Monitoreo de salud y bienestar"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function VitalidadPage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <VitalityCenter />
      </main>
      <MobileNavigation />
    </>
  )
}
