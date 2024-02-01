import joi from "joi";

const roleEnum = ["ADMIN", "USER"];
const genderEnum = ["LAKI_LAKI", "PEREMPUAN"];

const accountSchema = joi.object({
  fullname: joi.string().required(),
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  role: joi
    .string()
    .valid(...roleEnum)
    .required(),
  phone: joi.string().regex(/^62\d{9,12}$/),
  address: joi.string(),
  birthdate: joi.date().iso(),
  company: joi.string(),
  gender: joi.string().valid(...genderEnum),
});

const accountUpdateSchema = joi.object({
  fullname: joi.string(),
  username: joi.string().regex(/^[a-zA-Z0-9_-]+$/),
  email: joi.string().email(),
  password: joi.string().min(8),
  role: joi.string().valid(...roleEnum),
  phone: joi.string().regex(/^62\d{9,12}$/),
  address: joi.string(),
  birthdate: joi.date().iso(),
  company: joi.string(),
  gender: joi.string().valid(...genderEnum),
});

export { accountSchema, accountUpdateSchema };
