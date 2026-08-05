import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

const StatsCard = ({ icon: Icon, title, value, change, changeType, color, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className="group relative"
        >
            <div className="relative glass rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Background Gradient on Hover */}
                <div className={cn(
                    'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                    `bg-gradient-to-br ${color}`
                )} />

                {/* Glow Effect */}
                <div className={cn(
                    'absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500',
                    `bg-gradient-to-br ${color}`
                )} />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div className={cn(
                        'w-12 h-12 rounded-xl bg-gradient-to-br p-0.5 shadow-lg mb-4 inline-block',
                        color
                    )}>
                        <div className="w-full h-full rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-sm text-gray-400 mb-1">{title}</div>

                    {/* Value */}
                    <div className="text-3xl font-bold text-white mb-2">{value}</div>

                    {/* Change */}
                    {change && (
                        <div className={cn(
                            'flex items-center space-x-1 text-sm',
                            changeType === 'up' ? 'text-success' : 'text-red-400'
                        )}>
                            {changeType === 'up' ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            <span>{change}</span>
                            <span className="text-gray-500">oxirgi oyga nisbatan</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;