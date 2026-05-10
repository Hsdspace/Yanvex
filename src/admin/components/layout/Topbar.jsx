import React from 'react';
import { Search, Bell, Moon, SunMedium, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const Topbar = ({ onMenuToggle, collapsed }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(10,10,10,0.92)] backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 py-3 md:px-6 xl:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/85 text-slate-200 transition hover:border-cyan-400/30 hover:text-white md:hidden"
          >
            <Menu size={18} />
          </button>
          <div className="hidden rounded-3xl border border-white/10 bg-slate-950/85 px-4 py-3 md:flex md:items-center md:gap-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search services, projects, blogs..."
              className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <button className="hidden rounded-2xl border border-white/10 bg-slate-950/85 p-3 text-slate-300 transition hover:bg-white/5 md:inline-flex">
            <Bell size={18} />
          </button>
          <button className="hidden rounded-2xl border border-white/10 bg-slate-950/85 p-3 text-slate-300 transition hover:bg-white/5 md:inline-flex">
            {collapsed ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/85 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-slate-500">{user?.role || 'Admin'}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
