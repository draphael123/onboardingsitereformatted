"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FountainLogo } from "@/components/ui/fountain-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SearchCommand } from "@/components/ui/search-command"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About Us" },
  { href: "/faqs", label: "FAQs" },
  { href: "/glossary", label: "Glossary" },
  { href: "/docs", label: "Resources" },
  { href: "/contact", label: "Contact" },
]

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center group transition-transform hover:scale-[1.02]">
          <FountainLogo textClassName="font-display" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <SearchCommand />
          </div>
          <ThemeToggle />
          <div className="hidden md:flex ml-2 pl-2 border-l">
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-sm z-40 transition-all duration-300 ease-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="container flex flex-col py-6 px-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-4 text-lg font-medium text-foreground transition-all hover:bg-accent rounded-lg",
                "transform transition-all duration-300",
                isMenuOpen 
                  ? "translate-x-0 opacity-100" 
                  : "-translate-x-4 opacity-0",
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-6 mt-4 border-t space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
