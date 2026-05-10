import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/index.js';
import { RouteTransition } from '../components/system/index.js';

const NotFoundPage = () => (
  <RouteTransition routeKey="not-found">
    <SEO title="Page Not Found" description="The page you were looking for could not be found." path="/404" noindex />
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-dark-900 px-4 text-white"
    >
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Error 404</p>
        <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-300">
          The destination you requested does not exist anymore, or the URL may have changed.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black" to="/">
            Return home
          </Link>
          <a
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white"
            href="mailto:hello@yanvex.ai"
          >
            Contact support
          </a>
        </div>
      </div>
    </main>
  </RouteTransition>
);

export default NotFoundPage;
