import { MobileNavigation } from "@/components/mobile-navigation"
import { InsuranceOverview } from "@/components/insurance/insurance-overview"

export default function SegurosPage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <InsuranceOverview />
      </main>
      <MobileNavigation />
    </>
  )
}
