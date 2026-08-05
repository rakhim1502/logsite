import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import FAQItem from './FAQItem';
import { Loader2 } from 'lucide-react';

const FAQ = () => {
    const { data, loading, error } = useFetch('/faqs');
    const [openIndex, setOpenIndex] = useState(0);

    // Fallback data
    const fallbackFAQs = [
        {
            _id: '1',
            question: 'Website yaratish qancha vaqt oladi?',
            answer: 'Loyihaning murakkabligiga qarab, oddiy landing page 3-5 kun, corporate website 2-3 hafta, e-commerce yoki custom loyihalar 1-2 oy vaqt oladi. Biz har doim aniq muddatlarni oldindan kelishib olamiz va shu muddatda sifatli ish topshiramiz.',
            order: 1
        },
        {
            _id: '2',
            question: 'Narxlar qanday belgilanadi?',
            answer: 'Narxlar loyihaning hajmi, funksiyalari, dizayn murakkabligi va qo\'shimcha xizmatlarga qarab belgilanadi. Biz shaffof narx siyosatini qo\'llaymiz — yashirin to\'lovlar yo\'q. Bepul konsultatsiya orqali aniq narxni bilib olishingiz mumkin.',
            order: 2
        },
        {
            _id: '3',
            question: 'Admin panel bormi?',
            answer: 'Ha, barcha loyihalarimizda qulay va xavfsiz admin panel mavjud. Admin panel orqali kontentni tahrirlash, rasmlarni yuklash, yangiliklar qo\'shish va boshqa barcha ma\'lumotlarni boshqarishingiz mumkin. Hech qanday dasturlash bilimi talab qilinmaydi.',
            order: 3
        },
        {
            _id: '4',
            question: 'SEO optimizatsiya qilasizlarmi?',
            answer: 'Albatta! Barcha loyihalarimizda to\'liq SEO optimizatsiya amalga oshiriladi: meta teglar, schema markup, tez yuklanish, mobile-friendly, sitemap.xml, robots.txt va boshqalar. Natijada saytingiz Google qidiruv tizimida yuqori o\'rinlarni egallaydi.',
            order: 4
        },
        {
            _id: '5',
            question: 'To\'lov qanday amalga oshiriladi?',
            answer: 'To\'lov odatda 3 bosqichda amalga oshiriladi: 30% oldindan to\'lov (loyiha boshlanganda), 40% o\'rta bosqichda (dizayn tasdiqlanganda), 30% loyiha topshirilganda. Payme, Click, bank o\'tkazmasi yoki naqd pul qabul qilamiz.',
            order: 5
        },
        {
            _id: '6',
            question: 'Sayt tayyor bo\'lgandan keyin support bormi?',
            answer: 'Ha, barcha paketlarimizda bepul support mavjud. Starter paketda 1 oy, Business paketda 3 oy, Premium paketda 6 oy, Enterprise paketda 12 oy bepul texnik yordam ko\'rsatamiz. Bundan tashqari, doimiy support paketlari ham mavjud.',
            order: 6
        },
        {
            _id: '7',
            question: 'O\'zgartirish kiritish mumkinmi?',
            answer: 'Albatta! Loyiha jarayonida har bir bosqichda sizning fikr-mulohazalaringizni inobatga olamiz. Dizayn tasdiqlangunga qadar cheksiz o\'zgartirishlar kiritish mumkin. Keyinchalik ham admin panel orqali yoki bizga murojaat qilib o\'zgartirishlar kiritishingiz mumkin.',
            order: 7
        },
        {
            _id: '8',
            question: 'Domain va hosting yordam berasizlarmi?',
            answer: 'Ha, domain ro\'yxatdan o\'tkazish va hosting sozlashda to\'liq yordam beramiz. Biz ishonchli hosting provayderlari bilan hamkorlik qilamiz va sizga eng yaxshi variantni tavsiya qilamiz. Domain va hosting xarajatlari alohida to\'lanadi.',
            order: 8
        }
    ];

    const faqs = data && data.length > 0 ? data : fallbackFAQs;

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-32"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm text-gray-300">Ko'p Beriladigan Savollar</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">Savollaringiz </span>
                            <span className="gradient-text">bormi?</span>
                        </h2>

                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                            Eng ko'p beriladigan savollarga javoblarni shu yerdan topishingiz mumkin.
                            Boshqa savollaringiz bo'lsa, biz bilan bog'laning.
                        </p>

                        {/* Contact CTA */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-white font-semibold mb-2">Javob topa olmadingizmi?</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Biz bilan bog'laning va bepul konsultatsiya oling
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                            >
                                <span>Bog'lanish</span>
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side - FAQ Items */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-red-400">FAQ'larni yuklashda xatolik yuz berdi</p>
                            </div>
                        ) : (
                            faqs.map((faq, index) => (
                                <FAQItem
                                    key={faq._id || index}
                                    faq={faq}
                                    index={index}
                                    isOpen={openIndex === index}
                                    onToggle={() => handleToggle(index)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;