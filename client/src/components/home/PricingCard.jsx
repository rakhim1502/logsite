import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const PricingCard = ({ plan, index, isHighlighted, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: isHighlighted ? 1.02 : 1.05 }}
            className={cn(
                'group relative',
                isHighlighted && 'lg:scale-105'
            )}
        >
            <div className={cn(
                'relative h-full rounded-3xl p-8 overflow-hidden transition-all duration-500',
                isHighlighted
                    ? 'bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border-2 border-primary/50 shadow-2xl shadow-primary/30'
                    : 'glass hover:border-white/20'
            )}>
                {/* Animated Gradient Background on Hover */}
                <div className={cn(
                    'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                    isHighlighted ? 'bg-gradient-to-br from-primary to-accent' : 'bg-gradient-to-br from-primary/50 to-accent/50'
                )} />

                {/* Glow Effect */}
                {isHighlighted && (
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/30 blur-3xl animate-pulse" />
                )}

                {/* Popular Badge */}
                {isHighlighted && (
                    <div className="absolute top-0 right-0">
                        <div className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-3xl">
                            Eng mashhur
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                    {/* Plan Name */}
                    <h3 className={cn(
                        'text-2xl font-bold mb-2',
                        isHighlighted ? 'gradient-text' : 'text-white'
                    )}>
                        {plan.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6">
                        {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                        <div className="flex items-baseline space-x-2">
                            <span className={cn(
                                'text-4xl md:text-5xl font-bold',
                                isHighlighted ? 'gradient-text' : 'text-white'
                            )}>
                                {plan.price === 'Custom' ? plan.price : plan.price.toLocaleString()}
                            </span>
                        </div>
                        {plan.price !== 'Custom' && (
                            <span className="text-gray-400 text-xs mt-1 block">UZS (bir martalik to'lov)</span>
                        )}
                    </div>
                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                {feature.included ? (
                                    <div className={cn(
                                        'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
                                        isHighlighted
                                            ? 'bg-gradient-to-br from-primary to-accent'
                                            : 'bg-success/20'
                                    )}>
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                ) : (
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                        <X className="w-3 h-3 text-gray-500" />
                                    </div>
                                )}
                                <span className={cn(
                                    'text-sm',
                                    feature.included ? 'text-gray-300' : 'text-gray-500'
                                )}>
                                    {feature.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSelect} // <-- Shu qatorni qo'shing
                        className={cn(
                            'w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300',
                            isHighlighted
                                ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50'
                                : 'glass text-white hover:bg-white/10'
                        )}
                    >
                        {plan.buttonText || 'Tanlash'}
                    </motion.button>
                </div>

                {/* Animated Border */}
                {isHighlighted && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent opacity-20 blur-xl" />
                )}
            </div>
        </motion.div>
    );
};

export default PricingCard;