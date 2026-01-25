import Link from "next/link"
import { Building2 } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">Fountain Vitality</h3>
            <p className="text-sm text-muted-foreground">
              2064 Park St, Jacksonville, FL 32204
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/organization" className="text-muted-foreground hover:text-foreground transition-colors">
                  Organization Chart
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Programs
                </Link>
              </li>
            </ul>
          </div>

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
        </div>
      </div>
    </footer>
  )
}

