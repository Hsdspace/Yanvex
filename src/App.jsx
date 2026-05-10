import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  CursorGlow,
  NoiseOverlay,
  PageLoader,
  ScrollProgress,
  SkipLink,
} from './components/system/index.js';
import { initializeAnalytics, trackPageView } from './utils/analytics.js';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function App() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <CursorGlow />
      <NoiseOverlay />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;
