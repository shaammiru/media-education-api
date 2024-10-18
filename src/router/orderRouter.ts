import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/requestValidator";
import {
  orderSchema,
  orderListSchema,
  orderUpdateSchema,
} from "../schema/orderSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/orderController";

const router = Router();

router.param("id", validateParams());

router.use(verifyToken);

router.post("/", validateBody(orderSchema), create);

router.use(verifyAdmin);

router.get("/", validateBody(orderListSchema), list);
router.get("/:id", getById);
router.put("/:id", validateBody(orderUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
