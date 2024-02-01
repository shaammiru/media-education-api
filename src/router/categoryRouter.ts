import { Router } from "express";
import { validateBody, validateParams } from "../middleware/requestValidator";
import categorySchema from "../schema/categorySchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/categoryController";

const router = Router();

router.param("id", validateParams());

router.post("/", validateBody(categorySchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(categorySchema), updateById);
router.delete("/:id", deleteById);

export default router;