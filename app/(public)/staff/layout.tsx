import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Staff Directory | Fountain Vitality",
  description: "Find team members, their contact information, and organizational structure at Fountain Vitality.",
  keywords: ["staff directory", "team members", "contact information", "organizational structure", "Fountain Vitality"],
}

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

