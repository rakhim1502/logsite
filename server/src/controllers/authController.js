import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

// @desc    Ro'yxatdan o'tish (Faqat dastlabki admin uchun)
// @route   POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Bu email allaqachon mavjud');
    }

    const user = await User.create({ name, email, password, role: 'admin' });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 kun
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
    });
});

// @desc    Tizimga kirish
// @route   POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken
        });
    } else {
        res.status(401);
        throw new Error('Email yoki parol noto\'g\'ri');
    }
});

// @desc    Refresh Token orqali yangi Access Token olish
// @route   POST /api/auth/refresh
export const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        res.status(401);
        throw new Error('Ruxsatnoma topilmadi');
    }

    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) {
        res.status(403);
        throw new Error('Noto\'g\'ri refresh token');
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err || user._id.toString() !== decoded.id) {
            res.status(403);
            throw new Error('Noto\'g\'ri refresh token');
        }

        const newAccessToken = generateAccessToken(user._id);
        res.json({ accessToken: newAccessToken });
    });
});

// @desc    Tizimdan chiqish
// @route   POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.status(204).send(); // No Content

    const user = await User.findOne({ refreshToken: cookies.refreshToken });
    if (user) {
        user.refreshToken = null;
        await user.save();
    }

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Tizimdan muvaffaqiyatli chiqildi' });
});

// @desc    Joriy foydalanuvchi ma'lumotlarini olish
// @route   GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    res.json(user);
});