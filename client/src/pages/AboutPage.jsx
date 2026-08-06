import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage = () => {
    const values = [
        {
            icon: Target,
            title: 'Maqsad',
            description: 'Kichik va o\'rta bizneslarni internet orqali rivojlantirish',
            color: 'from-primary to-blue-500'
        },
        {
            icon: Eye,
            title: 'Vizyon',
            description: 'O\'zbekistondagi eng ishonchli web agency bo\'lish',
            color: 'from-accent to-cyan-500'
        },
        {
            icon: Award,
            title: 'Sifat',
            description: 'Har bir loyihada yuqori sifat va professional yondashuv',
            color: 'from-success to-emerald-500'
        },
        {
            icon: Users,
            title: 'Hamkorlik',
            description: 'Mijozlarimiz bilan uzoq muddatli hamkorlik o\'rnatish',
            color: 'from-purple-500 to-pink-500'
        }
    ];

    const achievements = [
        '50+ muvaffaqiyatli loyihalar',
        '30+ mamnun mijozlar',
        '99% mijozlar mamnunligi',
        '24/7 texnik yordam',
        '3+ yillik tajriba',
        'Awwwards darajasidagi dizayn'
    ];

    return (
        <>
            <SEO
                title="Biz haqimizda - Log.Site"
                description="Log.Site - O'zbekistondagi professional web agency. 3+ yillik tajriba, 10+ loyiha, 7+ mamnun mijoz."
                url="https://log.site/about"
                type="website"
            />

            <div className="min-h-screen pt-20">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

                    <div className="container mx-auto px-4 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
                            >
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm text-gray-300">Biz haqimizda</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                <span className="text-white">Biznesingiz uchun </span>
                                <span className="gradient-text">ishonchli hamkor</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                3+ yillik tajriba bilan biz kichik va o'rta bizneslarni internet orqali rivojlantirishga
                                yordam beramiz. Har bir loyiha — bu mijozning muvaffaqiyati.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="relative py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Bizning qadriyatlarimiz
                            </h2>
                            <p className="text-gray-400">
                                Har bir loyihada biz ushbu qadriyatlarga amal qilamiz
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="glass rounded-2xl p-6 text-center relative overflow-hidden group"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                        <div className="relative z-10">
                                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} p-0.5 shadow-lg`}>
                                                <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                            <p className="text-sm text-gray-400">{value.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                <section className="relative py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Nega bizni tanlashadi?
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Biz faqat sifat va natijaga kafolat beramiz. Har bir loyihada professional
                                    yondashuv, zamonaviy texnologiyalar va individual dizayn.
                                </p>

                                <div className="space-y-3">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center space-x-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-success" />
                                            </div>
                                            <span className="text-gray-300">{achievement}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="glass rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-success/10" />

                                    <div className="relative z-10 space-y-6">
                                        <div className="text-center">
                                            <div className="text-6xl font-bold gradient-text mb-2">3+</div>
                                            <div className="text-gray-400">Yillik tajriba</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-white mb-1">10+</div>
                                                <div className="text-sm text-gray-400">Loyihalar</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-white mb-1">7+</div>
                                                <div className="text-sm text-gray-400">Mijozlar</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-white mb-1">99%</div>
                                                <div className="text-sm text-gray-400">Mamnunlik</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                                                <div className="text-sm text-gray-400">Support</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;