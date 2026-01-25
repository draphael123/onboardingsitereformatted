import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medical Glossary | Fountain Vitality",
  description: "Comprehensive reference guide for medical terms, acronyms, and Fountain-specific terminology used in TRT and HRT care.",
  keywords: ["medical glossary", "TRT terms", "HRT terminology", "healthcare acronyms", "medical dictionary"],
}

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


