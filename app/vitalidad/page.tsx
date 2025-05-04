import { MobileNavigation } from "@/components/mobile-navigation"
import { VitalityCenter } from "@/components/vitality-center"

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
