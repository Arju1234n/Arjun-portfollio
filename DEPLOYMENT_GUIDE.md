# Vercel Deployment Guide

## Overview
This project is structured as a monorepo with separate `frontend`, `backend`, and `admin` directories. The frontend is a Next.js application that can be deployed to Vercel.

## Quick Fix

I've created a [`vercel.json`](vercel.json:1) configuration file at the root that tells Vercel to:
1. Install dependencies only in the `frontend` directory
2. Build the Next.js app from the `frontend` directory
3. Output to `frontend/.next`

## Vercel Project Settings

### Method 1: Using vercel.json (Recommended)
The [`vercel.json`](vercel.json:1) file is already configured. Simply push this file to your repository and redeploy.

```bash
git add vercel.json
git commit -m "fix: Add Vercel configuration for monorepo"
git push origin main
```

Vercel will automatically detect and use these settings on the next deployment.

### Method 2: Manual Configuration in Vercel Dashboard
If you prefer to configure via the dashboard:

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Under **Build & Development Settings**, configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (this is relative to frontend)
   - **Install Command:** `npm install`

## Environment Variables

The frontend requires the following environment variables in Vercel:

### Optional (for backend integration):
- `NEXT_PUBLIC_API_URL` - Your backend API URL (if deploying separately)
  - Example: `https://your-backend-api.com`

### Optional (for contact form):
- `RESEND_API_KEY` - Resend API key for email delivery
- `CONTACT_EMAIL` - Email address to receive contact form submissions

### Optional (for future features):
- `MONGODB_URI` - MongoDB connection string (for database features)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (for images)

To add environment variables in Vercel:
1. Go to **Settings** → **Environment Variables**
2. Add each variable with its value
3. Select the environment(s): Production, Preview, Development
4. Click **Save**

## Deployment Steps

1. **Push the vercel.json file:**
   ```bash
   git add vercel.json DEPLOYMENT_GUIDE.md
   git commit -m "fix: Configure Vercel for monorepo deployment"
   git push origin main
   ```

2. **Trigger a redeploy in Vercel:**
   - Go to your Vercel dashboard
   - Click on your project
   - Go to the **Deployments** tab
   - Click the three dots on the failed deployment
   - Select **Redeploy**
   
   OR
   
   - Simply push a new commit and Vercel will auto-deploy

3. **Verify the build:**
   - Check the build logs for any errors
   - Once deployed, test the site functionality

## Troubleshooting

### Build Fails with "Command npm install exited with 1"
**Solution:** Make sure the [`vercel.json`](vercel.json:1) file is committed and pushed to your repository.

### Module Resolution Issues
**Solution:** Ensure all dependencies are listed in [`frontend/package.json`](frontend/package.json:1), not just the root `package.json`.

### Environment Variables Not Working
**Solution:** 
- Verify environment variables are set in Vercel dashboard
- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Other variables are only available server-side
- After adding variables, you must redeploy

### API Calls Failing in Production
**Solution:**
- Set `NEXT_PUBLIC_API_URL` environment variable in Vercel
- Ensure your backend is deployed and accessible
- Check CORS configuration on your backend

## Backend Deployment (Separate)

The backend API should be deployed separately to a service like:
- **Railway** (recommended for Node.js/Express)
- **Render**
- **Heroku**
- **DigitalOcean App Platform**

Once deployed, set the backend URL as `NEXT_PUBLIC_API_URL` in Vercel environment variables.

## Production Checklist

Before going live, ensure:
- [ ] [`vercel.json`](vercel.json:1) is committed and pushed
- [ ] All required environment variables are set in Vercel
- [ ] Backend API is deployed (if using dynamic features)
- [ ] Custom domain is configured (optional)
- [ ] SSL/HTTPS is enabled (automatic with Vercel)
- [ ] Analytics is set up (optional)
- [ ] Error monitoring is configured (optional, e.g., Sentry)

## Support

If you encounter issues:
1. Check the Vercel build logs for specific errors
2. Verify all configuration files match this guide
3. Review the [Vercel documentation](https://vercel.com/docs)
4. Check the [Next.js deployment docs](https://nextjs.org/docs/deployment)
