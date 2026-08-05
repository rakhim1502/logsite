import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Sarlavha kiritilishi shart'] },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    imagePath: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, default: 'Log.Site Team' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);