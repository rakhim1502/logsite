import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    // Instagram,
    // Facebook,
    // Twitter,
    ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

const Footer = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Newsletter subscribe logic
        console.log('Subscribe:', email);
        setEmail('');
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-secondary border-t border-white/5">
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 py-16 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-2xl font-bold gradient-text">Log.Site</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t('footer.description')}
                        </p>
                       
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-white font-semibold mb-6">{t('footer.quickLinks')}</h3>
                        <ul className="space-y-3">
                            {[
                                { name: t('nav.home'), path: '/' },
                                { name: t('nav.services'), path: '/services' },
                                { name: t('nav.portfolio'), path: '/portfolio' },
                                { name: t('nav.pricing'), path: '/pricing' },
                                // { name: t('nav.blog'), path: '/blog' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 text-sm hover:text-accent transition-colors flex items-center group"
                                    >
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-white font-semibold mb-6">{t('footer.contactUs')}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 text-sm">uzbrm95@gmail.com</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 text-sm">+998 70 474 73 50</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-400 text-sm">Buxoro, O'zbekiston</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-white font-semibold mb-6">{t('footer.newsletter')}</h3>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email manzilingiz"
                                className="w-full px-4 py-3 rounded-xl glass text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                            >
                                {t('footer.subscribe')}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Log.Site. {t('footer.rights')}.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link to="/privacy" className="text-gray-400 text-sm hover:text-accent transition-colors">
                            Maxfiylik siyosati
                        </Link>
                        <Link to="/terms" className="text-gray-400 text-sm hover:text-accent transition-colors">
                            Foydalanish shartlari
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;