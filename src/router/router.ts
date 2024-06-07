import { Router } from "express";
import authRouter from "./authRouter";
import accountRouter from "./accountRouter";
import categoryRouter from "./categoryRouter";
import subCategoryRouter from "./subCategoryRouter";
import webinarRouter from "./webinarRouter";
import workshopRouter from "./workshopRouter";
import trainingRouter from "./trainingRouter";
import cartRouter from "./cartRouter";
import faqRouter from "./faqRouter";
import videoRouter from "./videoRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/accounts", accountRouter);
router.use("/categories", categoryRouter);
router.use("/sub-categories", subCategoryRouter);
router.use("/webinars", webinarRouter);
router.use("/workshops", workshopRouter);
router.use("/trainings", trainingRouter);
router.use("/carts", cartRouter);
router.use("/faqs", faqRouter);
router.use("/videos", videoRouter);

export default router;
