import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();
export const authRoutes = Router();

authRoutes.post("/register", (req, res) => authController.register(req, res));
authRoutes.post("/login", (req, res) => authController.login(req, res));

export default authRoutes;