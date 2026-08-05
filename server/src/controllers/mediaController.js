import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deleteFile } from '../utils/fileHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Barcha yuklangan fayllarni olish
// @route   GET /api/media
export const getAllMedia = asyncHandler(async (req, res) => {
    const uploadsDir = path.join(__dirname, '../../uploads');

    if (!fs.existsSync(uploadsDir)) {
        return res.json([]);
    }

    const files = fs.readdirSync(uploadsDir);
    const mediaList = files.map(file => {
        const stats = fs.statSync(path.join(uploadsDir, file));
        return {
            filename: file,
            url: `/uploads/${file}`,
            size: stats.size,
            createdAt: stats.birthtime
        };
    });

    res.json(mediaList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// @desc    Faylni o'chirish
// @route   DELETE /api/media/:filename
export const deleteMedia = asyncHandler(async (req, res) => {
    const { filename } = req.params;

    const filePath = `/uploads/${filename}`;
    deleteFile(filePath);

    res.json({ message: 'Fayl muvaffaqiyatli o\'chirildi' });
});