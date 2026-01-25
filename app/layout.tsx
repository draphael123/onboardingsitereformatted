import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { CommandPaletteProvider } from "@/components/providers/command-palette-provider"
import { PWAInstaller } from "@/components/pwa-installer"
import { ServiceWorkerRegistration } from "./sw-register"
import { StructuredData, getOrganizationStructuredData, getWebsiteStructuredData } from "@/components/ui/structured-data"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: {
    default: "Fountain Vitality | Onboarding Portal",
    template: "%s | Fountain Vitality",
  },
  description: "Welcome to Fountain Vitality's team onboarding platform. Get started with your training and resources.",
  keywords: ["healthcare", "onboarding", "training", "Fountain Vitality", "TRT", "HRT", "telehealth"],
  authors: [{ name: "Fountain Vitality" }],
  creator: "Fountain Vitality",
  publisher: "Fountain Vitality",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://fountainvitality.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXTAUTH_URL || "https://fountainvitality.com",
    siteName: "Fountain Vitality",
    title: "Fountain Vitality | Onboarding Portal",
    description: "Welcome to Fountain Vitality's team onboarding platform. Get started with your training and resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fountain Vitality | Onboarding Portal",
    description: "Welcome to Fountain Vitality's team onboarding platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData data={getOrganizationStructuredData()} />
        <StructuredData data={getWebsiteStructuredData()} />
      </head>
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
