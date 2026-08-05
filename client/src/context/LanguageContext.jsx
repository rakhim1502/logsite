/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};

const translations = {
    uz: {
        nav: {
            home: 'Bosh sahifa',
            services: 'Xizmatlar',
            portfolio: 'Portfolio',
            pricing: 'Narxlar',
            blog: 'Blog',
            about: 'Biz haqimizda',
            contact: 'Kontakt',
            cta: 'Bepul konsultatsiya'
        },
        hero: {
            title: 'Biznesingizni internetga olib chiqing',
            subtitle: 'Professional web-saytlar orqali yangi mijozlarga ega bo\'ling.',
            cta1: 'Bepul konsultatsiya',
            cta2: 'Portfolio'
        },
        stats: {
            projects: 'Loyihalar',
            clients: 'Mamnun mijozlar',
            satisfaction: 'Mamnunlik',
            support: 'Qo\'llab-quvvatlash'
        },
        services: {
            title: 'Bizning Xizmatlar',
            subtitle: 'Biznesingiz uchun eng zamonaviy yechimlar'
        },
        portfolio: {
            title: 'Bizning Ishlar',
            subtitle: 'Mijozlarimiz uchun yaratilgan premium loyihalar',
            viewDetails: 'Batafsil ko\'rish'
        },
        pricing: {
            title: 'Narxlar',
            subtitle: 'Biznesingiz uchun eng mos paketni tanlang',
            popular: 'Eng mashhur',
            choose: 'Tanlash'
        },
        contact: {
            title: 'Biz bilan bog\'laning',
            subtitle: 'Savollaringiz bormi? Biz bilan bog\'laning',
            name: 'Ism',
            phone: 'Telefon',
            business: 'Biznes nomi',
            email: 'Email',
            message: 'Xabar',
            send: 'Yuborish'
        },
        footer: {
            description: 'Biznesingiz uchun professional web-saytlar.',
            company: 'Kompaniya',
            quickLinks: 'Tezkor havolalar',
            contactUs: 'Biz bilan bog\'lanish',
            newsletter: 'Yangiliklar',
            subscribe: 'Obuna bo\'lish',
            rights: 'Barcha huquqlar himoyalangan'
        }
    },
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            portfolio: 'Portfolio',
            pricing: 'Pricing',
            blog: 'Blog',
            about: 'About',
            contact: 'Contact',
            cta: 'Free Consultation'
        },
        hero: {
            title: 'Take Your Business Online',
            subtitle: 'Get new customers through professional websites.',
            cta1: 'Free Consultation',
            cta2: 'Portfolio'
        },
        stats: {
            projects: 'Projects',
            clients: 'Happy Clients',
            satisfaction: 'Satisfaction',
            support: 'Support'
        },
        services: {
            title: 'Our Services',
            subtitle: 'Most modern solutions for your business'
        },
        portfolio: {
            title: 'Our Work',
            subtitle: 'Premium projects created for our clients',
            viewDetails: 'View Details'
        },
        pricing: {
            title: 'Pricing',
            subtitle: 'Choose the best package for your business',
            popular: 'Most Popular',
            choose: 'Choose'
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'Have questions? Get in touch with us',
            name: 'Name',
            phone: 'Phone',
            business: 'Business Name',
            email: 'Email',
            message: 'Message',
            send: 'Send'
        },
        footer: {
            description: 'Professional websites for your business.',
            company: 'Company',
            quickLinks: 'Quick Links',
            contactUs: 'Contact Us',
            newsletter: 'Newsletter',
            subscribe: 'Subscribe',
            rights: 'All rights reserved'
        }
    },
    ru: {
        nav: {
            home: 'Главная',
            services: 'Услуги',
            portfolio: 'Портфолио',
            pricing: 'Цены',
            blog: 'Блог',
            about: 'О нас',
            contact: 'Контакты',
            cta: 'Бесплатная консультация'
        },
        hero: {
            title: 'Выведите свой бизнес в интернет',
            subtitle: 'Получайте новых клиентов через профессиональные сайты.',
            cta1: 'Бесплатная консультация',
            cta2: 'Портфолио'
        },
        stats: {
            projects: 'Проекты',
            clients: 'Довольные клиенты',
            satisfaction: 'Удовлетворенность',
            support: 'Поддержка'
        },
        services: {
            title: 'Наши Услуги',
            subtitle: 'Самые современные решения для вашего бизнеса'
        },
        portfolio: {
            title: 'Наши Работы',
            subtitle: 'Премиум проекты, созданные для наших клиентов',
            viewDetails: 'Подробнее'
        },
        pricing: {
            title: 'Цены',
            subtitle: 'Выберите лучший пакет для вашего бизнеса',
            popular: 'Самый популярный',
            choose: 'Выбрать'
        },
        contact: {
            title: 'Свяжитесь с нами',
            subtitle: 'Есть вопросы? Свяжитесь с нами',
            name: 'Имя',
            phone: 'Телефон',
            business: 'Название бизнеса',
            email: 'Email',
            message: 'Сообщение',
            send: 'Отправить'
        },
        footer: {
            description: 'Профессиональные сайты для вашего бизнеса.',
            company: 'Компания',
            quickLinks: 'Быстрые ссылки',
            contactUs: 'Свяжитесь с нами',
            newsletter: 'Рассылка',
            subscribe: 'Подписаться',
            rights: 'Все права защищены'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'uz';
    });

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};