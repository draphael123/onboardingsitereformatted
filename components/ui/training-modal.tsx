"use client"

import { useState } from "react"
import { X, CheckSquare, Square, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrainingDay {
  day: string
  title: string
  focus: string
  tasks: string[]
  outcome?: string
  shadowing?: string
  support?: string
  notes?: boolean
}

interface TrainingWeek {
  week: string
  title: string
  days: TrainingDay[]
  endOfWeekStatus?: string[]
}

interface TrainingModalProps {
  isOpen: boolean
  onClose: () => void
  role: string
  training: TrainingWeek[]
}

export function TrainingModal({ isOpen, onClose, role, training }: TrainingModalProps) {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(["Day 1"]))
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  if (!isOpen) return null

  const toggleDay = (day: string) => {
    setExpandedDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) {
        next.delete(day)
      } else {
        next.add(day)
      }
      return next
    })
  }

  const toggleCheck = (itemId: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-rose-500 to-rose-600 text-white p-6 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold">{role} Training Schedule</h2>
          <p className="text-white/80 mt-1">Complete 2-week onboarding program</p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-8">
          {training.map((week) => (
            <div key={week.week} className="space-y-4">
              {/* Week Header */}
              <div className="border-b pb-3">
                <h3 className="text-xl font-bold text-primary">{week.week}</h3>
                <p className="text-muted-foreground">{week.title}</p>
              </div>

              {/* Days */}
              <div className="space-y-3">
                {week.days.map((day) => {
                  const isExpanded = expandedDays.has(day.day)
                  return (
                    <div 
                      key={day.day}
                      className="border rounded-lg overflow-hidden"
                    >
                      {/* Day Header */}
                      <button
                        onClick={() => toggleDay(day.day)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <span className="font-semibold">{day.day}: {day.title}</span>
                            <p className="text-sm text-muted-foreground">Focus: {day.focus}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {day.tasks.length} tasks
                        </span>
                      </button>

                      {/* Day Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0 border-t bg-muted/20">
                          <div className="space-y-2 mt-4">
                            {day.tasks.map((task, idx) => {
                              const itemId = `${day.day}-${idx}`
                              const isChecked = checkedItems.has(itemId)
                              const isSubItem = task.startsWith("  ") || task.startsWith("•")
                              
                              return (
                                <button
                                  key={idx}
                                  onClick={() => toggleCheck(itemId)}
                                  className={cn(
                                    "w-full flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors text-left",
                                    isSubItem && "ml-6",
                                    isChecked && "opacity-60"
                                  )}
                                >
                                  {isChecked ? (
                                    <CheckSquare className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Square className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className={cn(
                                    "text-sm",
                                    isChecked && "line-through"
                                  )}>
                                    {task.replace(/^[•\s]+/, "")}
                                  </span>
                                </button>
                              )
                            })}
                          </div>

                          {/* Additional info */}
                          {day.shadowing && (
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Shadowing:</strong> {day.shadowing}
                              </p>
                            </div>
                          )}
                          {day.support && (
                            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                              <p className="text-sm text-purple-700 dark:text-purple-300">
                                <strong>Support:</strong> {day.support}
                              </p>
                            </div>
                          )}
                          {day.outcome && (
                            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                              <p className="text-sm text-green-700 dark:text-green-300">
                                <strong>Outcome:</strong> {day.outcome}
                              </p>
                            </div>
                          )}
                          {day.notes && (
                            <div className="mt-4">
                              <textarea
                                placeholder="Add notes here..."
                                className="w-full p-3 text-sm border rounded-lg bg-background resize-none h-20"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* End of Week Status */}
              {week.endOfWeekStatus && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                  <h4 className="font-semibold mb-3">End of {week.week} Status:</h4>
                  <div className="space-y-2">
                    {week.endOfWeekStatus.map((status, idx) => {
                      const itemId = `${week.week}-status-${idx}`
                      const isChecked = checkedItems.has(itemId)
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleCheck(itemId)}
                          className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors text-left"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-5 w-5 text-green-500" />
                          ) : (
                            <Square className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className={cn("text-sm", isChecked && "line-through")}>
                            {status}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// RN Training Data
export const rnTrainingData: TrainingWeek[] = [
  {
    week: "WEEK 1",
    title: "Foundations & Supervised Practice",
    days: [
      {
        day: "Day 1",
        title: "Orientation & Access",
        focus: "Company, role, and system access",
        tasks: [
          "Overview of Fountain Vitality and care model",
          "RN role expectations and scope of practice",
          "HIPAA and compliance overview",
          "Systems access review:",
          "  EHR",
          "  Scheduling platform",
          "  Telehealth / video visit platform",
          "  Internal communication tools",
          "  Documentation systems (Notion / Drive)",
        ],
        notes: true,
      },
      {
        day: "Day 2",
        title: "Systems Training",
        focus: "Navigation & documentation standards",
        tasks: [
          "EHR navigation basics",
          "Where to document RN notes vs internal comments",
          "Documentation timing and naming conventions",
          "Objective charting standards",
          "Review examples of compliant vs non-compliant notes",
        ],
        outcome: "RN can navigate systems independently",
      },
      {
        day: "Day 3",
        title: "Patient Communication Standards",
        focus: "Messaging, tone, and boundaries",
        tasks: [
          "Approved communication channels",
          "Professional and empathetic language expectations",
          "Common patient questions and appropriate RN responses",
          "RN scope limitations",
          "Escalation criteria for provider involvement",
        ],
        shadowing: "Observe patient communications",
      },
      {
        day: "Day 4",
        title: "Clinical Workflows",
        focus: "Daily RN responsibilities",
        tasks: [
          "Reviewing assigned patient tasks",
          "Patient follow-ups",
          "Lab coordination workflows (if applicable)",
          "Prescription support processes (non-prescribing role)",
          "Required documentation after each action",
        ],
        shadowing: "Complete workflows with oversight",
      },
      {
        day: "Day 5",
        title: "Compliance & Escalation",
        focus: "Safety, compliance, and escalation judgment",
        tasks: [
          "HIPAA deep dive",
          "State-specific RN limitations",
          "Escalation triggers:",
          "  Medical concerns",
          "  Adverse reactions",
          "  Urgent patient complaints",
          "  Documentation or system errors",
          "Review escalation pathways",
        ],
      },
    ],
    endOfWeekStatus: [
      "Ready for limited independent work",
      "Additional support needed (notes below)",
    ],
  },
  {
    week: "WEEK 2",
    title: "Applied Practice & Independence",
    days: [
      {
        day: "Day 6-7",
        title: "Supervised Independence",
        focus: "Real workflows with review",
        tasks: [
          "Independently manage assigned RN tasks",
          "Documentation reviewed daily",
          "Appropriate escalation without prompting",
          "Patient communication quality assessed",
        ],
        notes: true,
      },
      {
        day: "Day 8",
        title: "Quality & Performance Standards",
        focus: "Expectations and accountability",
        tasks: [
          "Response time standards",
          "Documentation accuracy requirements",
          "Common RN workflow errors",
          "Collaboration expectations with providers and ops",
          "Performance monitoring overview",
        ],
      },
      {
        day: "Day 9",
        title: "Advanced Scenarios",
        focus: "Confidence and edge cases",
        tasks: [
          "Handling frustrated or anxious patients",
          "Identifying clinical red flags",
          "Complex escalation scenarios",
          "Task prioritization",
          "Time management best practices",
        ],
        support: "Trainer available as backup only",
      },
      {
        day: "Day 10",
        title: "Final Review",
        focus: "Readiness for independent RN work",
        tasks: [
          "Systems proficiency confirmed",
          "Documentation quality review",
          "Escalation judgment confirmed",
          "Compliance standards met",
        ],
        outcome: "Approved for independent RN duties OR Extended training required",
      },
    ],
    endOfWeekStatus: [
      "Approved for independent RN duties",
      "Extended training required (notes below)",
    ],
  },
]

