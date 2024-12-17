import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// GET get all users
router.get('/', getAllUsers);

// POST add a user
router.post('/add', addUser);

export default router;
