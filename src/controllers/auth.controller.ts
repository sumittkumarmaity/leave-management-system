import authService from "../services/auth.service";
import { ApiResponseHandler } from "../utils/response.util";
import { Response, Request } from "express";

export class AuthController {

  // User registration
  async register(
    req: Request,
    res: Response
  ) {
    try {
      const user = await authService.register(req.body);
      return ApiResponseHandler.success(res, { user }, "User registered successfully", 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return ApiResponseHandler.badRequest(res, message);
    }
  }

  // User login
  async login(
    req: Request,
    res: Response
  ) {
    try {
      const result = await authService.login(
        req.body.email,
        req.body.password
      );

      return ApiResponseHandler.success(res, result, "Login successful");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return ApiResponseHandler.unauthorized(res, message);
    }
  }
}
