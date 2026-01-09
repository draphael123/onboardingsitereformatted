"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Testimonial {
  name: string
  review: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialCarousel({ testimonials, className }: TestimonialCarouselProps) {
  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {duplicatedTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-[300px] md:w-[380px] mx-3 glass-card"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-lg">{testimonial.name}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-3">
                Trustpilot Review
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                {testimonial.review}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

