import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fountain Vitality Onboarding",
    short_name: "Fountain",
    description: "Employee onboarding portal for Fountain Vitality",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14b8a6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["business", "productivity"],
    shortcuts: [
      {
        name: "Checklist",
        short_name: "Checklist",
        description: "View your onboarding checklist",
        url: "/app/checklist",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Dashboard",
        short_name: "Dashboard",
        description: "View your dashboard",
        url: "/app",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  }
}

