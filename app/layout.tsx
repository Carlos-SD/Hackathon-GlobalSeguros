import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { FirebaseProvider } from "@/lib/firebase/firebase-provider"
import { SpeedDetectionProvider } from "@/lib/speed-detection-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { QuickAccessFAB } from "@/components/quick-access-fab"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GlobalSeguros - Protección en Movimiento",
  description: "Monitoreo de salud y movilidad segura",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#003087",
  appleWebAppCapable: "yes",
  appleWebAppStatusBarStyle: "black-translucent",
  // Añadir permisos para geolocalización
  other: {
    "permissions-policy": "geolocation=self",
    // Metadatos para integración con asistentes de voz
    "apple-mobile-web-app-title": "GlobalSeguros",
    "application-name": "GlobalSeguros",
    "msapplication-TileColor": "#003087",
    "msapplication-config": "/browserconfig.xml",
    // Metadatos para App Indexing
    "google-site-verification": "verification_token",
    // Manifest para PWA
    manifest: "/manifest.json",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Enlaces para App Indexing */}
        <link rel="alternate" href="android-app://com.example.globalseguros/https/globalseguros.example.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#003087" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <FirebaseProvider>
            <SpeedDetectionProvider>
              <SidebarProvider>
                <div className="flex flex-col min-h-[100dvh] bg-background">
                  <AppSidebar />
                  <SidebarInset className="flex flex-col min-h-[100dvh]">{children}</SidebarInset>
                  <QuickAccessFAB />
                </div>
                <Toaster />
              </SidebarProvider>
            </SpeedDetectionProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
