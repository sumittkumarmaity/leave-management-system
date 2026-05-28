import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const userController = new UserController();
export const userRoutes = Router();

userRoutes.get('/get-profile', authMiddleware, (req, res) => userController.getProfile(req, res));
