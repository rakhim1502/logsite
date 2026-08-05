import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Loyiha nomi kiritilishi shart'] },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['Medical', 'Restaurant', 'Travel', 'Education', 'Construction', 'Rental', 'Boshqa'],
        required: true
    },
    imagePath: { type: String, required: [true, 'Loyiha rasmi kiritilishi shart'] }, // Faqat path saqlanadi: "/uploads/xyz.jpg"
    technologies: [{ type: String }],
    liveLink: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);