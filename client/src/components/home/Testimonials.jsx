import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import TestimonialCard from './TestimonialCard';
import { cn } from '../../utils/helpers';

const Testimonials = () => {
    const { data, loading, error } = useFetch('/testimonials');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Fallback data
    const fallbackTestimonials = [
        {
            _id: '1',
            name: 'Alisher Karimov',
            company: 'MediCare Klinika',
            text: 'Log.Site jamoasi bilan ishlash juda yoqimli bo\'ldi. Ular bizning klinika uchun zamonaviy va professional website yaratdilar. Bemorlar endi onlayn band qilishlari mumkin, bu bizning ish jarayonimizni 50% ga tezlashtirdi.',
            avatar: '',
            rating: 5
        },
        {
            _id: '2',
            name: 'Dilnoza Rahimova',
            company: 'Taste of Italy Restoran',
            text: 'Restoranimiz uchun yaratilgan website juda ajoyib chiqdi. Onlayn menyu, band qilish tizimi va yetkazib berish funksiyalari mijozlarimiz uchun juda qulay. Mijozlar sonimiz 3 barobarga oshdi!',
            avatar: '',
            rating: 5
        },
        {
            _id: '3',
            name: 'Bobur Toshmatov',
            company: 'TravelUz Agency',
            text: 'Sayohat agentligimiz uchun to\'liq booking platformasi yaratildi. Xarita integratsiyasi, to\'lov tizimi va admin panel juda qulay. Endi biz butun O\'zbekiston bo\'ylab sayohatlarni boshqarishimiz mumkin.',
            avatar: '',
            rating: 5
        },
        {
            _id: '4',
            name: 'Nodira Saidova',
            company: 'EduCenter O\'quv Markazi',
            text: 'LMS tizimi va onlayn darslar platformasi bizning o\'quv markazimizni yangi bosqichga olib chiqdi. Talabalar endi uyda o\'tirib darslarga qo\'shilishlari mumkin. Log.Site jamoasiga katta rahmat!',
            avatar: '',
            rating: 5
        },
        {
            _id: '5',
            name: 'Sardor Aliyev',
            company: 'BuildPro Qurilish',
            text: 'Qurilish kompaniyamiz uchun portfolio va loyiha boshqaruv tizimi yaratildi. Mijozlar endi bizning ishlarimizni onlayn ko\'rishlari mumkin. Professional dizayn va tezkor ishlash - bularning barchasi Log.Site tufayli.',
            avatar: '',
            rating: 5
        }
    ];

    const testimonials = data && data.length > 0 ? data : fallbackTestimonials;

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handleDotClick = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/4 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                        <span className="text-sm text-gray-300">Mijozlar Fikrlari</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">Mijozlarimiz </span>
                        <span className="gradient-text">nima deydi?</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        50+ mamnun mijoz, 99% ijobiy fikr-mulohaza. Bizning ishimiz — sizning muvaffaqiyatingiz.
                    </p>
                </motion.div>

                {/* Slider Container */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-400">Fikr-mulohazalarni yuklashda xatolik yuz berdi</p>
                    </div>
                ) : (
                    <>
                        {/* Carousel */}
                        <div className="relative max-w-4xl mx-auto">
                            {/* Cards Container */}
                            <div className="relative overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <TestimonialCard
                                            key={testimonial._id || index}
                                            testimonial={testimonial}
                                            isActive={index === currentIndex}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <div className="flex items-center justify-center space-x-4 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handlePrev}
                                    className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </motion.button>

                                {/* Dots */}
                                <div className="flex items-center space-x-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleDotClick(index)}
                                            className={cn(
                                                'transition-all duration-300 rounded-full',
                                                index === currentIndex
                                                    ? 'w-8 h-2 bg-gradient-to-r from-primary to-accent'
                                                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                            )}
                                        />
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleNext}
                                    className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                        >
                            {[
                                { value: '50+', label: 'Mijozlar' },
                                { value: '99%', label: 'Mamnunlik' },
                                { value: '5.0', label: 'O\'rtacha reyting' },
                                { value: '100%', label: 'Tavsiya qiladi' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl p-6 text-center"
                                >
                                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Testimonials;