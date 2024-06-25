import joi from "joi";

const faqSchema = joi.object({
  question: joi.string().required(),
  answer: joi.string().required(),
  icon: joi.string().required(),
  tag: joi.string().required(),
});

const faqUpdateSchema = joi.object({
  question: joi.string(),
  answer: joi.string(),
  icon: joi.string(),
  tag: joi.string(),
});

export { faqSchema, faqUpdateSchema };
