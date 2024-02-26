import { Router } from "express";
import { validateBody, validateParams } from "../middleware/requestValidator";
import { verifyToken } from "../middleware/auth";
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

router.post("/", verifyToken, validateBody(categorySchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", verifyToken, validateBody(categorySchema), updateById);
router.delete("/:id", verifyToken, deleteById);

export default router;
