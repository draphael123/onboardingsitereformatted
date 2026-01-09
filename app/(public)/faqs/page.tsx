import { Metadata } from "next"
import { db } from "@/lib/db"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQs | Fountain",
  description: "Frequently asked questions about Fountain's TRT, HRT programs, and employee onboarding.",
}

async function getFAQs() {
  try {
    const faqs = await db.fAQ.findMany({
      orderBy: { order: "asc" },
    })
    return faqs
  } catch {
    // Return default FAQs if database is not available
    return [
      {
        id: "1",
        question: "What services does Fountain offer?",
        answer: "Fountain is a leading provider of concierge online Testosterone Replacement Therapy (TRT) and Hormone Replacement Therapy (HRT). We deliver expert care and medications directly to our members' doorsteps with 24/7 support.",
        order: 0,
      },
      {
        id: "2",
        question: "How long does the employee onboarding process take?",
        answer: "The onboarding process typically takes 2-4 weeks depending on your role (NP, RN, MA, or CS). Your personalized checklist will show estimated completion times for each section and track your progress.",
        order: 1,
      },
      {
        id: "3",
        question: "What roles are you hiring for?",
        answer: "We hire Nurse Practitioners (NPs), Registered Nurses (RNs), Medical Assistants (MAs), and Customer Service (CS) specialists. Each role has a customized onboarding path tailored to their responsibilities.",
        order: 2,
      },
      {
        id: "4",
        question: "How do I access my onboarding checklist?",
        answer: "After your account is created by HR, you can sign in to the portal using your email and temporary password. You'll be prompted to change your password on first login and can immediately begin your onboarding tasks.",
        order: 3,
      },
      {
        id: "5",
        question: "Can I complete onboarding tasks remotely?",
        answer: "Yes! Fountain is a telehealth company, so most onboarding tasks can be completed remotely. This includes document review, compliance training, and system access setup. Some role-specific training may require video calls with team leads.",
        order: 4,
      },
      {
        id: "6",
        question: "Who do I contact if I have questions during onboarding?",
        answer: "You can reach out to our HR team at support@fountain.net or use the contact form on our Contact page. Our team provides 24/7 support, and your direct supervisor will also be introduced during orientation.",
        order: 5,
      },
    ]
  }
}

export default async function FAQsPage() {
  const faqs = await getFAQs()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Find answers to common questions about our onboarding process and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No FAQs available at the moment. Please check back later.
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border rounded-lg px-6 data-[state=open]:bg-muted/30"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? Our team is here to help.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

