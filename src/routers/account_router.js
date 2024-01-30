const AccountRouter = require("express").Router();
const AccountController = require("../controllers/account_controller");
const Validator = require("../middlewares/request_validator");
const accountSchema = require("../schemas/account_schema");

AccountRouter.post(
  "/",
  Validator.validateBody(accountSchema),
  AccountController.create,
);

AccountRouter.get("/", AccountController.list);

AccountRouter.get(
  "/:id", 
  Validator.validateParams, 
  AccountController.getById,
);

AccountRouter.put(
  "/:id",
  Validator.validateParams,
  Validator.validateBody(accountSchema),
  AccountController.updateById,
);

AccountRouter.delete(
  "/:id",
  Validator.validateParams,
  AccountController.deleteById,
);

module.exports = AccountRouter;
