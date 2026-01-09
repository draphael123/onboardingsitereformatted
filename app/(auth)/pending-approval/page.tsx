import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, Mail } from "lucide-react"

export default function PendingApprovalPage() {
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
            <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6">
              <Clock className="h-8 w-8" />
            </div>
            <CardTitle className="font-display text-2xl mb-3">
              Account Pending Approval
            </CardTitle>
            <CardDescription className="text-base mb-6">
              Your account has been created and is currently pending admin approval. 
              You&apos;ll receive an email notification once your account has been approved.
            </CardDescription>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-sm mb-2">What happens next?</h3>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">1.</span>
                  An admin will review your registration
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">2.</span>
                  You&apos;ll receive an email when approved
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">3.</span>
                  Sign in to access your onboarding portal
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="mailto:support@fountain.net">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login">
                  Try Signing In Again
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

