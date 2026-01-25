import { cn } from "@/lib/utils"

interface FountainLogoProps {
  className?: string
  showText?: boolean
  textClassName?: string
  iconClassName?: string
}

export function FountainLogo({ className, showText = true, textClassName, iconClassName }: FountainLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-9 w-9", className)}
      >
        {/* Left side - Two dark blue curved shapes (leaf-like, curving outward) */}
        <path
          d="M6 38C6 38 2 30 3 22C4 14 7 12 7 12C7 12 4 20 4 26C4 32 6 38 6 38Z"
          className={cn("fill-slate-800 dark:fill-slate-700", iconClassName)}
        />
        <path
          d="M9 40C9 40 5 32 6 24C7 16 10 14 10 14C10 14 7 22 7 28C7 34 9 40 9 40Z"
          className={cn("fill-slate-800 dark:fill-slate-700", iconClassName)}
        />
        
        {/* Central element - Dark blue vertical shape (narrow base, widens in middle, droplet at top) */}
        <path
          d="M23.5 48C23.5 48 22.5 45 22.5 40C22.5 35 23 28 23.5 22C24 16 24.5 12 25 9C25.5 6 26 4 26 3C26 2 26.5 1.5 26.5 1.5C27 1.5 27 2 27 3C27 4 26.5 6 26 9C25.5 12 25 16 24.5 22C24 28 23.5 35 23.5 40C23.5 45 23.5 48 23.5 48Z"
          className={cn("fill-slate-800 dark:fill-slate-700", iconClassName)}
        />
        {/* Droplet top */}
        <ellipse
          cx="26.5"
          cy="2"
          rx="1.2"
          ry="1.5"
          className={cn("fill-slate-800 dark:fill-slate-700", iconClassName)}
        />
        
        {/* Right side - Two light blue curved shapes (leaf-like, curving outward) */}
        <path
          d="M34 38C34 38 38 30 37 22C36 14 33 12 33 12C33 12 36 20 36 26C36 32 34 38 34 38Z"
          className={cn("fill-fountain-400 dark:fill-fountain-500", iconClassName)}
        />
        <path
          d="M31 40C31 40 35 32 34 24C33 16 30 14 30 14C30 14 33 22 33 28C33 34 31 40 31 40Z"
          className={cn("fill-fountain-400 dark:fill-fountain-500", iconClassName)}
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
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
    >
      {/* Left side - Two dark blue curved shapes (leaf-like, curving outward) */}
      <path
        d="M6 38C6 38 2 30 3 22C4 14 7 12 7 12C7 12 4 20 4 26C4 32 6 38 6 38Z"
        className="fill-slate-800 dark:fill-slate-700"
      />
      <path
        d="M9 40C9 40 5 32 6 24C7 16 10 14 10 14C10 14 7 22 7 28C7 34 9 40 9 40Z"
        className="fill-slate-800 dark:fill-slate-700"
      />
      
      {/* Central element - Dark blue vertical shape (narrow base, widens in middle, droplet at top) */}
      <path
        d="M23.5 48C23.5 48 22.5 45 22.5 40C22.5 35 23 28 23.5 22C24 16 24.5 12 25 9C25.5 6 26 4 26 3C26 2 26.5 1.5 26.5 1.5C27 1.5 27 2 27 3C27 4 26.5 6 26 9C25.5 12 25 16 24.5 22C24 28 23.5 35 23.5 40C23.5 45 23.5 48 23.5 48Z"
        className="fill-slate-800 dark:fill-slate-700"
      />
      {/* Droplet top */}
      <ellipse
        cx="26.5"
        cy="2"
        rx="1.2"
        ry="1.5"
        className="fill-slate-800 dark:fill-slate-700"
      />
      
      {/* Right side - Two light blue curved shapes (leaf-like, curving outward) */}
      <path
        d="M34 38C34 38 38 30 37 22C36 14 33 12 33 12C33 12 36 20 36 26C36 32 34 38 34 38Z"
        className="fill-fountain-400 dark:fill-fountain-500"
      />
      <path
        d="M31 40C31 40 35 32 34 24C33 16 30 14 30 14C30 14 33 22 33 28C33 34 31 40 31 40Z"
        className="fill-fountain-400 dark:fill-fountain-500"
      />
    </svg>
  )
}
