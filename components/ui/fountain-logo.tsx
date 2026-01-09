import { cn } from "@/lib/utils"

interface FountainLogoProps {
  className?: string
  showText?: boolean
  textClassName?: string
}

export function FountainLogo({ className, showText = true, textClassName }: FountainLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-9 w-9", className)}
      >
        {/* Left leaf/petal */}
        <path
          d="M12 8C12 8 6 16 6 22C6 28 10 32 16 32C16 32 12 26 12 20C12 14 12 8 12 8Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Middle leaf/petal */}
        <path
          d="M20 4C20 4 14 14 14 22C14 30 18 36 26 36C26 36 20 28 20 20C20 12 20 4 20 4Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Right leaf/petal - lighter shade */}
        <path
          d="M28 12C28 12 34 18 34 24C34 30 30 34 24 34C24 34 28 28 28 22C28 16 28 12 28 12Z"
          fill="currentColor"
          className="text-primary/70"
        />
      </svg>
      {showText && (
        <span className={cn("font-semibold text-xl tracking-tight", textClassName)}>
          Fountain
        </span>
      )}
    </div>
  )
}

export function FountainLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
    >
      {/* Left leaf/petal */}
      <path
        d="M12 8C12 8 6 16 6 22C6 28 10 32 16 32C16 32 12 26 12 20C12 14 12 8 12 8Z"
        fill="currentColor"
      />
      {/* Middle leaf/petal */}
      <path
        d="M20 4C20 4 14 14 14 22C14 30 18 36 26 36C26 36 20 28 20 20C20 12 20 4 20 4Z"
        fill="currentColor"
      />
      {/* Right leaf/petal - lighter shade */}
      <path
        d="M28 12C28 12 34 18 34 24C34 30 30 34 24 34C24 34 28 28 28 22C28 16 28 12 28 12Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </svg>
  )
}

