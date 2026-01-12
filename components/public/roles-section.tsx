"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { TrainingModal, rnTrainingData } from "@/components/ui/training-modal"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const roles = [
  { name: "Customer Service", abbr: "CS", color: "from-blue-500 to-blue-600", hasTraining: false },
  { name: "Back-office MA", abbr: "MA", subtitle: "Back Office", color: "from-purple-500 to-purple-600", hasTraining: false },
  { name: "RN", abbr: "RN", color: "from-rose-500 to-rose-600", hasTraining: true },
  { name: "Provider", abbr: "NP", color: "from-emerald-500 to-emerald-600", hasTraining: false },
  { name: "MA - Pharmacy Team", abbr: "MA", subtitle: "Pharmacy", color: "from-amber-500 to-amber-600", hasTraining: false },
]

export function RolesSection() {
  const [showRNModal, setShowRNModal] = useState(false)

  const handleRoleClick = (role: typeof roles[0]) => {
    if (role.abbr === "RN") {
      setShowRNModal(true)
    }
  }

  return (
    <>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {roles.map((role, index) => (
                <Card 
                  key={`${role.abbr}-${index}`} 
                  className={`glass-card text-center p-6 group cursor-pointer transition-all duration-300 ${role.hasTraining ? 'hover:ring-2 hover:ring-primary' : ''}`}
                  onClick={() => handleRoleClick(role)}
                >
                  <div className={`bg-gradient-to-br ${role.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center text-white font-bold mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <span className="text-xl md:text-2xl">{role.abbr}</span>
                    {role.subtitle && (
                      <span className="text-[10px] md:text-xs font-medium opacity-90">{role.subtitle}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">{role.name}</h3>
                  {role.hasTraining && (
                    <p className="text-xs text-primary mt-2">Click to view training</p>
                  )}
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

