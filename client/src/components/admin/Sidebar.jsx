import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    Briefcase,
    FileText,
    Star,
    HelpCircle,
    MessageSquare,
    Image as ImageIcon,
    Users,
    Settings,
    ChevronLeft,
    LogOut,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Loyihalar', path: '/admin/projects', icon: FolderKanban },
        { name: 'Xizmatlar', path: '/admin/services', icon: Briefcase },
        { name: 'Blog', path: '/admin/blogs', icon: FileText },
        { name: 'Fikrlar', path: '/admin/testimonials', icon: Star },
        { name: 'FAQ', path: '/admin/faqs', icon: HelpCircle },
        { name: 'Xabarlar', path: '/admin/messages', icon: MessageSquare },
        { name: 'Media', path: '/admin/media', icon: ImageIcon },
        { name: 'Foydalanuvchilar', path: '/admin/users', icon: Users },
        { name: 'Sozlamalar', path: '/admin/settings', icon: Settings },
    ];

    const handleLogout = async () => {
        await logout();
    };

    return (
        <>
            <motion.aside
                initial={false}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={cn(
                    'fixed top-0 left-0 h-screen w-72 glass-dark z-50 flex flex-col transition-transform duration-300 lg:translate-x-0',
                    !isOpen && 'lg:-translate-x-full'
                )}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <div>
                                <div className="text-lg font-bold gradient-text">Log.Site</div>
                                <div className="text-xs text-gray-400">Admin Panel</div>
                            </div>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-white/5">
                    <div className="flex items-center space-x-3 glass rounded-xl p-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                                {user?.name || 'Admin'}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                                {user?.email || 'admin@log.site'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={cn(
                                    'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group',
                                    isActive
                                        ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/30'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                )}
                            >
                                <Icon className={cn(
                                    'w-5 h-5 transition-colors',
                                    isActive ? 'text-accent' : 'text-gray-500 group-hover:text-accent'
                                )} />
                                <span>{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Saytga qaytish</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Chiqish</span>
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;