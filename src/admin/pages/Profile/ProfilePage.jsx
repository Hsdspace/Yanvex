import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');

  const saveProfile = () => {
    window.alert('Profile update integration is available once API endpoint is configured.');
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Admin profile</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Your account</h2>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-cyan-400/10 text-cyan-300 text-4xl font-semibold ring-1 ring-cyan-400/20">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-xl font-semibold text-white">{user?.name || 'Administrator'}</p>
              <p className="text-sm text-slate-400">{user?.role || 'Admin'}</p>
            </div>
            <p className="text-sm text-slate-400">Manage your dashboard access, settings and profile preferences from one place.</p>
          </div>
        </Card>

        <Card title="Account information">
          <div className="space-y-4">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" value={email} disabled />
            <Button variant="primary" onClick={saveProfile}>Update profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
