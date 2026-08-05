import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import SEO from '../components/SEO';

const PortfolioDetailPage = () => {
    const { slug } = useParams();
    const { data: project, loading, error } = useFetch(`/projects/${slug}`);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Loyiha topilmadi</h2>
                    <Link to="/portfolio" className="text-accent hover:text-white">
                        ← Portfolio sahifasiga qaytish
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${project.title} - Log.Site Portfolio`}
                description={project.description}
                image={project.imagePath ? `http://localhost:5000${project.imagePath}` : undefined}
                url={`https://log.site/portfolio/${slug}`}
                type="article"
            />

            <div className="min-h-screen pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Portfolio sahifasiga qaytish</span>
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="glass rounded-3xl overflow-hidden">
                                <img
                                    src={project.imagePath ? `http://localhost:5000${project.imagePath}` : 'https://via.placeholder.com/800x600/0F172A/2563EB?text=Project'}
                                    alt={project.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Category Badge */}
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-sm text-gray-300">{project.category}</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-gray-400 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass rounded-xl p-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Yaratilgan</span>
                                    </div>
                                    <div className="text-white font-medium">
                                        {new Date(project.createdAt).toLocaleDateString('uz-UZ', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>

                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass rounded-xl p-4 hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Live sayt</span>
                                        </div>
                                        <div className="text-accent font-medium group-hover:text-white transition-colors">
                                            Saytni ochish →
                                        </div>
                                    </a>
                                )}
                            </div>

                            {/* Technologies */}
                            {project.technologies && project.technologies.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                                        <Code2 className="w-4 h-4" />
                                        <span>Ishlatilgan texnologiyalar</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-gray-300 border border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="pt-6 border-t border-white/5">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                                >
                                    <span>Shunga o'xshash loyiha buyurtma qilish</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioDetailPage;