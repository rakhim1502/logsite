import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import PortfolioCard from '../components/home/PortfolioCard';
import SEO from '../components/SEO';
import { Loader2 } from 'lucide-react';

const PortfolioPage = () => {
    const { data, loading, error } = useFetch('/projects?limit=50');

    const fallbackProjects = [
        { _id: '1', title: 'MediCare Klinika', slug: 'medicare-klinika', description: 'Zamonaviy klinika uchun to\'liq boshqaruv tizimi.', category: 'Medical', imagePath: '', technologies: ['React', 'Node.js'], liveLink: '#' },
        { _id: '2', title: 'Taste of Italy', slug: 'taste-of-italy', description: 'Premium restoran uchun onlayn menyu va band qilish tizimi.', category: 'Restaurant', imagePath: '', technologies: ['Next.js', 'Stripe'], liveLink: '#' },
        { _id: '3', title: 'TravelUz', slug: 'traveluz', description: 'O\'zbekiston bo\'ylab sayohatlar uchun booking platformasi.', category: 'Travel', imagePath: '', technologies: ['React', 'Express'], liveLink: '#' },
        { _id: '4', title: 'EduCenter', slug: 'educenter', description: 'O\'quv markazi uchun LMS tizimi.', category: 'Education', imagePath: '', technologies: ['Vue.js', 'Laravel'], liveLink: '#' },
        { _id: '5', title: 'BuildPro', slug: 'buildpro', description: 'Qurilish kompaniyasi uchun portfolio.', category: 'Construction', imagePath: '', technologies: ['React', 'Node.js'], liveLink: '#' },
        { _id: '6', title: 'RentHouse', slug: 'renthouse', description: 'Ko\'chmas mulk ijara platformasi.', category: 'Rental', imagePath: '', technologies: ['Next.js', 'Prisma'], liveLink: '#' },
    ];

    const projects = data?.projects && data.projects.length > 0 ? data.projects : fallbackProjects;

    return (
        <>
            <SEO
                title="Portfolio - Log.Site"
                description="Log.Site jamoasi tomonidan yaratilgan 50+ premium loyihalar."
                url="https://log.site/portfolio"
            />

            <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm text-gray-300">Bizning Ishlar</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">Bizning </span>
                            <span className="gradient-text">Portfolio</span>
                        </h1>

                        <p className="text-lg text-gray-400">
                            Har bir loyiha — bu mijozning muvaffaqiyati va bizning professional yondashuvimiz.
                        </p>
                    </motion.div>

                    {/* Grid - Filtrsiz */}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                        >
                            {projects.map((project, index) => (
                                <PortfolioCard key={project._id || index} project={project} index={index} />
                            ))}
                        </motion.div>
                    )}

                    {projects.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <p className="text-gray-400">Loyihalar topilmadi</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PortfolioPage;