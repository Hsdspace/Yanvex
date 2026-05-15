# Yanvex Project Routes And File Map

This file maps the current project structure and explains what each file is responsible for. It excludes generated or dependency folders like `node_modules`, `dist`, `server/logs`, and `server/uploads`.

## Frontend Route Overview

- `/` -> `src/pages/HomePage.jsx`: Public landing page built from hero, services, portfolio, testimonials, and CTA sections.
- `/admin/login` -> `src/admin/pages/Login/LoginPage.jsx`: Admin authentication screen.
- `/admin` -> `src/admin/pages/Dashboard/Overview.jsx`: Protected admin dashboard overview page.
- `/admin/services` -> `src/admin/pages/Services/ServicesPage.jsx`: Protected service management page.
- `/admin/projects` -> `src/admin/pages/Projects/ProjectsPage.jsx`: Protected project management page.
- `/admin/blogs` -> `src/admin/pages/Blogs/BlogsPage.jsx`: Protected blog management page.
- `/admin/testimonials` -> `src/admin/pages/Testimonials/TestimonialsPage.jsx`: Protected testimonial management page.
- `/admin/contacts` -> `src/admin/pages/Contacts/ContactsPage.jsx`: Protected contact inbox and status management page.
- `/admin/users` -> `src/admin/pages/Users/UsersPage.jsx`: Protected user administration page.
- `/admin/settings` -> `src/admin/pages/Settings/SettingsPage.jsx`: Protected system and dashboard settings page.
- `/admin/profile` -> `src/admin/pages/Profile/ProfilePage.jsx`: Protected current-user profile page.
- `/admin/analytics` -> `src/admin/pages/Analytics/AnalyticsPage.jsx`: Protected analytics and reporting page.
- `*` -> `src/pages/NotFoundPage.jsx`: Frontend 404 page for unknown routes.

## Backend API Route Overview

- `GET /health` -> `server/app.js`: Returns general service health metadata.
- `GET /health/live` -> `server/app.js`: Liveness probe endpoint.
- `GET /health/ready` -> `server/app.js`: Readiness probe that reflects MongoDB connection state.
- `/api/auth/*` -> `server/routes/auth.js`: Registration, login, session refresh, logout, and current-user identity endpoints.
- `/api/blogs/*` -> `server/routes/blogs.js`: Protected CRUD endpoints for blog records.
- `/api/projects/*` -> `server/routes/projects.js`: Protected CRUD endpoints for project records.
- `/api/services/*` -> `server/routes/services.js`: Protected CRUD endpoints for service records.
- `/api/testimonials/*` -> `server/routes/testimonials.js`: Protected CRUD endpoints for testimonial records.
- `/api/contact/*` -> `server/routes/contacts.js`: Public contact submission plus protected contact management endpoints.
- `/api/users/*` -> `server/routes/users.js`: Protected admin user management plus profile and password update endpoints.

## Root Files

- `.dockerignore`: Prevents unnecessary files from being copied into Docker build contexts.
- `.env.example`: Example frontend environment variable template.
- `.eslintrc.json`: Legacy ESLint configuration kept alongside the newer flat config.
- `.gitignore`: Git ignore rules for dependencies, builds, env files, and local artifacts.
- `ADMIN_DASHBOARD.md`: Documentation focused on admin dashboard capabilities and usage.
- `API.md`: Compact API reference for the project.
- `API_INTEGRATION_GUIDE.md`: Guidance for integrating the frontend/admin with backend APIs.
- `ARCHITECTURE.md`: High-level system architecture explanation.
- `BACKUP.md`: Notes or procedures related to backups and recovery.
- `DEPLOYMENT.md`: Deployment guide for hosting and production rollout.
- `Dockerfile`: Root Docker image definition, likely for the frontend or combined delivery path.
- `ENVIRONMENT.md`: Environment variable and runtime configuration documentation.
- `PHASE_3_SUMMARY.md`: Summary of a project delivery or milestone phase.
- `PROJECT_COMPLETE.md`: Completion summary of the project build-out.
- `PROJECT_ROUTES.md`: This file; maps project routes, paths, and file responsibilities.
- `QUICK_REFERENCE.md`: Short operational reference for common project tasks.
- `README.md`: Main project introduction, stack, scripts, and deployment overview.
- `SECURITY.md`: Security-related implementation and operational notes.
- `SETUP.md`: Local setup instructions for development environments.
- `TESTING.md`: Test strategy and command reference.
- `docker-compose.yml`: Multi-container local or deployment orchestration configuration.
- `eslint.config.js`: Active flat ESLint configuration for the frontend workspace.
- `index.html`: Vite HTML entry document used to mount the React app.
- `package-lock.json`: Locked dependency tree for the frontend workspace.
- `package.json`: Frontend package manifest with scripts and dependencies.
- `playwright.config.js`: Playwright configuration for end-to-end browser tests.
- `postcss.config.js`: PostCSS configuration used by Tailwind CSS.
- `render.yaml`: Render deployment configuration, likely for the backend service.
- `tailwind.config.js`: Tailwind theme, content scanning, and design token configuration.
- `vercel.json`: Vercel deployment and rewrite configuration, likely for SPA routing and API proxy behavior.
- `vite.config.js`: Vite build and dev server configuration.
- `vitest.config.js`: Vitest configuration for frontend unit tests.

## GitHub Workflows

- `.github/workflows/backend-deploy.yml`: CI/CD workflow for backend deployment.
- `.github/workflows/frontend-deploy.yml`: CI/CD workflow for frontend deployment.
- `.github/workflows/security-audit.yml`: Automated dependency or security auditing workflow.
- `.github/workflows/test-automation.yml`: Automated test execution workflow.

## Infrastructure

- `infra/nginx/backend.conf`: Nginx config for reverse proxying or serving the backend.
- `infra/nginx/frontend.conf`: Nginx config for serving the frontend SPA.

## Public Assets

- `public/favicon.svg`: Browser favicon asset.
- `public/logo-mark.svg`: Brand mark asset used across the site.
- `public/og-cover.svg`: Open Graph preview image asset.
- `public/robots.txt`: Search engine crawl rules.
- `public/site.webmanifest`: PWA/browser metadata manifest.
- `public/sitemap.xml`: Search engine sitemap for public URLs.

## Frontend App Core

- `src/App.jsx`: Main client router that wires public routes, admin routes, analytics tracking, and global overlays.
- `src/index.css`: Global styles, Tailwind layers, and site-wide design rules.
- `src/main.jsx`: React application bootstrap that mounts the app into the DOM.

## Frontend Pages

- `src/pages/HomePage.jsx`: Public homepage composition using lazy-loaded marketing sections.
- `src/pages/NotFoundPage.jsx`: Public 404 page with recovery links back to the site.

## Frontend Admin Routing And Auth

- `src/admin/routes/AdminRoutes.jsx`: Defines all `/admin` routes and wraps them with auth context and protected layout logic.
- `src/admin/routes/ProtectedRoute.jsx`: Guards admin pages and redirects anonymous users to the login screen.
- `src/admin/context/AuthContext.jsx`: Stores admin authentication state, current user, and auth actions for the dashboard.
- `src/admin/services/api.js`: Shared admin API client for calling backend endpoints.
- `src/admin/services/authService.js`: Authentication-specific API helpers for login, logout, refresh, and session state.

## Frontend Admin Layout

- `src/admin/layouts/AdminLayout.jsx`: Shared shell for protected admin pages, usually sidebar plus topbar plus outlet.
- `src/admin/components/layout/Sidebar.jsx`: Admin navigation sidebar for dashboard sections.
- `src/admin/components/layout/Topbar.jsx`: Admin header area for navigation context and quick actions.

## Frontend Admin Pages

- `src/admin/pages/Analytics/AnalyticsPage.jsx`: Admin analytics dashboard page.
- `src/admin/pages/Blogs/BlogsPage.jsx`: Admin CRUD interface for blog entries.
- `src/admin/pages/Contacts/ContactsPage.jsx`: Admin inbox for contact submissions and follow-up state.
- `src/admin/pages/Dashboard/Overview.jsx`: Main admin overview with summary metrics or quick insights.
- `src/admin/pages/Login/LoginPage.jsx`: Admin sign-in interface.
- `src/admin/pages/Profile/ProfilePage.jsx`: Admin page for editing the current user's profile.
- `src/admin/pages/Projects/ProjectsPage.jsx`: Admin CRUD interface for portfolio projects.
- `src/admin/pages/Services/ServicesPage.jsx`: Admin CRUD interface for service offerings.
- `src/admin/pages/Settings/SettingsPage.jsx`: Admin settings management screen.
- `src/admin/pages/Testimonials/TestimonialsPage.jsx`: Admin CRUD interface for testimonials.
- `src/admin/pages/Users/UsersPage.jsx`: Admin user and role management screen.

## Frontend Admin UI Components

- `src/admin/components/ui/Badge.jsx`: Status or label badge component for admin screens.
- `src/admin/components/ui/Breadcrumb.jsx`: Breadcrumb navigation for admin page context.
- `src/admin/components/ui/Button.jsx`: Reusable admin-styled button component.
- `src/admin/components/ui/Card.jsx`: Reusable container card for admin panels.
- `src/admin/components/ui/Checkbox.jsx`: Reusable admin checkbox control.
- `src/admin/components/ui/ErrorBoundary.jsx`: React error boundary for preventing admin UI crashes from taking down the whole dashboard.
- `src/admin/components/ui/FileUpload.jsx`: File upload input component for admin media/content workflows.
- `src/admin/components/ui/Input.jsx`: Reusable admin text input component.
- `src/admin/components/ui/Modal.jsx`: Reusable modal dialog component.
- `src/admin/components/ui/Pagination.jsx`: Pagination control for admin lists and tables.
- `src/admin/components/ui/Select.jsx`: Reusable select/dropdown control.

## Frontend Marketing Components

- `src/components/index.js`: Barrel export for shared frontend components.
- `src/components/common/index.js`: Barrel export placeholder for common shared UI components.
- `src/components/layout/Footer.jsx`: Public site footer.
- `src/components/layout/Navbar.jsx`: Public site navigation bar.
- `src/components/layout/index.js`: Barrel export for layout components.
- `src/components/sections/About.jsx`: Homepage section describing the agency or company.
- `src/components/sections/CTA.jsx`: Homepage call-to-action section.
- `src/components/sections/Hero.jsx`: Homepage hero section.
- `src/components/sections/Portfolio.jsx`: Homepage portfolio or project showcase section.
- `src/components/sections/Process.jsx`: Homepage process or workflow explanation section.
- `src/components/sections/Services.jsx`: Homepage services overview section.
- `src/components/sections/Testimonials.jsx`: Homepage client testimonial showcase section.
- `src/components/sections/TrustedCompanies.jsx`: Homepage proof/brand trust section.
- `src/components/sections/index.js`: Barrel export for homepage section components.
- `src/components/ui/Button.jsx`: Shared public-facing button component.
- `src/components/ui/index.js`: Barrel export for shared public UI components.

## Frontend SEO And System Utilities

- `src/components/seo/SEO.jsx`: Reusable page-level SEO component for title, metadata, and canonical settings.
- `src/components/seo/StructuredData.jsx`: JSON-LD structured data output component.
- `src/components/seo/index.js`: Barrel export for SEO components.
- `src/components/system/CursorGlow.jsx`: Decorative interactive cursor glow effect.
- `src/components/system/LazyImage.jsx`: Lazy-loading image component for performance.
- `src/components/system/NoiseOverlay.jsx`: Visual texture overlay for the site background.
- `src/components/system/PageLoader.jsx`: Loading indicator used during route and section suspense states.
- `src/components/system/RouteTransition.jsx`: Transition wrapper for page enter/exit animation behavior.
- `src/components/system/ScrollProgress.jsx`: Scroll progress indicator for the public experience.
- `src/components/system/SkipLink.jsx`: Accessibility skip link to jump to main content.
- `src/components/system/SmoothScrollProvider.jsx`: Smooth scrolling provider or integration wrapper.
- `src/components/system/index.js`: Barrel export for system-level components.

## Frontend Support Code

- `src/animations/index.js`: Shared animation presets or motion helpers.
- `src/constants/index.js`: Shared constants used across the frontend.
- `src/hooks/index.js`: Shared custom hook exports.
- `src/lib/seo.js`: Low-level SEO helper utilities or metadata builders.
- `src/utils/analytics.js`: Analytics initialization and page-view tracking utilities.
- `src/utils/errorTracking.js`: Error capture or reporting helpers.
- `src/utils/index.js`: Barrel export for frontend utility helpers.

## Frontend Tests

- `src/test/NotFoundPage.test.jsx`: Unit test coverage for the public 404 page.
- `src/test/ProtectedRoute.test.jsx`: Unit tests confirming admin route protection behavior.
- `src/test/setup.js`: Shared test setup for frontend testing utilities and matchers.
- `tests/e2e/admin-login.spec.js`: Playwright smoke test that verifies the admin login page loads.

## Backend App Core

- `server/.env`: Local backend environment variable file used for runtime secrets and environment-specific settings.
- `server/.env.example`: Example backend environment variable template.
- `server/app.js`: Express app composition file that adds security middleware, health checks, API mounts, and error handling.
- `server/server.js`: Backend process entry point that loads env values, connects to MongoDB, and starts the HTTP server.
- `server/package-lock.json`: Locked backend dependency tree.
- `server/package.json`: Backend package manifest with server scripts and dependencies.
- `server/Dockerfile`: Docker image definition for the backend service.
- `server/ecosystem.config.cjs`: PM2 process configuration for backend production execution.
- `server/scripts/create-admin.js`: Script for creating an initial admin user.
- `server/tests/health.test.js`: Backend smoke tests for health and 404 responses.

## Backend Config

- `server/config/cloudinary.js`: Cloudinary integration configuration for media handling.
- `server/config/config.js`: Central backend environment parsing and runtime config values.
- `server/config/database.js`: MongoDB connection setup and database bootstrap logic.

## Backend Routes

- `server/routes/auth.js`: Auth endpoints for register, login, refresh, logout, and current-user lookup.
- `server/routes/blogs.js`: Protected CRUD routes for blog content.
- `server/routes/contacts.js`: Public contact submission plus protected contact management routes.
- `server/routes/projects.js`: Protected CRUD routes for portfolio projects.
- `server/routes/services.js`: Protected CRUD routes for services.
- `server/routes/testimonials.js`: Protected CRUD routes for testimonials.
- `server/routes/users.js`: Protected admin user-management routes plus profile and password endpoints.

## Backend Controllers

- `server/controllers/authController.js`: Business logic for registration, authentication, session refresh, and logout.
- `server/controllers/blogController.js`: Blog CRUD request handlers.
- `server/controllers/contactController.js`: Contact form creation and contact-management request handlers.
- `server/controllers/projectController.js`: Project CRUD request handlers.
- `server/controllers/serviceController.js`: Service CRUD request handlers.
- `server/controllers/testimonialController.js`: Testimonial CRUD request handlers.
- `server/controllers/userController.js`: User CRUD, profile updates, and password-change handlers.

## Backend Middleware

- `server/middleware/auth.js`: Main auth protection and role-authorization middleware used by API routes.
- `server/middleware/authMiddleware.js`: Additional or older auth middleware helpers kept for backend access control support.
- `server/middleware/errorMiddleware.js`: Central API error formatting and response middleware.
- `server/middleware/uploadMiddleware.js`: File upload middleware, likely powered by Multer and media validation.
- `server/middleware/validationMiddleware.js`: Express-validator rules and validation error handling.

## Backend Models

- `server/models/Blog.js`: Mongoose schema/model for blog entries.
- `server/models/Contact.js`: Mongoose schema/model for contact submissions.
- `server/models/Project.js`: Mongoose schema/model for portfolio projects.
- `server/models/Service.js`: Mongoose schema/model for service offerings.
- `server/models/Testimonial.js`: Mongoose schema/model for client testimonials.
- `server/models/User.js`: Mongoose schema/model for user accounts and auth-related fields.

## Backend Utilities

- `server/utils/APIError.js`: Custom application error class for standardized API failures.
- `server/utils/apiFeatures.js`: Helper utilities for filtering, sorting, pagination, or query shaping.
- `server/utils/asyncHandler.js`: Wrapper for catching async controller errors without repetitive try/catch blocks.
- `server/utils/generateToken.js`: JWT or session token generation helpers.
- `server/utils/logger.js`: Structured logging utilities and logger stream integration for the backend.
