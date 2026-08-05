import { motion } from 'framer-motion';
import {
    Search,
    Palette,
    Code2,
    Server,
    TestTube2,
    Rocket,
    Headphones
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const Process = () => {
    const steps = [
        {
            icon: Search,
            number: '01',
            title: 'Tahlil',
            description: 'Biznesingizni chuqur o\'rganamiz, maqsadlarni aniqlaymiz va raqobatchilarni tahlil qilamiz. Sizning ehtiyojlaringizga mos strategiya ishlab chiqamiz.',
            gradient: 'from-primary to-blue-500',
            duration: '1-2 kun'
        },
        {
            icon: Palette,
            number: '02',
            title: 'UI/UX Dizayn',
            description: 'Foydalanuvchi tajribasini birinchi o\'ringa qo\'yib, zamonaviy va intuitiv interfeys dizaynini yaratamiz. Har bir piksel mukammal bo\'ladi.',
            gradient: 'from-accent to-cyan-500',
            duration: '3-5 kun'
        },
        {
            icon: Code2,
            number: '03',
            title: 'Frontend',
            description: 'React, Tailwind CSS va Framer Motion yordamida tezkor, responsive va animatsiyalarga boy frontend qismini yaratamiz.',
            gradient: 'from-purple-500 to-pink-500',
            duration: '5-7 kun'
        },
        {
            icon: Server,
            number: '04',
            title: 'Backend',
            description: 'Node.js, Express va MongoDB bilan xavfsiz, scalable va yuqori samarali backend arxitekturasini quramiz.',
            gradient: 'from-success to-emerald-500',
            duration: '5-10 kun'
        },
        {
            icon: TestTube2,
            number: '05',
            title: 'Testing',
            description: 'Har bir funksiyani qattiq sinovdan o\'tkazamiz. Bug\'lar, xavfsizlik zaifliklari va performance muammolarini bartaraf etamiz.',
            gradient: 'from-yellow-500 to-orange-500',
            duration: '2-3 kun'
        },
        {
            icon: Rocket,
            number: '06',
            title: 'Deploy',
            description: 'Saytingizni production muhitga chiqaramiz. SSL, CDN, SEO sozlamalari va monitoring tizimini o\'rnatamiz.',
            gradient: 'from-rose-500 to-red-500',
            duration: '1 kun'
        },
        {
            icon: Headphones,
            number: '07',
            title: 'Support',
            description: 'Loyiha topshirilgandan keyin ham doimo yoningizdamiz. 24/7 texnik yordam, yangilanishlar va optimizatsiya.',
            gradient: 'from-indigo-500 to-purple-500',
            duration: 'Doimiy'
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 12, repeat: Infinity, delay: 3 }}
                className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm text-gray-300">Ish Jarayonimiz</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">G'oyadan </span>
                        <span className="gradient-text">muvaffaqiyatgacha</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        Har bir loyihani 7 bosqichli, sinovdan o'tgan metodologiyamiz asosida amalga oshiramiz.
                        Shaffof, samarali va natijaga yo'naltirilgan.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />

                    {/* Animated Progress Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-primary via-accent to-success hidden lg:block origin-top"
                    />

                    {/* Steps */}
                    <div className="space-y-12 lg:space-y-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className={cn(
                                        'relative flex items-center',
                                        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    )}
                                >
                                    {/* Content Card */}
                                    <div className={cn(
                                        'w-full lg:w-5/12',
                                        isEven ? 'lg:pr-12' : 'lg:pl-12'
                                    )}>
                                        <motion.div
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                            className="group relative glass rounded-3xl p-8 overflow-hidden"
                                        >
                                            {/* Gradient Background on Hover */}
                                            <div className={cn(
                                                'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                                                `bg-gradient-to-br ${step.gradient}`
                                            )} />

                                            {/* Glow Effect */}
                                            <div className={cn(
                                                'absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500',
                                                `bg-gradient-to-br ${step.gradient}`
                                            )} />

                                            {/* Content */}
                                            <div className="relative z-10">
                                                {/* Number */}
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.2, type: 'spring' }}
                                                    className={cn(
                                                        'text-6xl font-bold bg-gradient-to-br bg-clip-text text-transparent opacity-20 mb-4',
                                                        step.gradient
                                                    )}
                                                >
                                                    {step.number}
                                                </motion.div>

                                                {/* Icon */}
                                                <motion.div
                                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className={cn(
                                                        'w-14 h-14 rounded-2xl bg-gradient-to-br p-0.5 shadow-lg mb-4 inline-block',
                                                        step.gradient
                                                    )}
                                                >
                                                    <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                                        <Icon className="w-7 h-7 text-white" />
                                                    </div>
                                                </motion.div>

                                                {/* Title */}
                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                                                    {step.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                                    {step.description}
                                                </p>

                                                {/* Duration Badge */}
                                                <div className={cn(
                                                    'inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white border border-white/10',
                                                    `bg-gradient-to-r ${step.gradient}`
                                                )}>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{step.duration}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Center Node (Desktop) */}
                                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3, type: 'spring' }}
                                            whileHover={{ scale: 1.2 }}
                                            className={cn(
                                                'w-16 h-16 rounded-full bg-gradient-to-br p-0.5 shadow-2xl',
                                                step.gradient
                                            )}
                                        >
                                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Empty Space (Desktop) */}
                                    <div className="hidden lg:block w-5/12" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
                        {/* Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-success/10" />

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Loyihangizni bugun boshlang
                            </h3>
                            <p className="text-gray-400 mb-8">
                                Bepul konsultatsiya orqali biznesingiz uchun eng yaxshi yechimni toping
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                            >
                                <span>Bepul konsultatsiya</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;