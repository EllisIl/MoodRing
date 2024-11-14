import express from 'express';
import { addMessage } from '../controllers/messageController.js';

const router = express.Router();

// Add a new message to a chat
router.post('/', addMessage);

export default router;
