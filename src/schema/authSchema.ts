import joi from "joi";

const registerSchema = joi.object({
  fullname: joi.string().required(),
  username: joi.string().regex(/^[a-zA-Z0-9_-]+$/),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const validateTokenSchema = joi.object({
  token: joi.string().required(),
});

export { registerSchema, loginSchema, validateTokenSchema };
