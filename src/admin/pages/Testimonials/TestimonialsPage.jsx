import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, Edit3 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../services/api.js';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input from '../../components/ui/Input.jsx';
import Badge from '../../components/ui/Badge.jsx';

const TestimonialsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials');
        setReviews(response.data?.data || []);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const openModal = (review = null) => {
    setSelected(review);
    reset(review || { name: '', company: '', designation: '', review: '', rating: 5 });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveReview = async (data) => {
    try {
      if (selected) {
        await api.put(`/testimonials/${selected._id}`, data);
      } else {
        await api.post('/testimonials', data);
      }
      setModalOpen(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Remove testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setReviews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.warn(error);
    }
  };

  const filtered = reviews.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Customer voice</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Testimonials</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search client name..."
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-11 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <Button onClick={() => openModal()}>
            <Plus className="mr-2" size={18} /> Add testimonial
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-slate-500">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(loading ? Array.from({ length: 4 }) : filtered).map((item, idx) => (
                <tr key={item?._id ?? idx} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">{item?.name || <span className="h-4 w-24 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">{item?.company || '—'}</td>
                  <td className="px-6 py-4">{item ? <Badge variant="primary">{item.rating} / 5</Badge> : <span className="h-5 w-20 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">
                    {item ? (
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => openModal(item)}>
                          <Edit3 size={16} />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => deleteReview(item._id)}>
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

      <Modal isOpen={modalOpen} title={selected ? 'Edit testimonial' : 'New testimonial'} onClose={closeModal} footer={
        <>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit(saveReview)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save testimonial'}
          </Button>
        </>
      }>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Client name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Company" error={errors.company?.message} {...register('company', { required: 'Company is required' })} />
          <Input label="Designation" error={errors.designation?.message} {...register('designation', { required: 'Designation is required' })} />
          <Input label="Rating" type="number" min="1" max="5" error={errors.rating?.message} {...register('rating', { required: 'Rating is required', min: 1, max: 5 })} />
        </div>
        <div className="space-y-4">
          <Input label="Review" error={errors.review?.message} {...register('review', { required: 'Review is required' })} />
        </div>
      </Modal>
    </div>
  );
};

export default TestimonialsPage;
