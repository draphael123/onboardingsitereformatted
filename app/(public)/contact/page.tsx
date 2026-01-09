import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Building2
} from "lucide-react"

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

const departments = [
  { name: "Human Resources", email: "hr@fountainvitality.com" },
  { name: "IT Support", email: "it@fountainvitality.com" },
  { name: "Training & Development", email: "training@fountainvitality.com" },
  { name: "General Inquiries", email: "info@fountainvitality.com" },
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

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

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

              {/* Departments */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Department Contacts</h3>
                </div>
                <div className="space-y-3">
                  {departments.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="text-sm font-medium">{dept.name}</span>
                      <a 
                        href={`mailto:${dept.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {dept.email}
                      </a>
                    </div>
                  ))}
                </div>
              </Card>

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

