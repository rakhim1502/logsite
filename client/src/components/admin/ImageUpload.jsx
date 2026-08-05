import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload,  AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ImageUpload = ({
    value,
    onChange,
    label = 'Rasm',
    accept = 'image/jpeg,image/jpg,image/png,image/webp',
    maxSize = 10 * 1024 * 1024, // 10MB
    required = false,
    error = null
}) => {
    const [preview, setPreview] = useState(value || null);
    const [uploadError, setUploadError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        setUploadError(null);

        // Format tekshirish
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setUploadError('Faqat JPG, JPEG, PNG va WEBP formatlari ruxsat etilgan');
            return false;
        }

        // Hajm tekshirish
        if (file.size > maxSize) {
            setUploadError(`Fayl hajmi ${maxSize / 1024 / 1024}MB dan oshmasligi kerak`);
            return false;
        }

        return true;
    };

    const handleFileChange = (file) => {
        if (!file) return;

        if (!validateFile(file)) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            onChange(file);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const file = e.target.files?.[0];
        handleFileChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFileChange(file);
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        setUploadError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
            )}

            {/* Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    'relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden',
                    isDragging
                        ? 'border-primary bg-primary/10'
                        : preview
                            ? 'border-transparent'
                            : 'border-white/20 hover:border-primary/50 bg-white/5 hover:bg-white/10'
                )}
            >
                {preview ? (
                    // Preview
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-xl"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors"
                            >
                                Almashtirish
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                }}
                                className="px-4 py-2 rounded-lg bg-red-500/80 backdrop-blur-sm text-white text-sm font-medium hover:bg-red-500 transition-colors"
                            >
                                O'chirish
                            </button>
                        </div>
                    </div>
                ) : (
                    // Upload Prompt
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5 mb-4"
                        >
                            <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                <Upload className="w-7 h-7 text-white" />
                            </div>
                        </motion.div>
                        <p className="text-white font-medium mb-1">
                            Rasmni yuklang yoki shu yerga tashlang
                        </p>
                        <p className="text-gray-400 text-sm mb-2">
                            JPG, JPEG, PNG, WEBP (max 10MB)
                        </p>
                        <p className="text-xs text-gray-500">
                            Yuklash uchun bosing
                        </p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {(uploadError || error) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center space-x-2 text-red-400 text-sm"
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{uploadError || error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageUpload;