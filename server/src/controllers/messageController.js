import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';

// @desc    Barcha xabarlarni olish
// @route   GET /api/messages
export const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
});

// @desc    Bitta xabarni olish
// @route   GET /api/messages/:id
export const getMessageById = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(404);
        throw new Error('Xabar topilmadi');
    }

    res.json(message);
});

// @desc    Xabarni yangilash (status, isRead)
// @route   PUT /api/messages/:id
export const updateMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(404);
        throw new Error('Xabar topilmadi');
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : message.isRead;
    message.status = req.body.status || message.status;

    const updatedMessage = await message.save();
    res.json(updatedMessage);
});

// @desc    Xabarni o'chirish
// @route   DELETE /api/messages/:id
export const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(404);
        throw new Error('Xabar topilmadi');
    }

    await message.deleteOne();
    res.json({ message: 'Xabar muvaffaqiyatli o\'chirildi' });
});

// @desc    Kontakt xabarini saqlash (Contact form uchun)
// @route   POST /api/messages
export const createMessage = asyncHandler(async (req, res) => {
    const { name, phone, businessName, email, message } = req.body;

    const newMessage = await Message.create({
        name,
        phone,
        businessName: businessName || '',
        email,
        message
    });

    res.status(201).json(newMessage);
});