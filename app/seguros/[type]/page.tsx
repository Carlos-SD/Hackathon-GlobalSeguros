import { MobileNavigation } from "@/components/mobile-navigation"
import { InsuranceDetail } from "@/components/insurance/insurance-detail"
import { notFound } from "next/navigation"
import { getInsuranceTypeInfo } from "@/lib/services/insurance-service"

export default function InsuranceDetailPage({ params }: { params: { type: string } }) {
  const insuranceType = getInsuranceTypeInfo(params.type as any)

  if (!insuranceType) {
    notFound()
  }

  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <InsuranceDetail type={params.type as any} />
      </main>
      <MobileNavigation />
    </>
  )
}
