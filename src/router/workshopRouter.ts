import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { imageUpload } from "../middleware/multer";
import { workshopSchema, workshopUpdateSchema } from "../schema/workshopSchema";
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
} from "../controller/workshopController";

const router = Router();

router.param("id", validateParams());

router.post(
  "/",
  verifyToken,
  imageUpload.single("banner"),
  validateImage("banner"),
  validateBody(workshopSchema),
  create
);
router.get("/", list);
router.get("/:id", getById);
router.put(
  "/:id",
  verifyToken,
  imageUpload.single("banner"),
  validateImageUpdate(),
  validateBody(workshopUpdateSchema),
  updateById
);
router.delete("/:id", verifyToken, deleteById);

export default router;
