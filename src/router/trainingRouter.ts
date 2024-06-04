import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { imageUpload } from "../middleware/multer";
import { trainingSchema, trainingUpdateSchema } from "../schema/trainingSchema";
import {
  validateBody,
  validateParams,
  validateImage,
  validateImageUpdate,
} from "../middleware/requestValidator";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/trainingController";

const router = Router();

router.param("id", validateParams());

router.post(
  "/",
  verifyToken,
  imageUpload.single("banner"),
  validateImage("banner"),
  validateBody(trainingSchema),
  create
);
router.get("/", list);
router.get("/:id", getById);
router.put(
  "/:id",
  verifyToken,
  imageUpload.single("banner"),
  validateImageUpdate(),
  validateBody(trainingUpdateSchema),
  updateById
);
router.delete("/:id", verifyToken, deleteById);

export default router;
