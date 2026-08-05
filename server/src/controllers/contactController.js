import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';

// @desc    Kontakt xabarini yuborish va Telegramga bildirishnoma yuborish
// @route   POST /api/contact
export const sendContactMessage = asyncHandler(async (req, res) => {
    const { name, phone, businessName, email, message } = req.body;

    if (!name || !phone || !email || !message) {
        res.status(400);
        throw new Error('Barcha majburiy maydonlarni to\'ldiring');
    }

    // 1. Xabarni bazaga saqlash
    const newMessage = await Message.create({
        name,
        phone,
        businessName: businessName || '',
        email,
        message
    });

    // 2. Telegramga bildirishnoma yuborish
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
            const telegramMessage = `
🔔 *Yangi xabar keldi!*

👤 *Ism:* ${name}
📞 *Telefon:* ${phone}
🏢 *Biznes:* ${businessName || 'Ko\'rsatilmagan'}
📧 *Email:* ${email}

💬 *Xabar:*
${message}
      `;

            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'Markdown'
                })
            });

            console.log('✅ Telegramga bildirishnoma yuborildi');
        }
    } catch (telegramError) {
        console.error('❌ Telegram xatosi:', telegramError.message);
        // Telegram xato bersa ham, foydalanuvchi xabar yuborganini bilishi uchun jarayon to'xtatilmaydi
    }

    // 3. Email yuborish (agar sozlangan bo'lsa)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: email,
                to: process.env.EMAIL_USER,
                subject: `Log.Site - Yangi xabar: ${businessName || name}`,
                html: `
          <h2>Yangi kontakt xabari</h2>
          <p><strong>Ism:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Biznes nomi:</strong> ${businessName || 'Ko\'rsatilmagan'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Xabar:</strong></p>
          <p>${message}</p>
        `
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('❌ Email yuborishda xatolik:', emailError.message);
        }
    }

    res.status(200).json({
        message: 'Xabaringiz muvaffaqiyatli yuborildi',
        messageId: newMessage._id
    });
});