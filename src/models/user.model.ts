import mongoose, { Document } from "mongoose";

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  HR_ADMIN = "HR_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN"
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  provider?: 'google' | 'oidc' | 'local';
  providerId?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.EMPLOYEE
    },
    provider: {
      type: String,
      enum: ['google', 'oidc', 'local'],
      default: 'local'
    },
    providerId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model<IUser>(
  "User",
  userSchema
);

export default UserModel;
