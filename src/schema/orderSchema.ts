import joi from "joi";

const eventTypeEnum = ["WEBINAR", "WORKSHOP", "TRAINING"];

const orderSchema = joi.object({
  userId: joi.string().required(),
  eventId: joi.string().required(),
  eventType: joi
    .string()
    .valid(...eventTypeEnum)
    .required(),
});

const orderListSchema = joi.object({
  eventType: joi
    .string()
    .valid(...eventTypeEnum)
    .required(),
});

const orderUpdateSchema = joi.object({
  userId: joi.string(),
  eventId: joi.string(),
  eventType: joi.string().valid(...eventTypeEnum),
});

export { orderSchema, orderListSchema, orderUpdateSchema };
