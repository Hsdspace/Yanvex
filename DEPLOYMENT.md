# Deployment Guide

## Architecture

- Frontend: Vite app deployed to Vercel or Docker + Nginx
- Backend: Express API deployed to Render, Railway, or Docker + PM2
- Database: MongoDB Atlas
- Media: Cloudinary

## Frontend on Vercel

1. Import the repository into Vercel.
2. Keep the project root at the repository root.
3. Set environment variables:
   - `VITE_API_URL`
   - `VITE_SITE_URL`
   - `VITE_GA_ID` optional
   - `VITE_FB_PIXEL_ID` optional
   - `VITE_HOTJAR_ID` optional
   - `VITE_HOTJAR_VERSION` optional
4. Build command: `npm run build`
5. Output directory: `dist`
6. Security headers are applied through `vercel.json`.

## Backend on Render or Railway

Required environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `JWT_REFRESH_SECRET`
- `JWT_REFRESH_EXPIRE`
- `COOKIE_EXPIRE`
- `COOKIE_SECURE=true`
- `COOKIE_SAME_SITE=none`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL`
- `FRONTEND_URLS`
- `NODE_ENV=production`
- `PORT=5000`
- `LOG_LEVEL=info`

## Docker Deployment

Frontend:

```bash
docker build -t yanvex-web .
docker run -p 3000:80 yanvex-web
```

Backend:

```bash
docker build -t yanvex-api ./server
docker run --env-file server/.env -p 5000:5000 yanvex-api
```

Compose:

```bash
docker compose up --build
```

## PM2 and Nginx

- PM2 runtime config: `server/ecosystem.config.cjs`
- Frontend Nginx config: `infra/nginx/frontend.conf`
- Backend reverse proxy config: `infra/nginx/backend.conf`

## Production Checklist

- Run `npm run build`
- Run `cd server && npm test`
- Verify `/health`, `/health/live`, and `/health/ready`
- Verify `/robots.txt` and `/sitemap.xml`
- Verify canonical URLs and Open Graph previews
- Rotate all exposed credentials before launch
- Enable HTTPS and secure cookies in production
