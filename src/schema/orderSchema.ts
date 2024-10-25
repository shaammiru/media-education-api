import joi from "joi";

const eventTypeEnum = ["WEBINAR", "WORKSHOP", "TRAINING"];

const orderSchema = joi.object({
  accountId: joi.string().uuid({ version: "uuidv4" }).required(),
  eventId: joi.string().uuid({ version: "uuidv4" }).required(),
});

const userOrderSchema = joi.object({
  eventId: joi.string().uuid({ version: "uuidv4" }).required(),
});

const orderListSchema = joi.object({
  eventType: joi
    .string()
    .valid(...eventTypeEnum)
    .required(),
});

const orderUpdateSchema = joi.object({
  accountId: joi.string().uuid({ version: "uuidv4" }),
  eventId: joi.string().uuid({ version: "uuidv4" }),
  eventType: joi.string().valid(...eventTypeEnum),
});

export { orderSchema, userOrderSchema, orderListSchema, orderUpdateSchema };
