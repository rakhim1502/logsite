import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Loader2, X, ExternalLink } from 'lucide-react';
import api from '../../services/api';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ImageUpload from '../../components/admin/ImageUpload';
import { cn } from '../../utils/helpers';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const categories = ['Medical', 'Restaurant', 'Travel', 'Education', 'Construction', 'Rental', 'Boshqa'];

    // Loyihalarni yuklash
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await api.get('/projects');
            setProjects(response.data.projects || response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert('Loyihalarni yuklashda xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    // Modalni ochish (Create/Edit)
    const handleOpenModal = (project = null) => {
        if (project) {
            setSelectedProject(project);
            setValue('title', project.title);
            setValue('slug', project.slug);
            setValue('description', project.description);
            setValue('category', project.category);
            setValue('liveLink', project.liveLink || '');
            setValue('technologies', project.technologies?.join(', ') || '');
            setSelectedImage(project.imagePath ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${project.imagePath}` : null);
        } else {
            setSelectedProject(null);
            reset();
            setSelectedImage(null);
        }
        setIsModalOpen(true);
    };

    // Modalni yopish
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setSelectedImage(null);
        reset();
    };

    // Loyihani saqlash (Create/Update)
    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('slug', data.slug);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('liveLink', data.liveLink || '');

            // Texnologiyalarni array'ga aylantirish
            const technologies = data.technologies
                ? data.technologies.split(',').map(t => t.trim()).filter(t => t)
                : [];
            formData.append('technologies', JSON.stringify(technologies));

            // Rasm
            if (selectedImage instanceof File) {
                formData.append('image', selectedImage);
            }

            if (selectedProject) {
                // Update
                await api.put(`/projects/${selectedProject._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Create
                await api.post('/projects', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            handleCloseModal();
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert(error.response?.data?.message || 'Loyihani saqlashda xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
        }
    };

    // O'chirish dialogini ochish
    const handleOpenDeleteDialog = (project) => {
        setProjectToDelete(project);
        setIsDeleteDialogOpen(true);
    };

    // Loyihani o'chirish
    const handleDeleteProject = async () => {
        if (!projectToDelete) return;

        try {
            await api.delete(`/projects/${projectToDelete._id}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Loyihani o\'chirishda xatolik yuz berdi');
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Loyihalar</h1>
                    <p className="text-gray-400">Barcha loyihalarni boshqaring</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yangi loyiha</span>
                </button>
            </motion.div>

            {/* Projects Grid */}
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
                ) : projects.length === 0 ? (
                    <div className="col-span-full text-center py-20 glass rounded-2xl">
                        <p className="text-gray-400">Loyihalar topilmadi</p>
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.imagePath ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${project.imagePath}` : 'https://via.placeholder.com/400x300/0F172A/2563EB?text=No+Image'}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={() => handleOpenDeleteDialog(project)}
                                        className="p-2 rounded-lg bg-red-500/80 backdrop-blur-sm hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                    <span className="px-2 py-1 rounded-lg text-xs font-medium bg-primary/20 text-accent">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{project.description}</p>

                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-1 text-sm text-accent hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        <span>Live sayt</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedProject ? 'Loyihani tahrirlash' : 'Yangi loyiha qo\'shish'}
                size="lg"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nomi <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('title', { required: 'Nomi kiritilishi shart' })}
                                type="text"
                                placeholder="Loyiha nomi"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Slug <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('slug', { required: 'Slug kiritilishi shart' })}
                                type="text"
                                placeholder="loyiha-nomi"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.slug && (
                                <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Kategoriya <span className="text-red-400">*</span>
                        </label>
                        <select
                            {...register('category', { required: 'Kategoriya tanlanishi shart' })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="" className="bg-background">Kategoriyani tanlang</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-background">{cat}</option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tavsif <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            {...register('description', { required: 'Tavsif kiritilishi shart' })}
                            rows="4"
                            placeholder="Loyiha haqida qisqacha..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Texnologiyalar
                        </label>
                        <input
                            {...register('technologies')}
                            type="text"
                            placeholder="React, Node.js, MongoDB (vergul bilan ajrating)"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Live Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Live Link
                        </label>
                        <input
                            {...register('liveLink')}
                            type="url"
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Image Upload */}
                    <ImageUpload
                        value={selectedImage}
                        onChange={setSelectedImage}
                        label="Loyiha rasmi"
                        required={!selectedProject}
                    />

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="flex-1 py-3 rounded-xl glass text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                        >
                            <X className="w-5 h-5" />
                            <span>Bekor qilish</span>
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                'flex-1 py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center space-x-2',
                                isSubmitting
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50'
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Saqlanmoqda...</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    <span>{selectedProject ? 'Yangilash' : 'Qo\'shish'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteProject}
                title="Loyihani o'chirish"
                message={`"${projectToDelete?.title}" loyihasini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.`}
                confirmText="O'chirish"
                cancelText="Bekor qilish"
            />
        </div>
    );
};

export default ProjectsPage;