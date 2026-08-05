import { motion } from 'framer-motion';
// import { useLanguage } from '../../context/LanguageContext';
import { useFetch } from '../../hooks/useFetch';
import ServiceCard from './ServiceCard';
import {
    // Building2,
    // ShoppingCart,
    // Calendar,
    // Database,
    // Settings,
    // Shield,
    // Search,
    // Wrench,
    // Send,
    // CreditCard,
    Loader2
} from 'lucide-react';

const Services = () => {
    const { data, loading, error } = useFetch('/services');

    // Fallback data (agar backend'dan ma'lumot kelmasa)
    const fallbackServices = [
        {
            _id: '1',
            title: 'Landing Page',
            description: 'Yuqori konversiyali, zamonaviy va tez yuklanuvchi landing sahifalar.',
            icon: 'Layout',
            order: 1
        },
        {
            _id: '2',
            title: 'Corporate Website',
            description: 'Kompaniyangiz imijini aks ettiruvchi professional veb-saytlar.',
            icon: 'Building2',
            order: 2
        },
        {
            _id: '3',
            title: 'E-Commerce',
            description: 'To\'liq funksional onlayn do\'konlar, to\'lov tizimlari integratsiyasi bilan.',
            icon: 'ShoppingCart',
            order: 3
        },
        {
            _id: '4',
            title: 'Booking System',
            description: 'Restoran, mehmonxona va xizmatlar uchun band qilish tizimlari.',
            icon: 'Calendar',
            order: 4
        },
        {
            _id: '5',
            title: 'CRM Tizimi',
            description: 'Mijozlar bilan munosabatlarni boshqarish uchun maxsus tizimlar.',
            icon: 'Database',
            order: 5
        },
        {
            _id: '6',
            title: 'ERP Tizimi',
            description: 'Korxona resurslarini rejalashtirish va boshqarish tizimlari.',
            icon: 'Settings',
            order: 6
        },
        {
            _id: '7',
            title: 'Admin Panel',
            description: 'Qulay va xavfsiz boshqaruv paneli, barcha ma\'lumotlarni nazorat qiling.',
            icon: 'Shield',
            order: 7
        },
        {
            _id: '8',
            title: 'SEO Optimizatsiya',
            description: 'Qidiruv tizimlarida yuqori o\'rinlarni egallash uchun SEO xizmatlari.',
            icon: 'Search',
            order: 8
        },
        {
            _id: '9',
            title: 'Website Maintenance',
            description: 'Saytingizni doimiy yangilab, xavfsiz va tez ishlatib turamiz.',
            icon: 'Wrench',
            order: 9
        },
        {
            _id: '10',
            title: 'Telegram Bot',
            description: 'Biznesingiz uchun avtomatlashtirilgan Telegram botlar yaratish.',
            icon: 'Send',
            order: 10
        },
        {
            _id: '11',
            title: 'Payment Integration',
            description: 'Payme, Click va boshqa to\'lov tizimlarini integratsiya qilish.',
            icon: 'CreditCard',
            order: 11
        }
    ];

    const services = data && data.length > 0 ? data : fallbackServices;

    return (
        <section id="services" className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm text-gray-300">Bizning Xizmatlar</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Biznesingiz uchun </span>
                        <span className="gradient-text">eng zamonaviy yechimlar</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        Kichik landing sahifalardan tortib, murakkab ERP tizimlarigacha —
                        barcha ehtiyojlaringiz uchun professional xizmatlar.
                    </p>
                </motion.div>

                {/* Services Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-400">Xizmatlarni yuklashda xatolik yuz berdi</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service._id || index}
                                service={service}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">
                        Sizga kerakli xizmatni topa olmadingizmi?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl glass text-white font-medium hover:bg-white/10 transition-all duration-300 group"
                    >
                        <span>Biz bilan bog'laning</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;