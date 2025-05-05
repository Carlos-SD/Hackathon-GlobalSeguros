import { MobileNavigation } from "@/components/mobile-navigation"
import { AssistantCenter } from "@/components/assistant-center"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Centro de Asistencia - SeguritoBacanito",
  description: "Tu asistente virtual para resolver dudas y emergencias"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function AsistentePage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <AssistantCenter />
      </main>
      <MobileNavigation />
    </>
  )
}
