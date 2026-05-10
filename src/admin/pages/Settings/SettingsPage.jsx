import React, { useEffect, useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';

const SettingsPage = () => {
  const [theme, setTheme] = useState('dark');
  const [siteName, setSiteName] = useState('YANVEX AI Agency');
  const [seoTitle, setSeoTitle] = useState('Premium AI agency services');
  const [socialLinks, setSocialLinks] = useState({ twitter: '', linkedin: '', instagram: '' });

  useEffect(() => {
    const saved = localStorage.getItem('yanvex_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTheme(parsed.theme || 'dark');
      setSiteName(parsed.siteName || siteName);
      setSeoTitle(parsed.seoTitle || seoTitle);
      setSocialLinks(parsed.socialLinks || socialLinks);
      document.documentElement.setAttribute('data-theme', parsed.theme || 'dark');
    }
  }, []);

  const saveSettings = () => {
    const payload = { theme, siteName, seoTitle, socialLinks };
    localStorage.setItem('yanvex_settings', JSON.stringify(payload));
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Platform settings</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Site configuration</h2>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Appearance">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Theme mode</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme('dark')}
                  className={`rounded-3xl px-4 py-2 text-sm transition ${theme === 'dark' ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-300'}`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`rounded-3xl px-4 py-2 text-sm transition ${theme === 'light' ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-300'}`}
                >
                  Light
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Status</p>
              <p className="text-sm text-slate-400">Switching themes updates the dashboard and public site palette.</p>
            </div>
          </div>
        </Card>

        <Card title="SEO defaults">
          <div className="space-y-4">
            <Input label="Site name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            <Input label="SEO title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </div>
        </Card>

        <Card title="Social links">
          <div className="space-y-4">
            <Input label="Twitter" value={socialLinks.twitter} onChange={(e) => setSocialLinks((prev) => ({ ...prev, twitter: e.target.value }))} />
            <Input label="LinkedIn" value={socialLinks.linkedin} onChange={(e) => setSocialLinks((prev) => ({ ...prev, linkedin: e.target.value }))} />
            <Input label="Instagram" value={socialLinks.instagram} onChange={(e) => setSocialLinks((prev) => ({ ...prev, instagram: e.target.value }))} />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Save website settings</h3>
            <p className="text-sm text-slate-400">These settings are persisted locally for preview and dark/light theme behavior.</p>
          </div>
          <Button variant="primary" onClick={saveSettings}>Save changes</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
