import { Request, Response, NextFunction } from "express";
import accountData from "../data/accountData";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../middleware/auth";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.role = "USER";
    req.body.password = await hashPassword(req.body.password);
    const account = await accountData.create(req.body);
    return res.status(201).json({ message: "Register success", data: account });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const account = await accountData.getByEmail(email);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const isPasswordMatch = await comparePassword(password, account.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = generateToken({
      id: account.id,
      username: account.username,
      fullname: account.fullname,
      email: account.email,
      role: account.role,
    });

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getCurrentUser };
