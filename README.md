# Nexaro Tech — Marketing Site

Company website for Nexaro Tech ("Automate the busywork. Scale what matters.") built with Next.js App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** with CSS-variable theming (light/dark via `prefers-color-scheme`)
- **Supabase** (optional) for storing contact-form inquiries
- Zero UI libraries — all components are local under `src/components`

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint (next/core-web-vitals)
```

## Environment Variables

Create `.env.local` (all optional — the site is fully functional without any of them):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used by metadata, `robots.txt`, and `sitemap.xml` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** key for inserting inquiries (never expose to the browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional anon key for future browser features (RLS-gated) |
| `ADMIN_PASS` | Password for the `/admin/inquiries` dashboard |
| `ADMIN_SESSION_SECRET` | Optional HMAC secret for admin session cookies (defaults to a value derived from `ADMIN_PASS`) |

Without the Supabase vars, contact submissions are validated, rate-limited, and logged — but not persisted. Without `ADMIN_PASS`, the admin dashboard stays locked.

## Supabase Setup (optional)

1. Run `supabase/schema.sql` in your Supabase SQL editor (creates the `inquiries` table).
2. Fill in the three Supabase env vars above.
3. Contact submissions now persist via `src/lib/supabase.ts` (clean CRUD boundary: `createInquiry`, `listInquiries`, `updateInquiryStatus`).

## Central Configuration

- **`src/config/business.ts`** — single source of truth for business details (name, email, phone, WhatsApp, address, hours, socials). Replace the `YOUR_*` placeholders once available; every page, link, and button updates automatically.
- **`src/config/content.ts`** — structured content (services, projects, testimonials, FAQs, pricing tiers, nav links) typed to mirror future Supabase tables.

## Project Structure

```
src/
├── app/                  # Routes: /, /about, /services, /portfolio,
│   │                     # /portfolio/[slug], /blog, /blog/[slug], /team,
│   │                     # /testimonials, /faq, /contact, /privacy, /terms,
│   │                     # /admin/login, /admin/inquiries
│   ├── api/contact/      # POST endpoint: validation, honeypot, rate limit, persistence
│   ├── api/admin/        # Login/logout + inquiry read/update endpoints
│   ├── robots.ts         # robots.txt generator
│   ├── sitemap.ts        # sitemap.xml generator
│   └── globals.css       # Theme variables + shared utility classes
├── components/
│   ├── ui/               # Primitives: Button, Section, PageHeader, Reveal, ThemeToggle, …
│   ├── home/             # Homepage-only sections
│   ├── admin/            # Admin login form + inquiry dashboard
│   └── …                 # Navbar, Footer, Hero, Pricing, LiveChatWidget, …
├── config/               # business.ts + content.ts (see above)
└── lib/                  # validation.ts, admin-auth.ts, format.ts + supabase.ts
```

## Notable Implementation Details

- **Contact form**: client + server validation (`src/lib/validation.ts`), honeypot field, in-memory per-IP rate limiting (5 requests / 5 min), and graceful no-op when the database isn't configured.
- **Reveal animations**: lightweight `IntersectionObserver` wrapper that respects `prefers-reduced-motion`.
- **SEO**: per-page metadata with canonical URLs, Open Graph/Twitter cards, generated `sitemap.xml` and `robots.txt`.
- **Accessibility**: visible focus rings, skip-target semantics, aria labels on icon-only controls.
