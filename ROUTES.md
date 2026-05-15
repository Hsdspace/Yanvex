# Yanvex Project Routes and File Structure

This document provides a comprehensive overview of all files in the Yanvex project, organized by functionality and purpose. Yanvex is a premium MERN AI agency platform with a cinematic React frontend, secure Express API, and authenticated admin dashboard.

## Project Overview

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **Admin**: Protected routes, CRUD operations, analytics, CMS
- **Infrastructure**: Docker, PM2, Nginx, CI/CD

## Root Level Files

### Configuration and Build Files
- `package.json` - Frontend dependencies and scripts (React, Vite, testing)
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration
- `vitest.config.js` - Vitest testing configuration
- `playwright.config.js` - Playwright end-to-end testing configuration

### Documentation Files
- `README.md` - Project overview and setup instructions
- `ARCHITECTURE.md` - System architecture documentation
- `API.md` - API documentation
- `API_INTEGRATION_GUIDE.md` - API integration guide
- `DEPLOYMENT.md` - Deployment instructions
- `ENVIRONMENT.md` - Environment setup guide
- `SECURITY.md` - Security documentation
- `SETUP.md` - Setup instructions
- `TESTING.md` - Testing documentation
- `BACKUP.md` - Backup procedures
- `QUICK_REFERENCE.md` - Quick reference guide
- `PROJECT_COMPLETE.md` - Project completion status
- `PHASE_3_SUMMARY.md` - Phase 3 summary

### Infrastructure Files
- `docker-compose.yml` - Docker Compose configuration
- `Dockerfile` - Frontend Docker configuration
- `vercel.json` - Vercel deployment configuration
- `render.yaml` - Render deployment configuration

### Static Assets
- `index.html` - Main HTML entry point
- `public/robots.txt` - Robots.txt for SEO
- `public/site.webmanifest` - Web app manifest
- `public/sitemap.xml` - XML sitemap

## Backend (server/)

### Main Application Files
- `server/server.js` - Main server entry point, connects to DB and starts Express app
- `server/app.js` - Express application setup with middleware, routes, and error handling

### Configuration
- `server/config/config.js` - Application configuration (environment variables, settings)
- `server/config/database.js` - MongoDB connection setup
- `server/config/cloudinary.js` - Cloudinary configuration for image uploads

### Models (Data Schemas)
- `server/models/User.js` - User model (authentication, roles)
- `server/models/Blog.js` - Blog post model
- `server/models/Project.js` - Project showcase model
- `server/models/Service.js` - Service offering model
- `server/models/Testimonial.js` - Client testimonial model
- `server/models/Contact.js` - Contact form submission model

### Controllers (Business Logic)
- `server/controllers/authController.js` - Authentication logic (register, login, logout, token refresh)
- `server/controllers/blogController.js` - Blog CRUD operations
- `server/controllers/projectController.js` - Project CRUD operations
- `server/controllers/serviceController.js` - Service CRUD operations
- `server/controllers/testimonialController.js` - Testimonial CRUD operations
- `server/controllers/contactController.js` - Contact form handling
- `server/controllers/userController.js` - User management operations

### Routes (API Endpoints)
- `server/routes/auth.js` - Authentication routes (/api/auth/*)
  - POST /register - User registration
  - POST /login - User login
  - POST /refresh - Token refresh
  - POST /logout - User logout
  - GET /me - Get current user info
- `server/routes/blogs.js` - Blog management routes (/api/blogs/*)
- `server/routes/projects.js` - Project management routes (/api/projects/*)
- `server/routes/services.js` - Service management routes (/api/services/*)
- `server/routes/testimonials.js` - Testimonial management routes (/api/testimonials/*)
- `server/routes/contacts.js` - Contact form routes (/api/contact/*)
- `server/routes/users.js` - User management routes (/api/users/*)

### Middleware
- `server/middleware/auth.js` - Authentication middleware (protect routes)
- `server/middleware/authMiddleware.js` - Additional authentication utilities
- `server/middleware/errorMiddleware.js` - Global error handling
- `server/middleware/uploadMiddleware.js` - File upload handling (Multer)
- `server/middleware/validationMiddleware.js` - Request validation (express-validator)

### Utilities
- `server/utils/APIError.js` - Custom error class
- `server/utils/asyncHandler.js` - Async error wrapper
- `server/utils/generateToken.js` - JWT token generation and management
- `server/utils/logger.js` - Winston logging configuration

### Scripts
- `server/scripts/create-admin.js` - Script to create admin user

### Tests
- `server/tests/health.test.js` - Health check tests

### Infrastructure
- `server/Dockerfile` - Backend Docker configuration
- `server/ecosystem.config.cjs` - PM2 process manager configuration
- `server/package.json` - Backend dependencies and scripts

### Logs and Uploads
- `server/logs/` - Application logs directory
- `server/uploads/` - File upload storage directory

## Frontend (src/)

### Main Application Files
- `src/main.jsx` - React application entry point with routing setup
- `src/App.jsx` - Main App component with route definitions
- `src/index.css` - Global CSS styles

### Pages
- `src/pages/HomePage.jsx` - Landing page with all sections
- `src/pages/NotFoundPage.jsx` - 404 error page

### Components

#### Layout Components
- `src/components/layout/Navbar.jsx` - Navigation bar
- `src/components/layout/Footer.jsx` - Footer component

#### Section Components (Home Page)
- `src/components/sections/Hero.jsx` - Hero section
- `src/components/sections/TrustedCompanies.jsx` - Trusted companies showcase
- `src/components/sections/About.jsx` - About section
- `src/components/sections/Services.jsx` - Services section
- `src/components/sections/Process.jsx` - Process/workflow section
- `src/components/sections/Portfolio.jsx` - Portfolio showcase
- `src/components/sections/Testimonials.jsx` - Client testimonials
- `src/components/sections/CTA.jsx` - Call-to-action section

#### UI Components
- `src/components/ui/` - Reusable UI components

#### System Components
- `src/components/system/` - System-level components (loaders, transitions, etc.)

#### SEO Components
- `src/components/seo/` - SEO and meta tag management

### Animations
- `src/animations/index.js` - Animation utilities and configurations

### Constants
- `src/constants/index.js` - Application constants

### Hooks
- `src/hooks/index.js` - Custom React hooks

### Libraries/Utilities
- `src/lib/seo.js` - SEO utility functions

### Utils
- `src/utils/analytics.js` - Analytics tracking
- `src/utils/errorTracking.js` - Error tracking and reporting
- `src/utils/index.js` - General utilities

## Admin Dashboard (src/admin/)

### Context and State
- `src/admin/context/AuthContext.jsx` - Authentication context for admin

### Layouts
- `src/admin/layouts/AdminLayout.jsx` - Main admin layout with navigation

### Pages
- `src/admin/pages/Login/LoginPage.jsx` - Admin login page
- `src/admin/pages/Dashboard/Overview.jsx` - Dashboard overview with metrics and charts
- `src/admin/pages/Services/ServicesPage.jsx` - Services management (CRUD)
- `src/admin/pages/Projects/ProjectsPage.jsx` - Projects management (CRUD)
- `src/admin/pages/Blogs/BlogsPage.jsx` - Blog management (CRUD)
- `src/admin/pages/Testimonials/TestimonialsPage.jsx` - Testimonials management (CRUD)
- `src/admin/pages/Contacts/ContactsPage.jsx` - Contact submissions management
- `src/admin/pages/Users/UsersPage.jsx` - User management (CRUD)
- `src/admin/pages/Settings/SettingsPage.jsx` - Application settings
- `src/admin/pages/Profile/ProfilePage.jsx` - Admin profile management
- `src/admin/pages/Analytics/AnalyticsPage.jsx` - Analytics and reporting

### Routes
- `src/admin/routes/AdminRoutes.jsx` - Admin routing configuration
- `src/admin/routes/ProtectedRoute.jsx` - Route protection component

### Components

#### UI Components
- `src/admin/components/ui/` - Admin-specific UI components (Button, Card, etc.)

#### Forms
- `src/admin/components/forms/` - Form components for CRUD operations

#### Tables
- `src/admin/components/tables/` - Data table components

#### Charts
- `src/admin/components/charts/` - Chart components for analytics

#### Modals
- `src/admin/components/modals/` - Modal dialog components

#### Layout Components
- `src/admin/components/layout/` - Admin layout components

### Services
- `src/admin/services/` - API service functions for admin operations

### Utils
- `src/admin/utils/` - Admin-specific utilities

## Testing

### Frontend Tests
- `src/test/NotFoundPage.test.jsx` - NotFoundPage component tests
- `src/test/ProtectedRoute.test.jsx` - ProtectedRoute component tests
- `src/test/setup.js` - Test setup configuration

### End-to-End Tests
- `tests/e2e/admin-login.spec.js` - Admin login E2E tests

## Infrastructure (infra/)

### Nginx Configuration
- `infra/nginx/backend.conf` - Nginx configuration for backend API
- `infra/nginx/frontend.conf` - Nginx configuration for frontend

## API Routes Summary

### Authentication Routes (/api/auth)
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/refresh - Refresh access token
- POST /api/auth/logout - User logout
- GET /api/auth/me - Get current user profile

### Blog Routes (/api/blogs)
- GET /api/blogs - Get all blogs
- POST /api/blogs - Create new blog (admin)
- GET /api/blogs/:id - Get single blog
- PUT /api/blogs/:id - Update blog (admin)
- DELETE /api/blogs/:id - Delete blog (admin)

### Project Routes (/api/projects)
- GET /api/projects - Get all projects
- POST /api/projects - Create new project (admin)
- GET /api/projects/:id - Get single project
- PUT /api/projects/:id - Update project (admin)
- DELETE /api/projects/:id - Delete project (admin)

### Service Routes (/api/services)
- GET /api/services - Get all services
- POST /api/services - Create new service (admin)
- GET /api/services/:id - Get single service
- PUT /api/services/:id - Update service (admin)
- DELETE /api/services/:id - Delete service (admin)

### Testimonial Routes (/api/testimonials)
- GET /api/testimonials - Get all testimonials
- POST /api/testimonials - Create new testimonial (admin)
- GET /api/testimonials/:id - Get single testimonial
- PUT /api/testimonials/:id - Update testimonial (admin)
- DELETE /api/testimonials/:id - Delete testimonial (admin)

### Contact Routes (/api/contact)
- GET /api/contact - Get all contact submissions (admin)
- POST /api/contact - Submit contact form
- DELETE /api/contact/:id - Delete contact submission (admin)

### User Routes (/api/users)
- GET /api/users - Get all users (admin)
- GET /api/users/:id - Get single user (admin)
- PUT /api/users/:id - Update user (admin)
- DELETE /api/users/:id - Delete user (admin)

### Health Check Routes
- GET /health - General health check
- GET /health/live - Liveness probe
- GET /health/ready - Readiness probe

## Frontend Routes Summary

### Public Routes
- `/` - Home page
- `*` - 404 Not Found page

### Admin Routes (/admin)
- `/admin/login` - Admin login
- `/admin/` - Dashboard overview
- `/admin/services` - Services management
- `/admin/projects` - Projects management
- `/admin/blogs` - Blog management
- `/admin/testimonials` - Testimonials management
- `/admin/contacts` - Contact submissions
- `/admin/users` - User management
- `/admin/settings` - Application settings
- `/admin/profile` - Admin profile
- `/admin/analytics` - Analytics dashboard

## Database Models

### User
- name: String (required, max 50 chars)
- email: String (required, unique, validated)
- password: String (required, min 8 chars, hashed)
- role: String (enum: user/admin, default: user)
- Additional fields for profile management

### Blog
- title: String
- content: String
- author: ObjectId (ref: User)
- tags: [String]
- published: Boolean
- publishDate: Date
- Additional SEO and metadata fields

### Project
- title: String
- description: String
- technologies: [String]
- images: [String] (Cloudinary URLs)
- liveUrl: String
- githubUrl: String
- featured: Boolean
- Additional metadata fields

### Service
- title: String
- description: String
- icon: String
- features: [String]
- pricing: Object
- Additional metadata fields

### Testimonial
- name: String
- company: String
- message: String
- rating: Number
- image: String (Cloudinary URL)
- featured: Boolean

### Contact
- name: String
- email: String
- message: String
- submittedAt: Date
- status: String (enum: new/readed/responded)

This comprehensive structure supports a full-featured AI agency platform with public marketing pages, secure admin CMS, and robust API backend.</content>
<parameter name="filePath">c:\Users\HARI SHARAN DUBEY\Desktop\yanvex\ROUTES.md