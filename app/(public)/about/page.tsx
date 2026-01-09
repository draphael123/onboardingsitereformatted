import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart, 
  Target, 
  Lightbulb, 
  Users,
  Award,
  Leaf
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Fountain Vitality",
  description: "Learn about Fountain Vitality's mission, values, and commitment to healthcare excellence.",
}

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We believe in treating every patient with dignity, empathy, and respect. Our team is dedicated to providing care that addresses both physical and emotional needs."
  },
  {
    icon: Target,
    title: "Excellence in Practice",
    description: "We strive for the highest standards in healthcare delivery, continuously improving our processes and staying current with medical advances."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace new technologies and methodologies that enhance patient outcomes and streamline care delivery."
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "We foster a collaborative environment where every team member's contribution is valued and essential to our success."
  },
  {
    icon: Award,
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our interactions with patients, colleagues, and the community."
  },
  {
    icon: Leaf,
    title: "Wellness Focus",
    description: "We promote preventive care and holistic wellness, empowering patients to take an active role in their health journey."
  }
]

const stats = [
  { number: "15+", label: "Years of Service" },
  { number: "50k+", label: "Patients Served" },
  { number: "200+", label: "Healthcare Professionals" },
  { number: "98%", label: "Patient Satisfaction" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              About <span className="text-primary">Fountain Vitality</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Dedicated to transforming healthcare through compassionate care, 
              innovation, and a commitment to excellence.
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
                At Fountain Vitality, our mission is to deliver exceptional healthcare 
                services that improve the quality of life for our patients and communities. 
                We combine cutting-edge medical practices with personalized attention to 
                create positive health outcomes.
              </p>
              <p className="text-muted-foreground mb-4">
                Founded on the principle that everyone deserves access to quality healthcare, 
                we have grown from a small clinic to a comprehensive healthcare provider 
                serving thousands of patients across multiple locations.
              </p>
              <p className="text-muted-foreground">
                Our dedicated team of healthcare professionals works tirelessly to ensure 
                that every patient receives the care, respect, and attention they deserve.
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

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from patient care to team collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card 
                key={value.title} 
                className="p-6 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
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
              At Fountain Vitality, we&apos;re always looking for passionate healthcare 
              professionals who share our commitment to excellence. Whether you&apos;re 
              a seasoned practitioner or just starting your career, we offer 
              opportunities for growth, learning, and making a real difference in 
              people&apos;s lives.
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

