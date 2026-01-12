"use client"

import { useState, useMemo } from "react"
import { Book, Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Comprehensive glossary terms for Fountain Vitality
const glossaryTerms = [
  // Medical Terms - Hormones & TRT/HRT
  {
    term: "TRT",
    definition: "Testosterone Replacement Therapy. A medical treatment to restore testosterone levels in men experiencing low testosterone (hypogonadism). Administered via injections, gels, patches, or pellets.",
    category: "Medical",
  },
  {
    term: "HRT",
    definition: "Hormone Replacement Therapy. Treatment to supplement hormones when the body doesn't produce enough. Common in menopause treatment for women and can include estrogen, progesterone, and/or testosterone.",
    category: "Medical",
  },
  {
    term: "Testosterone",
    definition: "The primary male sex hormone responsible for muscle mass, bone density, fat distribution, red blood cell production, and sex drive. Women also produce testosterone in smaller amounts.",
    category: "Medical",
  },
  {
    term: "Estrogen",
    definition: "A group of hormones primarily responsible for the development and regulation of the female reproductive system. Also important for bone health in both sexes.",
    category: "Medical",
  },
  {
    term: "Progesterone",
    definition: "A hormone that plays a role in the menstrual cycle, pregnancy, and embryogenesis. Often used in combination with estrogen in HRT.",
    category: "Medical",
  },
  {
    term: "Hypogonadism",
    definition: "A condition in which the body doesn't produce enough testosterone. Can be primary (testicular) or secondary (pituitary/hypothalamus). Common indication for TRT.",
    category: "Medical",
  },
  {
    term: "Free Testosterone",
    definition: "Testosterone not bound to proteins in the blood, making it available for the body to use. Typically 2-3% of total testosterone.",
    category: "Medical",
  },
  {
    term: "Total Testosterone",
    definition: "The complete amount of testosterone in the blood, including both bound and free testosterone. Normal range for men is 300-1000 ng/dL.",
    category: "Medical",
  },
  {
    term: "SHBG",
    definition: "Sex Hormone-Binding Globulin. A protein that binds to testosterone and estrogen, affecting how much hormone is available for use by the body.",
    category: "Medical",
  },
  {
    term: "Aromatase",
    definition: "An enzyme that converts testosterone to estrogen. Aromatase inhibitors may be prescribed alongside TRT to prevent excessive estrogen conversion.",
    category: "Medical",
  },
  {
    term: "AI",
    definition: "Aromatase Inhibitor. Medication that blocks the aromatase enzyme, reducing conversion of testosterone to estrogen. Sometimes used alongside TRT.",
    category: "Medical",
  },
  {
    term: "HCG",
    definition: "Human Chorionic Gonadotropin. A hormone used alongside TRT to maintain testicular function and fertility by mimicking LH (luteinizing hormone).",
    category: "Medical",
  },
  {
    term: "Subcutaneous Injection",
    definition: "SubQ or SC injection. An injection into the fatty tissue just beneath the skin, often used for testosterone cypionate administration.",
    category: "Medical",
  },
  {
    term: "Intramuscular Injection",
    definition: "IM injection. An injection directly into a muscle, commonly the gluteal or deltoid muscle. Traditional method for testosterone delivery.",
    category: "Medical",
  },
  {
    term: "Testosterone Cypionate",
    definition: "An injectable form of testosterone with an attached cypionate ester. Commonly prescribed for TRT with typical dosing every 1-2 weeks.",
    category: "Medical",
  },
  {
    term: "Half-Life",
    definition: "The time required for half of a substance to be eliminated from the body. Testosterone cypionate has a half-life of about 8 days.",
    category: "Medical",
  },
  {
    term: "CBC",
    definition: "Complete Blood Count. A blood test measuring red blood cells, white blood cells, hemoglobin, and platelets. Required monitoring during TRT.",
    category: "Medical",
  },
  {
    term: "CMP",
    definition: "Comprehensive Metabolic Panel. Blood tests checking kidney function, liver function, blood sugar, and electrolytes.",
    category: "Medical",
  },
  {
    term: "PSA",
    definition: "Prostate-Specific Antigen. A protein produced by the prostate. Elevated levels may indicate prostate issues. Monitored during TRT.",
    category: "Medical",
  },
  {
    term: "Lipid Panel",
    definition: "Blood test measuring cholesterol levels including total cholesterol, LDL, HDL, and triglycerides. Important for cardiovascular monitoring.",
    category: "Medical",
  },
  {
    term: "Hematocrit",
    definition: "The percentage of blood volume occupied by red blood cells. TRT can increase hematocrit, requiring monitoring (normal: 38-50%).",
    category: "Medical",
  },
  {
    term: "Hemoglobin",
    definition: "Protein in red blood cells that carries oxygen. TRT may increase hemoglobin levels, which requires monitoring.",
    category: "Medical",
  },
  {
    term: "Polycythemia",
    definition: "A condition where the body produces too many red blood cells. Can occur with TRT and may require blood donation or dosage adjustment.",
    category: "Medical",
  },
  
  // Telehealth & Healthcare Terms
  {
    term: "Telehealth",
    definition: "The delivery of healthcare services through electronic means, including video consultations, phone calls, and secure messaging.",
    category: "Healthcare",
  },
  {
    term: "Telemedicine",
    definition: "Remote clinical services provided via telecommunications technology. Allows patients to consult with healthcare providers without in-person visits.",
    category: "Healthcare",
  },
  {
    term: "Concierge Medicine",
    definition: "A healthcare model where patients pay a membership fee for enhanced access to physicians, longer appointments, and personalized care.",
    category: "Healthcare",
  },
  {
    term: "HIPAA",
    definition: "Health Insurance Portability and Accountability Act. Federal law protecting patient health information privacy and security.",
    category: "Compliance",
  },
  {
    term: "PHI",
    definition: "Protected Health Information. Any information about health status, healthcare provision, or payment that can be linked to an individual.",
    category: "Compliance",
  },
  {
    term: "BAA",
    definition: "Business Associate Agreement. A HIPAA-required contract between a covered entity and a business associate handling PHI.",
    category: "Compliance",
  },
  {
    term: "EHR/EMR",
    definition: "Electronic Health Record / Electronic Medical Record. Digital version of a patient's medical history and records.",
    category: "Healthcare",
  },
  {
    term: "Prior Authorization",
    definition: "PA. Approval from insurance before a medication or treatment is provided. Determines if the service is covered.",
    category: "Healthcare",
  },
  {
    term: "Rx",
    definition: "Prescription. The symbol for a pharmaceutical prescription, from the Latin 'recipe' meaning 'take.'",
    category: "Healthcare",
  },
  {
    term: "DEA Number",
    definition: "Drug Enforcement Administration registration number. Required for providers to prescribe controlled substances.",
    category: "Compliance",
  },
  {
    term: "NPI",
    definition: "National Provider Identifier. A unique 10-digit identification number for healthcare providers required by HIPAA.",
    category: "Healthcare",
  },
  {
    term: "SOC",
    definition: "Standard of Care. The level of care that a reasonably competent healthcare professional would provide in similar circumstances.",
    category: "Healthcare",
  },
  
  // Roles & Positions
  {
    term: "NP",
    definition: "Nurse Practitioner. An advanced practice registered nurse with graduate education who can diagnose, prescribe, and manage patient care.",
    category: "Roles",
  },
  {
    term: "RN",
    definition: "Registered Nurse. A licensed nurse who has completed nursing school and passed the NCLEX-RN exam.",
    category: "Roles",
  },
  {
    term: "MA",
    definition: "Medical Assistant. Healthcare worker who performs administrative and clinical tasks to support physicians and other providers.",
    category: "Roles",
  },
  {
    term: "CS",
    definition: "Customer Service. Team members who handle patient inquiries, scheduling, and general support.",
    category: "Roles",
  },
  {
    term: "PA",
    definition: "Physician Assistant. A medical professional who practices medicine under physician supervision.",
    category: "Roles",
  },
  {
    term: "MD/DO",
    definition: "Medical Doctor / Doctor of Osteopathic Medicine. Physicians with doctoral degrees who can practice medicine independently.",
    category: "Roles",
  },
  {
    term: "Pharmacist",
    definition: "A healthcare professional responsible for dispensing medications and providing drug information to patients and providers.",
    category: "Roles",
  },
  
  // Fountain-Specific Terms
  {
    term: "Member",
    definition: "At Fountain, we refer to patients as 'members' to emphasize our membership-based, personalized approach to healthcare.",
    category: "Fountain",
  },
  {
    term: "Concierge Support",
    definition: "Fountain's 24/7 support service providing members with round-the-clock access to assistance and care coordination.",
    category: "Fountain",
  },
  {
    term: "Onboarding",
    definition: "The process of getting new team members trained and integrated into Fountain's systems, protocols, and culture.",
    category: "Fountain",
  },
  {
    term: "Member Journey",
    definition: "The complete experience of a member from initial consultation through ongoing treatment and follow-up care.",
    category: "Fountain",
  },
  {
    term: "Lab Panel",
    definition: "The set of blood tests ordered for new members to assess hormone levels and overall health before starting therapy.",
    category: "Fountain",
  },
  {
    term: "Wellness Coach",
    definition: "A Fountain team member who provides lifestyle guidance and support to help members optimize their health outcomes.",
    category: "Fountain",
  },
  
  // Pharmacy & Medication Terms
  {
    term: "Compounding Pharmacy",
    definition: "A pharmacy that creates personalized medications by mixing individual ingredients based on a provider's prescription.",
    category: "Pharmacy",
  },
  {
    term: "Controlled Substance",
    definition: "A drug or chemical whose manufacture, possession, or use is regulated by the government due to potential for abuse.",
    category: "Pharmacy",
  },
  {
    term: "Schedule III",
    definition: "DEA classification for drugs with moderate to low potential for dependence. Testosterone is a Schedule III controlled substance.",
    category: "Pharmacy",
  },
  {
    term: "Titration",
    definition: "The process of gradually adjusting medication dosage to find the optimal amount for each individual patient.",
    category: "Pharmacy",
  },
  {
    term: "Refill",
    definition: "A subsequent dispensing of a medication after the initial prescription, as authorized by the prescriber.",
    category: "Pharmacy",
  },
  {
    term: "90-Day Supply",
    definition: "A prescription providing three months of medication, common for maintenance medications like TRT.",
    category: "Pharmacy",
  },
]

const categories = ["All", "Medical", "Healthcare", "Compliance", "Roles", "Fountain", "Pharmacy"]

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set())

  const filteredTerms = useMemo(() => {
    return glossaryTerms
      .filter((item) => {
        const matchesSearch =
          searchQuery === "" ||
          item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [searchQuery, selectedCategory])

  const toggleTerm = (term: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev)
      if (next.has(term)) {
        next.delete(term)
      } else {
        next.add(term)
      }
      return next
    })
  }

  // Group by first letter for alphabet navigation
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {}
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) {
        groups[letter] = []
      }
      groups[letter].push(term)
    })
    return groups
  }, [filteredTerms])

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  const availableLetters = new Set(Object.keys(groupedTerms))

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Book className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Medical <span className="text-primary">Glossary</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Reference guide for medical terms, acronyms, and Fountain-specific terminology.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search terms or definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
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

            {/* Alphabet Navigation */}
            <div className="flex flex-wrap gap-1 justify-center">
              {alphabet.map((letter) => (
                <a
                  key={letter}
                  href={availableLetters.has(letter) ? `#letter-${letter}` : undefined}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors",
                    availableLetters.has(letter)
                      ? "hover:bg-primary hover:text-primary-foreground cursor-pointer"
                      : "text-muted-foreground/30 cursor-not-allowed"
                  )}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No terms found matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedTerms).map(([letter, terms]) => (
                  <div key={letter} id={`letter-${letter}`} className="scroll-mt-48">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{letter}</span>
                      </div>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="space-y-3">
                      {terms.map((item) => {
                        const isExpanded = expandedTerms.has(item.term)
                        return (
                          <div
                            key={item.term}
                            className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                          >
                            <button
                              onClick={() => toggleTerm(item.term)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-lg">{item.term}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.category}
                                </Badge>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 text-muted-foreground transition-transform",
                                  isExpanded && "rotate-180"
                                )}
                              />
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 pt-0">
                                <p className="text-muted-foreground leading-relaxed">
                                  {item.definition}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{glossaryTerms.length}</div>
              <div className="text-sm text-muted-foreground">Total Terms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{filteredTerms.length}</div>
              <div className="text-sm text-muted-foreground">Showing</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

