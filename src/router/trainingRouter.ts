import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { documentUpload, imageUpload } from "../middleware/multer";
import {
  trainingMaterialSchema,
  trainingSchema,
  trainingUpdateSchema,
} from "../schema/trainingSchema";
import {
  validateBody,
  validateParams,
  validateImage,
  validateImageUpdate,
  validateDocument,
} from "../middleware/requestValidator";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
  listMaterial,
  uploadMaterial,
  getRegisteredUsers,
} from "../controller/trainingController";

const router = Router();

router.param("id", validateParams());

router.get("/", list);
router.get("/:id", getById);
router.get("/:id/materials", listMaterial);

router.use(verifyToken);

router.post(
  "/",
  imageUpload.single("banner"),
  validateImage("banner"),
  validateBody(trainingSchema),
  create
);
router.put(
  "/:id",
  imageUpload.single("banner"),
  validateImageUpdate(),
  validateBody(trainingUpdateSchema),
  updateById
);
router.delete("/:id", deleteById);
router.post(
  "/:id/materials",
  documentUpload.single("document"),
  validateDocument("document"),
  validateBody(trainingMaterialSchema),
  uploadMaterial
);

router.get("/registered-users", getRegisteredUsers);

export default router;
