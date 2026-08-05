import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteFile = (filePath) => {
    if (!filePath) return;

    // Agar filePath to'liq URL bo'lsa, faqat qismini olamiz
    const fileName = filePath.split('/uploads/')[1];
    if (!fileName) return;

    const fullPath = path.join(__dirname, '../../uploads', fileName);

    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Faylni o'chirishda xatolik: ${fullPath}`, err);
        } else {
            console.log(`Fayl muvaffaqiyatli o'chirildi: ${fileName}`);
        }
    });
};