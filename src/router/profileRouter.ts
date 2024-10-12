import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { getProfile } from "../controller/accountController";

const router = Router();

router.use(verifyToken);

router.get("/", getProfile);

export default router;
