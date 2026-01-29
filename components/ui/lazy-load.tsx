"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface LazyLoadProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
}

/**
 * Lazy load component - only renders children when in viewport
 */
export function LazyLoad({
  children,
  fallback = null,
  threshold = 0.1,
  rootMargin = "50px",
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}




