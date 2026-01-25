"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn, useSession, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { FountainLogoIcon } from "@/components/ui/fountain-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Loader2, ArrowLeft } from "lucide-react"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { toast } = useToast()

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user) {
      if (session.user.role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/app")
      }
    }
  }, [session, router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: result.error || "Invalid email or password. Please try again.",
          duration: 10000, // Stay visible for 10 seconds
        })
      } else {
        toast({
          variant: "success",
          title: "Welcome back!",
          description: "Redirecting to your dashboard...",
        })
        
        // Get callback URL or determine redirect based on role
        const callbackUrl = searchParams.get("callbackUrl")
        
        // Small delay to ensure session is set, then redirect
        setTimeout(async () => {
          try {
            // Get session to check user role
            const session = await getSession()
            
            if (callbackUrl) {
              // Redirect to the originally requested page
              router.push(callbackUrl)
            } else if (session?.user?.role === "ADMIN") {
              // Redirect admins to admin dashboard
              router.push("/admin")
            } else {
              // Redirect regular users to app dashboard
              router.push("/app")
            }
            router.refresh()
          } catch (error) {
            console.error("Error getting session:", error)
            // Fallback: redirect to app (middleware will handle admin redirect if needed)
            router.push(callbackUrl || "/app")
            router.refresh()
          }
        }, 300)
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg hero-pattern">
      {/* Header */}
      <header className="container px-4 py-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center space-y-4 pb-2">
            <div className="mx-auto w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <FountainLogoIcon className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="font-display text-2xl">Welcome Back</CardTitle>
              <CardDescription className="mt-2">
                Sign in to access your onboarding dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@fountainvitality.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Having trouble signing in?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact HR
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="container px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Fountain Vitality. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col gradient-bg hero-pattern">
        <header className="container px-4 py-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <ThemeToggle />
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
