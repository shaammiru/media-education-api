import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/requestValidator";
import { faqSchema, faqUpdateSchema } from "../schema/faqSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/faqController";

const router = Router();

router.use(verifyToken, verifyAdmin);

router.param("id", validateParams());

router.post("/", validateBody(faqSchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(faqUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
