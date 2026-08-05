import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Ism kiritilishi shart'] },
    company: { type: String, required: [true, 'Kompaniya nomi kiritilishi shart'] },
    text: { type: String, required: [true, 'Fikr matni kiritilishi shart'] },
    avatar: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);