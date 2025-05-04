import { MobileNavigation } from "@/components/mobile-navigation"
import { LifestyleProfile } from "@/components/lifestyle-profile"

export default function ProfilePage() {
  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <div className="container p-4 space-y-4">
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          <LifestyleProfile />
        </div>
      </main>
      <MobileNavigation />
    </>
  )
}
