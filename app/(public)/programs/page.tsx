import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Syringe, 
  Heart,
  CheckCircle2,
  Truck,
  Video,
  TestTube,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Our Programs | Fountain",
  description: "Explore Fountain's TRT and HRT programs - personalized hormone therapy treatments delivered to your doorstep.",
}

const trtBenefits = [
  "Enhanced muscle mass and strength",
  "Reduced body fat",
  "Boosted energy levels",
  "Improved libido and sexual function",
  "Better mood and mental clarity",
  "Increased bone density",
]

const hrtBenefits = [
  "Relief from hot flashes",
  "Improved sleep quality",
  "Reduced brain fog",
  "Increased energy levels",
  "Better mood stability",
  "Enhanced skin elasticity",
]

const treatmentOptions = {
  trt: ["Injections", "Topical Creams", "Enclomiphene"],
  hrt: ["Testosterone", "Estrogen", "Progesterone"],
}

const howItWorks = [
  {
    icon: Video,
    title: "Video Consultation",
    description: "Connect with our expert providers through convenient video visits from anywhere.",
  },
  {
    icon: TestTube,
    title: "Lab Work",
    description: "Complete required labs at a location near you - we coordinate everything.",
  },
  {
    icon: Syringe,
    title: "Personalized Treatment",
    description: "Receive a customized treatment plan based on your health history and lab results.",
  },
  {
    icon: Truck,
    title: "Doorstep Delivery",
    description: "Your medications are delivered directly to your home - no pharmacy visits needed.",
  },
]

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Our Programs</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Hormone Therapy <span className="text-primary">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Fountain offers concierge TRT and HRT treatments with personalized care, 
              24/7 support, and doorstep delivery.
            </p>
          </div>
        </div>
      </section>

      {/* TRT Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Syringe className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Testosterone Replacement Therapy
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Tailored for men seeking to restore testosterone levels, our TRT program 
                is designed to help you feel like yourself again. Low testosterone can 
                affect energy, mood, muscle mass, and libido - our expert providers create 
                personalized treatment plans to address your specific needs.
              </p>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Treatment Options:</h3>
                <div className="flex flex-wrap gap-2">
                  {treatmentOptions.trt.map((option) => (
                    <Badge key={option} variant="outline">{option}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">TRT Benefits</CardTitle>
                <CardDescription>
                  What you can expect from testosterone therapy
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {trtBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HRT Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-6 lg:order-1">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">HRT Benefits</CardTitle>
                <CardDescription>
                  Relief from perimenopause and menopause symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {hrtBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-rose-500 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Hormone Replacement Therapy
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Designed for women experiencing perimenopause or menopause symptoms, 
                our HRT program offers customized hormone therapy to help you feel 
                balanced and vibrant. Say goodbye to hot flashes, brain fog, and low 
                energy with a treatment plan tailored specifically for you.
              </p>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Treatment Options:</h3>
                <div className="flex flex-wrap gap-2">
                  {treatmentOptions.hrt.map((option) => (
                    <Badge key={option} variant="outline">{option}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started with Fountain is simple. Our streamlined process ensures 
              you receive personalized care with minimal hassle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <Card key={step.title} className="p-6 text-center relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <CardContent className="p-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All-Inclusive Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            All-Inclusive Membership
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Our membership covers everything: medication, shipping, provider visits, 
            and labs. No hidden fees, no surprise costs - just seamless healthcare.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm py-1">Medication Included</Badge>
            <Badge variant="secondary" className="text-sm py-1">Free Shipping</Badge>
            <Badge variant="secondary" className="text-sm py-1">Provider Visits</Badge>
            <Badge variant="secondary" className="text-sm py-1">Lab Work</Badge>
            <Badge variant="secondary" className="text-sm py-1">24/7 Support</Badge>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">
              Staff Portal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

