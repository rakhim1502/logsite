import asyncHandler from 'express-async-handler';
import Setting from '../models/Setting.js';
import { deleteFile } from '../utils/fileHelper.js';

// @desc    Sozlamalarni olish
// @route   GET /api/settings
export const getSettings = asyncHandler(async (req, res) => {
    let settings = await Setting.findOne();

    if (!settings) {
        settings = await Setting.create({});
    }

    res.json(settings);
});

// @desc    Sozlamalarni yangilash
// @route   PUT /api/settings
export const updateSettings = asyncHandler(async (req, res) => {
    let settings = await Setting.findOne();

    if (!settings) {
        settings = await Setting.create({});
    }

    // Agar yangi logo yuklangan bo'lsa, eski logoni o'chiramiz
    if (req.file && settings.logoPath) {
        deleteFile(settings.logoPath);
    }

    settings.siteTitle = req.body.siteTitle || settings.siteTitle;
    settings.tagline = req.body.tagline || settings.tagline;
    settings.contactEmail = req.body.contactEmail || settings.contactEmail;
    settings.contactPhone = req.body.contactPhone || settings.contactPhone;

    if (req.body.socialLinks) {
        settings.socialLinks = {
            ...settings.socialLinks.toObject(),
            ...req.body.socialLinks
        };
    }

    if (req.file) {
        settings.logoPath = `/uploads/${req.file.filename}`;
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});