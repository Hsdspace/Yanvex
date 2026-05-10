# Admin Dashboard - API Integration Guide

## Quick Start

### 1. Start Development Server
```bash
npm run dev
# App runs on http://localhost:5173
```

### 2. Admin Panel Location
- **URL**: `http://localhost:5173/admin`
- **Login**: Use credentials from your backend
- **Default Route**: Redirects to `/admin/overview`

## Authentication Flow

### Login Process
1. User enters email/password on `/admin/login`
2. Submit calls `POST /auth/login`
3. Backend returns `{ token, user }`
4. Token stored in localStorage
5. User redirected to `/admin/overview`
6. Subsequent requests include token in headers

### Protected Routes
All admin routes are wrapped in `ProtectedRoute`:
- Checks for valid token
- Redirects to `/admin/login` if unauthorized
- Auto-logout on 401 response

## API Endpoints Configuration

### File: `src/admin/services/api.js`
```javascript
// Current configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Update this to your backend URL

// Axios instance with auth interceptor
export default axios.create({
  baseURL: API_BASE_URL,
  // ... other config
});
```

### Required Backend Endpoints

#### Authentication
```
POST /auth/login
  Request: { email, password }
  Response: { token, user: { _id, name, email, role } }

POST /auth/logout
  Response: { success: true }

GET /auth/me
  Header: Authorization: Bearer <token>
  Response: { user: { _id, name, email, role } }
```

#### Blogs
```
GET /blogs
  Response: { data: [{ _id, title, excerpt, content, author, published, category, tags, date }] }

POST /blogs
  Body: { title, excerpt, content, author, category, tags, published }
  Response: { data: { _id, ... } }

PUT /blogs/:id
  Body: { title, excerpt, content, ... }
  Response: { data: { _id, ... } }

DELETE /blogs/:id
  Response: { success: true }
```

#### Projects
```
GET /projects
  Response: { data: [{ _id, title, description, category, technologies, liveLink, githubLink, image, featured }] }

POST /projects
  Body: { title, description, category, technologies, liveLink, githubLink, image }

PUT /projects/:id
  Body: { title, description, ... }

DELETE /projects/:id
```

#### Services
```
GET /services
  Response: { data: [{ _id, title, description, icon, features, pricing }] }

POST /services
  Body: { title, description, icon, features, pricing }

PUT /services/:id
  Body: { title, description, icon, features, pricing }

DELETE /services/:id
```

#### Testimonials
```
GET /testimonials
  Response: { data: [{ _id, name, company, designation, review, rating, image }] }

POST /testimonials
  Body: { name, company, designation, review, rating, image }

PUT /testimonials/:id
  Body: { name, company, designation, review, rating, image }

DELETE /testimonials/:id
```

#### Contacts
```
GET /contact
  Response: { data: [{ _id, name, email, subject, message, isRead, createdAt }] }

DELETE /contact/:id
  Response: { success: true }

PATCH /contact/:id
  Body: { isRead: true }
  Response: { data: { _id, isRead, ... } }
```

#### Users
```
GET /users
  Response: { data: [{ _id, name, email, role, isActive, createdAt }] }

DELETE /users/:id
  Response: { success: true }
```

#### Analytics
```
GET /analytics
  Response: {
    totalVisitors: 12400,
    conversionRate: 7.8,
    revenue: 42000,
    weeklyTraffic: [{ label: 'Mon', value: 600 }, ...]
  }
```

## File Upload Integration

### Setup: `FileUpload.jsx`
```javascript
// Example usage in a form
import FileUpload from '../../components/ui/FileUpload.jsx';

<FileUpload
  label="Project Image"
  accept="image/*"
  onFileChange={(file) => {
    // Handle file upload to backend
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      api.post('/upload', formData).then(res => {
        // Use res.data.imageUrl in your form
      });
    }
  }}
  preview={true}
/>
```

## Form Component Integration

### Input with Textarea
```javascript
import Input from '../../components/ui/Input.jsx';

<Input
  label="Content"
  multiline
  rows={6}
  placeholder="Enter content"
  {...register('content')}
  error={errors.content?.message}
/>
```

### Checkbox for Bulk Actions
```javascript
import Checkbox from '../../components/ui/Checkbox.jsx';

<Checkbox
  label="Select all"
  checked={allSelected}
  onChange={() => handleSelectAll()}
/>
```

### Select Dropdown
```javascript
import Select from '../../components/ui/Select.jsx';

<Select
  label="Category"
  options={[
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
  ]}
  {...register('category')}
/>
```

## Pagination Usage

```javascript
import Pagination from '../../components/ui/Pagination.jsx';

<Pagination
  currentPage={currentPage}
  totalPages={Math.ceil(items.length / itemsPerPage)}
  onPageChange={setCurrentPage}
/>

// Calculate paginated items
const start = (currentPage - 1) * itemsPerPage;
const paginatedItems = items.slice(start, start + itemsPerPage);
```

## Toast Notifications

```javascript
import { toast } from 'react-toastify';

// Success
toast.success('Item created successfully!');

// Error
toast.error('Failed to save item');

// Info
toast.info('Please review your changes');

// Warning
toast.warning('This action cannot be undone');
```

## Error Handling Pattern

```javascript
const handleSave = async (data) => {
  try {
    const response = await api.post('/endpoint', data);
    toast.success('Success message');
    // Update state
  } catch (error) {
    if (error.response?.status === 401) {
      // Auto-logout handled by interceptor
    } else if (error.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An error occurred');
    }
  }
};
```

## Testing Checklist

### Auth Flow
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Token persists on page refresh
- [ ] Logout clears token and redirects to login
- [ ] 401 response triggers auto-logout

### CRUD Operations
- [ ] Create new item works
- [ ] Read/list items displays data
- [ ] Update existing item works
- [ ] Delete item works
- [ ] Form validation shows errors

### UI Components
- [ ] Pagination navigates correctly
- [ ] File upload preview displays
- [ ] Checkboxes toggle state
- [ ] Select dropdown opens/closes
- [ ] Breadcrumb shows current path

### Search & Filter
- [ ] Search filters items correctly
- [ ] Status filter works
- [ ] Multiple filters can be applied

## Deployment Checklist

### Before Production
- [ ] Update API_BASE_URL in `src/admin/services/api.js`
- [ ] Verify all endpoints return correct data format
- [ ] Test auth flow end-to-end
- [ ] Test all CRUD operations
- [ ] Check responsive design on mobile
- [ ] Verify error handling
- [ ] Clear browser cache/localStorage
- [ ] Run `npm run build` successfully
- [ ] Test built version locally

### Environment Variables (Optional)
Create `.env.local`:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Yanvex AI Agency
```

Update `src/admin/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
```

## Troubleshooting

### CORS Issues
- Backend needs `cors` middleware
- Check `Access-Control-Allow-Origin` headers
- Verify credentials included in requests

### Auth Token Not Persisting
- Check localStorage is enabled
- Verify token key name: `authToken`
- Check browser DevTools > Application > LocalStorage

### Pages Not Loading Data
- Verify API endpoint paths
- Check network tab for API calls
- Verify response data structure
- Check console for JavaScript errors

### Pagination Not Working
- Ensure `totalPages` calculation is correct
- Verify `currentPage` state updates
- Check array slicing logic

### File Upload Not Working
- Verify form sends `multipart/form-data`
- Check backend file handling
- Verify response includes file URL

## Support

For issues or questions:
1. Check browser console for errors
2. Check network tab for API responses
3. Verify backend is running
4. Review endpoint documentation
5. Test with sample data first

Build Status: ✅ Production Ready
Last Updated: Phase 3 Complete
