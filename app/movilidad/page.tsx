import { MobileNavigation } from "@/components/mobile-navigation"
import { MobilityCenter } from "@/components/mobility-center"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Movilidad Segura - SeguritoBacanito",
  description: "Gestión de viajes y conducción segura"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function MovilidadPage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <MobilityCenter />
      </main>
      <MobileNavigation />
    </>
  )
}
