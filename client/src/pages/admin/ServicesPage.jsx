import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import api from '../../services/api';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ImageUpload from '../../components/admin/ImageUpload';
import { cn } from '../../utils/helpers';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const icons = ['Layout', 'Building2', 'ShoppingCart', 'Calendar', 'Database', 'Settings', 'Shield', 'Search', 'Wrench', 'Send', 'CreditCard', 'Zap', 'Code2', 'Palette', 'Smartphone', 'Globe'];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await api.get('/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            alert('Xizmatlarni yuklashda xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setSelectedService(service);
            setValue('title', service.title);
            setValue('description', service.description);
            setValue('icon', service.icon || 'Layout');
            setValue('order', service.order || 0);
            setSelectedImage(service.imagePath ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${service.imagePath}` : null);
        } else {
            setSelectedService(null);
            reset();
            setSelectedImage(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
        setSelectedImage(null);
        reset();
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('icon', data.icon);
            formData.append('order', data.order || 0);

            if (selectedImage instanceof File) {
                formData.append('image', selectedImage);
            }

            if (selectedService) {
                await api.put(`/services/${selectedService._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/services', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            handleCloseModal();
            fetchServices();
        } catch (error) {
            alert(error.response?.data?.message || 'Xizmatni saqlashda xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteService = async () => {
        if (!serviceToDelete) return;
        try {
            await api.delete(`/services/${serviceToDelete._id}`);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Xizmatni o\'chirishda xatolik yuz berdi');
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Xizmatlar</h1>
                    <p className="text-gray-400">Barcha xizmatlarni boshqaring</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yangi xizmat</span>
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {loading ? (
                    <div className="col-span-full flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="col-span-full text-center py-20 glass rounded-2xl">
                        <p className="text-gray-400">Xizmatlar topilmadi</p>
                    </div>
                ) : (
                    services.map((service, index) => (
                        <motion.div
                            key={service._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass rounded-2xl p-6 relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5">
                                        <div className="w-full h-full rounded-xl bg-background/90 flex items-center justify-center">
                                            <span className="text-2xl">{service.icon === 'Zap' ? '⚡' : '📦'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(service)}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-accent" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setServiceToDelete(service);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-4">{service.description}</p>

                            {service.imagePath && (
                                <img
                                    src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${service.imagePath}`}
                                    alt={service.title}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            )}

                            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                <span>Ikonka: {service.icon}</span>
                                <span>Tartib: {service.order}</span>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedService ? 'Xizmatni tahrirlash' : 'Yangi xizmat qo\'shish'}
                size="md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nomi <span className="text-red-400">*</span>
                        </label>
                        <input
                            {...register('title', { required: 'Nomi kiritilishi shart' })}
                            type="text"
                            placeholder="Xizmat nomi"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tavsif <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            {...register('description', { required: 'Tavsif kiritilishi shart' })}
                            rows="3"
                            placeholder="Xizmat haqida..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Ikonka</label>
                            <select
                                {...register('icon')}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                {icons.map(icon => (
                                    <option key={icon} value={icon} className="bg-background">{icon}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Tartib</label>
                            <input
                                {...register('order', { valueAsNumber: true })}
                                type="number"
                                placeholder="0"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <ImageUpload
                        value={selectedImage}
                        onChange={setSelectedImage}
                        label="Xizmat rasmi (ixtiyoriy)"
                    />

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="flex-1 py-3 rounded-xl glass text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                'flex-1 py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center space-x-2',
                                isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50'
                            )}
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{selectedService ? 'Yangilash' : 'Qo\'shish'}</span>}
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteService}
                title="Xizmatni o'chirish"
                message={`"${serviceToDelete?.title}" xizmatini o'chirishni xohlaysizmi?`}
            />
        </div>
    );
};

export default ServicesPage;