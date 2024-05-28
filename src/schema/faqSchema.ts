import joi from "joi";

const faqSchema = joi.object({
  question: joi.string().required(),
  answer: joi.string().required(),
  icon: joi.string().required(),
});

const faqUpdateSchema = joi.object({
  question: joi.string().required(),
  answer: joi.string().required(),
  icon: joi.string().required(),
});

export { faqSchema, faqUpdateSchema };
