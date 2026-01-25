import { cn } from "@/lib/utils"

interface FountainLogoProps {
  className?: string
  showText?: boolean
  textClassName?: string
  iconClassName?: string
}

export function FountainLogo({ className, showText = true, textClassName, iconClassName }: FountainLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-9 w-9", className)}
      >
        {/* Left leaf - ocean blue */}
        <path
          d="M8 32C8 32 4 24 8 16C12 8 16 8 16 8C16 8 12 16 12 22C12 28 8 32 8 32Z"
          className={cn("fill-ocean-700 dark:fill-ocean-600", iconClassName)}
        />
        {/* Middle leaf - fountain teal */}
        <path
          d="M16 36C16 36 10 26 14 16C18 6 24 4 24 4C24 4 18 14 18 22C18 30 16 36 16 36Z"
          className={cn("fill-fountain-500", iconClassName)}
        />
        {/* Right leaf - fountain teal */}
        <path
          d="M26 32C26 32 34 24 32 14C30 6 26 4 26 4C26 4 30 12 30 20C30 28 26 32 26 32Z"
          className={cn("fill-fountain-500", iconClassName)}
        />
      </svg>
      {showText && (
        <span className={cn("font-semibold text-xl tracking-tight text-slate-800 dark:text-slate-100", textClassName)}>
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
      {/* Left leaf - ocean blue */}
      <path
        d="M8 32C8 32 4 24 8 16C12 8 16 8 16 8C16 8 12 16 12 22C12 28 8 32 8 32Z"
        className="fill-ocean-700 dark:fill-ocean-600"
      />
      {/* Middle leaf - fountain teal */}
      <path
        d="M16 36C16 36 10 26 14 16C18 6 24 4 24 4C24 4 18 14 18 22C18 30 16 36 16 36Z"
        className="fill-fountain-500"
      />
      {/* Right leaf - fountain teal */}
      <path
        d="M26 32C26 32 34 24 32 14C30 6 26 4 26 4C26 4 30 12 30 20C30 28 26 32 26 32Z"
        className="fill-fountain-500"
      />
    </svg>
  )
}
