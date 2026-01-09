import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WaveDivider } from "@/components/ui/wave-divider"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
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
  Star,
  Mail,
  Phone
} from "lucide-react"

const contacts = [
  { topic: "Schedules", person: "Ashley Gwinn" },
  { topic: "Gusto/Payroll", person: "Tammy Hale" },
  { topic: "Chart Prep (including Heidi context)", person: "Dawntaya Cooley (Taya)" },
  { topic: "PMP/Refill Compliance Questions", person: "Lindsay" },
  { topic: "HRT Clinical Questions", person: "Summer" },
  { topic: "TRT Clinical Questions", person: "Bill" },
  { topic: "GLP Clinical Questions", person: "Terray" },
  { topic: "Async Questions", person: "Summer/Terray" },
  { topic: "Shift Supervisor/Intercom Questions", person: "Camryn" },
  { topic: "Clearances", person: "Tzvi" },
  { topic: "Platform Issues/Technical Issues", person: "Daniel Raphael" },
]

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
  { name: "Customer Service", abbr: "CS", color: "from-blue-500 to-blue-600" },
  { name: "Nurse Practitioners", abbr: "NP", color: "from-purple-500 to-purple-600" },
  { name: "Registered Nurses", abbr: "RN", color: "from-rose-500 to-rose-600" },
  { name: "Medical Assistants", abbr: "MA", color: "from-amber-500 to-amber-600" },
]

const programs = [
  {
    icon: Syringe,
    title: "Testosterone Replacement Therapy (TRT)",
    description: "Tailored for men seeking to restore testosterone levels. Our TRT program enhances muscle mass, reduces body fat, boosts energy, and improves libido.",
    gradient: "from-blue-500 to-teal-500",
  },
  {
    icon: Heart,
    title: "Hormone Replacement Therapy (HRT)",
    description: "Designed for women experiencing peri/menopause symptoms. Our HRT program alleviates brain fog, hot flashes, and low energy with customized hormone therapy.",
    gradient: "from-rose-500 to-pink-500",
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

const stats = [
  { value: 7000, suffix: "+", label: "Happy Members" },
  { value: 24, suffix: "/7", label: "Support Available" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 10, suffix: "+", label: "Years Experience" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient hero-pattern">
        <div className="container px-4 md:px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Welcome to Fountain
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 opacity-0 animate-fade-in-up">
              Your Onboarding Journey{" "}
              <span className="gradient-text-animated">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 opacity-0 animate-fade-in-up animate-delay-100 max-w-2xl mx-auto">
              Join our team and help us deliver expert TRT and HRT care directly to our members&apos; doorsteps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animate-delay-200">
              <Button size="lg" asChild className="group text-lg px-8 py-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 border-0 shadow-lg shadow-teal-500/25">
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-2">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated floating orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-teal-500 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px]" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Our Services</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Programs</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Fountain offers specialized hormone therapy treatments delivered with 
                convenience and personalized care.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program, index) => (
              <ScrollReveal key={program.title} animation={index === 0 ? "slide-left" : "slide-right"} delay={index * 100}>
                <Card className="glass-card overflow-hidden group">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-2xl mb-4">{program.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider variant="wave" color="fill-muted/30" />

      {/* Reviews Section */}
      <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container px-4 md:px-6 mb-12">
          <ScrollReveal animation="fade-in">
            <div className="text-center">
              <div className="inline-flex items-center gap-1 mb-4 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                What Our <span className="gradient-text">Members</span> Say
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join over 7,000+ satisfied members who have experienced the Fountain difference. 
                Real reviews from Trustpilot.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <TestimonialCarousel testimonials={reviews} />
      </section>

      <WaveDivider variant="curve" color="fill-background" flip />

      {/* Roles Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Join Our Team</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Tailored for <span className="gradient-text">Every Role</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Whether you&apos;re joining as clinical staff or support team, 
                we have customized onboarding paths for you.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="stagger">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {roles.map((role) => (
                <Card 
                  key={role.abbr} 
                  className="glass-card text-center p-8 group cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${role.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    {role.abbr}
                  </div>
                  <h3 className="font-semibold">{role.name}</h3>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Directory Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Need Help?</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Who to <span className="gradient-text">Contact</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find the right person to help you with your questions and concerns.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-in" delay={100}>
            <div className="max-w-4xl mx-auto">
              <Card className="glass-card overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-6">
                    {contacts.slice(0, 6).map((contact, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 py-4 border-b border-border/50 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{contact.topic}</p>
                          <p className="text-muted-foreground text-sm">{contact.person}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6">
                    {contacts.slice(6).map((contact, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 py-4 border-b border-border/50 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{contact.topic}</p>
                          <p className="text-muted-foreground text-sm">{contact.person}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider variant="tilt" color="fill-muted/30" />

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Platform Features</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Everything You Need to <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform provides all the tools and resources to make your 
                onboarding experience smooth and efficient.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="stagger">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.title} 
                  className="glass-card p-6 group"
                >
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider variant="wave" color="fill-background" flip />

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.4)_1px,transparent_0)] bg-[length:32px_32px]" />
        <div className="container px-4 md:px-6 text-center relative z-10">
          <ScrollReveal animation="scale">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
                  <Users className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Join the Team?
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
                Sign in to access your personalized onboarding checklist and start 
                your journey with Fountain.
              </p>
              <Button size="lg" asChild className="text-lg px-10 py-6 bg-white text-teal-600 hover:bg-white/90 shadow-xl">
                <Link href="/login">
                  Sign In to Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
