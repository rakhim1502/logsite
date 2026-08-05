import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FolderKanban,
    Briefcase,
    FileText,
    MessageSquare,
    Star,
    Users,
    Eye,
    DollarSign,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import api from '../../services/api';
import { cn } from '../../utils/helpers';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        projects: 0,
        services: 0,
        blogs: 0,
        messages: 0,
        testimonials: 0,
        users: 0
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [projectsRes, servicesRes, blogsRes, messagesRes, testimonialsRes] = await Promise.all([
                api.get('/projects'),
                api.get('/services'),
                api.get('/blogs'),
                api.get('/messages'),
                api.get('/testimonials')
            ]);

            setStats({
                projects: projectsRes.data.projects?.length || projectsRes.data.length || 0,
                services: servicesRes.data.length || 0,
                blogs: blogsRes.data.blogs?.length || blogsRes.data.length || 0,
                messages: messagesRes.data.length || 0,
                testimonials: testimonialsRes.data.length || 0,
                users: 1 // Default admin
            });

            // Recent activities (mock data - backend'dan kelishi kerak)
            setRecentActivities([
                { id: 1, type: 'project', title: 'Yangi loyiha qo\'shildi', description: 'MediCare Klinika', time: '5 daqiqa oldin', color: 'from-primary to-blue-500' },
                { id: 2, type: 'message', title: 'Yangi xabar keldi', description: 'Alisher Karimov dan', time: '15 daqiqa oldin', color: 'from-accent to-cyan-500' },
                { id: 3, type: 'blog', title: 'Yangi maqola chop etildi', description: 'SEO Optimizatsiya Rehberi', time: '1 soat oldin', color: 'from-success to-emerald-500' },
            ]);
        } catch (error) {
            console.error('Dashboard data xatosi:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            icon: FolderKanban,
            title: 'Jami loyihalar',
            value: stats.projects,
            change: '+12%',
            changeType: 'up',
            color: 'from-primary to-blue-500',
            delay: 0
        },
        {
            icon: MessageSquare,
            title: 'Yangi xabarlar',
            value: stats.messages,
            change: '+8%',
            changeType: 'up',
            color: 'from-accent to-cyan-500',
            delay: 0.1
        },
        {
            icon: Users,
            title: 'Mijozlar',
            value: stats.users,
            change: '+15%',
            changeType: 'up',
            color: 'from-success to-emerald-500',
            delay: 0.2
        },
        {
            icon: Eye,
            title: 'Ko\'rishlar',
            value: '12.4K',
            change: '+23%',
            changeType: 'up',
            color: 'from-purple-500 to-pink-500',
            delay: 0.3
        }
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">
                    Xush kelibsiz, Log.Site admin paneliga. Bu yerda siz barcha ma'lumotlarni boshqarishingiz mumkin.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: stat.delay }}
                            whileHover={{ y: -5 }}
                            className="group relative"
                        >
                            <div className="relative glass rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-white/20">
                                {/* Background Gradient on Hover */}
                                <div className={cn(
                                    'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                                    `bg-gradient-to-br ${stat.color}`
                                )} />

                                {/* Glow Effect */}
                                <div className={cn(
                                    'absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500',
                                    `bg-gradient-to-br ${stat.color}`
                                )} />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={cn(
                                        'w-12 h-12 rounded-xl bg-gradient-to-br p-0.5 shadow-lg mb-4 inline-block',
                                        stat.color
                                    )}>
                                        <div className="w-full h-full rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div className="text-sm text-gray-400 mb-1">{stat.title}</div>

                                    {/* Value */}
                                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>

                                    {/* Change */}
                                    {stat.change && (
                                        <div className={cn(
                                            'flex items-center space-x-1 text-sm',
                                            stat.changeType === 'up' ? 'text-success' : 'text-red-400'
                                        )}>
                                            {stat.changeType === 'up' ? (
                                                <TrendingUp className="w-4 h-4" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4" />
                                            )}
                                            <span>{stat.change}</span>
                                            <span className="text-gray-500">oxirgi oyga nisbatan</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 glass rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">So'nggi faoliyatlar</h2>
                        <button className="text-sm text-accent hover:text-white transition-colors">
                            Barchasini ko'rish
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activity.color} p-0.5 flex-shrink-0`}>
                                    <div className="w-full h-full rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                        {activity.type === 'project' && <FolderKanban className="w-5 h-5 text-white" />}
                                        {activity.type === 'message' && <MessageSquare className="w-5 h-5 text-white" />}
                                        {activity.type === 'blog' && <FileText className="w-5 h-5 text-white" />}
                                        {activity.type === 'testimonial' && <Star className="w-5 h-5 text-white" />}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white mb-1">
                                        {activity.title}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {activity.description}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 flex-shrink-0">
                                    {activity.time}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glass rounded-2xl p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Tezkor amallar</h2>

                    <div className="space-y-3">
                        {[
                            { icon: FolderKanban, label: 'Yangi loyiha', color: 'from-primary to-blue-500', path: '/admin/projects/new' },
                            { icon: FileText, label: 'Yangi maqola', color: 'from-accent to-cyan-500', path: '/admin/blogs/new' },
                            { icon: Briefcase, label: 'Yangi xizmat', color: 'from-success to-emerald-500', path: '/admin/services/new' },
                            { icon: Star, label: 'Yangi fikr', color: 'from-purple-500 to-pink-500', path: '/admin/testimonials/new' },
                            { icon: MessageSquare, label: 'Xabarlarni ko\'rish', color: 'from-yellow-500 to-orange-500', path: '/admin/messages' },
                        ].map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={action.path}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} p-0.5`}>
                                        <div className="w-full h-full rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                        {action.label}
                                    </span>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Revenue Card */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
                                <div className="w-full h-full rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Bu oy daromad</div>
                                <div className="text-xl font-bold text-white">48.5M UZS</div>
                            </div>
                        </div>
                        <div className="text-xs text-success flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>+18% o'tgan oyga nisbatan</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardPage;