import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Headphones } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Statistics = () => {
    const { t } = useLanguage();

    const stats = [
        {
            icon: TrendingUp,
            value: '10+',
            label: t('stats.projects'),
            color: 'from-primary to-blue-500',
            delay: 0
        },
        {
            icon: Users,
            value: '7+',
            label: t('stats.clients'),
            color: 'from-accent to-cyan-500',
            delay: 0.1
        },
        {
            icon: Award,
            value: '99%',
            label: t('stats.satisfaction'),
            color: 'from-success to-emerald-500',
            delay: 0.2
        },
        {
            icon: Headphones,
            value: '24/7',
            label: t('stats.support'),
            color: 'from-purple-500 to-pink-500',
            delay: 0.3
        }
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: stat.delay }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="group relative"
                            >
                                <div className="glass rounded-3xl p-8 text-center hover-lift relative overflow-hidden">
                                    {/* Gradient Background on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5 shadow-lg`}
                                    >
                                        <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </motion.div>

                                    {/* Value */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: stat.delay + 0.2, type: 'spring' }}
                                        className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                                    >
                                        {stat.value}
                                    </motion.div>

                                    {/* Label */}
                                    <div className="text-gray-400 text-sm md:text-base font-medium">
                                        {stat.label}
                                    </div>

                                    {/* Decorative Element */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Statistics;