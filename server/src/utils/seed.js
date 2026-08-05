import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Setting from '../models/Setting.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB ulandi');

        // Dastlabki admin yaratish
        const adminExists = await User.findOne({ email: 'uzbrm95@gmail.com' });

        if (!adminExists) {
            const admin = await User.create({
                name: 'Admin',
                email: 'uzbrm95@gmail.com',
                password: '159sdfraxim',
                role: 'admin'
            });
            console.log('✅ Admin yaratildi:');
            console.log('   Email: uzbrm95@gmail.com');
            console.log('   Parol: 159sdfraxim');
            console.log('   ⚠️  Iltimos, birinchi kirishdan keyin parolni o\'zgartiring!');
        } else {
            console.log('ℹ️  Admin allaqachon mavjud');
        }

        // Dastlabki sozlamalar
        const settingsExist = await Setting.findOne();
        if (!settingsExist) {
            await Setting.create({
                siteTitle: 'Log.Site',
                tagline: 'Biznesingiz uchun professional web-saytlar.',
                contactEmail: 'info@log.site',
                contactPhone: '+998 90 123 45 67'
            });
            console.log('✅ Dastlabki sozlamalar yaratildi');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed xatosi:', error);
        process.exit(1);
    }
};

seed();