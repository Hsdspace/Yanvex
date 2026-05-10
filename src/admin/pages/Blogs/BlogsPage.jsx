import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api.js';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input from '../../components/ui/Input.jsx';
import { useForm } from 'react-hook-form';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data?.data || []);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleOpen = (blog = null) => {
    setSelected(blog);
    reset(blog || { title: '', category: '', excerpt: '', content: '', tags: '' });
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const handleSave = async (data) => {
    try {
      if (selected) {
        await api.put(`/blogs/${selected._id}`, {
          ...data,
          tags: data.tags.split(',').map((item) => item.trim()),
        });
      } else {
        await api.post('/blogs', {
          ...data,
          tags: data.tags.split(',').map((item) => item.trim()),
        });
      }
      setModalOpen(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.warn(error);
    }
  };

  const filteredBlogs = blogs.filter((blog) => blog.title?.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Editorial panel</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Blog manager</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blog titles..."
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-11 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <Button onClick={() => handleOpen()}>
            <Plus className="mr-2" size={18} /> New blog
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-slate-500">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(loading ? Array.from({ length: 4 }) : filteredBlogs).map((blog, index) => (
                <tr key={blog?._id ?? index} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">{blog?.title || <span className="h-4 w-32 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">{blog?.category || '—'}</td>
                  <td className="px-6 py-4">
                    {blog ? <Badge variant={blog.published ? 'success' : 'secondary'}>{blog.published ? 'Published' : 'Draft'}</Badge> : <span className="h-5 w-20 rounded-full bg-slate-700 shimmer inline-block" />}
                  </td>
                  <td className="px-6 py-4">
                    {blog ? (
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => handleOpen(blog)}>
                          <Edit3 size={16} />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(blog._id)}>
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

      <Modal isOpen={modalOpen} title={selected ? 'Edit blog post' : 'New blog post'} onClose={handleClose} footer={
        <>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit(handleSave)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Publish'}
          </Button>
        </>
      }>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Title" error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
          <Input label="Category" error={errors.category?.message} {...register('category', { required: 'Category is required' })} />
          <Input label="Excerpt" error={errors.excerpt?.message} {...register('excerpt', { required: 'Excerpt is required' })} />
          <Input label="Tags" error={errors.tags?.message} {...register('tags')} placeholder="Comma separated" />
        </div>
        <div className="space-y-4">
          <Input label="Content" error={errors.content?.message} {...register('content', { required: 'Content is required' })} multiline rows={6} />
        </div>
      </Modal>
    </div>
  );
};

export default BlogsPage;
