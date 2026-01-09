// Email utility for sending notifications
// In production, integrate with a service like Resend, SendGrid, or AWS SES

interface WelcomeEmailData {
  to: string
  name: string
  role: string
}

interface ContactEmailData {
  to: string
  subject: string
  message: string
  fromName: string
  fromEmail: string
}

const roleNames: Record<string, string> = {
  CS: "Customer Service",
  NP: "Nurse Practitioner",
  RN: "Registered Nurse",
  MA: "Medical Assistant",
  ADMIN: "Administrator",
}

export async function sendWelcomeEmail({ to, name, role }: WelcomeEmailData) {
  const roleName = roleNames[role] || role
  
  const emailContent = {
    to,
    subject: "Welcome to Fountain! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Fountain</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #14b8a6, #3b82f6); border-radius: 12px 12px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Welcome to Fountain! 🎉</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                        Hi <strong>${name}</strong>,
                      </p>
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                        Welcome to the Fountain team! We're excited to have you join us as a <strong>${roleName}</strong>.
                      </p>
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #374151;">
                        Your account has been created successfully. You can now sign in to access your personalized onboarding checklist and get started with your training.
                      </p>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${process.env.NEXTAUTH_URL || 'https://your-domain.vercel.app'}/login" 
                               style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #14b8a6, #3b82f6); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                              Sign In to Your Account
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 20px 0 0; font-size: 16px; line-height: 24px; color: #374151;">
                        <strong>What's next?</strong>
                      </p>
                      <ul style="margin: 10px 0 20px; padding-left: 20px; font-size: 16px; line-height: 28px; color: #374151;">
                        <li>Complete your onboarding checklist</li>
                        <li>Review important company documents</li>
                        <li>Set up your tools and access</li>
                        <li>Connect with your team</li>
                      </ul>
                      
                      <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151;">
                        If you have any questions, don't hesitate to reach out to our team.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                      <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                        Fountain Vitality Inc.
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        2064 Park St, Jacksonville, FL 32204
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
Welcome to Fountain! 🎉

Hi ${name},

Welcome to the Fountain team! We're excited to have you join us as a ${roleName}.

Your account has been created successfully. You can now sign in to access your personalized onboarding checklist and get started with your training.

Sign in at: ${process.env.NEXTAUTH_URL || 'https://your-domain.vercel.app'}/login

What's next?
- Complete your onboarding checklist
- Review important company documents
- Set up your tools and access
- Connect with your team

If you have any questions, don't hesitate to reach out to our team.

Best regards,
Fountain Vitality Inc.
2064 Park St, Jacksonville, FL 32204
    `,
  }

  // Log email for development (replace with actual email service in production)
  console.log("📧 Welcome Email would be sent:")
  console.log("To:", to)
  console.log("Subject:", emailContent.subject)
  console.log("---")
  
  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  // Example with Resend:
  // 
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // 
  // await resend.emails.send({
  //   from: 'Fountain <onboarding@fountain.net>',
  //   to: emailContent.to,
  //   subject: emailContent.subject,
  //   html: emailContent.html,
  //   text: emailContent.text,
  // })

  return { success: true }
}

export async function sendContactEmail(data: ContactEmailData) {
  console.log("📧 Contact Email would be sent:")
  console.log("To:", data.to)
  console.log("From:", data.fromName, `<${data.fromEmail}>`)
  console.log("Subject:", data.subject)
  console.log("Message:", data.message)
  console.log("---")

  // TODO: Integrate with email service
  
  return { success: true }
}

