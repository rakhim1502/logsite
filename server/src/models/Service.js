import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Xizmat nomi kiritilishi shart'] },
    description: { type: String, required: true },
    icon: { type: String, default: '' }, // Lucide React ikonka nomi (masalan: "Zap")
    imagePath: { type: String, default: '' },
    order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);