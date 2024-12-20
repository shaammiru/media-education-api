import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/requestValidator";
import {
  orderSchema,
  userOrderSchema,
  orderUpdateSchema,
} from "../schema/orderSchema";
import {
  create,
  userCreate,
  list,
  getById,
  updateById,
  deleteById,
  verifyOrder,
} from "../controller/orderController";

const router = Router();

router.param("id", validateParams());

router.use(verifyToken);

router.post("/user", validateBody(userOrderSchema), userCreate);

router.use(verifyAdmin);

router.post("/", validateBody(orderSchema), create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(orderUpdateSchema), updateById);
router.delete("/:id", deleteById);
router.post("/:id/verify", verifyOrder);

export default router;
