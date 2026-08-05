import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/helpers';
import { flushSync } from 'react-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage, t } = useLanguage();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        flushSync(() => {
            setIsOpen(false);
        });
    }, [location]);

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.portfolio'), path: '/portfolio' },
        { name: t('nav.pricing'), path: '/pricing' },
        // { name: t('nav.blog'), path: '/blog' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const languages = [
        { code: 'uz', name: 'O\'zbekcha' },
        { code: 'en', name: 'English' },
        { code: 'ru', name: 'Русский' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'glass py-3 shadow-lg shadow-black/5'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <img src="./public/image.png" alt="Log.Site Logo" className="w-full h-full object-cover rounded-[50%]" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">Log.Site</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                                    location.pathname === link.path
                                        ? 'text-accent bg-white/5'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center space-x-3">
                        

                        {/* CTA Button */}
                        <Link
                            to="/contact"
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                        >
                            {t('nav.cta')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden mt-4 glass rounded-2xl overflow-hidden"
                        >
                            <div className="p-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={cn(
                                            'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300',
                                            location.pathname === link.path
                                                ? 'text-accent bg-white/5'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="pt-4 border-t border-white/10 space-y-3">
                                    

                                    {/* CTA Button Mobile */}
                                    <Link
                                        to="/contact"
                                        className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-sm text-center hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                                    >
                                        {t('nav.cta')}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;