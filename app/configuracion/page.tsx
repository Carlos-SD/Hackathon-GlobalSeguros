import { MobileNavigation } from "@/components/mobile-navigation"
import { Settings } from "@/components/settings"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Configuración - SeguritoBacanito",
  description: "Configura tu aplicación y preferencias"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function ConfiguracionPage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <Settings />
      </main>
      <MobileNavigation />
    </>
  )
}
