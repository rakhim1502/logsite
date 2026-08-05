import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, Download, Eye, Search, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
// import { cn } from '../../utils/helpers';

const MediaPage = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    // const [selectedFile, setSelectedFile] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const response = await api.get('/media');
            setMedia(response.data);
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFile = async () => {
        if (!fileToDelete) return;
        try {
            await api.delete(`/media/${fileToDelete.filename}`);
            fetchMedia();
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('O\'chirishda xatolik yuz berdi');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredMedia = media.filter(file =>
        file.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalSize = media.reduce((acc, file) => acc + file.size, 0);

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Media Kutubxona</h1>
                    <p className="text-gray-400">
                        Barcha yuklangan fayllar • {media.length} ta fayl • {formatFileSize(totalSize)}
                    </p>
                </div>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Fayl qidirish..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl glass text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
            </motion.div>

            {/* Media Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
                {loading ? (
                    <div className="col-span-full flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-accent animate-spin" />
                    </div>
                ) : filteredMedia.length === 0 ? (
                    <div className="col-span-full text-center py-20 glass rounded-2xl">
                        <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">Fayllar topilmadi</p>
                    </div>
                ) : (
                    filteredMedia.map((file, index) => (
                        <motion.div
                            key={file.filename}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                            className="group relative glass rounded-xl overflow-hidden hover:border-white/20 transition-all"
                        >
                            {/* Image Preview */}
                            <div className="aspect-square relative overflow-hidden bg-white/5">
                                <img
                                    src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${file.url}`}
                                    alt={file.filename}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                                    <button
                                        onClick={() => setPreviewFile(file)}
                                        className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                    >
                                        <Eye className="w-4 h-4 text-white" />
                                    </button>
                                    <a
                                        href={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${file.url}`}
                                        download
                                        className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                    >
                                        <Download className="w-4 h-4 text-white" />
                                    </a>
                                    <button
                                        onClick={() => {
                                            setFileToDelete(file);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="p-2 rounded-lg bg-red-500/50 backdrop-blur-sm hover:bg-red-500/70 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* File Info */}
                            <div className="p-3">
                                <div className="text-xs text-white truncate mb-1" title={file.filename}>
                                    {file.filename}
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{formatFileSize(file.size)}</span>
                                    <span>{formatDate(file.createdAt)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Preview Modal */}
            {previewFile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setPreviewFile(null)}
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <img
                        src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${previewFile.url}`}
                        alt={previewFile.filename}
                        className="max-w-full max-h-full object-contain"
                    />
                </motion.div>
            )}

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteFile}
                title="Faylni o'chirish"
                message={`"${fileToDelete?.filename}" faylini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.`}
            />
        </div>
    );
};

export default MediaPage;