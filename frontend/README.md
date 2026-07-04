# Frontend Portfolio Website

Modern Next.js 15 portfolio website with server-side rendering and dynamic content.

## Features

- Server-side rendering (SSR)
- Responsive design
- Dark/light theme
- Command palette (Cmd+K)
- Smooth animations
- Dynamic data from backend API
- SEO optimized
- Performance optimized

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Environment variables** (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

3. **Start development server**
```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   └── data/             # Static data
├── public/               # Static assets
└── package.json
```

## Key Components

### Hero Section
Dynamic hero with rotating roles and call-to-action buttons.

### Projects Section
Fetches projects from backend API and displays featured and other projects.

### Skills Section
Categorized skills with progress bars.

### Experience Timeline
Professional experience with achievements.

### Contact Form
Functional contact form with backend integration.

## Custom Hooks

### `useProjects()`
Fetches projects from backend API.

```typescript
const { data: projects, loading, error } = useProjects();
```

### `useHero()`, `useAbout()`, etc.
Similar hooks for other sections.

## Theming

The site supports automatic theme switching based on time of day:
- Light theme: 7 AM - 7 PM
- Dark theme: 7 PM - 7 AM

Manual override via theme toggle button.

## Performance

- Lighthouse score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Image optimization with Next.js Image
- Code splitting and lazy loading

## Scripts

```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run linter
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Configure build settings:
   - Framework: Next.js
   - Root Directory: `frontend`
4. Add environment variables
5. Deploy

### Environment Variables (Production)

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Customization

### Update Content

Most static content is in `/src/data/`:
- `skills.ts` - Skills and categories
- `experience.ts` - Work experience
- `education.ts` - Education history
- `certifications.ts` - Certifications
- `socials.ts` - Social media links

Dynamic content (projects) is managed via Admin Panel.

### Styling

Tailwind CSS configuration in `tailwind.config.ts`.
Global styles in `src/app/globals.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
