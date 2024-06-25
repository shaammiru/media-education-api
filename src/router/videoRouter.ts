import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/requestValidator";
import { videoSchema, videoUpdateSchema } from "../schema/videosSchema";
import {
  create,
  list,
  getById,
  updateById,
  deleteById,
} from "../controller/videoController";

const router = Router();

router.param("id", validateParams());
router.get("/", list);
router.get("/:id", getById);

router.use(verifyToken, verifyAdmin);

router.post("/", validateBody(videoSchema), create);
router.put("/:id", validateBody(videoUpdateSchema), updateById);
router.delete("/:id", deleteById);

export default router;
