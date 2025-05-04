"use client"

import { Home, MessageSquareText, Settings, ShieldAlert, Car } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSpeedDetection } from "@/lib/speed-detection-provider"

export function MobileNavigation() {
  const pathname = usePathname()
  const { isOnTrip } = useSpeedDetection()

  const navItems = [
    {
      title: "Inicio",
      icon: Home,
      url: "/",
    },
    {
      title: "Seguros",
      icon: ShieldAlert,
      url: "/seguros",
    },
    {
      title: "Movilidad",
      icon: Car,
      url: "/movilidad",
      highlight: isOnTrip,
    },
    {
      title: "Asistente",
      icon: MessageSquareText,
      url: "/asistente",
    },
    {
      title: "Ajustes",
      icon: Settings,
      url: "/configuracion",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))
          return (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs",
                isActive ? "text-primary" : "text-muted-foreground",
                item.highlight && !isActive ? "text-red-500" : "",
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", item.highlight && !isActive ? "animate-pulse" : "")} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
