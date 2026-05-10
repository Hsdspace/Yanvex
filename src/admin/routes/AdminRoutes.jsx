import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import { PageLoader } from '../../components/system/index.js';
import { SEO } from '../../components/seo/index.js';

const LoginPage = lazy(() => import('../pages/Login/LoginPage.jsx'));
const DashboardOverview = lazy(() => import('../pages/Dashboard/Overview.jsx'));
const ServicesPage = lazy(() => import('../pages/Services/ServicesPage.jsx'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage.jsx'));
const BlogsPage = lazy(() => import('../pages/Blogs/BlogsPage.jsx'));
const TestimonialsPage = lazy(() => import('../pages/Testimonials/TestimonialsPage.jsx'));
const ContactsPage = lazy(() => import('../pages/Contacts/ContactsPage.jsx'));
const UsersPage = lazy(() => import('../pages/Users/UsersPage.jsx'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage.jsx'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage.jsx'));
const AnalyticsPage = lazy(() => import('../pages/Analytics/AnalyticsPage.jsx'));

const AdminRoutes = () => (
  <AuthProvider>
    <Suspense fallback={<PageLoader label="Loading admin workspace..." />}>
      <SEO
        title="Admin Dashboard"
        description="Secure Yanvex admin dashboard for content, analytics, and platform operations."
        path="/admin/login"
        noindex
      />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Suspense>
  </AuthProvider>
);

export default AdminRoutes;
