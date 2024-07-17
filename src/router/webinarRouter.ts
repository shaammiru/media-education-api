import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { imageUpload } from "../middleware/multer";
import { webinarSchema, webinarUpdateSchema } from "../schema/webinarSchema";
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
  getRegisteredUsers,
} from "../controller/webinarController";

const router = Router();

router.param("id", validateParams());

router.post(
  "/",
  verifyToken,
  imageUpload.single("banner"),
  validateImage("banner"),
  validateBody(webinarSchema),
  create
);

router.get("/", list);

router.get("/:id", getById);

router.put(
  "/:id",
  verifyToken,
  imageUpload.single("banner"),
  validateImageUpdate(),
  validateBody(webinarUpdateSchema),
  updateById
);

router.delete("/:id", verifyToken, deleteById);

router.get("/registered-users", getRegisteredUsers);

export default router;
