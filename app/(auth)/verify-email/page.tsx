"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { verifyEmail } from "./actions"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function verify() {
      if (!token) {
        setError("No verification token provided")
        setIsLoading(false)
        return
      }

      const result = await verifyEmail(token)
      
      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "Verification failed")
      }
      
      setIsLoading(false)
    }

    verify()
  }, [token])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg hero-pattern">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Verifying your email...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg hero-pattern">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <CardTitle className="font-display text-2xl mb-3">Email Verified!</CardTitle>
            <CardDescription className="text-base">
              Your email has been successfully verified. You can now sign in to your account.
            </CardDescription>
            <Button asChild className="mt-6">
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg hero-pattern">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
            <XCircle className="h-8 w-8" />
          </div>
          <CardTitle className="font-display text-2xl mb-3">Verification Failed</CardTitle>
          <CardDescription className="text-base">
            {error || "This verification link is invalid or has expired."}
          </CardDescription>
          <Button asChild className="mt-6">
            <Link href="/login">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center gradient-bg hero-pattern">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}

