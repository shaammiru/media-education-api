import { Router } from "express";
import { validateBody } from "../middleware/requestValidator";
import {
  registerSchema,
  loginSchema,
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
  checkValidToken,
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

router.use(verifyToken);

router.get("/logout", logout);
router.get("/user", getCurrentUser);
router.post("/verify-token", checkValidToken);

export default router;
