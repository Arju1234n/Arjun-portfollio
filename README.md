# 🚀 ArjunOS Portfolio

A modern, full-stack portfolio website with backend API and admin panel for dynamic content management.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)

## 📋 Overview

A production-ready portfolio system consisting of three main applications:

- **Frontend**: Next.js 15 portfolio website with SSR
- **Backend**: Express.js REST API with MongoDB
- **Admin**: Lightweight CMS for project management

## ✨ Features

### Frontend
- 🎨 Modern, responsive design with Tailwind CSS v4
- ⚡ Server-side rendering for optimal performance
- 🌙 Dark/light theme with automatic switching
- 📱 Fully responsive across all devices
- 🎭 Smooth animations and transitions
- ⌨️ Command palette (Cmd+K) for quick navigation
- 📊 Real-time data from backend API

### Backend
- 🔐 JWT authentication with refresh tokens
- 📦 RESTful API with Express.js
- 🗄️ MongoDB Atlas integration
- 🖼️ Cloudinary image upload support
- 🛡️ Rate limiting and security middleware
- 📝 Comprehensive API documentation
- ✅ Input validation and error handling

### Admin Panel
- 👨‍💼 Secure admin authentication
- ✏️ Full CRUD operations for projects
- 🎯 Drag-and-drop project reordering
- 🔍 Search and filter functionality
- 🏷️ Status management (draft/published/archived)
- ⭐ Featured project toggle
- 📊 Project statistics dashboard

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS v4 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT |
| **Admin** | Next.js 15, React Query, Axios, Zustand |
| **Deployment** | Vercel (Frontend/Admin), Railway (Backend) |

## 📂 Project Structure

```
personal-website/
├── frontend/          # Next.js portfolio website (Port 3000)
├── backend/           # Express API server (Port 4000)
├── admin/             # Admin panel (Port 5173)
├── .github/           # GitHub workflows
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- MongoDB Atlas account
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Arju1234n/Arjun-portfollio.git
cd Arjun-portfollio
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Or install for each app
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

3. **Set up environment variables**

**Backend** (`backend/.env`):
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Admin** (`admin/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

4. **Seed the database (optional)**
```bash
cd backend
npm run seed
```

5. **Start all services**
```bash
# From root directory
npm run dev:all

# Or start individually
cd backend && npm run dev       # Port 4000
cd frontend && npm run dev      # Port 3000
cd admin && npm run dev         # Port 5173
```

## 🌐 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Public portfolio website |
| Backend | http://localhost:4000 | REST API server |
| Admin | http://localhost:5173 | Admin dashboard |
| API Docs | http://localhost:4000/api/docs | Swagger documentation |

## 🔐 Admin Access

**Default credentials** (after seeding):
```
Email: admin@arjunos.dev
Password: Admin@123456
```

## 📚 Documentation

Detailed documentation for each component:

- [Backend API Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Admin Panel Documentation](./admin/README.md)

## 🔄 Data Flow

```
Admin Panel (Create/Edit Project)
        ↓
Backend API (Save to MongoDB)
        ↓
MongoDB Atlas (Store Data)
        ↓
Backend API (Serve Data)
        ↓
Frontend (Display Projects)
```

## 📦 Available Scripts

### Root Level

```bash
npm run dev:all          # Start all services
npm run build:all        # Build all services
npm run lint:all         # Lint all services
```

### Individual Services

```bash
# Backend
cd backend
npm run dev             # Start dev server
npm run build           # Build for production
npm run seed            # Seed database

# Frontend
cd frontend
npm run dev             # Start dev server
npm run build           # Build for production
npm run lint            # Run linter

# Admin
cd admin
npm run dev             # Start dev server
npm run build           # Build for production
```

## 🚢 Deployment

### Backend (Railway/Render)

1. Create new project
2. Connect GitHub repository
3. Set environment variables
4. Deploy from `backend` directory

### Frontend & Admin (Vercel)

1. Import GitHub repository
2. Configure build settings:
   - Frontend: Root directory `frontend`
   - Admin: Root directory `admin`
3. Set environment variables
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Arjun Kumar**
- GitHub: [@Arju1234n](https://github.com/Arju1234n)
- Email: kumararjun5230@gmail.com
- Portfolio: [arjunkumar.dev](https://arjunkumar.dev)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- MongoDB for database solution
- All open-source contributors

---

⭐ **Star this repo** if you find it helpful!
