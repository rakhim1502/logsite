import express from 'express';
import {
    getTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', protect, adminOnly, upload.single('avatar'), createTestimonial);
router.put('/:id', protect, adminOnly, upload.single('avatar'), updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;