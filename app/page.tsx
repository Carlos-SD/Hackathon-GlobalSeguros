import { MobileNavigation } from "@/components/mobile-navigation"
import { Dashboard } from "@/components/dashboard"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Panel Principal - SeguritoBacanito",
  description: "Ecosistema de seguros impulsado por IA"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function Home() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <Dashboard />
      </main>
      <MobileNavigation />
    </>
  )
}
