import express from 'express';
import {
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
    createMessage
} from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getMessages);
router.get('/:id', protect, adminOnly, getMessageById);
router.post('/', createMessage); // Public - contact form uchun
router.put('/:id', protect, adminOnly, updateMessage);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;