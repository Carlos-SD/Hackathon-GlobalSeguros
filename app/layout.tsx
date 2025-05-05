import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { FirebaseProvider } from "@/lib/firebase/firebase-provider"
import { SpeedDetectionProvider } from "@/lib/speed-detection-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { QuickAccessFAB } from "@/components/quick-access-fab"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SeguritoBacanito - Protección Inteligente",
  description: "Tu ecosistema de seguros impulsado por IA",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#003087",
  // Metadatos para Apple movidos a 'other'
  other: {
    "permissions-policy": "geolocation=self",
    // Metadatos para integración con asistentes de voz y Apple
    "apple-mobile-web-app-title": "SeguritoBacanito",
    "application-name": "SeguritoBacanito",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#003087",
    "msapplication-config": "/browserconfig.xml",
    // Metadatos para App Indexing
    "google-site-verification": "verification_token",
    // Manifest para PWA
    manifest: "/manifest.json",
  },
    generator: 'v0.dev'
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
        <link rel="alternate" href="android-app://com.seguritobacanito/https/seguritobacanito.example.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#003087" />
        {/* Meta tag para desactivar extensiones de navegador que puedan causar problemas de hidratación */}
        <meta name="web-page-annotation" content="no"/>
      </head>
      {/* Usamos suppressHydrationWarning en el body también para evitar errores con atributos añadidos por extensiones */}
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <FirebaseProvider>
            <SpeedDetectionProvider>
              <SidebarProvider>
                <div className="flex flex-col min-h-[100dvh] bg-background">
                  <div className="flex flex-col min-h-[100dvh]">{children}</div>
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
