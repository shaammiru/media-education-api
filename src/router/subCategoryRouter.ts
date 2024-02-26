import { Router } from "express";
import { verifyToken } from "../middleware/auth";
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

router.post("/", verifyToken, validateBody(subCategorySchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", verifyToken, validateBody(subCategorySchema), updateById);
router.delete("/:id", verifyToken, deleteById);

export default router;
