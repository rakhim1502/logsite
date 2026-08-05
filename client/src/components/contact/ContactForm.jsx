import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { cn } from '../../utils/helpers';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const planRef = useRef('');
    const [selectedPlan, setSelectedPlan] = useState('');

    // Sahifa yuklanganda localStorage'dan paketni o'qish va ko'rsatish
    useEffect(() => {
        const plan = localStorage.getItem('selectedPlan');
        if (plan) {
            planRef.current = plan;
            setSelectedPlan(plan);
            localStorage.removeItem('selectedPlan'); // Ko'rsatgandan keyin xotiradan tozalaymiz
        }
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Agar paket tanlangan bo'lsa, uni xabar matniga qo'shib yuboramiz
            const payload = selectedPlan
                ? { ...data, message: `[Paket: ${selectedPlan}]\n\n${data.message}` }
                : data;

            await api.post('/contact', payload);
            setSubmitStatus('success');
            reset();
            setSelectedPlan(''); // Yuborilgandan keyin paket belgisini ham olib tashlaymiz

            // 5 soniyadan keyin statusni tozalash
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus('error');
            console.error('Contact form error:', error);

            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Biz bilan bog'laning
                    </h3>
                    <p className="text-gray-400 mb-8">
                        Savollaringiz bormi? Formani to'ldiring va biz siz bilan tez orada bog'lanamiz.
                    </p>

                    {/* ✅ TANLANGAN PAKETNI KO'RSATISH QISMI */}
                    {selectedPlan && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center space-x-3"
                        >
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-300">Tanlangan paket:</p>
                                <p className="text-white font-bold text-lg">{selectedPlan}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-success/10 border border-success/30 flex items-center space-x-3"
                        >
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                            <p className="text-success text-sm">
                                Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
                            </p>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center space-x-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-400 text-sm">
                                Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki bizga to'g'ridan-to'g'ri bog'laning.
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name & Phone Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Ism <span className="text-red-400">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'Ism kiritilishi shart',
                                        minLength: { value: 2, message: 'Ism kamida 2 ta harf bo\'lishi kerak' }
                                    })}
                                    type="text"
                                    placeholder="Ismingiz"
                                    className={cn(
                                        'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                                        errors.name
                                            ? 'border-red-500/50 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-primary/50 focus:border-primary/50'
                                    )}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Telefon <span className="text-red-400">*</span>
                                </label>
                                <input
                                    {...register('phone', {
                                        required: 'Telefon raqami kiritilishi shart',
                                        pattern: {
                                            value: /^\+?(\()?[0-9]{1,3}(\))?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/,
                                            message: 'Noto\'g\'ri telefon raqami'
                                        }
                                    })}
                                    type="tel"
                                    placeholder="+998 90 123 45 67"
                                    className={cn(
                                        'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                                        errors.phone
                                            ? 'border-red-500/50 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-primary/50 focus:border-primary/50'
                                    )}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Business Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Biznes nomi
                                </label>
                                <input
                                    {...register('businessName')}
                                    type="text"
                                    placeholder="Kompaniya yoki biznes nomi"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    {...register('email', {
                                        required: 'Email kiritilishi shart',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Noto\'g\'ri email manzili'
                                        }
                                    })}
                                    type="email"
                                    placeholder="email@example.com"
                                    className={cn(
                                        'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300',
                                        errors.email
                                            ? 'border-red-500/50 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-primary/50 focus:border-primary/50'
                                    )}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Xabar <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                {...register('message', {
                                    required: 'Xabar kiritilishi shart',
                                    minLength: { value: 10, message: 'Xabar kamida 10 ta harf bo\'lishi kerak' }
                                })}
                                rows="5"
                                placeholder="Loyihangiz haqida qisqacha ma'lumot bering..."
                                className={cn(
                                    'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none',
                                    errors.message
                                        ? 'border-red-500/50 focus:ring-red-500/50'
                                        : 'border-white/10 focus:ring-primary/50 focus:border-primary/50'
                                )}
                            />
                            {errors.message && (
                                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={cn(
                                'w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2',
                                isSubmitting
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50'
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Yuborilmoqda...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Xabarni yuborish</span>
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactForm;