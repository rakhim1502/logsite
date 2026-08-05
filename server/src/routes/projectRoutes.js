import express from 'express';
import {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, adminOnly, upload.single('image'), createProject);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;