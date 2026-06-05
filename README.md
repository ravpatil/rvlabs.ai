# RVLabs Website

A simple Next.js + Tailwind CSS starter site for RVLabs, an Enterprise AI consultancy.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## What is included

- Hero section with CTA
- Services overview
- Why RVLabs positioning
- Founder section with credibility details
- Insights section for blogs and videos
- Contact section with form and links

## Editable content

- Edit `app/data/siteContent.ts` to update services, founder details, blog posts, videos, and contact info.

## Next steps

## Email / Contact form setup

The site includes a serverless contact API that will email form submissions. Configure these environment variables in your hosting provider (Vercel, Cloudflare Pages, etc.):

- `SMTP_HOST` - your SMTP server host (e.g. smtp.sendgrid.net, smtp.gmail.com)
- `SMTP_PORT` - SMTP port (587 for TLS, 465 for SSL)
- `SMTP_USER` - SMTP username (often your email or API user)
- `SMTP_PASS` - SMTP password or API key
- `CONTACT_TO_EMAIL` - destination address for form submissions (defaults to `SMTP_USER`)

On Vercel: go to your Project → Settings → Environment Variables, add the variables above, then redeploy.

To test locally, create a `.env.local` file at the project root with the same variables and run:

```bash
npm run dev
```

Then submit the contact form on `http://localhost:3000`.

Recommended examples

- Using SendGrid SMTP (recommended for reliability):

   1. Create a SendGrid account and generate an API Key with `Mail Send` permissions.
   2. Set these env vars in Vercel (or `.env.local` for local testing):

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=YOUR_SENDGRID_API_KEY
CONTACT_TO_EMAIL=rvgpatil@gmail.com
```

- Using Gmail SMTP (quick, but requires App Passwords):

   1. Enable 2-Step Verification on your Gmail account.
   2. Create an App Password (choose "Mail" and "Other" device) and copy the generated password.
   3. Set these env vars:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
CONTACT_TO_EMAIL=rvgpatil@gmail.com
```

Testing the API (curl)

```bash
curl -X POST https://your-deployed-site.com/api/contact \
   -H 'Content-Type: application/json' \
   -d '{"name":"Test","email":"mytest@redhat.com","message":"RVLab is gonna win"}'
```

Local test (after adding `.env.local`):

```bash
npm run dev
# then submit the form at http://localhost:3000 or use the curl command to http://localhost:3000/api/contact
```

If you prefer not to use SMTP you can integrate a third-party form service (Formspree, Getform) by updating the `components/ContactForm.tsx` to POST to their endpoint.

- Add a professional photo to `app/page.tsx`
- Replace placeholder contact details with your real email, LinkedIn, and WhatsApp
- Deploy on Vercel and connect your domain (`rvlabs.ai` or similar)
