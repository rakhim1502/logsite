import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail,  Trash2, Phone, Building2, Calendar } from 'lucide-react';
import api from '../../services/api';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { cn } from '../../utils/helpers';

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await api.get('/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            alert('Xabarlarni yuklashda xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (message) => {
        try {
            await api.put(`/messages/${message._id}`, { isRead: true });
            fetchMessages();
            if (selectedMessage?._id === message._id) {
                setSelectedMessage({ ...message, isRead: true });
            }
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const handleDeleteMessage = async () => {
        if (!messageToDelete) return;
        try {
            await api.delete(`/messages/${messageToDelete._id}`);
            if (selectedMessage?._id === messageToDelete._id) {
                setSelectedMessage(null);
            }
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Xabarni o\'chirishda xatolik yuz berdi');
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return !msg.isRead;
        if (filter === 'read') return msg.isRead;
        return true;
    });

    const unreadCount = messages.filter(m => !m.isRead).length;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Xabarlar</h1>
                <p className="text-gray-400">Kontakt forma orqali kelgan xabarlarni boshqaring</p>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex space-x-2"
            >
                {[
                    { id: 'all', label: 'Barchasi', count: messages.length },
                    { id: 'unread', label: 'O\'qilmagan', count: unreadCount },
                    { id: 'read', label: 'O\'qilgan', count: messages.length - unreadCount }
                ].map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                            filter === f.id
                                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50'
                                : 'glass text-gray-300 hover:bg-white/10'
                        )}
                    >
                        {f.label} ({f.count})
                    </button>
                ))}
            </motion.div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1 glass rounded-2xl overflow-hidden"
                >
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-accent animate-spin" />
                        </div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="text-center py-20">
                            <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-400">Xabarlar topilmadi</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
                            {filteredMessages.map((message, index) => (
                                <motion.button
                                    key={message._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (!message.isRead) handleMarkAsRead(message);
                                    }}
                                    className={cn(
                                        'w-full p-4 text-left hover:bg-white/5 transition-colors',
                                        selectedMessage?._id === message._id && 'bg-white/5',
                                        !message.isRead && 'border-l-2 border-primary'
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            {!message.isRead && (
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            )}
                                            <span className="text-white font-medium text-sm">{message.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {formatDate(message.createdAt).split(',')[0]}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate">{message.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{message.email}</p>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Message Detail */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 glass rounded-2xl p-6"
                >
                    <AnimatePresence mode="wait">
                        {selectedMessage ? (
                            <motion.div
                                key={selectedMessage._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between pb-4 border-b border-white/5">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{selectedMessage.name}</h2>
                                        {selectedMessage.businessName && (
                                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                <Building2 className="w-4 h-4" />
                                                <span>{selectedMessage.businessName}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setMessageToDelete(selectedMessage);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-400" />
                                    </button>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                                        <Mail className="w-5 h-5 text-accent" />
                                        <div>
                                            <div className="text-xs text-gray-400">Email</div>
                                            <a href={`mailto:${selectedMessage.email}`} className="text-white text-sm hover:text-accent">
                                                {selectedMessage.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                                        <Phone className="w-5 h-5 text-accent" />
                                        <div>
                                            <div className="text-xs text-gray-400">Telefon</div>
                                            <a href={`tel:${selectedMessage.phone}`} className="text-white text-sm hover:text-accent">
                                                {selectedMessage.phone}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 md:col-span-2">
                                        <Calendar className="w-5 h-5 text-accent" />
                                        <div>
                                            <div className="text-xs text-gray-400">Yuborilgan vaqt</div>
                                            <div className="text-white text-sm">{formatDate(selectedMessage.createdAt)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-3">Xabar matni</h3>
                                    <div className="p-4 rounded-xl bg-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-3 pt-4 border-t border-white/5">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.businessName || selectedMessage.name}`}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-center hover:shadow-lg hover:shadow-primary/50 transition-all"
                                    >
                                        Email javob berish
                                    </a>
                                    <a
                                        href={`tel:${selectedMessage.phone}`}
                                        className="flex-1 py-3 rounded-xl glass text-white font-medium text-center hover:bg-white/10 transition-colors"
                                    >
                                        Qo'ng'iroq qilish
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <Mail className="w-16 h-16 text-gray-600 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Xabar tanlanmagan</h3>
                                <p className="text-gray-400">Ko'rish uchun chap tomondagi ro'yxatdan xabar tanlang</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteMessage}
                title="Xabarni o'chirish"
                message="Bu xabarni o'chirishni xohlaysizmi?"
            />
        </div>
    );
};

export default MessagesPage;