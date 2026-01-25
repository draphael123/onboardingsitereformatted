import { PublicHeader } from "@/components/public/header"
import { PublicFooter } from "@/components/public/footer"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
