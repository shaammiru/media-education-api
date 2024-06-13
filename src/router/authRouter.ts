import { Router } from "express";
import { validateBody } from "../middleware/requestValidator";
import {
  registerSchema,
  loginSchema,
  validateTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schema/authSchema";
import { verifyToken } from "../middleware/auth";
import {
  register,
  registerAdmin,
  login,
  logout,
  getCurrentUser,
  validateToken,
  forgotPassword,
  resetPassword,
} from "../controller/authController";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/register/admin", validateBody(registerSchema), registerAdmin);
router.post("/login", validateBody(loginSchema), login);
router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  forgotPassword
);
router.post(
  "/reset-password/:token",
  validateBody(resetPasswordSchema),
  resetPassword
);
router.post(
  "/validate-token",
  validateBody(validateTokenSchema),
  validateToken
);

router.get("/logout", verifyToken, logout);
router.get("/user", verifyToken, getCurrentUser);

export default router;
