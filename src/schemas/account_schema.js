const Joi = require("joi");

const roleEnum = ["ADMIN", "USER"];
const genderEnum = ["LAKI_LAKI", "PEREMPUAN"];

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().regex(/^[a-zA-Z0-9_-]+$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid(...roleEnum).required(),
  phone: Joi.string().regex(/^62\d{9,12}$/),
  address: Joi.string(),
  birthdate: Joi.date().iso(),
  company: Joi.string(),
  gender: Joi.string().valid(...genderEnum),
});

module.exports = userSchema;
