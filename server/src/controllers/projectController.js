import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { deleteFile } from '../utils/fileHelper.js';

// @desc    Barcha loyihalarni olish (filter bilan)
// @route   GET /api/projects
export const getProjects = asyncHandler(async (req, res) => {
    const { category, limit = 10, page = 1 } = req.query;

    const filter = {};
    if (category && category !== 'all') {
        filter.category = category;
    }

    const projects = await Project.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const total = await Project.countDocuments(filter);

    res.json({
        projects,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
    });
});

// @desc    Bitta loyihani olish (slug orqali)
// @route   GET /api/projects/:slug
export const getProjectBySlug = asyncHandler(async (req, res) => {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
        res.status(404);
        throw new Error('Loyiha topilmadi');
    }

    res.json(project);
});

// @desc    Yangi loyiha yaratish
// @route   POST /api/projects
export const createProject = asyncHandler(async (req, res) => {
    const { title, slug, description, category, technologies, liveLink } = req.body;

    if (!req.file) {
        res.status(400);
        throw new Error('Loyiha rasmi yuklanishi shart');
    }

    const projectExists = await Project.findOne({ slug });
    if (projectExists) {
        deleteFile(req.file.path);
        res.status(400);
        throw new Error('Bu slug allaqachon mavjud');
    }

    const project = await Project.create({
        title,
        slug,
        description,
        category,
        imagePath: `/uploads/${req.file.filename}`,
        technologies: technologies || [],
        liveLink: liveLink || ''
    });

    res.status(201).json(project);
});

// @desc    Loyihani yangilash
// @route   PUT /api/projects/:id
export const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        if (req.file) deleteFile(req.file.path);
        res.status(404);
        throw new Error('Loyiha topilmadi');
    }

    // Agar yangi rasm yuklangan bo'lsa, eski rasmni o'chiramiz
    if (req.file && project.imagePath) {
        deleteFile(project.imagePath);
    }

    project.title = req.body.title || project.title;
    project.slug = req.body.slug || project.slug;
    project.description = req.body.description || project.description;
    project.category = req.body.category || project.category;
    project.technologies = req.body.technologies || project.technologies;
    project.liveLink = req.body.liveLink !== undefined ? req.body.liveLink : project.liveLink;
    project.isActive = req.body.isActive !== undefined ? req.body.isActive : project.isActive;

    if (req.file) {
        project.imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
});

// @desc    Loyihani o'chirish
// @route   DELETE /api/projects/:id
export const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Loyiha topilmadi');
    }

    // Rasmi serverdan o'chirish
    if (project.imagePath) {
        deleteFile(project.imagePath);
    }

    await project.deleteOne();
    res.json({ message: 'Loyiha muvaffaqiyatli o\'chirildi' });
});