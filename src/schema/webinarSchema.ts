import joi from "joi";

const eventStatusEnum = ["OFFLINE", "ONLINE"];

const webinarSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  startTime: joi.date().iso().required(),
  endTime: joi.date().iso().required(),
  eventStatus: joi
    .string()
    .valid(...eventStatusEnum)
    .required(),
  maxAttendees: joi.number().integer().required(),
  price: joi.number().min(0).required(),
  certificate: joi.string().allow(null),
  categoryName: joi.string().allow(null),
  categoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  subCategoryName: joi.string().allow(null),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
});

const webinarUpdateSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  startTime: joi.date().iso(),
  endTime: joi.date().iso(),
  eventStatus: joi.string().valid(...eventStatusEnum),
  maxAttendees: joi.number().integer(),
  price: joi.number().min(0),
  categoryName: joi.string().allow(null),
  categoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  subCategoryName: joi.string().allow(null),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
});

export { webinarSchema, webinarUpdateSchema };
