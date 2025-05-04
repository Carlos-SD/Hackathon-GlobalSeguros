"use client"

import { Activity, Car, Home, MessageSquareText, Settings, Shield } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Panel Principal",
      icon: Home,
      url: "/",
    },
    {
      title: "Mis Seguros",
      icon: Shield,
      url: "/seguros",
    },
    {
      title: "Centro de Vitalidad",
      icon: Activity,
      url: "/vitalidad",
    },
    {
      title: "Movilidad Segura",
      icon: Car,
      url: "/movilidad",
    },
    {
      title: "Mi Ecosistema",
      icon: Settings,
      url: "/configuracion",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Logo variant="white" size="md" />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
          asChild
        >
          <Link href="/asistente">
            <MessageSquareText className="h-5 w-5" />
            <span>Centro de Asistencia</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
