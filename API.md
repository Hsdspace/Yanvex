# API Overview

## Health

- `GET /health`
- `GET /health/live`
- `GET /health/ready`

## Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

## Content

- `GET /api/blogs`
- `GET /api/projects`
- `GET /api/services`
- `GET /api/testimonials`
- `POST /api/contact`

Admin CRUD routes remain protected behind bearer token or auth cookie middleware.
