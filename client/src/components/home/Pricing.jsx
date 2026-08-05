// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PricingCard from './PricingCard';
// import { cn } from '../../utils/helpers';

const Pricing = () => {
    const navigate = useNavigate();

    const handleSelectPlan = (planName) => {
        localStorage.setItem('selectedPlan', planName);
        navigate('/contact');
    };

    const plans = [
        {
            name: 'Starter',
            description: 'Kichik bizneslar va startaplar uchun',
            price: 1185000, // Bir martalik to'lov
            features: [
                { text: 'Landing Page (1 sahifa)', included: true },
                { text: 'Responsive dizayn', included: true },
                { text: 'SEO asoslari', included: true },
                { text: 'Contact forma', included: true },
                { text: '1 oy bepul support', included: true },
                { text: 'Admin panel', included: false },
                { text: 'Blog funksiyasi', included: false },
                { text: 'Payment integratsiya', included: false },
            ],
            buttonText: 'Boshlash'
        },
        {
            name: 'Business',
            description: "O'sib borayotgan kompaniyalar uchun",
            price: 3600000, // Bir martalik to'lov
            features: [
                { text: 'Corporate Website (5-10 sahifa)', included: true },
                { text: 'Premium UI/UX dizayn', included: true },
                { text: "To'liq SEO optimizatsiya", included: true },
                { text: 'Admin panel', included: true },
                { text: 'Blog funksiyasi', included: true },
                { text: '3 oy bepul support', included: true },
                { text: 'Google Analytics', included: true },
                { text: 'Payment integratsiya', included: false },
            ],
            buttonText: 'Tanlash',
            highlighted: true
        },
        {
            name: 'Premium',
            description: 'Katta bizneslar va e-commerce uchun',
            price: 7000000, // Bir martalik to'lov
            features: [
                { text: 'E-Commerce yoki Custom Website', included: true },
                { text: 'Awwwards darajasidagi dizayn', included: true },
                { text: 'Advanced SEO va Marketing', included: true },
                { text: "To'liq Admin Panel + CRM", included: true },
                { text: 'Payment integratsiya (Payme/Click)', included: true },
                { text: '6 oy bepul support', included: true },
                { text: 'Telegram Bot', included: true },
                { text: 'Performance optimizatsiya', included: true },
            ],
            buttonText: 'Tanlash'
        }
    ];

    return (
        <section id="pricing" className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
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
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm text-gray-300">Narxlar</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Biznesingiz uchun </span>
                        <span className="gradient-text">eng mos paket</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        Shaffof narxlar, yashirin to'lovlar yo'q. Bir martalik to'lov — umrbod sayt!
                    </p>

                    {/* Bir martalik to'lov haqida ma'lumot */}
                    <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-success/10 border border-success/30">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="text-success font-medium">
                            Barcha narxlar bir martalik to'lov
                        </span>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">                    {plans.map((plan, index) => (
                    <PricingCard
                        key={index}
                        plan={plan}
                        index={index}
                        isHighlighted={plan.highlighted}
                        onSelect={() => handleSelectPlan(`${plan.name} - ${plan.price === 'Custom' ? 'Custom' : plan.price.toLocaleString()} UZS`)}
                    />
                ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        Barcha narxlar UZS (O'zbek so'mi) da ko'rsatilgan. Qo'shimcha savollaringiz bormi?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center space-x-2 mt-4 text-accent hover:text-white transition-colors"
                    >
                        <span>Biz bilan bog'laning</span>
                        <svg
                            className="w-4 h-4"
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

export default Pricing;