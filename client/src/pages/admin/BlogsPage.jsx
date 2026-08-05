import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Loader2, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ImageUpload from '../../components/admin/ImageUpload';
import { cn } from '../../utils/helpers';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const categories = ['Technology', 'Business', 'Design', 'Marketing', 'News'];

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await api.get('/blogs');
            setBlogs(response.data.blogs || response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setSelectedBlog(blog);
            setValue('title', blog.title);
            setValue('slug', blog.slug);
            setValue('excerpt', blog.excerpt);
            setValue('content', blog.content);
            setValue('category', blog.category);
            setValue('author', blog.author);
            setSelectedImage(blog.imagePath ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${blog.imagePath}` : null);
        } else {
            setSelectedBlog(null);
            reset();
            setSelectedImage(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
        setSelectedImage(null);
        reset();
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('slug', data.slug);
            formData.append('excerpt', data.excerpt);
            formData.append('content', data.content);
            formData.append('category', data.category);
            formData.append('author', data.author || 'Log.Site Team');

            if (selectedImage instanceof File) {
                formData.append('image', selectedImage);
            }

            if (selectedBlog) {
                await api.put(`/blogs/${selectedBlog._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            handleCloseModal();
            fetchBlogs();
        } catch (error) {
            alert(error.response?.data?.message || 'Xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteBlog = async () => {
        if (!blogToDelete) return;
        try {
            await api.delete(`/blogs/${blogToDelete._id}`);
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('O\'chirishda xatolik yuz berdi');
        }
    };

    const toggleActive = async (blog) => {
        try {
            await api.put(`/blogs/${blog._id}`, { isActive: !blog.isActive });
            fetchBlogs();
        } catch (error) {
            console.error('Error toggling blog active status:', error);
            alert('Xatolik yuz berdi');
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
                    <h1 className="text-3xl font-bold text-white mb-2">Blog Maqolalari</h1>
                    <p className="text-gray-400">Barcha maqolalarni boshqaring</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yangi maqola</span>
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl overflow-hidden"
            >
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">Maqolalar topilmadi</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-white/5">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Rasm</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Sarlavha</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Kategoriya</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Muallif</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Holat</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog, index) => (
                                    <motion.tr
                                        key={blog._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={blog.imagePath ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${blog.imagePath}` : 'https://via.placeholder.com/100x100/0F172A/2563EB?text=Blog'}
                                                alt={blog.title}
                                                className="w-20 h-14 rounded-lg object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium">{blog.title}</div>
                                            <div className="text-xs text-gray-400 truncate max-w-xs">{blog.excerpt}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/20 text-accent">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">{blog.author}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(blog)}
                                                className={cn(
                                                    'px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1',
                                                    blog.isActive ? 'bg-success/20 text-success' : 'bg-red-500/20 text-red-400'
                                                )}
                                            >
                                                {blog.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                <span>{blog.isActive ? 'Faol' : 'Nofaol'}</span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleOpenModal(blog)}
                                                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4 text-accent" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setBlogToDelete(blog);
                                                        setIsDeleteDialogOpen(true);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedBlog ? 'Maqolani tahrirlash' : 'Yangi maqola qo\'shish'}
                size="lg"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Sarlavha <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('title', { required: 'Sarlavha kiritilishi shart' })}
                                type="text"
                                placeholder="Maqola sarlavhasi"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Slug <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('slug', { required: 'Slug kiritilishi shart' })}
                                type="text"
                                placeholder="maqola-sarlavhasi"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Kategoriya <span className="text-red-400">*</span>
                            </label>
                            <select
                                {...register('category', { required: 'Kategoriya tanlanishi shart' })}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="" className="bg-background">Tanlang</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-background">{cat}</option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Muallif</label>
                            <input
                                {...register('author')}
                                type="text"
                                placeholder="Log.Site Team"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Qisqa tavsif (excerpt) <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            {...register('excerpt', { required: 'Qisqa tavsif kiritilishi shart' })}
                            rows="2"
                            placeholder="Maqolaning qisqa tavsifi..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                        {errors.excerpt && <p className="mt-1 text-xs text-red-400">{errors.excerpt.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            To'liq kontent <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            {...register('content', { required: 'Kontent kiritilishi shart' })}
                            rows="10"
                            placeholder="Maqolaning to'liq matni..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono text-sm"
                        />
                        {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content.message}</p>}
                    </div>

                    <ImageUpload
                        value={selectedImage}
                        onChange={setSelectedImage}
                        label="Maqola rasmi"
                        required={!selectedBlog}
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
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{selectedBlog ? 'Yangilash' : 'Qo\'shish'}</span>}
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteBlog}
                title="Maqolani o'chirish"
                message={`"${blogToDelete?.title}" maqolasini o'chirishni xohlaysizmi?`}
            />
        </div>
    );
};

export default BlogsPage;