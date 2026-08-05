// import { motion } from 'framer-motion';
import { Menu, Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AdminHeader = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 glass-dark border-b border-white/5">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <Menu className="w-6 h-6 text-gray-400" />
                    </button>

                    {/* Search */}
                    <div className="hidden md:flex items-center space-x-2 glass rounded-xl px-4 py-2 w-80">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Qidirish..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 flex-1"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-gray-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-400" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;