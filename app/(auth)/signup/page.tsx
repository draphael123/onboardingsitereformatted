"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FountainLogoIcon } from "@/components/ui/fountain-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Loader2, ArrowLeft, Info } from "lucide-react"
import { signUp } from "./actions"

const roles = [
  { value: "CS", label: "Customer Service" },
  { value: "NP", label: "Nurse Practitioner" },
  { value: "RN", label: "Registered Nurse" },
  { value: "MA", label: "Medical Assistant" },
  { value: "MA_PHARMACY", label: "Medical Assistant - Pharmacy Team" },
  { value: "MA_BACKOFFICE", label: "Medical Assistant - Back Office" },
]

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      })
      return
    }

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
      })
      return
    }

    if (!role) {
      toast({
        variant: "destructive",
        title: "Role required",
        description: "Please select your role.",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp({
        name,
        email: email.toLowerCase(),
        password,
        role: role as "CS" | "NP" | "RN" | "MA" | "MA_PHARMACY" | "MA_BACKOFFICE",
      })

      if (result.success) {
        toast({
          variant: "success",
          title: "Account created!",
          description: "Your account is pending approval. You'll receive an email once approved.",
        })
        router.push("/pending-approval")
      } else {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: result.error || "Something went wrong. Please try again.",
        })
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
              <CardTitle className="font-display text-2xl">Create Account</CardTitle>
              <CardDescription className="mt-2">
                Join the Fountain team and start your onboarding journey
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3 mb-6 flex gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your account will need to be approved by an admin before you can access the onboarding portal.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">What role were you hired for?</Label>
                <Select value={role} onValueChange={setRole} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
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
