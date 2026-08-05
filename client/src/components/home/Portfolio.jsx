import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import PortfolioCard from './PortfolioCard';
import { Loader2 } from 'lucide-react';

const Portfolio = () => {
    const { data, loading, error } = useFetch('/projects?limit=6');

    // Fallback data (agar backend ishlamasa ko'rinadi)
    const fallbackProjects = [
        {
            _id: '1',
            title: 'MediCare Klinika',
            slug: 'medicare-klinika',
            description: 'Zamonaviy klinika uchun to\'liq boshqaruv tizimi va onlayn band qilish platformasi.',
            category: 'Medical',
            imagePath: '',
            technologies: ['React', 'Node.js', 'MongoDB'],
            liveLink: '#'
        },
        {
            _id: '2',
            title: 'Taste of Italy',
            slug: 'taste-of-italy',
            description: 'Premium restoran uchun onlayn menyu, band qilish va yetkazib berish tizimi.',
            category: 'Restaurant',
            imagePath: '',
            technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
            liveLink: '#'
        },
        {
            _id: '3',
            title: 'TravelUz',
            slug: 'traveluz',
            description: 'O\'zbekiston bo\'ylab sayohatlar uchun to\'liq booking platformasi.',
            category: 'Travel',
            imagePath: '',
            technologies: ['React', 'Express', 'MongoDB'],
            liveLink: '#'
        },
        {
            _id: '4',
            title: 'EduCenter',
            slug: 'educenter',
            description: 'O\'quv markazi uchun LMS tizimi, onlayn darslar va testlar platformasi.',
            category: 'Education',
            imagePath: '',
            technologies: ['Vue.js', 'Laravel', 'MySQL'],
            liveLink: '#'
        },
        {
            _id: '5',
            title: 'BuildPro',
            slug: 'buildpro',
            description: 'Qurilish kompaniyasi uchun portfolio va loyiha boshqaruv tizimi.',
            category: 'Construction',
            imagePath: '',
            technologies: ['React', 'Node.js', 'PostgreSQL'],
            liveLink: '#'
        },
        {
            _id: '6',
            title: 'RentHouse',
            slug: 'renthouse',
            description: 'Ko\'chmas mulk ijara platformasi, xarita integratsiyasi va to\'lov tizimi.',
            category: 'Rental',
            imagePath: '',
            technologies: ['Next.js', 'Prisma', 'Stripe'],
            liveLink: '#'
        }
    ];

    const projects = data?.projects && data.projects.length > 0 ? data.projects : fallbackProjects;

    return (
        <section id="portfolio" className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm text-gray-300">Bizning Ishlar</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Mijozlarimiz uchun </span>
                        <span className="gradient-text">yaratilgan premium loyihalar</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        Har bir loyiha — bu mijozning muvaffaqiyati. Biz faqat sifat va natijaga kafolat beramiz.
                    </p>
                </motion.div>

                {/* Projects Grid (Filtrlarsiz) */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-400">Loyihalarni yuklashda xatolik yuz berdi</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {projects.map((project, index) => (
                            <PortfolioCard
                                key={project._id || index}
                                project={project}
                                index={index}
                            />
                        ))}
                    </motion.div>
                )}

                {/* View All Button */}
                {!loading && !error && projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 text-center"
                    >
                        <a
                            href="/portfolio"
                            className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                        >
                            <span>Barcha loyihalarni ko'rish</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;