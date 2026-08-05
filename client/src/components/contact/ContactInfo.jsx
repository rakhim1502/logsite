import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Camera, Globe, Clock } from 'lucide-react';

const ContactInfo = () => {
    const contactItems = [
        {
            icon: Phone,
            label: 'Telefon',
            value: '+998 70 474 73 50',
            link: 'tel:+998901234567',
            color: 'from-primary to-blue-500'
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'uzbrm95@gmail.com',
            link: 'mailto:uzbrm95@gmail.com',
            color: 'from-accent to-cyan-500'
        },
        {
            icon: MapPin,
            label: 'Manzil',
            value: 'Buxoro, O\'zbekiston',
            link: 'https://maps.app.goo.gl/bUqZ5DyMrLcuHi4AA',
            color: 'from-success to-emerald-500'
        },
        {
            icon: Clock,
            label: 'Ish vaqti',
            value: 'Dush - Shan: 9:00 - 18:00',
            link: null,
            color: 'from-purple-500 to-pink-500'
        }
    ];

    const socialLinks = [
        {
            icon: MessageCircle, // Telegram
            label: 'Telegram',
            link: 'https://t.me/r_15_02',
            color: 'from-blue-400 to-blue-600'
        },
        {
            icon: Camera, // Instagram
            label: 'Instagram',
            link: 'https://instagram.com/log.site',
            color: 'from-pink-500 to-purple-600'
        },
        {
            icon: Globe, // Facebook
            label: 'Facebook',
            link: 'https://facebook.com/logsite',
            color: 'from-blue-600 to-indigo-700'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
        >
            {/* Contact Items */}
            <div className="space-y-4">
                {contactItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.a
                            key={index}
                            href={item.link || '#'}
                            target={item.link?.startsWith('http') ? '_blank' : undefined}
                            rel={item.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="group flex items-center space-x-4 glass rounded-2xl p-5 hover:bg-white/5 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 flex-shrink-0`}>
                                <div className="w-full h-full rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                                <div className="text-white font-medium group-hover:gradient-text transition-all duration-300">
                                    {item.value}
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4">Ijtimoiy tarmoqlar</h4>
                <div className="grid grid-cols-3 gap-3">
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <motion.a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="group flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.color} p-0.5`}>
                                    <div className="w-full h-full rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 group-hover:text-white transition-colors">
                                    {social.label}
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>

            {/* Google Map */}
            <div className="glass rounded-2xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.508737135979!2d69.2793893154!3d41.3110829792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0b5a8b6b7f%3A0x7b5e6e8b5e8b5e8b!2sBukhara%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title="Log.Site Location"
                />
            </div>
        </motion.div>
    );
};

export default ContactInfo;