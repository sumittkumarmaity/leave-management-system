import UserModel, { IUser } from '../models/user.model';

export class UserRepository {
  static async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).lean();
  }

  static async findByProviderId(providerId: string, provider: string): Promise<IUser | null> {
    return UserModel.findOne({ providerId, provider }).lean();
  }

  static async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean();
  }

  static async create(data: { email: string; name: string; provider: 'google' | 'oidc' | 'local'; providerId: string }): Promise<IUser> {
    return UserModel.create(data);
  }
}
