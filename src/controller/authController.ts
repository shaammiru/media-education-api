import { Request, Response, NextFunction } from "express";
import responseBody from "../utility/responseBody";
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
    return res
      .status(201)
      .json(responseBody("Register success", null, account));
  } catch (error) {
    next(error);
  }
};

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.role = "ADMIN";
    req.body.password = await hashPassword(req.body.password);
    const account = await accountData.create(req.body);
    return res
      .status(201)
      .json(responseBody("Register success", null, account));
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const account = await accountData.getByEmail(email);
    if (!account) {
      return res
        .status(404)
        .json(responseBody("Account not found", null, null));
    }

    const isPasswordMatch = await comparePassword(password, account.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json(responseBody("Incorrect email or password", null, null));
    }

    const token = generateToken({
      id: account.id,
      fullname: account.fullname,
      email: account.email,
      role: account.role,
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    return res
      .status(200)
      .json(responseBody("Login success", null, { token, account }));
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    return res.status(200).json(responseBody("Logout success", null, null));
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    return res.status(200).json(responseBody("OK", null, user));
  } catch (error) {
    next(error);
  }
};

const checkValidToken = (req: any, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(responseBody("OK", null, null));
  } catch (error) {
    next(error);
  }
};

export {
  register,
  registerAdmin,
  login,
  logout,
  getCurrentUser,
  checkValidToken,
};
