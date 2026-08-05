import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, index, variant = 'default' }) => {
    const gradients = [
        'from-primary to-blue-500',
        'from-accent to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-success to-emerald-500',
        'from-yellow-500 to-orange-500',
        'from-rose-500 to-red-500',
    ];

    const gradient = gradients[index % gradients.length];

    // Read time hisoblash (o'rtacha 200 so'z/daqiqa)
    const wordCount = blog.content?.split(' ').length || 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Sana formatlash
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isLarge = variant === 'large';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={cn(
                'group relative',
                isLarge && 'lg:col-span-2 lg:row-span-2'
            )}
        >
            <Link to={`/blog/${blog.slug}`} className="block h-full">
                <div className="relative h-full glass rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20">
                    {/* Image Container */}
                    <div className={cn(
                        'relative overflow-hidden',
                        isLarge ? 'h-80' : 'h-56'
                    )}>
                        {/* Image */}
                        <img
                            src={blog.imagePath || `https://via.placeholder.com/800x600/0F172A/2563EB?text=${encodeURIComponent(blog.title)}`}
                            alt={blog.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <div className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-medium text-white backdrop-blur-sm border border-white/10',
                                `bg-gradient-to-r ${gradient}`
                            )}>
                                {blog.category}
                            </div>
                        </div>

                        {/* Read Time Badge */}
                        <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white backdrop-blur-sm bg-black/50 border border-white/10">
                                <Clock className="w-3 h-3" />
                                <span>{readTime} daqiqa</span>
                            </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
                            >
                                <ArrowRight className="w-6 h-6 text-white" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>{blog.author}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className={cn(
                            'font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2',
                            isLarge ? 'text-2xl md:text-3xl' : 'text-lg'
                        )}>
                            {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className={cn(
                            'text-gray-400 leading-relaxed mb-4 line-clamp-3',
                            isLarge ? 'text-base' : 'text-sm'
                        )}>
                            {blog.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span>O'qishni davom ettirish</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Animated Gradient Border on Hover */}
                    <div className={cn(
                        'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                        `bg-gradient-to-br ${gradient}`
                    )} style={{ padding: '1px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;