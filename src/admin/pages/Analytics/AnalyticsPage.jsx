import React from 'react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, Tooltip, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

const trafficData = [
  { label: 'Mon', value: 600 },
  { label: 'Tue', value: 920 },
  { label: 'Wed', value: 760 },
  { label: 'Thu', value: 1140 },
  { label: 'Fri', value: 980 },
  { label: 'Sat', value: 1220 },
  { label: 'Sun', value: 860 },
];

const performanceData = [
  { category: 'Projects', value: 62 },
  { category: 'Blogs', value: 45 },
  { category: 'Services', value: 78 },
  { category: 'Leads', value: 54 },
];

const sentimentData = [
  { name: 'Positive', value: 68 },
  { name: 'Neutral', value: 18 },
  { name: 'Negative', value: 14 },
];

const colors = ['#f5f5f5', '#a3a3a3', '#525252'];

const AnalyticsPage = () => (
  <div className="space-y-8">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Insights suite</p>
      <h2 className="mt-2 text-3xl font-semibold text-white">Analytics overview</h2>
    </div>

    <div className="grid gap-6 xl:grid-cols-3">
      <Card title="Visitors" subtitle="Weekly traffic and engagement.">
        <div className="text-3xl font-semibold text-white">12.4K</div>
        <p className="mt-2 text-sm text-slate-400">Visitors this week, up 18% from last week.</p>
      </Card>
      <Card title="Conversions" subtitle="Lead capture rate.">
        <div className="text-3xl font-semibold text-white">7.8%</div>
        <p className="mt-2 text-sm text-slate-400">Conversion rate across landing pages.</p>
      </Card>
      <Card title="Revenue" subtitle="Monthly revenue forecast.">
        <div className="text-3xl font-semibold text-white">$42K</div>
        <p className="mt-2 text-sm text-slate-400">Forecast growth from new projects.</p>
      </Card>
    </div>

    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <Card title="Traffic trends">
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#404040" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#a3a3a3' }} axisLine={false} />
              <YAxis tick={{ fill: '#a3a3a3' }} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.12)' }} />
              <Area type="monotone" dataKey="value" stroke="#d4d4d4" fillOpacity={0.2} fill="#d4d4d4" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card title="Project performance">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#404040" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: '#a3a3a3' }} axisLine={false} />
                <YAxis tick={{ fill: '#a3a3a3' }} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.12)' }} />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#737373" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Sentiment">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {sentimentData.map((item, index) => (
                    <Cell key={item.name} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>

    <Card title="Report actions">
      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="primary">Export CSV</Button>
        <Button variant="secondary">Generate report</Button>
        <Button variant="ghost">Share insights</Button>
      </div>
    </Card>
  </div>
);

export default AnalyticsPage;
