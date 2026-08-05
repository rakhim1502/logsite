import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Shield,  Mail, Calendar } from 'lucide-react';
import api from '../../services/api';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Hozircha faqat joriy foydalanuvchini ko'rsatamiz
            const response = await api.get('/auth/me');
            setUsers([response.data]);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Foydalanuvchilar</h1>
                <p className="text-gray-400">Admin va foydalanuvchilarni boshqaring</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl overflow-hidden"
            >
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-white/5">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Foydalanuvchi</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Email</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Rol</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Qo'shilgan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white font-bold">
                                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-gray-300">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium bg-primary/20 text-accent">
                                                <Shield className="w-3 h-3" />
                                                <span className="capitalize">{user.role}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(user.createdAt)}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default UsersPage;