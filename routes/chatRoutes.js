import express from 'express';
import { getAllChats, getMessagesByChatId } from '../controllers/chatController.js';

const router = express.Router();

// Get all chats
router.get('/', getAllChats);

// Get messages for a specific chat
router.get('/:chatId', getMessagesByChatId);

export default router;
