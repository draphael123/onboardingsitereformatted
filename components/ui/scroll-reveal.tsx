"use client"

import { useEffect, useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: "fade-in" | "slide-left" | "slide-right" | "scale" | "stagger"
  delay?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible")
          }, delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  const animationClass = {
    "fade-in": "scroll-fade-in",
    "slide-left": "scroll-slide-left",
    "slide-right": "scroll-slide-right",
    "scale": "scroll-scale",
    "stagger": "stagger-children",
  }[animation]

  return (
    <div ref={ref} className={cn(animationClass, className)}>
      {children}
    </div>
  )
}


