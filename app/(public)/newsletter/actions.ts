"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { sendNewsletterConfirmation } from "@/lib/email"

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function subscribeToNewsletter(email: string) {
  try {
    const parsed = newsletterSchema.safeParse({ email })
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message }
    }

    // In a real implementation, you'd store this in a newsletter_subscribers table
    // For now, we'll just send a confirmation email
    // You could also integrate with services like Mailchimp, ConvertKit, etc.

    try {
      await sendNewsletterConfirmation(email)
    } catch (emailError) {
      // Email sending is optional, don't fail the whole operation
      console.error("Failed to send newsletter confirmation:", emailError)
    }

    return { success: true, message: "Successfully subscribed to newsletter!" }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, error: "Failed to subscribe. Please try again later." }
  }
}


