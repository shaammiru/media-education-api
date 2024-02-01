import { Router } from "express";
import accountRouter from "./accountRouter";
import categoryRouter from "./categoryRouter";
import subCategoryRouter from "./subCategoryRouter";
import webinarRouter from "./webinarRouter";
import cartRouter from "./cartRouter";

const router = Router();

router.use("/accounts", accountRouter);
router.use("/categories", categoryRouter);
router.use("/sub-categories", subCategoryRouter);
router.use("/webinars", webinarRouter);
router.use("/carts", cartRouter);

export default router;
