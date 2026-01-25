import { Resend } from 'resend'

// Initialize Resend client
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.EMAIL_FROM || 'Fountain <onboarding@resend.dev>'
const APP_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

interface EmailResult {
  success: boolean
  error?: string
}

// ============================================
// Welcome Email
// ============================================

interface WelcomeEmailData {
  to: string
  name: string
  role: string
}

const roleNames: Record<string, string> = {
  CS: "Customer Service",
  MA_BACKOFFICE: "Back-office MA",
  RN: "RN",
  PROVIDER: "Provider",
  MA_PHARMACY: "MA - Pharmacy Team",
  OTHER: "Other",
  ADMIN: "Administrator",
}

export async function sendWelcomeEmail({ to, name, role }: WelcomeEmailData): Promise<EmailResult> {
  const roleName = roleNames[role] || role
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #14b8a6, #3b82f6); border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Welcome to Fountain! 🎉</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                      Hi <strong>${name}</strong>,
                    </p>
                    <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                      Welcome to the Fountain team! We&apos;re excited to have you join us as a <strong>${roleName}</strong>.
                    </p>
                    <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                      Your account is pending admin approval. Once approved, you'll receive another email and can access your personalized onboarding checklist.
                    </p>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${APP_URL}/login" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #14b8a6, #3b82f6); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                            Sign In to Your Account
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                      If you have any questions, contact your supervisor or HR.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">Fountain Vitality Inc.</p>
                    <p style="margin: 5px 0 0; font-size: 12px; color: #9ca3af;">2064 Park St, Jacksonville, FL 32204</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to,
    subject: 'Welcome to Fountain! 🎉',
    html,
  })
}

// ============================================
// Account Approved Email
// ============================================

export async function sendAccountApprovedEmail({ to, name }: { to: string; name: string }): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #22c55e, #14b8a6); border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Account Approved! ✅</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">Hi <strong>${name}</strong>,</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                      Great news! Your Fountain account has been approved. You now have full access to your personalized onboarding portal.
                    </p>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${APP_URL}/app" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #22c55e, #14b8a6); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">
                            Go to Your Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">Fountain Vitality Inc.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to,
    subject: 'Your Fountain Account Has Been Approved! ✅',
    html,
  })
}

// ============================================
// Password Reset Email
// ============================================

export async function sendPasswordResetEmail({ to, name, token }: { to: string; name: string; token: string }): Promise<EmailResult> {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Reset Your Password 🔐</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">Hi <strong>${name}</strong>,</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                      We received a request to reset your password. Click the button below to create a new password.
                    </p>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                      This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
                    </p>
                    <p style="margin: 10px 0 0; font-size: 12px; color: #9ca3af; word-break: break-all;">
                      Link: ${resetUrl}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">Fountain Vitality Inc.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to,
    subject: 'Reset Your Password - Fountain',
    html,
  })
}

// ============================================
// Email Verification
// ============================================

export async function sendEmailVerification({ to, name, token }: { to: string; name: string; token: string }): Promise<EmailResult> {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #14b8a6, #3b82f6); border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Verify Your Email ✉️</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">Hi <strong>${name}</strong>,</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                      Please verify your email address to complete your Fountain account setup.
                    </p>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #14b8a6, #3b82f6); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                      This link expires in 24 hours.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">Fountain Vitality Inc.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to,
    subject: 'Verify Your Email - Fountain',
    html,
  })
}

// ============================================
// Contact Form Email
// ============================================

interface ContactEmailData {
  to: string
  subject: string
  message: string
  fromName: string
  fromEmail: string
}

export async function sendContactEmail(data: ContactEmailData): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: #374151; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">New Contact Form Submission</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;"><strong>From:</strong> ${data.fromName}</p>
                    <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;"><strong>Email:</strong> ${data.fromEmail}</p>
                    <p style="margin: 0 0 20px; font-size: 14px; color: #6b7280;"><strong>Subject:</strong> ${data.subject}</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    <p style="margin: 0; font-size: 16px; color: #374151; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to: data.to,
    subject: `Contact Form: ${data.subject}`,
    html,
    replyTo: data.fromEmail,
  })
}

// ============================================
// Contact Form Confirmation Email
// ============================================

export async function sendContactConfirmationEmail({ to, name, subject }: { to: string; name: string; subject: string }): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #14b8a6, #3b82f6); border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Message Received! ✉️</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">Hi <strong>${name}</strong>,</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                      Thank you for contacting Fountain Vitality. We&apos;ve received your message regarding:
                    </p>
                    <div style="background-color: #f9fafb; border-left: 4px solid #14b8a6; padding: 16px; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #374151;">${subject}</p>
                    </div>
                    <p style="margin: 20px 0; font-size: 16px; color: #374151;">
                      Our team will review your message and get back to you within 24 hours. If your inquiry is urgent, please call our support line.
                    </p>
                    <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                      Best regards,<br>
                      The Fountain Vitality Team
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">Fountain Vitality Inc.</p>
                    <p style="margin: 5px 0 0; font-size: 12px; color: #9ca3af;">2064 Park St, Jacksonville, FL 32204</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to,
    subject: 'We received your message - Fountain Vitality',
    html,
  })
}

// ============================================
// Newsletter Confirmation Email
// ============================================

export async function sendNewsletterConfirmation(email: string): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #14b8a6, #3b82f6); border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">You're Subscribed! 📬</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                      Thank you for subscribing to Fountain Vitality updates!
                    </p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                      You'll now receive the latest updates on training materials, company news, and important announcements.
                    </p>
                    <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                      If you didn't subscribe, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">Fountain Vitality Inc.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to Fountain Updates! 📬',
    html,
  })
}

// ============================================
// Core Email Sending Function
// ============================================

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  // Development mode - log to console
  if (!resend) {
    console.log('📧 Email would be sent:')
    console.log('  To:', options.to)
    console.log('  Subject:', options.subject)
    console.log('  (Set RESEND_API_KEY to send real emails)')
    console.log('---')
    return { success: true }
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
