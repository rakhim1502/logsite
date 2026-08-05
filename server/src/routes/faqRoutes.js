import express from 'express';
import {
    getFAQs,
    getFAQById,
    createFAQ,
    updateFAQ,
    deleteFAQ
} from '../controllers/faqController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFAQs);
router.get('/:id', getFAQById);
router.post('/', protect, adminOnly, createFAQ);
router.put('/:id', protect, adminOnly, updateFAQ);
router.delete('/:id', protect, adminOnly, deleteFAQ);

export default router;