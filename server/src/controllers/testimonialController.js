import asyncHandler from 'express-async-handler';
import Testimonial from '../models/Testimonial.js';
import { deleteFile } from '../utils/fileHelper.js';

// @desc    Barcha testimonialslarni olish
// @route   GET /api/testimonials
export const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
});

// @desc    Bitta testimonialni olish
// @route   GET /api/testimonials/:id
export const getTestimonialById = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
        res.status(404);
        throw new Error('Testimonial topilmadi');
    }

    res.json(testimonial);
});

// @desc    Yangi testimonial yaratish
// @route   POST /api/testimonials
export const createTestimonial = asyncHandler(async (req, res) => {
    const { name, company, text, rating, order } = req.body;

    const testimonialData = {
        name,
        company,
        text,
        rating: rating || 5,
        order: order || 0
    };

    if (req.file) {
        testimonialData.avatar = `/uploads/${req.file.filename}`;
    }

    const testimonial = await Testimonial.create(testimonialData);
    res.status(201).json(testimonial);
});

// @desc    Testimonialni yangilash
// @route   PUT /api/testimonials/:id
export const updateTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
        if (req.file) deleteFile(req.file.path);
        res.status(404);
        throw new Error('Testimonial topilmadi');
    }

    if (req.file && testimonial.avatar) {
        deleteFile(testimonial.avatar);
    }

    testimonial.name = req.body.name || testimonial.name;
    testimonial.company = req.body.company || testimonial.company;
    testimonial.text = req.body.text || testimonial.text;
    testimonial.rating = req.body.rating !== undefined ? req.body.rating : testimonial.rating;
    testimonial.order = req.body.order !== undefined ? req.body.order : testimonial.order;
    testimonial.isActive = req.body.isActive !== undefined ? req.body.isActive : testimonial.isActive;

    if (req.file) {
        testimonial.avatar = `/uploads/${req.file.filename}`;
    }

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
});

// @desc    Testimonialni o'chirish
// @route   DELETE /api/testimonials/:id
export const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
        res.status(404);
        throw new Error('Testimonial topilmadi');
    }

    if (testimonial.avatar) {
        deleteFile(testimonial.avatar);
    }

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial muvaffaqiyatli o\'chirildi' });
});