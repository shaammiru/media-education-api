import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/requestValidator";
import {
  accountSchema,
  accountUpdateProfileSchema,
  accountUpdateSchema,
} from "../schema/accountSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
  listAdmin,
} from "../controller/accountController";

const router = Router();

router.use(verifyToken);

router.param("id", validateParams());

router.post("/", validateBody(accountSchema), create);
router.get("/", list);
router.get("/admin", listAdmin);
router.get("/:id", getById);
router.put("/:id", validateBody(accountUpdateSchema), updateById);
router.delete("/:id", deleteById);
router.put(
  "/:id/profile",
  validateBody(accountUpdateProfileSchema),
  updateById
);

export default router;
