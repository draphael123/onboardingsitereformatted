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
  Sparkles,
  Syringe,
  Heart,
  Star
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

const programs = [
  {
    icon: Syringe,
    title: "Testosterone Replacement Therapy (TRT)",
    description: "Tailored for men seeking to restore testosterone levels. Our TRT program enhances muscle mass, reduces body fat, boosts energy, and improves libido.",
    color: "bg-blue-500",
  },
  {
    icon: Heart,
    title: "Hormone Replacement Therapy (HRT)",
    description: "Designed for women experiencing peri/menopause symptoms. Our HRT program alleviates brain fog, hot flashes, and low energy with customized hormone therapy.",
    color: "bg-rose-500",
  },
]

const reviews = [
  {
    name: "Jason",
    review: "...after a few months of regular treatments everything that is advertised is 100% true. Losing fat, gaining muscle, more energy, revived sex drive. Easily the best health choice I've made for myself in years! Both physically and mentally.",
  },
  {
    name: "Tommy",
    review: "...completely changed my life! I no longer feel tired all day. My depression has dropped dramatically. I've dropped a ton of body fat. And I feel amazing!",
  },
  {
    name: "Matt",
    review: "Everyone is very helpful. Super easy. Super safe. Now at 40 years old, I feel like I'm 24 again! Doron and his staff are the best! Highly recommend.",
  },
  {
    name: "Jose",
    review: "Texting seems funky at first, but I quickly realized how convenient and responsive Fountain is to all of your questions and concerns. Overall... amazing experience.",
  },
  {
    name: "N.",
    review: "This is a very knowledgeable medical team that has changed and improved my overall health and well-being. The concierge service is world-class and extremely prompt, friendly, and professional.",
  },
  {
    name: "Daniel",
    review: "Dr. Doron Stember was absolutely terrific. Knowledgeable, sensitive and informative... I immediately felt at ease – and felt confident in my receiving expert medical care. There are many sites out there to choose from but I can honestly say this is who want to go with.",
  },
  {
    name: "Jack",
    review: "The absolute best customer experience. I am blown away by the knowledge and responsiveness of the team at Fountain.",
  },
  {
    name: "Jason",
    review: "The process is super easy. All parts of the process from bloodwork to shipping are fast and the results are definitely worth it. I'm sleeping better, working out more, lost weight and overall much more energy. Couldn't be happier.",
  },
  {
    name: "P.",
    review: "I wish I could rate Fountain higher than 5 stars.",
  },
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
              Welcome to Fountain
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up">
              Your Onboarding Journey{" "}
              <span className="text-primary">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 opacity-0 animate-fade-in-up animate-delay-100">
              Fountain is a leading provider of concierge online TRT and HRT treatments. 
              Join our team and help us deliver expert care directly to our members&apos; doorsteps.
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </section>

      {/* Our Programs Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fountain offers specialized hormone therapy treatments delivered with 
              convenience and personalized care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {programs.map((program) => (
              <Card 
                key={program.title} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className={`${program.color} w-14 h-14 rounded-full flex items-center justify-center text-white mb-4`}>
                    <program.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{program.title}</h3>
                  <p className="text-muted-foreground">
                    {program.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Our Members Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join over 7,000+ satisfied members who have experienced the Fountain difference. 
              Real reviews from Trustpilot.
            </p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, index) => (
              <Card 
                key={index} 
                className="break-inside-avoid p-6 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-lg">{review.name}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Trustpilot Review</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {review.review}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24 bg-muted/30">
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
            your journey with Fountain. Join over 7,000+ satisfied members we serve.
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

