import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function InsuranceCards() {
  const insuranceCards = [
    {
      id: "life",
      title: "Seguros de Vida",
      description:
        "Este seguro permite que te asegures, o asegures a tu grupo familiar para proteger su bienestar a futuro.",
      color: "bg-red-500",
      image: "/images/insurance/life.png",
    },
    {
      id: "accident",
      title: "Seguro de Accidentes Personales",
      description:
        "Esta solución te permite asegurarte ante un accidente y de esta forma proteger tu estabilidad económica.",
      color: "bg-pink-600",
      image: "/images/insurance/accident.png",
    },
    {
      id: "pension",
      title: "Seguro de Pensión Voluntaria",
      description:
        "Con esta solución puedes asegurar una pensión cierta para disfrutar de tu vejez de la mejor manera.",
      color: "bg-green-600",
      image: "/images/insurance/pension.png",
    },
    {
      id: "income",
      title: "Seguro Rentas Voluntarias",
      description: "Si necesitas una renta para cubrir tus gastos a futuro, esta es la solución que buscas.",
      color: "bg-purple-600",
      image: "/images/insurance/income.png",
    },
    {
      id: "annuity",
      title: "Seguro Renta Vitalicia",
      description:
        "Vive tu vida al máximo incluso después de pensionarte, esta solución se encarga de brindarte tranquilidad a futuro.",
      color: "bg-amber-500",
      image: "/images/insurance/annuity.png",
    },
  ]

  return (
    <div className="space-y-4">
      {insuranceCards.map((card) => (
        <Link key={card.id} href={`/seguros/${card.id}`} className="block">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className={`relative ${card.color} text-white`}>
                <div className="absolute inset-0 flex items-center">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover opacity-30"
                  />
                </div>
                <div className="relative p-4 md:p-6 flex justify-between items-start">
                  <div className="max-w-[80%]">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-sm opacity-90">{card.description}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
