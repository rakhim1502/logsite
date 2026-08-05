import express from 'express';
import { getAllMedia, deleteMedia } from '../controllers/mediaController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getAllMedia);
router.delete('/:filename', protect, adminOnly, deleteMedia);

export default router;