import { Router } from "express";
import { validateBody } from "../middleware/requestValidator";
import { registerSchema, loginSchema } from "../schema/authSchema";
import { verifyToken } from "../middleware/auth";
import {
  register,
  registerAdmin,
  login,
  logout,
  getCurrentUser,
} from "../controller/authController";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/register/admin", validateBody(registerSchema), registerAdmin);
router.post("/login", validateBody(loginSchema), login);
router.get("/logout", verifyToken, logout);
router.get("/user", verifyToken, getCurrentUser);

export default router;
