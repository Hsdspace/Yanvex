import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x && x !== 'admin');

  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin' },
    ...pathnames.map((name, index) => {
      const path = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
      const label = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
      return { label, path };
    }),
  ];

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link to="/admin" className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition">
        <Home size={16} />
      </Link>
      {breadcrumbs.slice(1).map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <ChevronRight size={16} className="text-slate-600" />
          {index === breadcrumbs.length - 2 ? (
            <span className="text-slate-200 font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="text-slate-400 hover:text-cyan-400 transition">
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
