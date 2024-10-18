import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth";
import { getDashboardData } from "../controller/statisticController";

const router = Router();

router.use(verifyToken, verifyAdmin);

router.get("/dashboard", getDashboardData);

export default router;
