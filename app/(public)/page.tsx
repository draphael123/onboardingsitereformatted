import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WaveDivider } from "@/components/ui/wave-divider"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
import { RolesSection } from "@/components/public/roles-section"
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
  ExternalLink,
  FileText,
  MessageSquare,
  CreditCard,
  Stethoscope,
  Building2,
  Hash,
  Activity,
  Droplets,
  TrendingUp,
  Award,
  Headphones
} from "lucide-react"

export const metadata: Metadata = {
  title: "Fountain Vitality | Employee Onboarding Portal",
  description: "Join the Fountain Vitality team and help deliver expert TRT and HRT care directly to our members' doorsteps. Start your onboarding journey today.",
  keywords: ["Fountain Vitality", "onboarding", "TRT", "HRT", "telehealth", "healthcare careers", "employee training"],
  openGraph: {
    title: "Fountain Vitality | Employee Onboarding Portal",
    description: "Join the Fountain Vitality team and help deliver expert TRT and HRT care directly to our members' doorsteps.",
    type: "website",
    siteName: "Fountain Vitality",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fountain Vitality | Employee Onboarding Portal",
    description: "Join the Fountain Vitality team and help deliver expert TRT and HRT care directly to our members' doorsteps.",
  },
}

const tools = [
  {
    name: "Heidi Health",
    description: "AI-powered clinical documentation and chart prep",
    url: "https://heidihealth.com",
    icon: Stethoscope,
    color: "from-fountain-500 to-ocean-500",
  },
  {
    name: "Intercom",
    description: "Customer messaging and support platform",
    url: "https://intercom.com",
    icon: MessageSquare,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Gusto",
    description: "Payroll, benefits, and HR management",
    url: "https://gusto.com",
    icon: CreditCard,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Slack",
    description: "Team communication and collaboration",
    url: "https://app.slack.com/client/T013TB68ABD/C013RPA089K",
    icon: Hash,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Akute",
    description: "Healthcare platform and patient management",
    url: "https://app.akutehealth.com/login",
    icon: Activity,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, and collaboration",
    url: "https://www.notion.com/",
    icon: FileText,
    color: "from-gray-700 to-gray-900",
  },
]

const documents = [
  {
    title: "Systems Documents",
    description: "Comprehensive guide to Fountain systems and workflows",
    category: "Systems",
    url: "https://docs.google.com/document/d/1dXIr-i2el4GPmvXuDTjSvD7boh1j_XyHY8sJ03xtDIg/edit?tab=t.7o24scjh5yuj#heading=h.ymrggzhy6n8k",
  },
  {
    title: "Fountain Contractor Policies",
    description: "Policies and guidelines for all Fountain contractors",
    category: "Policies",
    url: "https://docs.google.com/document/d/1NAErz9kcHNtph0_BSICC4OuFH2in6relkFRkWGz9vjk/edit?tab=t.0",
  },
]

const contacts = [
  { topic: "Schedules", person: "Ashley Gwinn", initials: "AG" },
  { topic: "Gusto/Payroll", person: "Tammy Hale", initials: "TH" },
  { topic: "Chart Prep (including Heidi context)", person: "Dawntaya Cooley (Taya)", initials: "DC" },
  { topic: "PMP/Refill Compliance Questions", person: "Lindsay Burden", initials: "LB" },
  { topic: "HRT Clinical Questions", person: "Summer Denny", initials: "SD" },
  { topic: "TRT Clinical Questions", person: "Bill Carbonneau", initials: "BC" },
  { topic: "GLP Clinical Questions", person: "Terray Humphrey", initials: "TH" },
  { topic: "Async Questions", person: "Summer Denny / Terray Humphrey", initials: "S/T" },
  { topic: "Shift Supervisor/Intercom Questions", person: "Camryn Burden", initials: "CB" },
  { topic: "Clearances", person: "Tzvi Doron", initials: "TD" },
  { topic: "User-facing technical or access issues", person: "Daniel Raphael", initials: "DR" },
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

const programs = [
  {
    icon: Syringe,
    title: "Testosterone Replacement Therapy (TRT)",
    description: "Tailored for men seeking to restore testosterone levels. Our TRT program enhances muscle mass, reduces body fat, boosts energy, and improves libido.",
    gradient: "from-fountain-500 to-ocean-500",
    url: "https://www.fountain.net/trt",
    buttonText: "Learn About TRT",
  },
  {
    icon: Heart,
    title: "Hormone Replacement Therapy (HRT)",
    description: "Designed for women experiencing peri/menopause symptoms. Our HRT program alleviates brain fog, hot flashes, and low energy with customized hormone therapy.",
    gradient: "from-coral-400 to-rose-500",
    url: "https://www.fountain.net/hrt",
    buttonText: "Learn About HRT",
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
    review: "Everyone is very helpful. Super easy. Super safe. Now at 40 years old, I feel like I&apos;m 24 again! Doron and his staff are the best! Highly recommend.",
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
    review: "The process is super easy. All parts of the process from bloodwork to shipping are fast and the results are definitely worth it. I&apos;m sleeping better, working out more, lost weight and overall much more energy. Couldn&apos;t be happier.",
  },
  {
    name: "P.",
    review: "I wish I could rate Fountain higher than 5 stars.",
  },
]

const stats = [
  { value: 9000, suffix: "+", label: "Active Members", icon: Users },
  { value: 24, suffix: "/7", label: "Support Available", icon: Headphones, isStatic: true, staticDisplay: "24/7" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: TrendingUp },
  { value: 5, suffix: "+", label: "Years Experience", icon: Award },
]

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden page-transition">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient hero-pattern">
        {/* Decorative water droplets pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-10 left-10 w-8 h-8 text-fountain-400/30 animate-float" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
          <svg className="absolute top-32 right-20 w-6 h-6 text-fountain-500/25 animate-float-delayed" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
          <svg className="absolute bottom-40 left-1/4 w-10 h-10 text-ocean-400/20 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
          <svg className="absolute top-1/2 right-1/3 w-5 h-5 text-fountain-300/30 animate-float" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
        </div>

        <div className="container px-4 md:px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fountain-500/10 border border-fountain-500/20 text-fountain-600 dark:text-fountain-400 text-sm font-medium mb-8 animate-fade-in">
              <Droplets className="h-4 w-4" />
              Welcome to Fountain
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fountain-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fountain-500"></span>
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 opacity-0 animate-fade-in-up">
              Your Onboarding Journey{" "}
              <span className="gradient-text-animated">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 opacity-0 animate-fade-in-up animate-delay-100 max-w-2xl mx-auto leading-relaxed">
              Join our team and help us deliver expert TRT and HRT care directly to our members&apos; doorsteps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animate-delay-200">
              <Button size="lg" asChild className="group text-lg px-8 py-6 btn-aqua btn-ripple border-0 shadow-lg shadow-fountain-500/25">
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-2 hover:bg-fountain-50 dark:hover:bg-fountain-950/50">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated floating orbs - More visible */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-fountain-500/25 dark:bg-fountain-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-ocean-500/20 dark:bg-ocean-500/25 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-coral-400/15 dark:bg-coral-400/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-fountain-400/20 rounded-full blur-2xl animate-float" />
      </section>

      {/* Stats Section - Enhanced with icons */}
      <section className="py-16 bg-gradient-to-r from-fountain-500 via-fountain-600 to-ocean-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:24px_24px]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral-400 via-coral-500 to-coral-400" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.isStatic ? (
                    <span>{stat.staticDisplay}</span>
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-white/80 text-sm md:text-base font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 section-dots opacity-50" />
        <div className="container px-4 md:px-6 relative">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-fountain-600 dark:text-fountain-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Our Services</span>
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
                <Card className="glass-card card-lift overflow-hidden group h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center text-white mb-6 parallax-icon shadow-lg`}>
                      <program.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display font-semibold text-2xl mb-4">{program.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6 flex-grow">
                      {program.description}
                    </p>
                    <a
                      href={program.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${program.gradient} text-white font-medium hover:opacity-90 transition-all shadow-lg btn-ripple`}
                    >
                      {program.buttonText}
                      <ExternalLink className="h-4 w-4" />
                    </a>
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
                Join over 9,000+ active members who have experienced the Fountain difference. 
                Real reviews from Trustpilot.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <TestimonialCarousel testimonials={reviews} />
      </section>

      <WaveDivider variant="curve" color="fill-background" flip />

      {/* Roles Section */}
      <RolesSection />

      {/* Contact Directory Section - Enhanced */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-fountain-50/30 to-slate-100 dark:from-slate-900 dark:via-fountain-950/30 dark:to-slate-800 relative">
        <div className="absolute inset-0 section-lines opacity-30" />
        <div className="container px-4 md:px-6 relative">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-fountain-600 dark:text-fountain-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Need Help?</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Who to <span className="gradient-text">Contact</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find the right person to help you with your questions and concerns.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-in" delay={100}>
            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact, index) => (
                  <Card 
                    key={index}
                    className="glass-card p-4 group hover:border-fountain-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fountain-500 to-ocean-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {contact.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">{contact.topic}</p>
                        <p className="text-muted-foreground text-xs truncate">{contact.person}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Onboarding CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-fountain-500/10 via-ocean-500/10 to-coral-400/5">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="scale">
            <div className="max-w-4xl mx-auto">
              <Card className="glass-card overflow-hidden border-2 border-fountain-500/20 card-lift">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-fountain-500 to-ocean-500 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-glow">
                      <BookOpen className="h-10 w-10 md:h-12 md:w-12 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                        Onboarding & Getting Started
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        New to Fountain? Access your personalized onboarding checklist, training materials, 
                        and everything you need to get started on your journey with us.
                      </p>
                      <Button size="lg" asChild className="group btn-aqua border-0 shadow-lg btn-ripple">
                        <Link href="/login">
                          Start Onboarding
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 section-dots opacity-30" />
        <div className="container px-4 md:px-6 relative">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-fountain-600 dark:text-fountain-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Work Essentials</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Tools & <span className="gradient-text">Platforms</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Access the essential tools and platforms you&apos;ll use daily at Fountain.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="stagger">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="glass-card p-6 h-full group cursor-pointer card-lift">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white flex-shrink-0 parallax-icon shadow-lg`}>
                          <tool.icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{tool.name}</h3>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider variant="wave" color="fill-muted/30" />

      {/* Documents Section */}
      <section className="py-20 md:py-32 bg-muted/30 relative">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-fountain-600 dark:text-fountain-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Resources</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Important <span className="gradient-text">Documents</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Essential documents, policies, and guides for all team members.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="stagger">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="glass-card p-6 h-full group cursor-pointer card-lift">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fountain-500/20 to-ocean-500/20 flex items-center justify-center flex-shrink-0 parallax-icon">
                          <FileText className="h-6 w-6 text-fountain-600 dark:text-fountain-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{doc.title}</h3>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {doc.description}
                          </p>
                          <span className="inline-block mt-3 text-xs font-medium text-fountain-600 dark:text-fountain-400 bg-fountain-500/10 px-2.5 py-1 rounded-full">
                            {doc.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-in" delay={200}>
            <div className="text-center mt-10">
              <Button variant="outline" asChild className="group hover:bg-fountain-50 dark:hover:bg-fountain-950/50">
                <Link href="/docs">
                  View All Documents
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider variant="tilt" color="fill-background" flip />

      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-fountain-600 dark:text-fountain-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Platform Features</span>
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
                  className="glass-card p-6 group card-lift"
                >
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fountain-500/20 to-ocean-500/20 text-fountain-600 dark:text-fountain-400 flex items-center justify-center mb-5 parallax-icon">
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
        <div className="absolute inset-0 bg-gradient-to-br from-fountain-500 via-fountain-600 to-ocean-600" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.4)_1px,transparent_0)] bg-[length:32px_32px]" />
        {/* Coral accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral-400 via-coral-500 to-coral-400" />
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
              <Button size="lg" asChild className="text-lg px-10 py-6 bg-white text-fountain-600 hover:bg-white/90 shadow-xl btn-ripple">
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
