import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cn } from '../../utils/helpers';

const ServiceCard = ({ service, index }) => {
    // Lucide ikonkasini dinamik yuklash
    const IconComponent = Icons[service.icon] || Icons.Package;

    const gradients = [
        'from-primary to-blue-500',
        'from-accent to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-success to-emerald-500',
        'from-yellow-500 to-orange-500',
        'from-rose-500 to-red-500',
        'from-indigo-500 to-purple-500',
        'from-teal-500 to-cyan-500',
        'from-pink-500 to-rose-500',
        'from-blue-500 to-indigo-500',
        'from-emerald-500 to-teal-500',
    ];

    const gradient = gradients[index % gradients.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            <div className="relative h-full glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Animated Gradient Border on Hover */}
                <div className={cn(
                    'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    `bg-gradient-to-br ${gradient}`
                )} style={{ padding: '1px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

                {/* Glow Effect on Hover */}
                <div className={cn(
                    'absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500',
                    `bg-gradient-to-br ${gradient}`
                )} />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            'w-16 h-16 rounded-2xl bg-gradient-to-br p-0.5 shadow-lg mb-6',
                            gradient
                        )}
                    >
                        <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                            <IconComponent className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {service.description}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span>Batafsil</span>
                        <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>

                {/* Decorative Corner */}
                <div className={cn(
                    'absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500',
                    `bg-gradient-to-br ${gradient}`
                )} />
            </div>
        </motion.div>
    );
};

export default ServiceCard;