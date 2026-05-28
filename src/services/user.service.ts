import { UserRepository } from '../repositories/user.repository';

export class UserService {
  static async getProfile(userId: string) {
    return UserRepository.findById(userId);
  }
}
