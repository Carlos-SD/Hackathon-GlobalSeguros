export type InsuranceType = "life" | "accident" | "pension" | "income" | "annuity" | "auto" | "home" | "health"

export interface InsurancePolicy {
  id: string
  type: InsuranceType
  name: string
  policyNumber: string
  startDate: string
  endDate: string
  coverageAmount: number
  premium: number
  paymentFrequency: "monthly" | "quarterly" | "semiannual" | "annual"
  status: "active" | "pending" | "expired" | "cancelled"
  beneficiaries?: string[]
  documents?: {
    id: string
    name: string
    url: string
    type: string
    uploadDate: string
  }[]
  claims?: {
    id: string
    date: string
    description: string
    amount: number
    status: "pending" | "approved" | "rejected" | "in_review"
  }[]
}

export interface InsuranceTypeInfo {
  id: InsuranceType
  name: string
  description: string
  icon: string
  color: string
  coverageDetails: string[]
  faqs: {
    question: string
    answer: string
  }[]
}
