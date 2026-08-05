// import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../utils/helpers';

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
        >
            <div
                onClick={onToggle}
                className={cn(
                    'relative glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500',
                    isOpen
                        ? 'border-primary/50 shadow-lg shadow-primary/20'
                        : 'hover:border-white/20'
                )}
            >
                {/* Animated Gradient Background */}
                <div className={cn(
                    'absolute inset-0 opacity-0 transition-opacity duration-500',
                    isOpen ? 'opacity-10 bg-gradient-to-br from-primary/20 to-accent/10' : 'group-hover:opacity-5 bg-gradient-to-br from-primary/10 to-accent/5'
                )} />

                {/* Glow Effect */}
                {isOpen && (
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/30 blur-3xl opacity-50" />
                )}

                {/* Content */}
                <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between space-x-4">
                        {/* Question */}
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <span className={cn(
                                    'text-sm font-bold',
                                    isOpen ? 'gradient-text' : 'text-gray-500'
                                )}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className={cn(
                                    'text-lg md:text-xl font-semibold transition-colors duration-300',
                                    isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                )}>
                                    {faq.question}
                                </h3>
                            </div>
                        </div>

                        {/* Toggle Icon */}
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                                isOpen
                                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/50'
                                    : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
                            )}
                        >
                            {isOpen ? (
                                <Minus className="w-5 h-5" />
                            ) : (
                                <Plus className="w-5 h-5" />
                            )}
                        </motion.div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 pl-12">
                                    <p className="text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Animated Border */}
                {isOpen && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 blur-xl" />
                )}
            </div>
        </motion.div>
    );
};

export default FAQItem;