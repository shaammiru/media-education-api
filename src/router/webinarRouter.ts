import { Router } from "express";
import { imageUpload } from "../middleware/multer";
import { webinarSchema, webinarUpdateSchema } from "../schema/webinarSchema";
import {
  validateBody,
  validateParams,
  validateMulterImage,
} from "../middleware/requestValidator";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/webinarController";

const router = Router();

router.param("id", validateParams());

router.post(
  "/",
  imageUpload.single("banner"),
  validateMulterImage("banner"),
  validateBody(webinarSchema),
  create
);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", validateBody(webinarUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
