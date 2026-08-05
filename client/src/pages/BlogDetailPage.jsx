import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import SEO from '../components/SEO';

const BlogDetailPage = () => {
    const { slug } = useParams();
    const { data: blog, loading, error } = useFetch(`/blogs/${slug}`);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Maqola topilmadi</h2>
                    <Link to="/blog" className="text-accent hover:text-white">
                        ← Blog sahifasiga qaytish
                    </Link>
                </div>
            </div>
        );
    }

    const wordCount = blog.content?.split(' ').length || 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <>
            <SEO
                title={`${blog.title} - Log.Site Blog`}
                description={blog.excerpt}
                image={blog.imagePath ? `http://localhost:5000${blog.imagePath}` : undefined}
                url={`https://log.site/blog/${slug}`}
                type="article"
            />

            <div className="min-h-screen pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Blog sahifasiga qaytish</span>
                        </Link>
                    </motion.div>

                    {/* Article Header */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Category Badge */}
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm text-gray-300">{blog.category}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8 pb-8 border-b border-white/5">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(blog.createdAt).toLocaleDateString('uz-UZ', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{readTime} daqiqa o'qish</span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="glass rounded-3xl overflow-hidden mb-12">
                            <img
                                src={blog.imagePath ? `http://localhost:5000${blog.imagePath}` : 'https://via.placeholder.com/1200x600/0F172A/2563EB?text=Blog'}
                                alt={blog.title}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Content */}
                        <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                                {blog.content}
                            </div>
                        </div>

                        {/* Tags/Share */}
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-sm text-gray-400">Kategoriya:</span>
                                    <span className="px-3 py-1 rounded-lg text-sm bg-white/5 text-gray-300">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 glass rounded-3xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Sizga yordam kerakmi?
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Biznesingiz uchun professional website yaratishni xohlaysizmi?
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                            >
                                <span>Bepul konsultatsiya</span>
                            </Link>
                        </div>
                    </motion.article>
                </div>
            </div>
        </>
    );
};

export default BlogDetailPage;