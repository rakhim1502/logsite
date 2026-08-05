import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Ism kiritilishi shart'] },
    phone: { type: String, required: [true, 'Telefon kiritilishi shart'] },
    businessName: { type: String, default: '' },
    email: { type: String, required: [true, 'Email kiritilishi shart'] },
    message: { type: String, required: [true, 'Xabar kiritilishi shart'] },
    isRead: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'completed'],
        default: 'new'
    }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);