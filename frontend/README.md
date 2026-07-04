# Arjun Kumar — Personal Portfolio

> Premium developer portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.  
> Inspired by the aesthetics of Linear, Vercel, Stripe, and Raycast.

---

## ✨ Features

- **Split-screen Hero** — animated terminal widget, crossfading role titles, stat cards
- **About / Bento Grid** — education timeline folded into an interactive bento layout
- **Experience & Projects** — card-based sections with tech chips and live/GitHub links
- **Skills** — visual skill grid with proficiency indicators
- **Certifications & Resume** — dedicated sections with inline PDF download
- **Contact Form** — server-side API route via Resend for email delivery
- **Command Palette** — `⌘K` quick-nav (keyboard-first UX)
- **Dark / Light Mode** — auto time-based switching (7 am–7 pm = light) with manual override
- **Spotlight Hover Effect** — Raycast-inspired radial glow on interactive cards
- **Cursor Trail** — subtle ambient cursor effect
- **Section Dots** — sticky scroll-position indicator
- **Scroll Progress Bar** — page reading indicator
- **SEO-ready** — full OpenGraph, Twitter card, sitemap, robots.txt, security headers

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v4 (via `@import "tailwindcss"`) |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Email | Resend |
| Linting | ESLint + typescript-eslint |
| Formatting | Prettier + prettier-plugin-tailwindcss |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Contact form API (POST)
│   ├── globals.css            # Design system tokens + utilities
│   ├── layout.tsx             # Root layout, metadata, fonts
│   ├── not-found.tsx          # 404 page
│   └── page.tsx               # Home page entry
├── components/
│   ├── ui/                    # Reusable primitives (MagneticButton, TiltCard, …)
│   ├── Header.tsx             # Sticky nav + theme toggle
│   ├── Hero.tsx               # Split-screen hero
│   ├── HeroTerminal.tsx       # Animated terminal widget
│   ├── About.tsx              # Bento-grid about section
│   ├── Experience.tsx         # Work / internship timeline
│   ├── Projects.tsx           # Project showcase cards
│   ├── Skills.tsx             # Skills grid
│   ├── Stats.tsx              # Animated counters
│   ├── Certifications.tsx     # Certification cards
│   ├── Resume.tsx             # Resume download section
│   ├── Contact.tsx            # Contact form
│   ├── Footer.tsx             # Footer
│   ├── CommandPalette.tsx     # ⌘K command palette
│   ├── ThemeProvider.tsx      # Light/dark context + auto time logic
│   ├── ThemeScroll.tsx        # Scroll-based theme hints
│   ├── ScrollProgress.tsx     # Top progress bar
│   ├── CursorTrail.tsx        # Ambient cursor effect
│   ├── SectionDots.tsx        # Side scroll-position dots
│   ├── Reveal.tsx             # Intersection-observer reveal wrapper
│   └── Toast.tsx              # Toast notification system
├── data/                      # Static content (projects, skills, experience, …)
├── hooks/
│   └── useReducedMotion.ts    # Respects prefers-reduced-motion
└── lib/
    ├── db.ts                  # MongoDB connection stub (inactive)
    └── models/schema.ts       # Mongoose schemas stub (inactive)

public/
├── arjun.jpg                  # Profile photo (OG image)
├── arjun-kumar.vcf            # vCard for contact download
├── robots.txt
└── sitemap.xml
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/Arju1234n/personal-website.git
cd personal-website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and fill in your values (see below)

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```env
# Required for contact form email delivery (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Email address that receives contact form submissions
CONTACT_EMAIL=your@email.com
```

> The contact form degrades gracefully — if `RESEND_API_KEY` is missing, submissions are logged server-side only.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run format` | Prettier format all `src/**` files |
| `npm run format:check` | Prettier format check |

---

## 🎨 Design System

All design tokens live in [`src/app/globals.css`](src/app/globals.css) as CSS custom properties:

```css
--accent         /* Primary brand colour (indigo) */
--accent-2       /* Secondary accent (cyan) */
--bg             /* Page background */
--surface        /* Card surface */
--text-1/2/3     /* Text hierarchy */
--border / --border-2
--shadow-sm / --shadow / --shadow-lg
--r-xs ... --r-pill  /* Border-radius scale */
```

Custom utility classes defined in `@layer utilities`:
- `.btn-primary` / `.btn-ghost` — buttons
- `.surface` / `.surface-sm` / `.glass` — card surfaces
- `.text-gradient` — accent gradient text
- `.hover-lift` — smooth card lift on hover
- `.animate-fade-up`, `.animate-float`, etc. — animation helpers
- `.tech-chip`, `.badge`, `.mono-label` — typography utilities

---

## 🔒 Security Headers

Applied to all routes via `next.config.ts`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security` (HSTS)
- `X-XSS-Protection: 1; mode=block`

---

## 📬 Contact

| | |
|---|---|
| Email | kumararjun5230@gmail.com |
| GitHub | [@Arju1234n](https://github.com/Arju1234n) |
| LinkedIn | [arjun-kumar-gond](https://linkedin.com/in/arjun-kumar-gond) |
| Location | Arrah, Bihar, India |

---

## 📄 License

This project is open source under the [MIT License](LICENSE).
