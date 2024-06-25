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
  phone: joi.string(),
  address: joi.string(),
  birthdate: joi.date().iso(),
  organization: joi.string(),
  university: joi.string(),
  gender: joi.string().valid(...genderEnum),
});

const accountUpdateSchema = joi.object({
  fullname: joi.string(),
  username: joi.string().regex(/^[a-zA-Z0-9_-]+$/),
  email: joi.string().email(),
  password: joi.string().min(8),
  role: joi.string().valid(...roleEnum),
  phone: joi.string(),
  address: joi.string(),
  birthdate: joi.date().iso(),
  organization: joi.string(),
  university: joi.string(),
  gender: joi.string().valid(...genderEnum),
});

const accountUpdateProfileSchema = joi.object({
  fullname: joi.string().allow(null),
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .allow(null),
  email: joi.string().email().allow(null),
  phone: joi.string().allow(null),
  address: joi.string().allow(null),
  birthdate: joi.date().iso().allow(null),
  organization: joi.string().allow(null),
  university: joi.string().allow(null),
  gender: joi.string().valid(...genderEnum),
});

export { accountSchema, accountUpdateSchema, accountUpdateProfileSchema };
