import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
import api from '../../services/api';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ImageUpload from '../../components/admin/ImageUpload';
import { cn } from '../../utils/helpers';

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [rating, setRating] = useState(5);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                setLoading(true);
                const response = await api.get('/testimonials');
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await api.get('/testimonials');
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (testimonial = null) => {
        if (testimonial) {
            setSelectedTestimonial(testimonial);
            setValue('name', testimonial.name);
            setValue('company', testimonial.company);
            setValue('text', testimonial.text);
            setValue('order', testimonial.order || 0);
            setRating(testimonial.rating || 5);
            setSelectedImage(testimonial.avatar ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${testimonial.avatar}` : null);
        } else {
            setSelectedTestimonial(null);
            reset();
            setSelectedImage(null);
            setRating(5);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTestimonial(null);
        setSelectedImage(null);
        reset();
        setRating(5);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('company', data.company);
            formData.append('text', data.text);
            formData.append('rating', rating);
            formData.append('order', data.order || 0);

            if (selectedImage instanceof File) {
                formData.append('avatar', selectedImage);
            }

            if (selectedTestimonial) {
                await api.put(`/testimonials/${selectedTestimonial._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/testimonials', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            handleCloseModal();
            fetchTestimonials();
        } catch (error) {
            alert(error.response?.data?.message || 'Xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTestimonial = async () => {
        if (!testimonialToDelete) return;
        try {
            await api.delete(`/testimonials/${testimonialToDelete._id}`);
            fetchTestimonials();
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('O\'chirishda xatolik yuz berdi');
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
                    <h1 className="text-3xl font-bold text-white mb-2">Mijozlar Fikrlari</h1>
                    <p className="text-gray-400">Mijozlarning fikr-mulohazalarini boshqaring</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yangi fikr</span>
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {loading ? (
                    <div className="col-span-full flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="col-span-full text-center py-20 glass rounded-2xl">
                        <p className="text-gray-400">Fikrlar topilmadi</p>
                    </div>
                ) : (
                    testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass rounded-2xl p-6 relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                                        <div className="w-full h-full rounded-full bg-background overflow-hidden flex items-center justify-center">
                                            {testimonial.avatar ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${testimonial.avatar}`}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{testimonial.name}</div>
                                        <div className="text-xs text-gray-400">{testimonial.company}</div>
                                    </div>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(testimonial)}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-accent" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTestimonialToDelete(testimonial);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex space-x-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            'w-4 h-4',
                                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-gray-300 italic line-clamp-4">"{testimonial.text}"</p>
                        </motion.div>
                    ))
                )}
            </motion.div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedTestimonial ? 'Fikrni tahrirlash' : 'Yangi fikr qo\'shish'}
                size="md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Ism <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('name', { required: 'Ism kiritilishi shart' })}
                                type="text"
                                placeholder="Mijoz ismi"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Kompaniya <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('company', { required: 'Kompaniya kiritilishi shart' })}
                                type="text"
                                placeholder="Kompaniya nomi"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Fikr matni <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            {...register('text', { required: 'Fikr matni kiritilishi shart' })}
                            rows="4"
                            placeholder="Mijozning fikri..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                        {errors.text && <p className="mt-1 text-xs text-red-400">{errors.text.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Reyting</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={cn(
                                            'w-8 h-8',
                                            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <ImageUpload
                        value={selectedImage}
                        onChange={setSelectedImage}
                        label="Avatar (ixtiyoriy)"
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
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{selectedTestimonial ? 'Yangilash' : 'Qo\'shish'}</span>}
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteTestimonial}
                title="Fikrni o'chirish"
                message={`"${testimonialToDelete?.name}" mijozning fikrini o'chirishni xohlaysizmi?`}
            />
        </div>
    );
};

export default TestimonialsPage;