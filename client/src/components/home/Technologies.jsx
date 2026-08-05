import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Technologies = () => {
    const technologies = [
        { name: 'React', color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
        { name: 'Node.js', color: 'from-green-400 to-emerald-600', icon: '🟢' },
        { name: 'Express', color: 'from-gray-400 to-gray-600', icon: '🚂' },
        { name: 'MongoDB', color: 'from-green-500 to-green-700', icon: '🍃' },
        { name: 'Tailwind', color: 'from-cyan-400 to-blue-600', icon: '💨' },
        { name: 'GSAP', color: 'from-green-400 to-lime-500', icon: '🎭' },
        { name: 'Framer Motion', color: 'from-pink-500 to-purple-600', icon: '✨' },
        { name: 'Git', color: 'from-orange-500 to-red-600', icon: '📦' },
        { name: 'GitHub', color: 'from-gray-600 to-gray-800', icon: '🐙' },
        { name: 'Vite', color: 'from-purple-500 to-yellow-500', icon: '⚡' },
        { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600', icon: '📜' },
        { name: 'TypeScript', color: 'from-blue-500 to-blue-700', icon: '🔷' },
    ];

    const row1 = technologies.slice(0, 6);
    const row2 = technologies.slice(6, 12);

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/3 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/3 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
                        <span className="text-sm text-gray-300">Texnologiyalar</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Eng zamonaviy </span>
                        <span className="gradient-text">texnologiyalar</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        Biz faqat eng ishonchli va tezkor texnologiyalardan foydalanamiz.
                        Har bir loyiha — bu innovatsiya va sifatning uyg'unligi.
                    </p>
                </motion.div>

                {/* Marquee Row 1 (Left to Right) */}
                <div className="relative mb-8">
                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Container */}
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="flex space-x-6 whitespace-nowrap"
                    >
                        {[...row1, ...row1].map((tech, index) => (
                            <TechCard key={index} tech={tech} />
                        ))}
                    </motion.div>
                </div>

                {/* Marquee Row 2 (Right to Left) */}
                <div className="relative">
                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Container */}
                    <motion.div
                        animate={{ x: ['-50%', '0%'] }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="flex space-x-6 whitespace-nowrap"
                    >
                        {[...row2, ...row2].map((tech, index) => (
                            <TechCard key={index} tech={tech} />
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { value: '12+', label: 'Texnologiyalar' },
                        { value: '99%', label: 'Performance' },
                        { value: 'A+', label: 'Security' },
                        { value: '24/7', label: 'Monitoring' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-2xl p-6 text-center"
                        >
                            <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Tech Card Component
const TechCard = ({ tech }) => {
    return (
        <motion.div
            whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.05
            }}
            transition={{ duration: 0.3 }}
            className="group relative"
            style={{ perspective: '1000px' }}
        >
            <div className="relative w-48 h-48 glass rounded-3xl p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Animated Gradient Background on Hover */}
                <div className={cn(
                    'absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500',
                    `bg-gradient-to-br ${tech.color}`
                )} />

                {/* Glow Effect */}
                <div className={cn(
                    'absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-500',
                    `bg-gradient-to-br ${tech.color}`
                )} />

                {/* Content */}
                <div className="relative z-10 text-center">
                    {/* Icon */}
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl mb-4"
                    >
                        {tech.icon}
                    </motion.div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all duration-300">
                        {tech.name}
                    </h3>
                </div>

                {/* Animated Border */}
                <div className={cn(
                    'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                    `bg-gradient-to-br ${tech.color}`
                )} style={{ padding: '1px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
            </div>
        </motion.div>
    );
};

export default Technologies;