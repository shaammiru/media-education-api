import { Router } from "express";
import { validateBody, validateParams } from "../middleware/requestValidator";
import { accountSchema, accountUpdateSchema } from "../schema/accountSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/accountController";

const router = Router();

router.param("id", validateParams());

router.post("/", validateBody(accountSchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(accountUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
