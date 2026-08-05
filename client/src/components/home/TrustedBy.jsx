import { motion } from 'framer-motion';

const TrustedBy = () => {
    const logos = [
        { name: 'TechCorp', icon: '🚀' },
        { name: 'DesignStudio', icon: '🎨' },
        { name: 'CloudBase', icon: '☁️' },
        { name: 'DataFlow', icon: '📊' },
        { name: 'SecureNet', icon: '🔒' },
        { name: 'InnovateLab', icon: '💡' },
        { name: 'GrowthHub', icon: '📈' },
        { name: 'PixelPerfect', icon: '✨' },
    ];

    return (
        <section className="relative py-16 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Bizga Ishonganlar
                    </h2>
                    <p className="text-gray-400">
                        50+ kompaniya bizga ishonch bildirdi
                    </p>
                </motion.div>

                {/* Infinite Scroll Logos */}
                <div className="relative">
                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Container */}
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="flex space-x-8 whitespace-nowrap"
                    >
                        {[...logos, ...logos].map((logo, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center space-x-3 px-8 py-4 glass rounded-2xl hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                            >
                                <span className="text-3xl">{logo.icon}</span>
                                <span className="text-white font-semibold text-lg">{logo.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;