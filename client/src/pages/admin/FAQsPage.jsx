import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import api from '../../services/api';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { cn } from '../../utils/helpers';

const FAQsPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [faqToDelete, setFaqToDelete] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            setLoading(true);
            const response = await api.get('/faqs');
            setFaqs(response.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (faq = null) => {
        if (faq) {
            setSelectedFaq(faq);
            setValue('question', faq.question);
            setValue('answer', faq.answer);
            setValue('order', faq.order || 0);
        } else {
            setSelectedFaq(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFaq(null);
        reset();
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            if (selectedFaq) {
                await api.put(`/faqs/${selectedFaq._id}`, data);
            } else {
                await api.post('/faqs', data);
            }
            handleCloseModal();
            fetchFAQs();
        } catch (error) {
            alert(error.response?.data?.message || 'Xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteFaq = async () => {
        if (!faqToDelete) return;
        try {
            await api.delete(`/faqs/${faqToDelete._id}`);
            fetchFAQs();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
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
                    <h1 className="text-3xl font-bold text-white mb-2">Tez-tez So'raladigan Savollar</h1>
                    <p className="text-gray-400">FAQ'larni boshqaring</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yangi FAQ</span>
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
            >
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : faqs.length === 0 ? (
                    <div className="text-center py-20 glass rounded-2xl">
                        <p className="text-gray-400">FAQ'lar topilmadi</p>
                    </div>
                ) : (
                    faqs.map((faq, index) => (
                        <motion.div
                            key={faq._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass rounded-2xl p-6 group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-sm font-bold text-gray-500">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 ml-8">{faq.answer}</p>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(faq)}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-accent" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFaqToDelete(faq);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedFaq ? 'FAQ\'ni tahrirlash' : 'Yangi FAQ qo\'shish'}
                size="md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Savol <span className="text-red-400">*</span>
                        </label>
                        <input
                            {...register('question', { required: 'Savol kiritilishi shart' })}
                            type="text"
                            placeholder="Savol matni"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        {errors.question && <p className="mt-1 text-xs text-red-400">{errors.question.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Javob <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            {...register('answer', { required: 'Javob kiritilishi shart' })}
                            rows="5"
                            placeholder="Javob matni..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                        {errors.answer && <p className="mt-1 text-xs text-red-400">{errors.answer.message}</p>}
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
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{selectedFaq ? 'Yangilash' : 'Qo\'shish'}</span>}
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteFaq}
                title="FAQ'ni o'chirish"
                message="Bu FAQ'ni o'chirishni xohlaysizmi?"
            />
        </div>
    );
};

export default FAQsPage;