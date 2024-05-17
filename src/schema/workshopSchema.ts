import joi from "joi";

const status = ["LIVE", "PLAYBACK"];

const workshopSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  instructor: joi.string().required(),
  status: joi
    .string()
    .valid(...status)
    .required(),
  startTime: joi.date().iso(),
  endTime: joi.date().iso(),
  price: joi.number().positive().required(),
  categoryName: joi.string().allow(null),
  categoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  subCategoryName: joi.string().allow(null),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
});

const workshopUpdateSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  instructor: joi.string(),
  status: joi.string().valid(...status),
  startTime: joi.date().iso(),
  endTime: joi.date().iso(),
  price: joi.number().positive(),
  categoryName: joi.string().allow(null),
  categoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  subCategoryName: joi.string().allow(null),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
});

export { workshopSchema, workshopUpdateSchema };
