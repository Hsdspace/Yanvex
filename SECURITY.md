# Security Guide

## Runtime Hardening

- Helmet with CSP, HSTS, frame blocking, and referrer policy is enabled in `server/app.js`.
- CORS is allowlisted through `FRONTEND_URL` and `FRONTEND_URLS`.
- API-wide rate limiting and tighter auth route throttling are enabled.
- MongoDB operator injection is blocked with `express-mongo-sanitize`.
- HTTP parameter pollution is blocked with `hpp`.
- Payload size is capped through `REQUEST_SIZE_LIMIT`.
- Auth cookies are `httpOnly` and production-secure.

## Secret Management

- Keep all production secrets in Vercel / Render / Railway environment stores.
- Rotate `JWT_SECRET`, `JWT_REFRESH_SECRET`, MongoDB credentials, and Cloudinary keys before launch.
- Never commit real `.env` files. Only commit `.env.example`.

## Authentication Notes

- Access tokens and refresh tokens are issued at login.
- Refresh sessions are supported through `POST /api/auth/refresh`.
- Logout clears the token cookies and invalidates the saved refresh token hash.

## Recommended Next Steps

- Add a dedicated password reset email flow before public launch.
- Add email verification before enabling self-service sign-up.
- Wire Sentry DSNs for frontend and backend error reporting in production.
- Add WAF rules at the CDN or hosting layer for abusive traffic patterns.
