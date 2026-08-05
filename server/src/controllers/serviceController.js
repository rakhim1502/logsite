import asyncHandler from 'express-async-handler';
import Service from '../models/Service.js';
import { deleteFile } from '../utils/fileHelper.js';

// @desc    Barcha xizmatlarni olish
// @route   GET /api/services
export const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json(services);
});

// @desc    Bitta xizmatni olish
// @route   GET /api/services/:id
export const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Xizmat topilmadi');
    }

    res.json(service);
});

// @desc    Yangi xizmat yaratish
// @route   POST /api/services
export const createService = asyncHandler(async (req, res) => {
    const { title, description, icon, order } = req.body;

    const serviceData = {
        title,
        description,
        icon: icon || '',
        order: order || 0
    };

    // Agar rasm yuklangan bo'lsa
    if (req.file) {
        serviceData.imagePath = `/uploads/${req.file.filename}`;
    }

    const service = await Service.create(serviceData);
    res.status(201).json(service);
});

// @desc    Xizmatni yangilash
// @route   PUT /api/services/:id
export const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        if (req.file) deleteFile(req.file.path);
        res.status(404);
        throw new Error('Xizmat topilmadi');
    }

    // Agar yangi rasm yuklangan bo'lsa, eski rasmni o'chiramiz
    if (req.file && service.imagePath) {
        deleteFile(service.imagePath);
    }

    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.icon = req.body.icon !== undefined ? req.body.icon : service.icon;
    service.order = req.body.order !== undefined ? req.body.order : service.order;

    if (req.file) {
        service.imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedService = await service.save();
    res.json(updatedService);
});

// @desc    Xizmatni o'chirish
// @route   DELETE /api/services/:id
export const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Xizmat topilmadi');
    }

    if (service.imagePath) {
        deleteFile(service.imagePath);
    }

    await service.deleteOne();
    res.json({ message: 'Xizmat muvaffaqiyatli o\'chirildi' });
});