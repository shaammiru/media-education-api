import joi from "joi";

const uuid = joi
  .string()
  .uuid({ version: "uuidv4" })
  .message("Invalid UUID format");

const cartTypeEnum = ["WEBINAR"];

const cartSchema = joi.object({
  type: joi
    .string()
    .valid(...cartTypeEnum)
    .required(),
  accountId: uuid.required(),
  productId: uuid.required(),
});

const cartUpdateSchema = joi.object({
  type: joi.string().valid(...cartTypeEnum),
  accountId: uuid,
  productId: uuid,
});

export { cartSchema, cartUpdateSchema };
