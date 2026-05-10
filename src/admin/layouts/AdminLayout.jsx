import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import Breadcrumb from '../components/ui/Breadcrumb.jsx';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(115,115,115,0.12),transparent_28%),var(--bg)] text-white">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((prev) => !prev)}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      />
      <div className="relative ml-0 min-h-screen transition-all duration-300 md:ml-80 xl:ml-96">
        <Topbar onMenuToggle={() => setMobileOpen(true)} collapsed={collapsed} />
        <main className="mx-auto max-w-[1480px] px-4 pb-16 pt-5 md:px-6 xl:px-8">
          {location.pathname !== '/admin' && <Breadcrumb />}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
