import { Request, Response, NextFunction } from "express";
import responseBody from "../utility/responseBody";
import accountData from "../data/accountData";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../middleware/auth";
import email from "../utility/email";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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

const validateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      const header = req.headers.authorization as string;
      if (!header) {
        return res
          .status(401)
          .json(responseBody("Unauthorized", null, { isValid: false }));
      }

      token = header.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json(responseBody("Unauthorized", null, { isValid: false }));
      }
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error: any, decoded: any) => {
      if (error) {
        return res
          .status(401)
          .json(responseBody("Unauthorized", null, { isValid: false }));
      }

      return res.status(200).json(responseBody("OK", null, { isValid: true }));
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await accountData.getByEmail(req.body.email);

    if (!user) {
      return res
        .status(404)
        .json(responseBody("Account not found", null, null));
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const passwordResetExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await accountData.updateById(user.id, {
      passwordResetToken,
      passwordResetExpiry,
    });

    const protocol = req.protocol;
    const host = req.get("host");
    const resetURL = `${protocol}://${host}/v1/auth/reset-password/${resetToken}`;
    const htmlMessage = `
      <h1>Edutrain Password Reset</h1>
      <p>Click the link below to reset your password</p>
      <a href="${resetURL}" target="_blank">Reset Password</a>
      <p>This link will expire in 10 minutes</p>
      <p>If you did not request a password reset, please ignore this email</p>`;
    await email.send({
      email: user.email,
      subject: "Edutrain Password Reset",
      htmlMessage,
    });

    return res
      .status(200)
      .json(responseBody("Reset password email sent", null, null));
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Logic here
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
  validateToken,
  forgotPassword,
  resetPassword,
};
