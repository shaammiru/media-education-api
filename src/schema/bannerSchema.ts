import joi from "joi";

const bannerSchema = joi.object({
  title: joi.string().required(),
});

const bannerUpdateSchema = joi.object({
  title: joi.string(),
});

export { bannerSchema, bannerUpdateSchema };
