import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, Tooltip, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import { Layers, FileText, MessageCircle, Users, Sparkles } from 'lucide-react';
import api from '../../services/api.js';

const metrics = [
  { title: 'Total Services', value: 18, icon: Layers, color: 'from-white to-slate-300' },
  { title: 'Total Projects', value: 32, icon: Sparkles, color: 'from-slate-300 to-slate-500' },
  { title: 'Published Blogs', value: 24, icon: FileText, color: 'from-slate-200 to-slate-400' },
  { title: 'New Contacts', value: 56, icon: MessageCircle, color: 'from-slate-400 to-slate-600' },
  { title: 'Active Users', value: 12, icon: Users, color: 'from-slate-500 to-slate-400' },
];

const trendData = [
  { month: 'Jan', value: 14 },
  { month: 'Feb', value: 18 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 23 },
  { month: 'May', value: 29 },
  { month: 'Jun', value: 32 },
  { month: 'Jul', value: 38 },
];

const projectBreakdown = [
  { name: 'AI', value: 28 },
  { name: 'Cloud', value: 18 },
  { name: 'Analytics', value: 12 },
  { name: 'Automation', value: 10 },
];

const pieColors = ['#f5f5f5', '#d4d4d4', '#a3a3a3', '#525252'];

const Overview = () => {
  const [stats, setStats] = useState({ services: 0, projects: 0, blogs: 0, contacts: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, projects, blogs, contacts, users] = await Promise.all([
          api.get('/services'),
          api.get('/projects'),
          api.get('/blogs'),
          api.get('/contact'),
          api.get('/users'),
        ]);

        setStats({
          services: services.data?.total ?? services.data?.count ?? 0,
          projects: projects.data?.total ?? projects.data?.count ?? 0,
          blogs: blogs.data?.total ?? blogs.data?.count ?? 0,
          contacts: contacts.data?.total ?? contacts.data?.count ?? 0,
          users: users.data?.total ?? users.data?.count ?? 0,
        });
      } catch (error) {
        console.warn('Dashboard stats fetch failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-5 lg:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{metric.title}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {loading ? '—' : stats[metric.title.toLowerCase().replace(' ', '')] ?? metric.value}
                  </p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${metric.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card title="Performance chart" subtitle="Traffic, leads and project velocity over the last 6 months.">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4d4d4" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#d4d4d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#404040" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tick={{ fill: '#a3a3a3' }} />
                <YAxis axisLine={false} tick={{ fill: '#a3a3a3' }} />
                <Tooltip contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.12)' }} />
                <Area type="monotone" dataKey="value" stroke="#d4d4d4" fill="url(#trendGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Project breakdown" subtitle="Current project categories by share.">
          <div className="flex h-[320px] flex-col justify-between">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={projectBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {projectBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.12)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid gap-3 text-sm text-slate-300">
              {projectBreakdown.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span style={{ background: pieColors[index] }} className="h-2.5 w-2.5 rounded-full"></span>
                    {entry.name}
                  </span>
                  <span>{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Quick actions">
          <div className="space-y-3">
            <Button variant="primary" className="w-full">Create New Service</Button>
            <Button variant="secondary" className="w-full">Add Blog Post</Button>
            <Button variant="ghost" className="w-full">Review Contact Queue</Button>
          </div>
        </Card>

        <Card title="Latest activity" subtitle="Recent admin actions and status updates.">
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="rounded-3xl border border-white/10 bg-white/5 p-4">Service “AI Strategy” was updated 2 hours ago.</li>
            <li className="rounded-3xl border border-white/10 bg-white/5 p-4">New contact message from <strong>Elena R.</strong> arrived.</li>
            <li className="rounded-3xl border border-white/10 bg-white/5 p-4">Blog draft “Generative Ops” saved successfully.</li>
          </ul>
        </Card>

        <Card title="Traffic pulse" subtitle="Sessions, conversions and engagement.">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Conversion rate</p>
                <p className="text-2xl font-semibold text-white">6.8%</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-3 py-2 text-xs text-slate-200">+14.2%</div>
            </div>
            <div className="grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span>Monthly sessions</span>
                <span>12.4K</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span>New leads</span>
                <span>178</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
