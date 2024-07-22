import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { imageUpload, videoUpload } from "../middleware/multer";
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
  uploadPlayback,
  getRegisteredUsers,
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
router.put(
  "/:id/playback",
  verifyToken,
  videoUpload.single("playback"),
  uploadPlayback
);

router.get("/:id/registered-users", getRegisteredUsers);

export default router;
