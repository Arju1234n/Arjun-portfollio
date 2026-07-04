# Backend API Server

Express.js REST API server for ArjunOS Portfolio with MongoDB integration.

## Features

- RESTful API endpoints
- JWT authentication
- MongoDB database
- Cloudinary image uploads
- Rate limiting
- Input validation
- Error handling
- API documentation (Swagger)

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Environment variables** (`.env`)
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. **Seed database**
```bash
npm run seed
```

4. **Start server**
```bash
npm run dev
```

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | Get all published projects |
| GET | `/api/v1/projects/featured` | Get featured projects |
| GET | `/api/v1/hero` | Get hero section data |
| GET | `/api/v1/about` | Get about section |
| GET | `/api/v1/experience` | Get experience list |
| GET | `/api/v1/skills` | Get skills list |
| GET | `/api/v1/education` | Get education list |
| GET | `/api/v1/certifications` | Get certifications |
| GET | `/api/v1/stats` | Get stats |
| POST | `/api/v1/contact` | Submit contact form |
| POST | `/api/v1/analytics/pageview` | Track page view |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Admin login |
| POST | `/api/v1/auth/refresh` | Refresh access token |

### Protected Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/projects` | Create project |
| GET | `/api/v1/projects/:id` | Get project by ID |
| PATCH | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |
| POST | `/api/v1/projects/reorder` | Reorder projects |
| POST | `/api/v1/media/upload` | Upload images |

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with sample data
npm run lint         # Run ESLint
```

## Database Schema

### Project Model
```typescript
{
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  category: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  coverImage?: string
  gallery?: string[]
  githubUrl?: string
  liveUrl?: string
  docsUrl?: string
  techStack: string[]
  displayOrder: number
  viewCount: number
  publishedAt?: Date
}
```

## Authentication

The API uses JWT tokens with refresh token rotation:

1. Login with credentials → Receive access + refresh tokens
2. Use access token for API requests (Bearer token)
3. When access expires → Use refresh token to get new access token
4. Refresh tokens stored in HTTP-only cookies

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "stack": "Stack trace (dev only)"
}
```

## Rate Limiting

- General API: 100 requests/15 minutes
- Contact form: 5 requests/15 minutes

## Development

```bash
npm run dev    # Watch mode with auto-restart
```

Server runs on http://localhost:4000
API docs: http://localhost:4000/api/docs
