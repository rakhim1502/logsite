import { motion } from 'framer-motion';
import { Code, Layout, Database, Zap, Globe } from 'lucide-react';

const FloatingElements = () => {
    const elements = [
        { icon: Code, x: 100, y: 150, delay: 0, color: 'from-primary to-blue-500' },
        { icon: Layout, x: 800, y: 200, delay: 0.5, color: 'from-accent to-cyan-500' },
        { icon: Database, x: 150, y: 400, delay: 1, color: 'from-purple-500 to-pink-500' },
        { icon: Zap, x: 750, y: 450, delay: 1.5, color: 'from-yellow-500 to-orange-500' },
        { icon: Globe, x: 500, y: 100, delay: 2, color: 'from-success to-emerald-500' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
            {elements.map((element, index) => {
                const Icon = element.icon;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0, x: element.x, y: element.y }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [0.8, 1, 0.8],
                            y: [element.y, element.y - 30, element.y],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: element.delay
                        }}
                        className="absolute"
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${element.color} p-0.5 shadow-lg shadow-primary/20`}>
                            <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FloatingElements;