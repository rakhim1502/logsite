import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedBackground from './AnimatedBackground';
import FloatingElements from './FloatingElements';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <AnimatedBackground />
            <FloatingElements />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-sm text-gray-300">Premium Web Agency</span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                        >
                            <span className="text-white">{t('hero.title').split(' ').slice(0, 2).join(' ')}</span>
                            <br />
                            <span className="gradient-text">{t('hero.title').split(' ').slice(2).join(' ')}</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <Link
                                to="/contact"
                                className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <span>{t('hero.cta1')}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/portfolio"
                                className="group w-full sm:w-auto px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Play className="w-5 h-5" />
                                <span>{t('hero.cta2')}</span>
                            </Link>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold gradient-text">10+</div>
                                <div className="text-xs text-gray-400">Loyihalar</div>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <div className="text-3xl font-bold gradient-text">7+</div>
                                <div className="text-xs text-gray-400">Mijozlar</div>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <div className="text-3xl font-bold gradient-text">99%</div>
                                <div className="text-xs text-gray-400">Mamnunlik</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - 3D Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Laptop/Screen */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            {/* Browser Window */}
                            <div className="relative glass rounded-3xl p-6 shadow-2xl shadow-primary/20">
                                {/* Browser Header */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <div className="flex-1 ml-4 h-6 rounded-lg bg-white/5" />
                                </div>

                                {/* Code/Dashboard Content */}
                                <div className="space-y-3">
                                    <div className="h-4 bg-gradient-to-r from-primary/40 to-accent/40 rounded w-3/4" />
                                    <div className="h-4 bg-white/10 rounded w-1/2" />
                                    <div className="h-4 bg-white/10 rounded w-5/6" />

                                    <div className="pt-4 grid grid-cols-2 gap-3">
                                        <div className="h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10" />
                                        <div className="h-24 rounded-xl bg-gradient-to-br from-accent/20 to-success/20 border border-white/10" />
                                    </div>

                                    <div className="pt-2 space-y-2">
                                        <div className="h-3 bg-white/10 rounded w-full" />
                                        <div className="h-3 bg-white/10 rounded w-4/5" />
                                        <div className="h-3 bg-white/10 rounded w-3/5" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    opacity: { delay: 0.8 },
                                    scale: { delay: 0.8 },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute -top-8 -right-8 glass rounded-2xl p-4 shadow-xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success to-emerald-500 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">Deployed</div>
                                        <div className="text-gray-400 text-xs">Just now</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, 15, 0]
                                }}
                                transition={{
                                    opacity: { delay: 1 },
                                    scale: { delay: 1 },
                                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">+247%</div>
                                        <div className="text-gray-400 text-xs">Growth</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-50" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-2 rounded-full bg-accent"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;