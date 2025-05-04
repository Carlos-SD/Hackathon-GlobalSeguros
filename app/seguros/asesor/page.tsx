import { MobileNavigation } from "@/components/mobile-navigation"
import { SmartAdvisor } from "@/components/insurance/smart-advisor"

export default function SmartAdvisorPage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <div className="container p-4 space-y-4">
          <SmartAdvisor />
        </div>
      </main>
      <MobileNavigation />
    </>
  )
}
