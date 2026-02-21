# River City Plumbing Web App

Production-ready full-stack Next.js app for quote + booking automation with PostgreSQL, Prisma, SMTP email notifications, Twilio SMS, Turnstile anti-spam, and admin CMS tooling.

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Prisma + PostgreSQL
- Zod server validation
- Nodemailer (SMTP)
- Twilio SMS (optional when env vars present)
- Cloudflare Turnstile verification (server-side)
- Playwright end-to-end tests

## Features
- Public marketing pages: Home, Services, Service Areas (dynamic), About, Reviews, Contact, Book Online, Blog.
- Quote + booking forms with:
  - Zod validation
  - Turnstile token verification
  - rate limiting by IP (in-memory fallback for dev)
  - lead persistence in `Lead` table
  - owner email + owner SMS + customer confirmation SMS
- Phone normalization to E.164 via `libphonenumber-js`.
  - If invalid, lead is still saved and emailed; customer SMS is skipped.
- Demo mode (`DEMO_MODE=true`) to safely log notifications and bypass captcha (with `CAPTCHA_BYPASS_IN_DEV=true`).
- Admin dashboard at `/admin` with secure cookie login:
  - Lead list/detail workflow (new/contacted/booked/closed)
  - notes
  - CSV export
  - CRUD APIs for services, service areas, reviews, FAQs, and posts.

## Local Setup
1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Prisma setup:
   ```bash
   npm run db:generate
   npm run db:migrate -- --name init
   npm run db:seed
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

## Run quality checks
```bash
npm run lint
npm run typecheck
npm test
```

## Twilio + SMTP + Turnstile configuration
Set env vars in `.env`:
- `SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, OWNER_EMAIL`
- `TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, OWNER_SMS`
- `TURNSTILE_SITEKEY, TURNSTILE_SECRET`
- `DEFAULT_TO_COUNTRY` (e.g. US)

## Deployment
### Vercel (recommended)
1. Push repo to GitHub.
2. Import project into Vercel.
3. Add all env vars from `.env.example`.
4. Configure Vercel Postgres or external Postgres.
5. Run migrations in CI/deploy hook:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```
6. Set domain and DNS records in Vercel.

### Netlify (alternative)
1. Connect Git repo in Netlify.
2. Build command: `npm run build`; publish `.next` (with Next runtime plugin).
3. Add all env vars.
4. Run `prisma migrate deploy` during build.
5. Connect domain in Netlify DNS panel.

## Postgres hosting suggestions
- Neon
- Supabase (Postgres)
- Railway Postgres
- Render Postgres

## Domain connection steps
1. Buy/choose domain registrar.
2. Point DNS (A/CNAME) to deployment provider.
3. Verify TLS certificate issued.
4. Update `NEXT_PUBLIC_SITE_URL` (if added later) and metadata URLs.

## Security notes
- Never commit `.env`.
- Rotate SMTP/Twilio secrets.
- Replace demo admin credentials in production.
- Use a durable distributed rate limiter in production (Redis/Upstash).
