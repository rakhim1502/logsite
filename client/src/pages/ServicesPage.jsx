import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import ServiceCard from '../components/home/ServiceCard';
import SEO from '../components/SEO';
import { Loader2 } from 'lucide-react';

const ServicesPage = () => {
    const { data, loading } = useFetch('/services');

    const fallbackServices = [
        { _id: '1', title: 'Landing Page', description: 'Yuqori konversiyali landing sahifalar.', icon: 'Layout' },
        { _id: '2', title: 'Corporate Website', description: 'Professional corporate saytlar.', icon: 'Building2' },
        { _id: '3', title: 'E-Commerce', description: 'To\'liq funksional onlayn do\'konlar.', icon: 'ShoppingCart' },
        { _id: '4', title: 'Booking System', description: 'Band qilish tizimlari.', icon: 'Calendar' },
        { _id: '5', title: 'CRM Tizimi', description: 'Mijozlar bilan munosabatlarni boshqarish.', icon: 'Database' },
        { _id: '6', title: 'ERP Tizimi', description: 'Korxona resurslarini boshqarish.', icon: 'Settings' },
        { _id: '7', title: 'Admin Panel', description: 'Qulay boshqaruv paneli.', icon: 'Shield' },
        { _id: '8', title: 'SEO Optimizatsiya', description: 'Qidiruv tizimlarida yuqori o\'rinlar.', icon: 'Search' },
        { _id: '9', title: 'Website Maintenance', description: 'Saytning doimiy qo\'llab-quvvatlanishi.', icon: 'Wrench' },
        { _id: '10', title: 'Telegram Bot', description: 'Avtomatlashtirilgan botlar.', icon: 'Send' },
        { _id: '11', title: 'Payment Integration', description: 'To\'lov tizimlari integratsiyasi.', icon: 'CreditCard' },
    ];

    const services = data && data.length > 0 ? data : fallbackServices;

    return (
        <>
            <SEO
                title="Xizmatlar - Log.Site"
                description="Landing page, corporate website, e-commerce, CRM, ERP, admin panel, SEO va boshqa professional web xizmatlar."
                url="https://log.site/services"
            />

            <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-sm text-gray-300">Bizning Xizmatlar</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">Professional </span>
                            <span className="gradient-text">Web Xizmatlar</span>
                        </h1>

                        <p className="text-lg text-gray-400">
                            Kichik landing sahifalardan tortib, murakkab ERP tizimlarigacha — barcha ehtiyojlaringiz uchun.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-accent animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {services.map((service, index) => (
                                <ServiceCard key={service._id || index} service={service} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ServicesPage;