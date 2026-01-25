import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Fountain Vitality",
  description: "Find answers to common questions about Fountain's onboarding process, services, and employee resources.",
  keywords: ["FAQs", "questions", "onboarding help", "employee support", "Fountain Vitality"],
}

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


