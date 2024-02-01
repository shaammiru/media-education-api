import { Router } from "express";
import { validateBody, validateParams } from "../middleware/requestValidator";
import { cartSchema, cartUpdateSchema } from "../schema/cartSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/cartController";

const router = Router();

router.param("id", validateParams());

router.post("/", validateBody(cartSchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(cartUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
