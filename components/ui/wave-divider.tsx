"use client"

import { cn } from "@/lib/utils"

interface WaveDividerProps {
  className?: string
  flip?: boolean
  variant?: "wave" | "curve" | "tilt" | "triangle"
  color?: string
}

export function WaveDivider({ 
  className, 
  flip = false, 
  variant = "wave",
  color = "fill-background"
}: WaveDividerProps) {
  const transforms = flip ? "rotate-180" : ""

  if (variant === "wave") {
    return (
      <div className={cn("w-full overflow-hidden leading-none", transforms, className)}>
        <svg
          className={cn("relative block w-full h-[60px] md:h-[80px]", color)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    )
  }

  if (variant === "curve") {
    return (
      <div className={cn("w-full overflow-hidden leading-none", transforms, className)}>
        <svg
          className={cn("relative block w-full h-[60px] md:h-[100px]", color)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" />
        </svg>
      </div>
    )
  }

  if (variant === "tilt") {
    return (
      <div className={cn("w-full overflow-hidden leading-none", transforms, className)}>
        <svg
          className={cn("relative block w-full h-[60px] md:h-[80px]", color)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
        </svg>
      </div>
    )
  }

  if (variant === "triangle") {
    return (
      <div className={cn("w-full overflow-hidden leading-none", transforms, className)}>
        <svg
          className={cn("relative block w-full h-[60px] md:h-[80px]", color)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M1200 0L0 0 598.97 114.72 1200 0z" />
        </svg>
      </div>
    )
  }

  return null
}


