import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';
import { deleteFile } from '../utils/fileHelper.js';

// @desc    Barcha bloglarni olish
// @route   GET /api/blogs
export const getBlogs = asyncHandler(async (req, res) => {
    const { category, limit = 10, page = 1 } = req.query;

    const filter = { isActive: true };
    if (category && category !== 'all') {
        filter.category = category;
    }

    const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const total = await Blog.countDocuments(filter);

    res.json({
        blogs,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
    });
});

// @desc    Bitta blogni olish (slug orqali)
// @route   GET /api/blogs/:slug
export const getBlogBySlug = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
        res.status(404);
        throw new Error('Blog topilmadi');
    }

    res.json(blog);
});

// @desc    Yangi blog yaratish
// @route   POST /api/blogs
export const createBlog = asyncHandler(async (req, res) => {
    const { title, slug, content, excerpt, category, author } = req.body;

    if (!req.file) {
        res.status(400);
        throw new Error('Blog rasmi yuklanishi shart');
    }

    const blogExists = await Blog.findOne({ slug });
    if (blogExists) {
        deleteFile(req.file.path);
        res.status(400);
        throw new Error('Bu slug allaqachon mavjud');
    }

    const blog = await Blog.create({
        title,
        slug,
        content,
        excerpt,
        category,
        author: author || 'Log.Site Team',
        imagePath: `/uploads/${req.file.filename}`
    });

    res.status(201).json(blog);
});

// @desc    Blogni yangilash
// @route   PUT /api/blogs/:id
export const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        if (req.file) deleteFile(req.file.path);
        res.status(404);
        throw new Error('Blog topilmadi');
    }

    if (req.file && blog.imagePath) {
        deleteFile(blog.imagePath);
    }

    blog.title = req.body.title || blog.title;
    blog.slug = req.body.slug || blog.slug;
    blog.content = req.body.content || blog.content;
    blog.excerpt = req.body.excerpt || blog.excerpt;
    blog.category = req.body.category || blog.category;
    blog.author = req.body.author || blog.author;
    blog.isActive = req.body.isActive !== undefined ? req.body.isActive : blog.isActive;

    if (req.file) {
        blog.imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
});

// @desc    Blogni o'chirish
// @route   DELETE /api/blogs/:id
export const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog topilmadi');
    }

    if (blog.imagePath) {
        deleteFile(blog.imagePath);
    }

    await blog.deleteOne();
    res.json({ message: 'Blog muvaffaqiyatli o\'chirildi' });
});