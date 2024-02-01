import { Router } from "express";
import { validateBody, validateParams } from "../middleware/requestValidator";
import subCategorySchema from "../schema/categorySchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/subCategoryController";

const router = Router();

router.param("id", validateParams());

router.post("/", validateBody(subCategorySchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(subCategorySchema), updateById);
router.delete("/:id", deleteById);

export default router;