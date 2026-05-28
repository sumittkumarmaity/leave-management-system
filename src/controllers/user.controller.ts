import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponseHandler } from '../utils/response.util';

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        ApiResponseHandler.unauthorized(res, 'User not authenticated');
        return;
      }

      const user = await UserService.getProfile(userId);
      if (!user) {
        ApiResponseHandler.notFound(res, 'User not found');
        return;
      }

      const userData = { id: user._id, email: user.email, name: user.name, provider: user.provider };
      ApiResponseHandler.success(res, { user: userData }, 'Profile retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      ApiResponseHandler.serverError(res, message);
    }
  }
}
