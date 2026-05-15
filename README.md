# Yanvex

Yanvex is a premium MERN AI agency platform with a cinematic React frontend, a secure Express API, and an authenticated admin dashboard for CMS and analytics workflows.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB
- Admin: protected routes, CRUD, analytics, CMS
- Ops: Docker, PM2, GitHub Actions, Vercel, Render/Railway-ready

## Local Development

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm run dev
```

## Production Readiness

- Security middleware: Helmet, CORS allowlist, rate limiting, HPP, Mongo sanitization
- Auth hardening: access token + refresh token cookies, secure logout, session refresh endpoint
- Monitoring: health probes, structured server logging, error boundary reporting hooks
- Delivery: Dockerfiles, `docker-compose.yml`, PM2 ecosystem config, Nginx configs
- CI/CD: GitHub Actions for frontend deploy, backend deploy, tests, and security auditing

## Testing

Frontend tests:

```bash
npm run test
```

Backend smoke tests:

```bash
cd server
npm test
```

E2E skeleton:

```bash
npm run test:e2e
```

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md)
- [ENVIRONMENT.md](ENVIRONMENT.md)
- [SECURITY.md](SECURITY.md)
- [TESTING.md](TESTING.md)
- [API.md](API.md)

## Deployment Targets

- Frontend: Vercel or Docker + Nginx
- Backend: Render, Railway, or Docker + PM2
- Database: MongoDB Atlas
- Media: Cloudinary

## Notes

- Production secrets should live in your hosting provider secret manager, not in repo files.
- Rotate any exposed credentials before deployment.
- The analytics chart bundle is still the largest client chunk and is a good next candidate for further split optimization.
