"use client"

import { useState } from "react"
import Link from "next/link"
import { FountainLogo } from "@/components/ui/fountain-logo"
import { subscribeToNewsletter } from "@/app/(public)/newsletter/actions"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ArrowRight,
  Linkedin,
  Building2,
  Twitter,
  Instagram,
  Facebook
} from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About Us" },
  { href: "/staff", label: "Staff Directory" },
  { href: "/faqs", label: "FAQs" },
  { href: "/glossary", label: "Glossary" },
  { href: "/docs", label: "Resources" },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/hipaa", label: "HIPAA Notice" },
]

const socialLinks = [
  { href: "https://linkedin.com/company/fountain", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/fountain", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/fountain", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/fountain", icon: Facebook, label: "Facebook" },
]
>>>>>>> b8d47b4 (Add staff directory, contact list, SEO improvements, UX enhancements, and export functionality)

export function PublicFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    const result = await subscribeToNewsletter(email)
    setIsSubmitting(false)

    if (result.success) {
      toast({
        variant: "success",
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
      })
      setEmail("")
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to subscribe. Please try again.",
      })
    }
  }

  return (
<<<<<<< HEAD
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">Fountain Vitality</h3>
            <p className="text-sm text-muted-foreground">
              2064 Park St, Jacksonville, FL 32204
            </p>
=======
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <FountainLogo 
              textClassName="font-display text-white" 
              iconClassName="text-fountain-400"
            />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Delivering expert TRT and HRT care directly to our members&apos; doorsteps. 
              Join our team and make a difference.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-fountain-600 flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
>>>>>>> b8d47b4 (Add staff directory, contact list, SEO improvements, UX enhancements, and export functionality)
          </div>

          {/* Quick Links */}
          <div>
<<<<<<< HEAD
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/organization" className="text-muted-foreground hover:text-foreground transition-colors">
                  Staff Directory
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Programs
                </Link>
=======
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-fountain-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-fountain-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  2064 Park St<br />
                  Jacksonville, FL 32204
                </span>
              </li>
              <li>
                <a 
                  href="https://www.fountain.net" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-fountain-400 transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5 text-fountain-400 flex-shrink-0" />
                  www.fountain.net
                </a>
>>>>>>> b8d47b4 (Add staff directory, contact list, SEO improvements, UX enhancements, and export functionality)
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-muted-foreground hover:text-foreground transition-colors">
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 All Rights Reserved by Fountain Vitality Inc.
          </p>
=======
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get the latest updates on training materials and company news.
            </p>
            <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-fountain-500"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isSubmitting}
                  className="bg-fountain-600 hover:bg-fountain-700 flex-shrink-0"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                For Fountain team members only.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} Fountain Vitality Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
>>>>>>> b8d47b4 (Add staff directory, contact list, SEO improvements, UX enhancements, and export functionality)
        </div>
      </div>
    </footer>
  )
}
