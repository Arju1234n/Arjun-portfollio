# Admin Panel

Lightweight admin dashboard for managing portfolio projects.

## Features

- Secure authentication
- Project CRUD operations
- Drag-and-drop reordering
- Search and filter
- Status management (draft/published/archived)
- Featured toggle
- Real-time updates
- Responsive design

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Environment variables** (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

3. **Start development server**
```bash
npm run dev
```

Open http://localhost:5173

## Default Credentials

After seeding the backend database:

```
Email: admin@arjunos.dev
Password: Admin@123456
```

**⚠️ Change these credentials in production!**

## Features

### Dashboard
- Total projects count
- Published/draft/featured statistics
- Recent projects list
- Quick actions

### Projects Management
- View all projects in sortable list
- Create new project with form
- Edit existing projects
- Delete projects (with confirmation)
- Drag-and-drop to reorder
- Search by title/description
- Filter by status (all/published/draft/archived)
- Toggle featured status
- Set GitHub/live URLs
- Manage tech stack tags

### Profile
- Update admin name
- Change email
- Change password

## Project Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Title | Text | Yes | Project title |
| Short Description | Textarea | Yes | Brief description (160 chars) |
| Full Description | Textarea | No | Detailed description |
| Category | Text | No | Project category |
| Status | Select | Yes | draft / published / archived |
| Featured | Checkbox | No | Show in featured section |
| GitHub URL | URL | No | Repository link |
| Live URL | URL | No | Demo link |
| Docs URL | URL | No | Documentation link |
| Tech Stack | Tags | No | Technologies used |
| Cover Image | Upload | No | Project thumbnail |
| Gallery | Upload | No | Multiple images |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd + K` | Open command palette |
| `Cmd + N` | New project |
| `Cmd + S` | Save project |
| `Esc` | Close modal/dialog |

## State Management

- **React Query** for server state
- **Zustand** for UI state
- Automatic cache invalidation
- Optimistic updates

## API Integration

All API calls go through `src/lib/api.ts`:

```typescript
import api from '@/lib/api';

// Get projects
const { data } = await api.get('/projects');

// Create project
await api.post('/projects', projectData);

// Update project
await api.patch(`/projects/${id}`, updates);

// Delete project
await api.delete(`/projects/${id}`);
```

## Authentication Flow

1. User enters credentials
2. Backend validates and returns JWT tokens
3. Access token stored in localStorage
4. Refresh token stored in HTTP-only cookie
5. Access token sent with each request
6. Auto-refresh on 401 response
7. Redirect to login if refresh fails

## Error Handling

- Form validation errors shown inline
- API errors shown as toast notifications
- Network errors auto-retry (3 attempts)
- Graceful fallbacks for missing data

## Scripts

```bash
npm run dev      # Development server (port 5173)
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run linter
```

## Deployment

### Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Configure build settings:
   - Framework: Next.js
   - Root Directory: `admin`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
   ```
5. Deploy

## Security Notes

1. **Change default password** immediately in production
2. Use strong JWT secrets
3. Enable HTTPS in production
4. Set secure cookie flags
5. Implement rate limiting
6. Add IP whitelist if needed
7. Regular security audits

## Customization

### Branding

Update colors in `src/app/globals.css`:
```css
:root {
  --accent: your-color;
  --accent-2: your-secondary-color;
}
```

### Navigation

Edit `src/components/layout/Sidebar.tsx` to add/remove menu items.

### Dashboard Stats

Modify `src/app/(dashboard)/page.tsx` to customize dashboard cards.

## Troubleshooting

### Login fails
- Check backend is running
- Verify API URL in `.env.local`
- Check network tab for errors
- Confirm credentials are correct

### Projects not loading
- Check backend API is accessible
- Verify CORS settings
- Check browser console for errors
- Confirm MongoDB connection

### Images not uploading
- Check Cloudinary credentials in backend
- Verify file size limits
- Check network tab for upload errors
