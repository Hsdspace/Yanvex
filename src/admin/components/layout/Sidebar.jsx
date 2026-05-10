import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  FileText,
  MessageCircle,
  Users,
  Settings,
  Sparkles,
  ShieldCheck,
  LogOut,
  Menu,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const items = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Services', path: '/admin/services', icon: Layers },
  { label: 'Projects', path: '/admin/projects', icon: Sparkles },
  { label: 'Blogs', path: '/admin/blogs', icon: FileText },
  { label: 'Testimonials', path: '/admin/testimonials', icon: ShieldCheck },
  { label: 'Contacts', path: '/admin/contacts', icon: MessageCircle },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

const Sidebar = ({ collapsed, mobileOpen, onToggle, onMobileToggle }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-30 hidden w-80 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl md:flex">
        <div className="flex h-20 items-center justify-between px-6 pt-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">YANVEX Admin</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Control Hub</h1>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-2xl bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-8 pt-6">
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="mt-auto border-t border-white/10 px-6 py-6">
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/20">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-400">{user?.email || 'admin@yanvex.ai'}</p>
            </div>
            <button onClick={logout} className="rounded-2xl p-2 text-slate-300 transition hover:bg-white/10">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="fixed inset-y-0 left-0 z-40 flex w-full max-w-xs flex-col border-r border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">YANVEX Admin</p>
            <p className="text-lg font-semibold text-white">Dashboard</p>
          </div>
          <button onClick={onMobileToggle} className="rounded-2xl bg-white/5 p-2 text-slate-300 hover:bg-white/10">
            <Menu size={18} />
          </button>
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onMobileToggle}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
