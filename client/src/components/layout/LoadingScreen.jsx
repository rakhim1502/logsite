import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
            <div className="text-center">
                {/* Animated Logo */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow"
                >
                    <span className="text-white font-bold text-4xl">L</span>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold gradient-text mb-2">Log.Site</h2>
                    <p className="text-gray-400 text-sm">Yuklanmoqda...</p>
                </motion.div>

                {/* Loading Bar */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-6 h-1 bg-secondary rounded-full overflow-hidden"
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingScreen;