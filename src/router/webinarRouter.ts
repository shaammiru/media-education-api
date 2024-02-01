import { Router } from "express";
import { validateBody, validateParams } from "../middleware/requestValidator";
import { webinarSchema, webinarUpdateSchema } from "../schema/webinarSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/webinarController";

const router = Router();

router.param("id", validateParams());

router.post("/", validateBody(webinarSchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(webinarUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
