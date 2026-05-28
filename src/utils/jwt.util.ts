import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken =
(payload: object) => {

  return jwt.sign(
    payload,
    config.jwtSecret,
    {
      expiresIn: "15m"
    }
  );
};

export const generateRefreshToken =
(payload: object) => {

  return jwt.sign(
    payload,
    config.jwtRefreshSecret,
    {
      expiresIn: "7d"
    }
  );
};

export const verifyToken =
(token: string) => {

  return jwt.verify(
    token,
    config.jwtSecret
  );
};