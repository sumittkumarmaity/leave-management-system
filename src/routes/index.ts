import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

export const routes = Router();


routes.use("/auth", authRoutes);
routes.use('/users', userRoutes);

// Health check endpoint
routes.get('/health-check', (_req, res) => res.status(200).json({ status: 'ok' }));
