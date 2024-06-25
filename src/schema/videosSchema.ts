import joi from "joi";

const videoSchema = joi.object({
  title: joi.string().required(),
  url: joi.string().uri().required(),
});

const videoUpdateSchema = joi.object({
  title: joi.string(),
  url: joi.string().uri(),
});

export { videoSchema, videoUpdateSchema };
