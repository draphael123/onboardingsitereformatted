"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : count.toLocaleString()

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

