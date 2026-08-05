import asyncHandler from 'express-async-handler';
import FAQ from '../models/FAQ.js';

// @desc    Barcha FAQ'larni olish
// @route   GET /api/faqs
export const getFAQs = asyncHandler(async (req, res) => {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(faqs);
});

// @desc    Bitta FAQ'ni olish
// @route   GET /api/faqs/:id
export const getFAQById = asyncHandler(async (req, res) => {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
        res.status(404);
        throw new Error('FAQ topilmadi');
    }

    res.json(faq);
});

// @desc    Yangi FAQ yaratish
// @route   POST /api/faqs
export const createFAQ = asyncHandler(async (req, res) => {
    const { question, answer, order } = req.body;

    const faq = await FAQ.create({
        question,
        answer,
        order: order || 0
    });

    res.status(201).json(faq);
});

// @desc    FAQ'ni yangilash
// @route   PUT /api/faqs/:id
export const updateFAQ = asyncHandler(async (req, res) => {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
        res.status(404);
        throw new Error('FAQ topilmadi');
    }

    faq.question = req.body.question || faq.question;
    faq.answer = req.body.answer || faq.answer;
    faq.order = req.body.order !== undefined ? req.body.order : faq.order;
    faq.isActive = req.body.isActive !== undefined ? req.body.isActive : faq.isActive;

    const updatedFAQ = await faq.save();
    res.json(updatedFAQ);
});

// @desc    FAQ'ni o'chirish
// @route   DELETE /api/faqs/:id
export const deleteFAQ = asyncHandler(async (req, res) => {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
        res.status(404);
        throw new Error('FAQ topilmadi');
    }

    await faq.deleteOne();
    res.json({ message: 'FAQ muvaffaqiyatli o\'chirildi' });
});