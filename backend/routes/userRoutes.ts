import express from 'express';
import { register, login, updateProfile } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/api/users/register', register);
router.post('/api/users/login', login);
router.put('/api/users/profile', authMiddleware, updateProfile);

export default router;