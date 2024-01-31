const WebinarRouter = require("express").Router();
const WebinarController = require("../controllers/webinar_controller");
const Validator = require("../middlewares/request_validator");
const accountSchema = require("../schemas/webinar_schema");

WebinarRouter.post(
  "/",
  Validator.validateBody(accountSchema),
  WebinarController.create,
);

WebinarRouter.get("/", WebinarController.list);

WebinarRouter.get(
  "/:id", 
  Validator.validateParams, 
  WebinarController.getById,
);

WebinarRouter.put(
  "/:id",
  Validator.validateParams,
  Validator.validateBody(accountSchema),
  WebinarController.updateById,
);

WebinarRouter.delete(
  "/:id",
  Validator.validateParams,
  WebinarController.deleteById,
);

module.exports = WebinarRouter;
