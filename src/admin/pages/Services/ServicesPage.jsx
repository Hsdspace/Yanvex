import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Search, Trash2, Edit3 } from 'lucide-react';
import api from '../../services/api.js';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Badge from '../../components/ui/Badge.jsx';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data?.data || []);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => service.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, services]);

  const openModal = (service = null) => {
    setSelected(service);
    reset(service || { title: '', description: '', features: '' });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async (data) => {
    try {
      if (selected) {
        await api.put(`/services/${selected._id}`, {
          ...data,
          features: data.features.split(',').map((item) => item.trim()),
        });
      } else {
        await api.post('/services', {
          ...data,
          features: data.features.split(',').map((item) => item.trim()),
        });
      }
      setModalOpen(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service permanently?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Manage services</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Services library</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-11 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <Button onClick={() => openModal()}>
            <Plus className="mr-2" size={18} /> Add service
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-slate-500">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(loading ? Array.from({ length: 4 }) : filteredServices).map((service, index) => (
                <tr key={service?._id ?? index} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">{service?.title || <span className="h-4 w-32 rounded-full bg-slate-700 shimmer inline-block" />}</td>
                  <td className="px-6 py-4">
                    {service ? <Badge variant={service.isActive ? 'primary' : 'secondary'}>{service.isActive ? 'Active' : 'Inactive'}</Badge> : <span className="h-5 w-16 rounded-full bg-slate-700 shimmer inline-block" />}
                  </td>
                  <td className="px-6 py-4">
                    {service ? (
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => openModal(service)}>
                          <Edit3 size={16} />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(service._id)}>
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

      <Modal isOpen={modalOpen} title={selected ? 'Edit service' : 'New service'} onClose={closeModal} footer={
        <>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit(handleSave)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </>
      }>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Title"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />
        </div>
        <div className="space-y-4">
          <Input
            label="Description"
            error={errors.description?.message}
            {...register('description', { required: 'Description is required' })}
            multiline
            rows={5}
          />
          <Input
            label="Features"
            placeholder="Comma separated features"
            error={errors.features?.message}
            {...register('features', { required: 'Add at least one feature' })}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ServicesPage;
