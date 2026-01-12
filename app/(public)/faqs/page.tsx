"use client"

import { useState, useMemo } from "react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Default FAQs
const defaultFaqs = [
  {
    id: "1",
    question: "What services does Fountain offer?",
    answer: "Fountain is a leading provider of concierge online Testosterone Replacement Therapy (TRT) and Hormone Replacement Therapy (HRT). We deliver expert care and medications directly to our members' doorsteps with 24/7 support.",
    category: "Services",
  },
  {
    id: "2",
    question: "How long does the employee onboarding process take?",
    answer: "The onboarding process typically takes 2-4 weeks depending on your role (NP, RN, MA, or CS). Your personalized checklist will show estimated completion times for each section and track your progress.",
    category: "Onboarding",
  },
  {
    id: "3",
    question: "What roles are you hiring for?",
    answer: "We hire Nurse Practitioners (NPs), Registered Nurses (RNs), Medical Assistants (MAs), and Customer Service (CS) specialists. Each role has a customized onboarding path tailored to their responsibilities.",
    category: "Careers",
  },
  {
    id: "4",
    question: "How do I access my onboarding checklist?",
    answer: "After your account is created by HR, you can sign in to the portal using your email and temporary password. You'll be prompted to change your password on first login and can immediately begin your onboarding tasks.",
    category: "Onboarding",
  },
  {
    id: "5",
    question: "Can I complete onboarding tasks remotely?",
    answer: "Yes! Fountain is a telehealth company, so most onboarding tasks can be completed remotely. This includes document review, compliance training, and system access setup. Some role-specific training may require video calls with team leads.",
    category: "Onboarding",
  },
  {
    id: "6",
    question: "Who do I contact if I have questions during onboarding?",
    answer: "For general onboarding questions, contact Daniel Raphael. For scheduling questions, reach out to Ashley Gwinn. For payroll and Gusto questions, contact Tammy Hale.",
    category: "Support",
  },
  {
    id: "7",
    question: "What is TRT and who is it for?",
    answer: "Testosterone Replacement Therapy (TRT) is a medical treatment designed to restore testosterone levels in men experiencing low testosterone (hypogonadism). Symptoms may include fatigue, low libido, muscle loss, and mood changes. Our providers evaluate each member individually to determine if TRT is appropriate.",
    category: "Medical",
  },
  {
    id: "8",
    question: "How does telehealth work at Fountain?",
    answer: "Members complete an initial online consultation with our licensed providers via secure video call. After reviewing lab results and medical history, providers create personalized treatment plans. Medications are shipped directly to members, and follow-up appointments are conducted virtually.",
    category: "Services",
  },
  {
    id: "9",
    question: "What training materials are provided?",
    answer: "We provide comprehensive training including video tutorials, written guides, role-specific protocols, HIPAA compliance training, and hands-on system training. All materials are accessible through your onboarding dashboard.",
    category: "Onboarding",
  },
  {
    id: "10",
    question: "Is my health information secure?",
    answer: "Absolutely. Fountain is fully HIPAA compliant. All health information is encrypted and stored securely. Our team undergoes regular security training, and we use industry-leading security measures to protect member data.",
    category: "Security",
  },
  {
    id: "11",
    question: "What are the working hours?",
    answer: "Fountain operates 24/7 to support our members. Specific working hours depend on your role and shift assignment. During onboarding, your supervisor will discuss your schedule and any flexibility options.",
    category: "Careers",
  },
  {
    id: "12",
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link within a few minutes. If you don't see the email, check your spam folder or contact support.",
    category: "Support",
  },
  {
    id: "13",
    question: "What is HRT and who is it for?",
    answer: "Hormone Replacement Therapy (HRT) is designed primarily for women experiencing peri-menopause or menopause symptoms such as hot flashes, brain fog, mood swings, and low energy. Our providers create customized hormone therapy plans based on individual lab results and symptoms.",
    category: "Medical",
  },
  {
    id: "14",
    question: "What tools and platforms will I use?",
    answer: "You'll primarily use Heidi Health for clinical documentation and chart prep, Intercom for customer messaging and support, and Gusto for payroll and HR management. Training on each platform is included in your onboarding.",
    category: "Onboarding",
  },
  {
    id: "15",
    question: "How do I view my schedule?",
    answer: "Your schedule is managed by Ashley Gwinn. Contact her directly for any scheduling questions, shift swaps, or time-off requests.",
    category: "Careers",
  },
  {
    id: "16",
    question: "How does payroll work at Fountain?",
    answer: "Payroll is processed through Gusto. You'll receive access to your Gusto account during onboarding where you can view pay stubs, update tax information, and manage direct deposit. For payroll questions, contact Tammy Hale.",
    category: "Careers",
  },
  {
    id: "17",
    question: "What is Heidi Health and how do I use it?",
    answer: "Heidi Health is our AI-powered clinical documentation platform used for chart prep and medical documentation. It helps streamline the documentation process for providers. For Heidi-related questions, contact Dawntaya Cooley (Taya).",
    category: "Services",
  },
  {
    id: "18",
    question: "Who do I contact for clinical questions?",
    answer: "For HRT clinical questions, contact Summer. For TRT clinical questions, contact Bill. For GLP clinical questions, contact Terray. For async questions, reach out to Summer or Terray.",
    category: "Medical",
  },
  {
    id: "19",
    question: "What is the member experience like?",
    answer: "Members enjoy a fully concierge experience: they start with an online consultation, complete lab work at a convenient location, receive a personalized treatment plan, and have medications shipped directly to their door. Our 24/7 support team is available via text for any questions.",
    category: "Services",
  },
  {
    id: "20",
    question: "How do I handle Intercom and customer inquiries?",
    answer: "Intercom is our main customer messaging platform. For questions about Intercom workflows or shift supervisor questions, contact Camryn. Training on Intercom best practices is included in your onboarding.",
    category: "Support",
  },
  {
    id: "21",
    question: "What happens after I complete onboarding?",
    answer: "After completing your onboarding checklist, you'll be fully integrated into your team and ready to start your regular responsibilities. You'll have ongoing access to resources, and your supervisor will provide continued support as you settle into your role.",
    category: "Onboarding",
  },
  {
    id: "22",
    question: "Who handles clearances and compliance?",
    answer: "For clearance-related questions and compliance verification, contact Tzvi. They handle all background checks, licensing verification, and regulatory compliance matters.",
    category: "Careers",
  },
  {
    id: "23",
    question: "What if I experience technical issues?",
    answer: "For any platform issues, technical problems, or system access issues, contact Daniel Raphael. He handles all technical support and can help troubleshoot any problems you encounter.",
    category: "Support",
  },
  {
    id: "24",
    question: "What is PMP and refill compliance?",
    answer: "PMP (Prescription Monitoring Program) compliance is crucial for controlled substance prescriptions. For any PMP or refill compliance questions, contact Lindsay who oversees our compliance protocols.",
    category: "Medical",
  },
  {
    id: "25",
    question: "How are medications shipped to members?",
    answer: "Medications are shipped directly from our partner pharmacies to members' homes. Shipping is included in the membership, and members can track their shipments. Most orders arrive within 3-5 business days.",
    category: "Services",
  },
  {
    id: "26",
    question: "What should I do if a member has an urgent concern?",
    answer: "For urgent member concerns, follow the escalation protocol outlined in your training. Members with medical emergencies should always be directed to call 911 or visit their nearest emergency room.",
    category: "Medical",
  },
  {
    id: "27",
    question: "Is Fountain available in all states?",
    answer: "Fountain is licensed to operate in most US states, but availability varies. Our team can help members determine if services are available in their location during the initial consultation.",
    category: "Services",
  },
  {
    id: "28",
    question: "What makes Fountain different from other telehealth providers?",
    answer: "Fountain stands out with our concierge 24/7 text support, all-inclusive membership pricing, personalized treatment plans, and premium member experience. Our providers are specialists in hormone therapy, ensuring expert care for every member.",
    category: "Services",
  },
]

const categories = ["All", "Services", "Medical", "Onboarding", "Careers", "Support", "Security"]

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openItems, setOpenItems] = useState<string[]>([])

  const filteredFaqs = useMemo(() => {
    return defaultFaqs.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Auto-expand matching items when searching
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const matchingIds = defaultFaqs
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(query.toLowerCase()) ||
            faq.answer.toLowerCase().includes(query.toLowerCase())
        )
        .map((faq) => faq.id)
      setOpenItems(matchingIds)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setOpenItems([])
  }

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query || query.length < 2) return text
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

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

      {/* Search Section */}
      <section className="py-8 border-b sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-12 h-12 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results count */}
            {searchQuery && (
              <p className="text-sm text-muted-foreground text-center">
                Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse all categories.
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <Accordion 
                type="multiple" 
                value={openItems}
                onValueChange={setOpenItems}
                className="w-full space-y-4"
              >
                {filteredFaqs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border rounded-lg px-6 data-[state=open]:bg-muted/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <div className="flex items-start gap-3 pr-4">
                        <span className="font-semibold">
                          {highlightText(faq.question, searchQuery)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="shrink-0 mt-0.5">
                          {faq.category}
                        </Badge>
                        <p className="leading-relaxed">
                          {highlightText(faq.answer, searchQuery)}
                        </p>
                      </div>
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
            <p className="text-muted-foreground">
              Please contact Daniel Raphael if you need assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
