import { MobileNavigation } from "@/components/mobile-navigation"
import { LifestyleProfile } from "@/components/lifestyle-profile"

export default function LifestyleProfilePage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <div className="container p-4">
          <LifestyleProfile />
        </div>
      </main>
      <MobileNavigation />
    </>
  )
} 