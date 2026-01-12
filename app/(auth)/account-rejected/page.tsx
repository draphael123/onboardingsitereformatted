import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, Mail } from "lucide-react"

export default function AccountRejectedPage() {
  return (
    <div className="min-h-screen flex flex-col gradient-bg hero-pattern">
      <header className="container px-4 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
              <XCircle className="h-8 w-8" />
            </div>
            <CardTitle className="font-display text-2xl mb-3">
              Account Not Approved
            </CardTitle>
            <CardDescription className="text-base mb-6">
              Unfortunately, your account registration was not approved. 
              If you believe this is an error, please contact our support team.
            </CardDescription>
            
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="mailto:support@fountain.net">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  Return Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="container px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Fountain Vitality. All rights reserved.
        </p>
      </footer>
    </div>
  )
}


