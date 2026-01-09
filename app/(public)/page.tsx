import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Shield, 
  Clock,
  Sparkles
} from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Structured Onboarding",
    description: "Clear, role-specific checklists guide you through every step of your training journey."
  },
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    description: "Access all the documents, training materials, and guides you need in one place."
  },
  {
    icon: Shield,
    title: "Compliance Made Easy",
    description: "Stay on top of required certifications and compliance training with automated tracking."
  },
  {
    icon: Clock,
    title: "Track Your Progress",
    description: "Monitor your onboarding completion and never miss an important deadline."
  }
]

const roles = [
  { name: "Customer Service", abbr: "CS", color: "bg-blue-500" },
  { name: "Nurse Practitioners", abbr: "NP", color: "bg-purple-500" },
  { name: "Registered Nurses", abbr: "RN", color: "bg-rose-500" },
  { name: "Medical Assistants", abbr: "MA", color: "bg-amber-500" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern">
        <div className="container px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Welcome to the Team
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up">
              Your Onboarding Journey{" "}
              <span className="text-primary">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 opacity-0 animate-fade-in-up animate-delay-100">
              Fountain Vitality&apos;s comprehensive onboarding portal helps you get up to speed 
              quickly with personalized training checklists, essential resources, and 
              progress tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animate-delay-200">
              <Button size="lg" asChild className="group">
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </section>

      {/* Roles Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Tailored for Every Role
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re joining as clinical staff or support team, 
              we have customized onboarding paths for you.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {roles.map((role, index) => (
              <Card 
                key={role.abbr} 
                className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${role.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                  {role.abbr}
                </div>
                <h3 className="font-semibold text-sm">{role.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and resources to make your 
              onboarding experience smooth and efficient.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
            <Users className="h-12 w-12" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Team?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Sign in to access your personalized onboarding checklist and start 
            your journey with Fountain Vitality.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">
              Sign In to Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

