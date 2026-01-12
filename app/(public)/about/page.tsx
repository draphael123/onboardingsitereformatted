import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { 
  HeartHandshake, 
  Smartphone, 
  Cpu, 
  Star,
  UserCog,
  Stethoscope,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Fountain",
  description: "Fountain is a leading provider of concierge online TRT and HRT treatments, delivering expert care directly to your doorstep.",
}

const differentiators = [
  {
    icon: HeartHandshake,
    title: "Unparalleled Support",
    description: "Our concierge support team is available 24/7 via text, ensuring you receive assistance whenever needed."
  },
  {
    icon: Smartphone,
    title: "Maximum Convenience",
    description: "From provider video visits to lab appointments, every aspect of your treatment is managed through your phone with minimal effort."
  },
  {
    icon: Cpu,
    title: "Sophisticated Technology",
    description: "Medications are delivered directly to your doorstep, eliminating the need for pharmacy visits."
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Our all-inclusive membership covers medication, shipping, provider visits, and labs, offering a seamless healthcare experience."
  },
  {
    icon: UserCog,
    title: "Hyper Personalized",
    description: "Treatment plans are customized based on your health history and lab results, ensuring precise dosages tailored to your needs."
  },
  {
    icon: Stethoscope,
    title: "Curated Specialists",
    description: "Led by Dr. Doron Stember, a board-certified physician with over a decade of experience, our team provides world-class care."
  }
]

const stats = [
  { number: "9,000+", label: "Active Members" },
  { number: "24/7", label: "Concierge Support" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Personalized Care" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              About <span className="text-primary">Fountain</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A leading provider of concierge online Testosterone Replacement Therapy (TRT) 
              and Hormone Replacement Therapy (HRT) treatments, delivering expert care 
              directly to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded with the mission to revolutionize healthcare accessibility, 
                Fountain offers convenient online TRT and HRT treatments designed to 
                help individuals achieve optimal health.
              </p>
              <p className="text-muted-foreground mb-4">
                Our services help men restore testosterone levels and women alleviate 
                peri/menopause symptoms. We believe everyone deserves access to 
                personalized hormone therapy without the hassle of traditional 
                healthcare visits.
              </p>
              <p className="text-muted-foreground">
                Join over 9,000 active members who have experienced the Fountain 
                difference and taken the first step towards optimal health.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="font-display text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Fountain Difference */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              The Fountain Difference
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What sets us apart in providing world-class hormone therapy treatments.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <Card 
                key={item.title} 
                className="p-6 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Join Our Team
            </h2>
            <p className="text-muted-foreground mb-8">
              At Fountain, we&apos;re always looking for passionate healthcare 
              professionals who share our commitment to revolutionizing healthcare 
              accessibility. Whether you&apos;re a Nurse Practitioner, Registered Nurse, 
              Medical Assistant, or Customer Service specialist, we offer opportunities 
              to make a real difference in people&apos;s lives.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              <Users className="h-4 w-4" />
              Currently onboarding new team members
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

