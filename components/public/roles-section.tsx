"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrainingModal, rnTrainingData } from "@/components/ui/training-modal"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { BookOpen, Clock } from "lucide-react"

const roles = [
  { 
    name: "Customer Service", 
    abbr: "CS", 
    color: "from-blue-500 to-blue-600", 
    hasTraining: false,
    description: "Front-line support for member inquiries and assistance",
    modules: 8
  },
  { 
    name: "Back-office MA", 
    abbr: "MA", 
    subtitle: "Back Office", 
    color: "from-purple-500 to-purple-600", 
    hasTraining: false,
    description: "Administrative support and documentation management",
    modules: 6
  },
  { 
    name: "RN", 
    abbr: "RN", 
    color: "from-coral-400 to-rose-500", 
    hasTraining: true,
    description: "Clinical care coordination and patient education",
    modules: 12
  },
  { 
    name: "Provider", 
    abbr: "NP", 
    color: "from-emerald-500 to-emerald-600", 
    hasTraining: false,
    description: "Medical consultations and treatment planning",
    modules: 15
  },
  { 
    name: "MA - Pharmacy Team", 
    abbr: "MA", 
    subtitle: "Pharmacy", 
    color: "from-amber-500 to-amber-600", 
    hasTraining: false,
    description: "Prescription processing and medication coordination",
    modules: 10
  },
]

export function RolesSection() {
  const [showRNModal, setShowRNModal] = useState(false)

  const handleRoleClick = (role: typeof roles[0]) => {
    if (role.abbr === "RN" && role.hasTraining) {
      setShowRNModal(true)
    }
  }

  return (
    <>
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fountain-50/30 to-transparent dark:via-fountain-950/20" />
        <div className="container px-4 md:px-6 relative">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-16">
              <span className="text-fountain-600 dark:text-fountain-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Join Our Team</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {roles.map((role, index) => (
                <Card 
                  key={`${role.abbr}-${index}`} 
                  className={`glass-card p-6 group transition-all duration-300 ${
                    role.hasTraining 
                      ? 'cursor-pointer hover:ring-2 hover:ring-fountain-500 hover:border-fountain-400/50' 
                      : 'cursor-default'
                  }`}
                  onClick={() => handleRoleClick(role)}
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className={`bg-gradient-to-br ${role.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center text-white font-bold mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <span className="text-xl md:text-2xl">{role.abbr}</span>
                        {role.subtitle && (
                          <span className="text-[10px] md:text-xs font-medium opacity-90">{role.subtitle}</span>
                        )}
                      </div>
                      {!role.hasTraining && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-muted badge-pulse"
                        >
                          Soon
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm md:text-base mb-2">{role.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                      {role.description}
                    </p>
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {role.modules} modules
                      </span>
                    </div>
                    {role.hasTraining && (
                      <p className="text-xs text-fountain-600 dark:text-fountain-400 mt-3 font-medium">
                        Click to view training →
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* RN Training Modal */}
      <TrainingModal
        isOpen={showRNModal}
        onClose={() => setShowRNModal(false)}
        role="Registered Nurses"
        training={rnTrainingData}
      />
    </>
  )
}
