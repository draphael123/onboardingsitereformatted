# Fountain Vitality Onboarding Portal

A production-quality web application for employee onboarding at Fountain Vitality. Features a public marketing site and secure role-based onboarding checklists.

## Features

### Public Site (No Login Required)
- **Home**: Welcome page with feature highlights
- **About Us**: Company mission, values, and statistics
- **FAQs**: Frequently asked questions with accordion interface
- **Resources**: Important documents organized by category
- **Contact**: Contact information and inquiry form

### Secure App (Login Required)
- **Dashboard**: Progress overview, upcoming tasks, recent activity
- **Checklist**: Interactive onboarding checklist with filters and search
- Role-specific templates: CS, NP, RN, MA
- Progress tracking with completion percentages
- Mark items as Not Started → In Progress → Complete

### Admin Dashboard
- **User Management**: Create, edit, delete users; reset passwords
- **Template Management**: Edit role templates, add/remove sections and items
- **Content Management**: Manage public documents and FAQs
- **Sync Feature**: Push template updates to existing users

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Auth.js) v5
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- npm or pnpm

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fountain-vitality-onboarding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `env.example` to `.env` (or `.env.local`):
   ```bash
   cp env.example .env
   ```

   Update the following variables:
   ```env
   # Database connection string
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fountain_vitality?schema=public"

   # NextAuth secret - generate with: openssl rand -base64 32
   AUTH_SECRET="your-secret-here"

   # Your app URL
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Run migrations (creates tables)
   npm run db:push

   # Seed the database with initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000)

### Default Admin Credentials

After seeding, use these credentials to log in:

- **Email**: `admin@fountainvitality.com`
- **Password**: `ChangeMe123!`

⚠️ **Important**: Change the admin password after first login!

## Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes (development)
npm run db:push

# Create a migration (for production)
npm run db:migrate

# Deploy migrations (production)
npm run db:migrate:prod

# Seed the database
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Vercel Deployment

### 1. Create Vercel Project

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will detect Next.js automatically

### 2. Set Up Database

**Option A: Vercel Postgres**
1. In your Vercel project, go to Storage → Create Database → Postgres
2. Connect it to your project
3. The `DATABASE_URL` will be automatically added

**Option B: External Database (Neon, Supabase, etc.)**
1. Create a PostgreSQL database on your provider
2. Get the connection string
3. Add `DATABASE_URL` to your Vercel environment variables

### 3. Configure Environment Variables

In Vercel project settings, add:

```
DATABASE_URL=your-database-connection-string
AUTH_SECRET=generate-a-secure-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 4. Deploy

```bash
# Deploy via Vercel CLI
npx vercel

# Or push to your connected Git repository
git push origin main
```

### 5. Run Migrations

After first deployment, run migrations:

```bash
npx vercel env pull .env.local
npm run db:migrate:prod
npm run db:seed
```

Or use Vercel's build command customization.

## Project Structure

```
├── app/
│   ├── (admin)/          # Admin routes (layout + pages)
│   │   └── admin/
│   │       ├── users/    # User management
│   │       ├── templates/# Template management
│   │       └── content/  # Content management
│   ├── (app)/            # Authenticated app routes
│   │   └── app/
│   │       └── checklist/
│   ├── (auth)/           # Auth routes (login)
│   ├── (public)/         # Public marketing pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── docs/
│   │   └── faqs/
│   ├── api/              # API routes (auth)
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── admin/            # Admin-specific components
│   ├── app/              # App-specific components
│   ├── public/           # Public site components
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── checklist.ts      # Checklist utilities
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── types/
│   └── next-auth.d.ts    # NextAuth type extensions
└── middleware.ts         # Route protection
```

## Managing Users and Templates

### Creating New Users

1. Log in as admin
2. Go to Admin → Users
3. Click "Add User"
4. Fill in name, email, temporary password, and role
5. The user's checklist is created automatically on first login

### Editing Templates

1. Log in as admin
2. Go to Admin → Templates
3. Select the role tab (CS, NP, RN, MA)
4. Add/edit sections and items
5. Use "Sync to Users" to push new items to existing users

### Managing Content

1. Log in as admin
2. Go to Admin → Content
3. Switch between Documents and FAQs tabs
4. Add, edit, or delete items as needed

## Security Notes

- All passwords are hashed with bcrypt (12 rounds)
- Route protection via Next.js middleware
- Server actions verify authentication and authorization
- User data is isolated (users can only see their own checklist)
- Admin routes require ADMIN role

## Customization

### Branding
- Update colors in `tailwind.config.ts` (fountain and ocean palettes)
- Update fonts in `app/layout.tsx` (Outfit + Playfair Display)
- Update logo and company name in header/footer components

### Templates
- Edit seed script to customize default onboarding items
- Or use the admin interface after seeding

### Adding New Roles
1. Add role to `Role` enum in `prisma/schema.prisma`
2. Run `npm run db:push`
3. Add template in admin or seed script

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check that PostgreSQL is running
- Ensure network access (especially for cloud databases)

### Auth Issues
- Verify `AUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try again

### Build Errors
- Run `npm run db:generate` to regenerate Prisma client
- Check for TypeScript errors with `npm run lint`

## License

Private - Fountain Vitality

---

Built with ❤️ for Fountain Vitality


