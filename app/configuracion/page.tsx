import { MobileNavigation } from "@/components/mobile-navigation"
import { Settings } from "@/components/settings"

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
