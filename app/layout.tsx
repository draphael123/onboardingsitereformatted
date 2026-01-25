import type { Metadata } from "next"
import { Outfit, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { CommandPaletteProvider } from "@/components/providers/command-palette-provider"
import { PWAInstaller } from "@/components/pwa-installer"
import { ServiceWorkerRegistration } from "./sw-register"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Fountain Vitality | Onboarding Portal",
  description: "Welcome to Fountain Vitality's team onboarding platform. Get started with your training and resources.",
  keywords: ["healthcare", "onboarding", "training", "Fountain Vitality"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <CommandPaletteProvider />
          <PWAInstaller />
          <ServiceWorkerRegistration />
        </ThemeProvider>
      </body>
    </html>
  )
}
