import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Building2,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Pill,
  Heart,
  Syringe,
  Activity,
  MessageCircle,
  Shield,
  Wrench
} from "lucide-react"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Fountain Vitality",
  description: "Get in touch with the Fountain Vitality team for support and inquiries.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@fountainvitality.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "(555) 123-4567",
    description: "Mon-Fri, 8am - 6pm EST",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Healthcare Blvd",
    description: "Medical City, MC 12345",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Monday - Friday",
    description: "8:00 AM - 6:00 PM EST",
  },
]

const contactDirectory = [
  {
    category: "Schedules",
    person: "Ashley Gwinn",
    icon: Calendar,
    description: "Schedule questions, shift swaps, and time-off requests",
  },
  {
    category: "Gusto/Payroll",
    person: "Tammy Hale",
    icon: DollarSign,
    description: "Payroll, pay stubs, tax information, and direct deposit",
  },
  {
    category: "Chart Prep (including Heidi context)",
    person: "Dawntaya Cooley (Taya)",
    icon: FileText,
    description: "Heidi Health platform, chart prep, and clinical documentation",
  },
  {
    category: "PMP/Refill Compliance Questions",
    person: "Lindsay Burden",
    icon: Shield,
    description: "Prescription Monitoring Program and refill compliance",
  },
  {
    category: "HRT Clinical Questions",
    person: "Summer Denny",
    icon: Heart,
    description: "Hormone Replacement Therapy clinical inquiries",
  },
  {
    category: "TRT Clinical Questions",
    person: "Bill Carbonneau",
    icon: Syringe,
    description: "Testosterone Replacement Therapy clinical inquiries",
  },
  {
    category: "GLP Clinical Questions",
    person: "Terray Humphrey",
    icon: Activity,
    description: "GLP-1 medication clinical inquiries",
  },
  {
    category: "Async Questions",
    person: "Summer Denny / Terray Humphrey",
    icon: MessageCircle,
    description: "Asynchronous clinical questions and consultations",
  },
  {
    category: "Shift Supervisor/Intercom Questions",
    person: "Camryn Burden",
    icon: Users,
    description: "Intercom workflows, shift supervision, and customer messaging",
  },
  {
    category: "Clearances",
    person: "Tzvi Doron",
    icon: Shield,
    description: "Background checks, licensing verification, and compliance",
  },
  {
    category: "User-facing technical or access issues",
    person: "Daniel Raphael",
    icon: Wrench,
    description: "Platform issues, technical problems, and system access",
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have questions? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Who to Contact Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Who to <span className="text-primary">Contact</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the right person to help you with your questions and concerns. 
                Each team member specializes in specific areas to provide you with the best support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contactDirectory.map((contact, index) => {
                const ContactIcon = contact.icon
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <ContactIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                            {contact.category}
                          </h3>
                          <p className="text-base font-medium text-primary mb-2">
                            {contact.person}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {contact.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm font-medium">{item.value}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Emergency Contact */}
              <Card className="p-6 bg-destructive/5 border-destructive/20">
                <h3 className="font-semibold text-destructive mb-2">
                  Emergency Contact
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  For urgent matters requiring immediate attention:
                </p>
                <p className="text-sm font-medium">
                  24/7 Hotline: (555) 999-0000
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Visit Our Office
            </h2>
            <p className="text-muted-foreground">
              123 Healthcare Blvd, Medical City, MC 12345
            </p>
          </div>
          <div className="aspect-video max-w-4xl mx-auto bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p>Map placeholder - integrate with Google Maps or similar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


