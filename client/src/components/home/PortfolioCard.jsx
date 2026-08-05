import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../utils/helpers';

const PortfolioCard = ({ project, index }) => {
    const gradients = [
        'from-primary to-blue-500',
        'from-accent to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-success to-emerald-500',
        'from-yellow-500 to-orange-500',
        'from-rose-500 to-red-500',
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
            <div className="relative h-full glass rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    {/* Image */}
                    <img
                        src={project.imagePath || `https://via.placeholder.com/800x600/0F172A/2563EB?text=${project.title}`}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* ✅ Kategoriya belgisi olib tashlandi */}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                        {project.description}
                    </p>

                    {/* ✅ Faqat LIVE tugmasi */}
                    {project.liveLink && project.liveLink !== '#' && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-success to-emerald-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-success/50 transition-all hover:scale-105 w-full"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live</span>
                        </a>
                    )}
                </div>

                {/* Animated Gradient Border on Hover */}
                <div className={cn(
                    'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                    `bg-gradient-to-br ${gradient}`
                )} style={{ padding: '1px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
            </div>
        </motion.div>
    );
};

export default PortfolioCard;