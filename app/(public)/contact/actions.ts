"use server"

import { z } from "zod"
import { sendContactEmail, sendContactConfirmationEmail } from "@/lib/email"
import { trackEvent } from "@/lib/analytics"

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  department: z.string().optional(),
})

// Determine which email to send to based on subject or department
function getRecipientEmail(subject: string, department?: string): string {
  const subjectLower = subject.toLowerCase()
  const departmentLower = department?.toLowerCase() || ""

  // Check for HR-related keywords
  if (
    subjectLower.includes("hr") ||
    subjectLower.includes("human resources") ||
    subjectLower.includes("benefits") ||
    subjectLower.includes("payroll") ||
    departmentLower.includes("hr")
  ) {
    return process.env.CONTACT_HR_EMAIL || "hr@fountainvitality.com"
  }

  // Check for IT-related keywords
  if (
    subjectLower.includes("technical") ||
    subjectLower.includes("it") ||
    subjectLower.includes("password") ||
    subjectLower.includes("login") ||
    subjectLower.includes("system") ||
    departmentLower.includes("it")
  ) {
    return process.env.CONTACT_IT_EMAIL || "it@fountainvitality.com"
  }

  // Check for training-related keywords
  if (
    subjectLower.includes("training") ||
    subjectLower.includes("onboarding") ||
    subjectLower.includes("learning") ||
    departmentLower.includes("training")
  ) {
    return process.env.CONTACT_TRAINING_EMAIL || "training@fountainvitality.com"
  }

  // Default to general inquiries
  return process.env.CONTACT_EMAIL || "info@fountainvitality.com"
}

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      department: formData.get("department") as string | null,
    }

    // Validate
    const validated = contactFormSchema.parse(data)

    // Determine recipient
    const recipientEmail = getRecipientEmail(validated.subject, validated.department || undefined)

    const fullName = `${validated.firstName} ${validated.lastName}`

    // Send email to recipient
    const result = await sendContactEmail({
      to: recipientEmail,
      subject: validated.subject,
      message: validated.message,
      fromName: fullName,
      fromEmail: validated.email,
    })

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to send message. Please try again later.",
      }
    }

    // Send confirmation email to user
    await sendContactConfirmationEmail({
      to: validated.email,
      name: validated.firstName,
      subject: validated.subject,
    }).catch((error) => {
      // Don't fail the whole request if confirmation email fails
      console.error("Failed to send confirmation email:", error)
    })

    // Track analytics
    await trackEvent("contact_form_submit", undefined, {
      subject: validated.subject,
      department: validated.department || "general",
    })

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Please check your form and try again.",
      }
    }

    console.error("Contact form error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}

