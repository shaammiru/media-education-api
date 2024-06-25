import joi from "joi";

const eventStatus = ["OFFLINE", "ONLINE", "HYBRID"];

const trainingSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi
    .string()
    .valid(...eventStatus)
    .allow(null),
  certificate: joi.string().allow(null),
  syllabus: joi.string().allow(null),
  urlExternalTitle: joi.string().allow(null),
  urlExternal: joi.string().uri().allow(null),
  startTime: joi.date().iso().required(),
  endTime: joi.date().iso().required(),
  price: joi.number().positive().required(),
  discount: joi.number().integer().min(0).max(100).required(),
  categoryName: joi.string().allow(null),
  categoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  subCategoryName: joi.string().allow(null),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  showPrice: joi.boolean().allow(null),
});

const trainingUpdateSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  status: joi.string().valid(...eventStatus),
  certificate: joi.string().allow(null),
  syllabus: joi.string().allow(null),
  urlExternalTitle: joi.string().allow(null),
  urlExternal: joi.string().uri().allow(null),
  startTime: joi.date().iso(),
  endTime: joi.date().iso(),
  price: joi.number().positive(),
  discount: joi.number().integer().min(0).max(100),
  categoryName: joi.string().allow(null),
  categoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  subCategoryName: joi.string().allow(null),
  subCategoryId: joi.string().uuid({ version: "uuidv4" }).allow(""),
  showPrice: joi.boolean().allow(null),
});

const trainingMaterialSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().allow(null),
});

const trainingMaterialUpdateSchema = joi.object({
  title: joi.string().allow(null),
  description: joi.string().allow(null),
});

export {
  trainingSchema,
  trainingUpdateSchema,
  trainingMaterialSchema,
  trainingMaterialUpdateSchema,
};
