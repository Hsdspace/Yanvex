# Admin Dashboard Development Guide

## Project Structure

```
src/admin/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       ├── Modal.jsx
│       ├── Checkbox.jsx
│       ├── Select.jsx
│       ├── FileUpload.jsx
│       ├── Breadcrumb.jsx
│       ├── Pagination.jsx
│       └── ErrorBoundary.jsx
├── context/
│   └── AuthContext.jsx
├── layouts/
│   └── AdminLayout.jsx
├── pages/
│   ├── Dashboard/
│   │   └── DashboardPage.jsx
│   ├── Analytics/
│   │   └── AnalyticsPage.jsx
│   ├── Blogs/
│   │   └── BlogsPage.jsx
│   ├── Projects/
│   │   └── ProjectsPage.jsx
│   ├── Services/
│   │   └── ServicesPage.jsx
│   ├── Testimonials/
│   │   └── TestimonialsPage.jsx
│   ├── Contacts/
│   │   └── ContactsPage.jsx
│   ├── Users/
│   │   └── UsersPage.jsx
│   ├── Settings/
│   │   └── SettingsPage.jsx
│   └── Profile/
│       └── ProfilePage.jsx
├── routes/
│   ├── ProtectedRoute.jsx
│   └── AdminRoutes.jsx
└── services/
    ├── api.js (Axios instance with interceptors)
    └── authService.js
```

## Key Features Implemented

### 1. Authentication
- JWT-based token management
- Auth persistence in localStorage
- 401 interceptor for auto-logout
- Protected routes wrapper

### 2. UI Components
- **Input**: Text, password, email with textarea support
- **Checkbox**: With custom styling and state management
- **Select**: Dropdown with options array
- **FileUpload**: Drag-drop with preview, file size display
- **Button**: Multiple variants (primary, secondary, danger, ghost)
- **Card**: Flexible container with title support
- **Badge**: Status indicators with color variants
- **Modal**: Reusable dialog with title/footer
- **Breadcrumb**: Auto-generated navigation trail
- **Pagination**: Smart page button display
- **ErrorBoundary**: React error handling component

### 3. Pages & Features
- **Dashboard**: KPI overview, quick navigation
- **Analytics**: Charts (area, bar, pie) with real data
- **Blogs**: CRUD with search, filter, status management
- **Projects**: Portfolio management with categories
- **Services**: Service catalog with features list
- **Testimonials**: Client review management with ratings
- **Contacts**: Message inbox with read/unread status
- **Users**: User management with bulk delete, pagination
- **Settings**: Configuration with multiple sections
- **Profile**: Personal settings and preferences

### 4. Advanced Features
- Bulk actions (select multiple, delete all)
- Pagination with smart button display
- Search and filtering
- Form validation with error messages
- Toast notifications (via react-toastify)
- Responsive design (mobile/tablet/desktop)
- Loading states and skeleton screens

## API Integration Points

### Endpoints to Connect
```javascript
// Auth
POST /auth/login
POST /auth/logout
GET /auth/me

// Content Management
GET/POST /blogs
PUT /blogs/:id
DELETE /blogs/:id

GET/POST /projects
PUT /projects/:id
DELETE /projects/:id

GET/POST /services
PUT /services/:id
DELETE /services/:id

GET/POST /testimonials
PUT /testimonials/:id
DELETE /testimonials/:id

GET /contact
DELETE /contact/:id
PATCH /contact/:id (mark as read)

// User Management
GET /users
DELETE /users/:id

// Analytics
GET /analytics (dashboard stats)
GET /analytics/traffic (chart data)
```

## Next Steps

### Phase 4 (Recommended)
1. Connect real backend endpoints
2. Implement pagination in all tables
3. Add file upload functionality
4. Create rich text editor for blog content
5. Add role-based access control (RBAC)
6. Implement session timeout and refresh token

### Development Tips
- Use `useForm` from `react-hook-form` for all forms
- Import toast from `react-toastify` for notifications
- Keep API calls in service layer
- Use Checkbox component for multi-select
- Implement Pagination for tables > 10 items
- Use FileUpload for image/document uploads
- Wrap page content in ErrorBoundary

## Styling Convention
- Tailwind CSS with custom theme variables
- Dark mode by default
- Cyan accent color (#00D4FF)
- Purple secondary color (#7C3AED)
- Slate grayscale for text/borders
- Smooth transitions (200-300ms)
- Border radius: rounded-2xl for inputs, rounded-3xl for large elements

## Testing Checklist
- [ ] Auth login/logout works
- [ ] Protected routes redirect properly
- [ ] Form validation displays errors
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Search/filter functions
- [ ] Pagination navigates correctly
- [ ] File upload preview displays
- [ ] Toast notifications show
- [ ] Bulk actions select/delete properly
- [ ] Responsive on mobile (< 640px)
