import { useState } from 'react';
import { motion } from 'framer-motion';
// import { useLanguage } from '../../context/LanguageContext';
import { useFetch } from '../../hooks/useFetch';
import BlogCard from './BlogCard';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

// Calculate dates outside the component to avoid impure function calls during render
const NOW = Date.now();
const ONE_WEEK_AGO = new Date(NOW - 7 * 24 * 60 * 60 * 1000).toISOString();
const TWO_WEEKS_AGO = new Date(NOW - 14 * 24 * 60 * 60 * 1000).toISOString();

const Blog = () => {
    // const { t } = useLanguage();
    const { data, loading, error } = useFetch('/blogs?limit=3');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Barchasi' },
        { id: 'Technology', name: 'Texnologiya' },
        { id: 'Business', name: 'Biznes' },
        { id: 'Design', name: 'Dizayn' },
        { id: 'Marketing', name: 'Marketing' },
    ];

    // Fallback data
    const fallbackBlogs = [
        {
            _id: '1',
            title: '2026-yilda Web Dizayn Trendlari: Nima Kutmoqda?',
            slug: '2026-yilda-web-dizayn-trendlari',
            excerpt: '2026-yilda web dizayn sohasida qanday yangi trendlar paydo bo\'ladi? AI integratsiya, 3D elementlar, glassmorphism va boshqa innovatsiyalar haqida batafsil.',
            content: ' '.repeat(400), // Read time uchun
            category: 'Design',
            author: 'Log.Site Team',
            imagePath: '',
            createdAt: NOW,
            isActive: true
        },
        {
            _id: '2',
            title: 'SEO Optimizatsiya: Saytingizni Google\'da Birinchi O\'ringa Olib Chiqish',
            slug: 'seo-optimizatsiya-rehberi',
            excerpt: 'SEO optimizatsiya orqali saytingizni qidiruv tizimlarida yuqori o\'rinlarga olib chiqishning 10 ta isbotlangan usuli. Texnik SEO, kontent strategiya va link building.',
            content: ' '.repeat(600),
            category: 'Marketing',
            author: 'Log.Site Team',
            imagePath: '',
            createdAt: ONE_WEEK_AGO,
            isActive: true
        },
        {
            _id: '3',
            title: 'React vs Vue vs Angular: 2026-yilda Qaysi Framework Tanlash Kerak?',
            slug: 'react-vs-vue-vs-angular-2026',
            excerpt: 'Frontend framework\'lar solishtirmasi: React, Vue va Angular. Har birining afzalliklari, kamchiliklari va qaysi loyihalar uchun eng mos kelishi haqida.',
            content: ' '.repeat(500),
            category: 'Technology',
            author: 'Log.Site Team',
            imagePath: '',
            createdAt: TWO_WEEKS_AGO,
            isActive: true
        }
    ];

    const blogs = data?.blogs && data.blogs.length > 0 ? data.blogs : fallbackBlogs;

    // Filter blogs
    const filteredBlogs = activeCategory === 'all'
        ? blogs
        : blogs.filter(b => b.category === activeCategory);

    return (
        <section id="blog" className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
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
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm text-gray-300">Blog va Maqolalar</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Eng so'nggi </span>
                        <span className="gradient-text">yangiliklar</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        Web dizayn, dasturlash, marketing va biznes haqida foydali maqolalar.
                        Bilimlaringizni kengaytiring va yangi trendlardan xabardor bo'ling.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(category.id)}
                            className={cn(
                                'px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                                activeCategory === category.id
                                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50'
                                    : 'glass text-gray-300 hover:bg-white/10 hover:text-white'
                            )}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Blog Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-400">Maqolalarni yuklashda xatolik yuz berdi</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {filteredBlogs.map((blog, index) => (
                            <BlogCard
                                key={blog._id || index}
                                blog={blog}
                                index={index}
                                variant={index === 0 ? 'large' : 'default'}
                            />
                        ))}
                    </motion.div>
                )}

                {/* View All Button */}
                {!loading && !error && blogs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 text-center"
                    >
                        <a
                            href="/blog"
                            className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                        >
                            <span>Barcha maqolalarni ko'rish</span>
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

export default Blog;