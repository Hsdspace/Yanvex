import React, { useEffect, useState } from 'react';
import { Search, Trash2, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api.js';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Checkbox from '../../components/ui/Checkbox.jsx';
import Pagination from '../../components/ui/Pagination.jsx';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data?.data || []);
      } catch (error) {
        console.warn(error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const visible = users.filter((user) => 
    user.name?.toLowerCase().includes(query.toLowerCase()) || 
    user.email?.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(visible.length / itemsPerPage);
  const paginatedUsers = visible.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = () => {
    if (selected.length === paginatedUsers.length) {
      setSelected([]);
    } else {
      setSelected(paginatedUsers.map(u => u._id));
    }
  };

  const handleSelectOne = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selected.length} user(s)?`)) return;
    try {
      await Promise.all(selected.map(id => api.delete(`/users/${id}`)));
      setUsers(users.filter(u => !selected.includes(u._id)));
      setSelected([]);
      toast.success(`${selected.length} user(s) deleted`);
    } catch (error) {
      toast.error('Failed to delete users');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Team control</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">User management</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-11 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          {selected.length > 0 && (
            <Button variant="danger" onClick={handleBulkDelete}>
              <Trash2 className="mr-2" size={18} /> Delete ({selected.length})
            </Button>
          )}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-slate-500">
              <tr>
                <th className="px-6 py-4">
                  <Checkbox
                    checked={selected.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(loading ? Array.from({ length: 5 }) : paginatedUsers).map((user, idx) => (
                <tr key={user?._id ?? idx} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    {user && (
                      <Checkbox
                        checked={selected.includes(user._id)}
                        onChange={() => handleSelectOne(user._id)}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{user?.name || <span className="h-4 w-28 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">{user?.email || '—'}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {user?.role === 'admin' && <Shield size={14} className="text-amber-400" />}
                    {user?.role || <span className="h-4 w-20 rounded-full bg-slate-700 shimmer inline-block" />}
                  </td>
                  <td className="px-6 py-4">{user ? <Badge variant={user.isActive ? 'success' : 'secondary'}>{user.isActive ? 'Active' : 'Disabled'}</Badge> : <span className="h-5 w-20 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {!loading && visible.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UsersPage;
