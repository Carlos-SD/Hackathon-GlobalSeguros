import { MobileNavigation } from "@/components/mobile-navigation"
import { MobilityCenter } from "@/components/mobility-center"

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
