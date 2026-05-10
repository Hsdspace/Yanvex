# Deployment Guide

## Frontend

Deploy the Vite app to Vercel.

1. Import the repository into Vercel.
2. Set the project root to the repo root.
3. Add frontend environment variables:
   - `VITE_API_URL`
   - `VITE_SITE_URL`
   - `VITE_GA_ID` (optional)
   - `VITE_FB_PIXEL_ID` (optional)
   - `VITE_HOTJAR_ID` (optional)
   - `VITE_HOTJAR_VERSION` (optional)
4. Build command: `npm run build`
5. Output directory: `dist`

## Backend

Deploy the Express API to Render or Railway.

Required environment variables:
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `COOKIE_EXPIRE`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL`
- `NODE_ENV=production`
- `PORT=5000`

## Platform Notes

- MongoDB: use MongoDB Atlas
- Media: use Cloudinary
- Frontend domain should be added to backend CORS config
- Ensure HTTPS is enabled in production for secure cookies

## Production Checklist

- Run `npm run build`
- Run backend start in production mode
- Verify `/robots.txt` and `/sitemap.xml`
- Verify canonical URLs and Open Graph previews
- Verify Lighthouse scores for Home and Admin Login
