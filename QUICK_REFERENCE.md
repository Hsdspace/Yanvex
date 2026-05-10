# Admin Dashboard - Quick Reference

## 🚀 Launch Commands
```bash
npm run dev          # Start dev server (http://localhost:3001)
npm run build        # Production build
npm run preview      # Preview production build
npm install          # Install dependencies
```

## 📍 Admin Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | Redirect | Auto-redirects to /overview |
| `/admin/login` | Login | Authentication |
| `/admin/overview` | Dashboard | KPI overview |
| `/admin/analytics` | Analytics | Charts & insights |
| `/admin/blogs` | Blogs | Blog management |
| `/admin/projects` | Projects | Portfolio items |
| `/admin/services` | Services | Service catalog |
| `/admin/testimonials` | Testimonials | Client reviews |
| `/admin/contacts` | Contacts | Message inbox |
| `/admin/users` | Users | User management |
| `/admin/settings` | Settings | Configuration |
| `/admin/profile` | Profile | User profile |

## 🎯 Component Import Paths
```javascript
// Layout
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';

// UI Components
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Modal from '../components/ui/Modal.jsx';
import Checkbox from '../components/ui/Checkbox.jsx';
import Select from '../components/ui/Select.jsx';
import FileUpload from '../components/ui/FileUpload.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';
import ErrorBoundary from '../components/ui/ErrorBoundary.jsx';

// Services
import api from '../services/api.js';
import authService from '../services/authService.js';

// Context
import { AuthProvider } from '../context/AuthContext.jsx';
```

## 🔐 Authentication

### Login Flow
```javascript
import authService from '../../services/authService.js';

const response = await authService.login(email, password);
// Returns: { token, user: { _id, name, email, role } }
```

### Check Auth Status
```javascript
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const { user, isAuthenticated, logout } = useContext(AuthContext);
```

## 📝 Common Form Pattern

```javascript
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../../services/api.js';

const { register, handleSubmit, reset, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  try {
    const response = await api.post('/endpoint', data);
    toast.success('Success!');
    reset();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error');
  }
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Input
      label="Name"
      {...register('name', { required: 'Required' })}
      error={errors.name?.message}
    />
    <Button type="submit">Submit</Button>
  </form>
);
```

## 📊 Component Props Reference

### Button
```javascript
<Button 
  variant="primary|secondary|danger|ghost"
  size="sm|md|lg"
  disabled={false}
  onClick={() => {}}
>
  Click me
</Button>
```

### Input
```javascript
<Input
  label="Label"
  type="text|email|password"
  placeholder="..."
  multiline={false}
  rows={4}
  error={errorMessage}
  {...register('fieldName')}
/>
```

### Checkbox
```javascript
<Checkbox
  label="Check me"
  checked={false}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### Select
```javascript
<Select
  label="Choose"
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]}
  {...register('field')}
/>
```

### Modal
```javascript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Dialog Title"
  footer={
    <>
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </>
  }
>
  Content here
</Modal>
```

### FileUpload
```javascript
<FileUpload
  label="Upload"
  accept="image/*"
  preview={true}
  onFileChange={(file) => console.log(file)}
  error={errorMessage}
/>
```

### Pagination
```javascript
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={(newPage) => setPage(newPage)}
/>
```

## 🔌 API Call Pattern

```javascript
// GET
const response = await api.get('/endpoint');

// POST
const response = await api.post('/endpoint', { data });

// PUT
const response = await api.put('/endpoint/:id', { data });

// DELETE
const response = await api.delete('/endpoint/:id');

// PATCH
const response = await api.patch('/endpoint/:id', { data });

// Response data
const { data } = response.data; // Usually { data: [...] }
```

## 🎨 Styling Classes

```javascript
// Colors
text-cyan-400    // Primary accent
text-purple-500  // Secondary
text-white       // Text
text-slate-400   // Muted text

// Spacing
px-4 py-3        // Padding
gap-3 gap-4      // Gaps
space-y-4        // Vertical spacing

// Borders
border border-white/10
rounded-2xl              // Inputs
rounded-3xl              // Containers
rounded-lg               // Buttons

// Layout
grid grid-cols-2 xl:grid-cols-3  // Responsive grid
flex items-center justify-between  // Flex layout
```

## 🐛 Debug Tips

```javascript
// Check auth
console.log(localStorage.getItem('authToken'));

// Check current user
const { user } = useContext(AuthContext);
console.log(user);

// Check API calls
// Open DevTools > Network tab > filter XHR

// Check errors
// Open DevTools > Console tab

// Check state
// React DevTools extension
```

## 📋 Checklist for New Pages

- [ ] Create page component in `src/admin/pages/`
- [ ] Add route to `src/admin/routes/AdminRoutes.jsx`
- [ ] Add nav item to `src/admin/components/layout/Sidebar.jsx`
- [ ] Import required components
- [ ] Add toast notifications
- [ ] Handle errors
- [ ] Add loading states
- [ ] Test on mobile
- [ ] Verify API endpoints

## 🌐 API Base URL

**Development**: `http://localhost:3000/api`  
**Production**: Update in `src/admin/services/api.js`

## 📞 Support

- Check browser console for errors: F12 → Console
- Check network tab: F12 → Network
- Verify backend is running: `http://localhost:3000`
- Check API responses: F12 → Network → Response tab
- Verify token in localStorage: F12 → Application → LocalStorage

---

**Version**: Phase 3  
**Status**: ✅ Production Ready  
**Last Updated**: Today
