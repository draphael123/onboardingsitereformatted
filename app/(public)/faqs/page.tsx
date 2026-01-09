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
  title: "FAQs | Fountain Vitality",
  description: "Frequently asked questions about Fountain Vitality's onboarding process and services.",
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
        question: "How long does the onboarding process take?",
        answer: "The onboarding process typically takes 2-4 weeks depending on your role. Your personalized checklist will show estimated completion times for each section.",
        order: 0,
      },
      {
        id: "2",
        question: "What should I bring on my first day?",
        answer: "Please bring two forms of identification, any relevant certifications or licenses, and a positive attitude! Your checklist will have specific requirements for your role.",
        order: 1,
      },
      {
        id: "3",
        question: "How do I access my onboarding checklist?",
        answer: "After your account is created by HR, you can sign in to the portal using your email and temporary password. You'll be prompted to change your password on first login.",
        order: 2,
      },
      {
        id: "4",
        question: "Who do I contact if I have questions?",
        answer: "You can reach out to our HR team at hr@fountainvitality.com or use the contact form on our Contact page. Your direct supervisor will also be introduced during orientation.",
        order: 3,
      },
      {
        id: "5",
        question: "Can I complete onboarding tasks remotely?",
        answer: "Many onboarding tasks can be completed remotely, such as document review and online training modules. However, some tasks like badge pickup and in-person orientation require on-site attendance.",
        order: 4,
      },
      {
        id: "6",
        question: "What if I need more time to complete a task?",
        answer: "If you need additional time for any task, please contact your supervisor or HR. We understand that everyone learns at their own pace and are happy to accommodate reasonable requests.",
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

