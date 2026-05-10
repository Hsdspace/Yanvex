import React, { useEffect, useState } from 'react';
import { Search, Trash2, CheckCircle2 } from 'lucide-react';
import api from '../../services/api.js';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contact');
        setContacts(response.data?.data || []);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setContacts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.warn(error);
    }
  };

  const markRead = async (id) => {
    try {
      await api.patch(`/contact/${id}`, { isRead: true });
      setContacts((prev) => prev.map((item) => (item._id === id ? { ...item, isRead: true } : item)));
    } catch (error) {
      console.warn(error);
    }
  };

  const visible = contacts.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()) || item.email?.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Message center</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Contact requests</h2>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-11 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(loading ? Array.from({ length: 5 }) : visible).map((item, idx) => (
                <tr key={item?._id ?? idx} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">{item?.name || <span className="h-4 w-24 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">{item?.email || '—'}</td>
                  <td className="px-6 py-4">{item?.subject || '—'}</td>
                  <td className="px-6 py-4">{item ? <Badge variant={item.isRead ? 'success' : 'secondary'}>{item.isRead ? 'Read' : 'Unread'}</Badge> : <span className="h-5 w-16 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">
                    {item ? (
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => markRead(item._id)}>
                          <CheckCircle2 size={16} />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => deleteContact(item._id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ) : (
                      <span className="h-5 w-20 rounded-full bg-slate-700 shimmer inline-block" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ContactsPage;
