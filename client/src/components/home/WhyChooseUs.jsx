import { motion } from 'framer-motion';
import {
    Zap,
    Search,
    Smartphone,
    Palette,
    Shield,
    LayoutDashboard,
    Headphones,
    Code2
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const WhyChooseUs = () => {
    const features = [
        {
            icon: Zap,
            title: 'Tezkor',
            description: '0.5 soniyadan kam yuklanish vaqti. Google PageSpeed 95+ ball.',
            gradient: 'from-yellow-500 to-orange-500',
            size: 'large',
            visual: 'speed'
        },
        {
            icon: Search,
            title: 'SEO Friendly',
            description: 'Qidiruv tizimlarida birinchi o\'rinlarda.',
            gradient: 'from-primary to-blue-500',
            size: 'medium',
            visual: 'chart'
        },
        {
            icon: Smartphone,
            title: 'Responsive',
            description: 'Barcha qurilmalarda mukammal ko\'rinish.',
            gradient: 'from-accent to-cyan-500',
            size: 'medium',
            visual: 'devices'
        },
        {
            icon: Palette,
            title: 'Premium UI',
            description: 'Awwwards darajasidagi dizayn va animatsiyalar.',
            gradient: 'from-purple-500 to-pink-500',
            size: 'large',
            visual: 'design'
        },
        {
            icon: Shield,
            title: 'Xavfsiz',
            description: 'SSL, JWT, bcrypt va boshqa xavfsizlik texnologiyalari.',
            gradient: 'from-success to-emerald-500',
            size: 'medium',
            visual: 'shield'
        },
        {
            icon: LayoutDashboard,
            title: 'Admin Panel',
            description: 'Qulay boshqaruv paneli orqali saytni to\'liq nazorat qiling.',
            gradient: 'from-indigo-500 to-purple-500',
            size: 'medium',
            visual: 'dashboard'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Doimo aloqadamiz. Tezkor yordam va maslahat.',
            gradient: 'from-rose-500 to-red-500',
            size: 'medium',
            visual: 'support'
        },
        {
            icon: Code2,
            title: 'Professional Kod',
            description: 'Toza, maintainable va scalable kod arxitekturasi.',
            gradient: 'from-teal-500 to-cyan-500',
            size: 'medium',
            visual: 'code'
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 12, repeat: Infinity, delay: 3 }}
                className="absolute bottom-1/4 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm text-gray-300">Nega Aynan Biz?</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Biznesingiz uchun </span>
                        <span className="gradient-text">eng yaxshi tanlov</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        3+ yillik tajriba, 10+ muvaffaqiyatli loyiha va 99% mamnun mijozlar.
                        Biz faqat sifat va natijaga kafolat beramiz.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isLarge = feature.size === 'large';

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className={cn(
                                    'group relative',
                                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                                )}
                            >
                                <div className="relative h-full glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-white/20">
                                    {/* Animated Gradient Background on Hover */}
                                    <div className={cn(
                                        'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                                        `bg-gradient-to-br ${feature.gradient}`
                                    )} />

                                    {/* Glow Effect */}
                                    <div className={cn(
                                        'absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500',
                                        `bg-gradient-to-br ${feature.gradient}`
                                    )} />

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className={cn(
                                                'w-14 h-14 rounded-2xl bg-gradient-to-br p-0.5 shadow-lg mb-4 flex-shrink-0',
                                                feature.gradient
                                            )}
                                        >
                                            <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                            {feature.description}
                                        </p>

                                        {/* Visual Element */}
                                        <div className="mt-4">
                                            {feature.visual === 'speed' && (
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: '95%' }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.5, delay: 0.3 }}
                                                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                                                        />
                                                    </div>
                                                    <span className="text-sm font-bold text-white">95+</span>
                                                </div>
                                            )}

                                            {feature.visual === 'chart' && (
                                                <div className="flex items-end space-x-1 h-12">
                                                    {[40, 60, 45, 80, 65, 90, 75].map((height, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ height: 0 }}
                                                            whileInView={{ height: `${height}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.8, delay: i * 0.1 }}
                                                            className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {feature.visual === 'devices' && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-12 border-2 border-accent/50 rounded-lg" />
                                                    <div className="w-12 h-10 border-2 border-accent/50 rounded" />
                                                    <div className="w-16 h-12 border-2 border-accent/50 rounded" />
                                                </div>
                                            )}

                                            {feature.visual === 'design' && (
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[...Array(6)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="h-6 rounded bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/10"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {feature.visual === 'shield' && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                                    <span className="text-xs text-success font-medium">Himoyalangan</span>
                                                </div>
                                            )}

                                            {feature.visual === 'dashboard' && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="h-8 rounded bg-indigo-500/20 border border-white/10" />
                                                    <div className="h-8 rounded bg-purple-500/20 border border-white/10" />
                                                </div>
                                            )}

                                            {feature.visual === 'support' && (
                                                <div className="flex items-center space-x-2">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="w-3 h-3 rounded-full bg-success"
                                                    />
                                                    <span className="text-xs text-gray-400">Onlayn</span>
                                                </div>
                                            )}

                                            {feature.visual === 'code' && (
                                                <div className="font-mono text-xs text-gray-500 space-y-1">
                                                    <div><span className="text-purple-400">const</span> <span className="text-accent">quality</span> = <span className="text-success">'premium'</span>;</div>
                                                    <div><span className="text-purple-400">export</span> <span className="text-accent">default</span> LogSite;</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Decorative Corner */}
                                    <div className={cn(
                                        'absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500',
                                        `bg-gradient-to-br ${feature.gradient}`
                                    )} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;