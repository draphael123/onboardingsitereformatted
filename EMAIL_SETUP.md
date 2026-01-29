# Email Configuration Guide

## Overview

The Fountain Vitality Onboarding Portal sends several types of emails:
1. **Email Verification** - Sent when users sign up
2. **Welcome Email** - Sent after successful signup
3. **Account Approval** - Sent when admin approves a user
4. **Password Reset** - Sent when users request password reset
5. **Contact Form** - Sent when users submit the contact form

## Database Schema ✅

The `EmailVerificationToken` model is properly defined in the Prisma schema:
- Located at: `prisma/schema.prisma` (lines 106-117)
- Table name: `email_verification_tokens`
- Includes: token, userId, expires, used, createdAt

## Email Service: Resend

The application uses [Resend](https://resend.com) for sending emails.

### Setup Steps

#### 1. Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

#### 2. Get Your API Key
1. Navigate to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Fountain Onboarding")
4. Copy the API key (starts with `re_`)

#### 3. Verify Your Domain (Recommended)
For production use, you should verify your domain:
1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Follow the DNS configuration instructions
4. Once verified, you can use emails like `noreply@yourdomain.com`

#### 4. Configure Environment Variables

**For Local Development:**
Add to your `.env` file:
```env
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="Fountain <onboarding@yourdomain.com>"
# Or use Resend's test domain:
EMAIL_FROM="Fountain <onboarding@resend.dev>"
NEXTAUTH_URL="http://localhost:3000"
```

**For Vercel Production:**
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following:
   - `RESEND_API_KEY` = `re_your_api_key_here`
   - `EMAIL_FROM` = `Fountain <onboarding@yourdomain.com>`
   - `NEXTAUTH_URL` = `https://your-domain.vercel.app`

### Email Behavior

#### Development Mode (No API Key)
- If `RESEND_API_KEY` is not set, emails are logged to the console
- No actual emails are sent
- Useful for local development and testing

#### Production Mode (With API Key)
- Emails are sent via Resend
- All email types are functional
- Check Resend dashboard for delivery status

## Email Types and Triggers

### 1. Email Verification Email
- **Triggered:** When user signs up
- **Subject:** "Verify Your Email - Fountain"
- **Contains:** Verification link (expires in 24 hours)
- **Route:** `/verify-email?token=...`

### 2. Welcome Email
- **Triggered:** When user signs up
- **Subject:** "Welcome to Fountain! 🎉"
- **Contains:** Welcome message and sign-in link
- **Note:** Sent even if email verification fails

### 3. Account Approval Email
- **Triggered:** When admin approves a user account
- **Subject:** "Your Fountain Account Has Been Approved! ✅"
- **Contains:** Link to dashboard

### 4. Password Reset Email
- **Triggered:** When user requests password reset
- **Subject:** "Reset Your Password - Fountain"
- **Contains:** Password reset link (expires in 1 hour)

### 5. Contact Form Emails
- **Triggered:** When user submits contact form
- **Two emails sent:**
  1. To recipient (HR/IT/Training based on subject)
  2. Confirmation to user

## Testing Email Configuration

### Test in Development
1. Start your dev server: `npm run dev`
2. Sign up a new user
3. Check the console for email logs
4. Verify the email content is correct

### Test in Production
1. Ensure `RESEND_API_KEY` is set in Vercel
2. Sign up a new user
3. Check your email inbox
4. Check Resend dashboard for delivery status

## Troubleshooting

### Emails Not Sending

1. **Check API Key:**
   ```bash
   # Verify the key is set
   echo $RESEND_API_KEY
   ```

2. **Check Resend Dashboard:**
   - Go to [Resend Dashboard](https://resend.com/emails)
   - Check for errors or delivery issues

3. **Check Environment Variables:**
   - Ensure `RESEND_API_KEY` is set correctly
   - Ensure `EMAIL_FROM` is in correct format: `Name <email@domain.com>`
   - Ensure `NEXTAUTH_URL` matches your deployment URL

4. **Check Domain Verification:**
   - If using custom domain, ensure it's verified in Resend
   - Unverified domains may have sending limits

5. **Check Console Logs:**
   - Look for email-related errors in server logs
   - Check Vercel function logs for errors

### Email Verification Not Working

1. **Check Database:**
   ```bash
   # Verify the table exists
   npm run db:studio
   # Check email_verification_tokens table
   ```

2. **Check Token Expiration:**
   - Tokens expire after 24 hours
   - Users can request a new verification email from settings

3. **Check Email Link:**
   - Ensure `NEXTAUTH_URL` is correct
   - Link format: `${NEXTAUTH_URL}/verify-email?token=...`

## Resend Limits

### Free Tier
- 3,000 emails/month
- 100 emails/day
- Perfect for development and small teams

### Paid Plans
- Higher limits available
- Better deliverability
- Priority support

## Security Notes

1. **Never commit API keys to Git**
   - Keep them in `.env` (local) or Vercel environment variables (production)
   - `.env` is already in `.gitignore`

2. **Use Environment-Specific Keys**
   - Use different keys for development and production
   - Rotate keys if compromised

3. **Domain Verification**
   - Always verify your domain for production
   - Improves deliverability and security

## Next Steps

1. ✅ Database schema is configured correctly
2. ⚠️ Set up Resend account and get API key
3. ⚠️ Add `RESEND_API_KEY` to environment variables
4. ⚠️ Configure `EMAIL_FROM` with your domain
5. ⚠️ Test email sending in development
6. ⚠️ Deploy to production with proper environment variables

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Check application logs for detailed error messages




