import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '../../utils/helpers';

const TestimonialCard = ({ testimonial, isActive }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.9,
            }}
            transition={{ duration: 0.5 }}
            className={cn(
                'group relative flex-shrink-0 w-full md:w-[600px] px-4',
                isActive ? 'z-10' : 'z-0'
            )}
        >
            <div className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow Effect */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-20 h-20 text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic">
                        "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                    {testimonial.avatar ? (
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold gradient-text">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Online Indicator */}
                            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-background" />
                        </div>

                        {/* Name & Company */}
                        <div>
                            <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                            <p className="text-gray-400 text-sm">{testimonial.company}</p>
                        </div>
                    </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            </div>
        </motion.div>
    );
};

export default TestimonialCard;