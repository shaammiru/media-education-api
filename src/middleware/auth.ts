import bcrypt from "bcrypt";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const hashPassword = async (password: string) => {
  const saltRound = process.env.SALT_ROUNDS || 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
};

const generateToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "6h",
  });
  return token;
};

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export { hashPassword, comparePassword, generateToken, verifyToken };
