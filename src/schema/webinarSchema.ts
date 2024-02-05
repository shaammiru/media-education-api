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
  price: joi.number().positive().required(),
  categoryId: joi.string().uuid({ version: "uuidv4" }),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }),
});

const webinarUpdateSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  startTime: joi.date().iso(),
  endTime: joi.date().iso(),
  eventStatus: joi.string().valid(...eventStatusEnum),
  maxAttendees: joi.number().integer(),
  price: joi.number().positive(),
  categoryId: joi.string().uuid({ version: "uuidv4" }),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }),
});

export { webinarSchema, webinarUpdateSchema };
