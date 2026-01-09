import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserChecklist, calculateProgress } from "@/lib/checklist"
import { ChecklistView } from "./checklist-view"

export default async function ChecklistPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const checklist = await getUserChecklist(session.user.id, session.user.role)
  const progress = calculateProgress(checklist)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">My Onboarding Checklist</h1>
        <p className="text-muted-foreground mt-1">
          Complete each task to finish your onboarding journey.
        </p>
      </div>

      <ChecklistView 
        checklist={checklist} 
        progress={progress}
        userRole={session.user.role}
      />
    </div>
  )
}

