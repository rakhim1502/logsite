import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import BlogCard from '../components/home/BlogCard';
import SEO from '../components/SEO';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/helpers';

const fallbackBlogs = [
    { _id: '1', title: '2026-yilda Web Dizayn Trendlari', slug: '2026-web-dizayn', excerpt: '2026-yilda web dizayn sohasida qanday yangi trendlar paydo bo\'ladi?', content: ' '.repeat(400), category: 'Design', author: 'Log.Site Team', imagePath: '', createdAt: new Date().toISOString() },
    { _id: '2', title: 'SEO Optimizatsiya Rehberi', slug: 'seo-optimizatsiya', excerpt: 'SEO orqali saytingizni yuqori o\'rinlarga olib chiqish.', content: ' '.repeat(600), category: 'Marketing', author: 'Log.Site Team', imagePath: '', createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
    { _id: '3', title: 'React vs Vue vs Angular', slug: 'react-vs-vue', excerpt: 'Frontend framework\'lar solishtirmasi.', content: ' '.repeat(500), category: 'Technology', author: 'Log.Site Team', imagePath: '', createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
];

const BlogPage = () => {
    const { data, loading } = useFetch('/blogs?limit=50');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Barchasi' },
        { id: 'Technology', name: 'Texnologiya' },
        { id: 'Business', name: 'Biznes' },
        { id: 'Design', name: 'Dizayn' },
        { id: 'Marketing', name: 'Marketing' },
        { id: 'News', name: 'Yangiliklar' },
    ];

    const blogs = data?.blogs && data.blogs.length > 0 ? data.blogs : fallbackBlogs;
    const filteredBlogs = activeCategory === 'all' ? blogs : blogs.filter(b => b.category === activeCategory);

    return (
        <>
            <SEO
                title="Blog - Log.Site"
                description="Web dizayn, dasturlash, marketing va biznes haqida foydali maqolalar."
                url="https://log.site/blog"
            />

            <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-sm text-gray-300">Blog va Maqolalar</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">Bizning </span>
                            <span className="gradient-text">Blog</span>
                        </h1>

                        <p className="text-lg text-gray-400">
                            Web dizayn, dasturlash, marketing va biznes haqida foydali maqolalar.
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
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
                                        : 'glass text-gray-300 hover:bg-white/10'
                                )}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </motion.div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-accent animate-spin" />
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                        >
                            {filteredBlogs.map((blog, index) => (
                                <BlogCard key={blog._id || index} blog={blog} index={index} />
                            ))}
                        </motion.div>
                    )}

                    {filteredBlogs.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <p className="text-gray-400">Bu kategoriyada maqolalar topilmadi</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogPage;