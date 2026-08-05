import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm text-gray-300">Biz bilan bog'laning</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Loyihangizni </span>
                        <span className="gradient-text">bugun boshlang</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        Bepul konsultatsiya orqali biznesingiz uchun eng yaxshi yechimni toping.
                        Biz sizga yordam berishga tayyormiz.
                    </p>
                </motion.div>

                {/* Contact Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Left - Contact Info */}
                    <ContactInfo />

                    {/* Right - Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;