import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    siteTitle: { type: String, default: 'Log.Site' },
    tagline: { type: String, default: 'Biznesingiz uchun professional web-saytlar.' },
    logoPath: { type: String, default: '' },
    contactEmail: { type: String, default: 'info@log.site' },
    contactPhone: { type: String, default: '+998 90 123 45 67' },
    socialLinks: {
        telegram: { type: String, default: '' },
        instagram: { type: String, default: '' },
        facebook: { type: String, default: '' }
    }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);