import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";

class AuthService {

  async register(data: any) {

    const exists = await User.findOne({ email: data.email });
    if (exists) {
      throw new Error("Email already exists");
    }

    const password = await hashPassword(data.password);
    const user = await User.create({ ...data, password });
    return user;
  }

  async login(email: string, password: string) {

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken({ userId: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user._id });
    return { accessToken, refreshToken, user };
  }
}

export default new AuthService();