import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Loader2, Save, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import { cn } from '../../utils/helpers';

const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);

    const { register, handleSubmit,   setValue, formState: { errors } } = useForm();

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await api.get('/settings');
            const settings = response.data;

            setValue('siteTitle', settings.siteTitle);
            setValue('tagline', settings.tagline);
            setValue('contactEmail', settings.contactEmail);
            setValue('contactPhone', settings.contactPhone);
            setValue('telegram', settings.socialLinks?.telegram || '');
            setValue('instagram', settings.socialLinks?.instagram || '');
            setValue('facebook', settings.socialLinks?.facebook || '');

            if (settings.logoPath) {
                setLogoPreview(`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${settings.logoPath}`);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [setValue]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            const formData = new FormData();
            formData.append('siteTitle', data.siteTitle);
            formData.append('tagline', data.tagline);
            formData.append('contactEmail', data.contactEmail);
            formData.append('contactPhone', data.contactPhone);
            formData.append('socialLinks', JSON.stringify({
                telegram: data.telegram,
                instagram: data.instagram,
                facebook: data.facebook
            }));

            if (logoPreview instanceof File) {
                formData.append('logo', logoPreview);
            }

            await api.put('/settings', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccessMessage('Sozlamalar muvaffaqiyatli saqlandi!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            alert(error.response?.data?.message || 'Xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Sayt Sozlamalari</h1>
                <p className="text-gray-400">Saytning umumiy sozlamalarini boshqaring</p>
            </motion.div>

            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-success/10 border border-success/30 flex items-center space-x-3"
                >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <p className="text-success text-sm">{successMessage}</p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-2xl p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Umumiy Sozlamalar</h2>

                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Sayt Nomi <span className="text-red-400">*</span>
                                </label>
                                <input
                                    {...register('siteTitle', { required: 'Sayt nomi kiritilishi shart' })}
                                    type="text"
                                    placeholder="Log.Site"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {errors.siteTitle && <p className="mt-1 text-xs text-red-400">{errors.siteTitle.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Shior</label>
                                <input
                                    {...register('tagline')}
                                    type="text"
                                    placeholder="Biznesingiz uchun professional web-saytlar"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        <ImageUpload
                            value={logoPreview}
                            onChange={setLogoPreview}
                            label="Sayt Logosi"
                        />
                    </div>
                </motion.div>

                {/* Contact Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-2xl p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Kontakt Ma'lumotlari</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('contactEmail', {
                                    required: 'Email kiritilishi shart',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Noto\'g\'ri email'
                                    }
                                })}
                                type="email"
                                placeholder="info@log.site"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.contactEmail && <p className="mt-1 text-xs text-red-400">{errors.contactEmail.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Telefon <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register('contactPhone', { required: 'Telefon kiritilishi shart' })}
                                type="tel"
                                placeholder="+998 90 123 45 67"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {errors.contactPhone && <p className="mt-1 text-xs text-red-400">{errors.contactPhone.message}</p>}
                        </div>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-2xl p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Ijtimoiy Tarmoqlar</h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Telegram</label>
                            <input
                                {...register('telegram')}
                                type="url"
                                placeholder="https://t.me/logsite"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                            <input
                                {...register('instagram')}
                                type="url"
                                placeholder="https://instagram.com/logsite"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                            <input
                                {...register('facebook')}
                                type="url"
                                placeholder="https://facebook.com/logsite"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-end"
                >
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                            'inline-flex items-center space-x-2 px-8 py-3 rounded-xl font-medium text-white transition-all duration-300',
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
                                <Save className="w-5 h-5" />
                                <span>Sozlamalarni saqlash</span>
                            </>
                        )}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default SettingsPage;