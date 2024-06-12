import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth";
import { imageUpload } from "../middleware/multer";
import {
  validateBody,
  validateParams,
  validateImage,
  validateImageUpdate,
} from "../middleware/requestValidator";
import { bannerSchema, bannerUpdateSchema } from "../schema/bannerSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/bannerController";

const router = Router();

router.param("id", validateParams());
router.get("/", list);
router.get("/:id", getById);

router.use(verifyToken, verifyAdmin);

router.post(
  "/",
  imageUpload.single("banner"),
  validateImage("banner"),
  validateBody(bannerSchema),
  create
);
router.put(
  "/:id",
  imageUpload.single("banner"),
  validateImageUpdate(),
  validateBody(bannerUpdateSchema),
  updateById
);
router.delete("/:id", deleteById);

export default router;
