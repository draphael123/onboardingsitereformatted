"use client"

import { useState, useEffect } from "react"
import { Progress } from "./progress"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

/**
 * Password strength indicator component
 */
export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }

    setChecks(checks)

    const score = Object.values(checks).filter(Boolean).length
    setStrength(score)
  }, [password])

  if (!password) return null

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ]

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password Strength:</span>
        <span
          className={cn(
            "font-medium",
            strength <= 2 && "text-red-500",
            strength === 3 && "text-yellow-500",
            strength >= 4 && "text-green-500"
          )}
        >
          {strengthLabels[strength - 1] || "Very Weak"}
        </span>
      </div>
      <Progress
        value={(strength / 5) * 100}
        className={cn("h-2", strengthColors[strength - 1] || "bg-red-500")}
      />
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          {checks.length ? (
            <CheckCircle2 className="h-3 w-3 text-green-500" />
          ) : (
            <XCircle className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(!checks.length && "text-muted-foreground")}>
            At least 8 characters
          </span>
        </div>
        <div className="flex items-center gap-2">
          {checks.uppercase ? (
            <CheckCircle2 className="h-3 w-3 text-green-500" />
          ) : (
            <XCircle className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(!checks.uppercase && "text-muted-foreground")}>
            Uppercase letter
          </span>
        </div>
        <div className="flex items-center gap-2">
          {checks.lowercase ? (
            <CheckCircle2 className="h-3 w-3 text-green-500" />
          ) : (
            <XCircle className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(!checks.lowercase && "text-muted-foreground")}>
            Lowercase letter
          </span>
        </div>
        <div className="flex items-center gap-2">
          {checks.number ? (
            <CheckCircle2 className="h-3 w-3 text-green-500" />
          ) : (
            <XCircle className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(!checks.number && "text-muted-foreground")}>
            Number
          </span>
        </div>
        <div className="flex items-center gap-2">
          {checks.special ? (
            <CheckCircle2 className="h-3 w-3 text-green-500" />
          ) : (
            <XCircle className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(!checks.special && "text-muted-foreground")}>
            Special character
          </span>
        </div>
      </div>
    </div>
  )
}


