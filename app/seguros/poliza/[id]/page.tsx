import { MobileNavigation } from "@/components/mobile-navigation"
import { PolicyDetail } from "@/components/insurance/policy-detail"
import { notFound } from "next/navigation"

// Simulación de datos de pólizas
const mockPolicies = [
  {
    id: "auto-policy-1",
    type: "auto",
    name: "Seguro Automovilístico Premium",
    policyNumber: "AUTO-2023-12345",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    coverageAmount: 500000,
    premium: 4800,
    paymentFrequency: "monthly",
    status: "active",
  },
  {
    id: "life-policy-1",
    type: "life",
    name: "Seguro de Vida Familiar",
    policyNumber: "VIDA-2023-67890",
    startDate: "2023-03-10",
    endDate: "2043-03-10",
    coverageAmount: 1000000,
    premium: 3600,
    paymentFrequency: "annual",
    status: "active",
    beneficiaries: ["Cónyuge (70%)", "Hijos (30%)"],
    claims: [
      {
        id: "CLM-001",
        date: "2023-06-15",
        description: "Hospitalización por accidente",
        amount: 2500000,
        status: "approved",
      },
      {
        id: "CLM-002",
        date: "2023-09-22",
        description: "Consulta médica especializada",
        amount: 350000,
        status: "pending",
      },
    ],
  },
]

export default function PolicyDetailPage({ params }: { params: { id: string } }) {
  // Buscar la póliza por ID
  const policy = mockPolicies.find((p) => p.id === params.id)

  if (!policy) {
    notFound()
  }

  return (
    <>
      <main className="flex-1 overflow-auto pb-16">
        <div className="container p-4">
          <PolicyDetail policy={policy} />
        </div>
      </main>
      <MobileNavigation />
    </>
  )
}
