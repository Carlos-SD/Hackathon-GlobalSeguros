import { MobileNavigation } from "@/components/mobile-navigation"
import { AssistantCenter } from "@/components/assistant-center"

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
