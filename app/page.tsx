import { MobileNavigation } from "@/components/mobile-navigation"
import { Dashboard } from "@/components/dashboard"

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
