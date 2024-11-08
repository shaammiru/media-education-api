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
  event_type: joi.string().valid(...eventTypeEnum),
});

const orderUpdateSchema = joi.object({
  accountId: joi.string().uuid({ version: "uuidv4" }),
  eventId: joi.string().uuid({ version: "uuidv4" }),
  eventType: joi.string().valid(...eventTypeEnum),
  isVerified: joi.boolean(),
});

export { orderSchema, userOrderSchema, orderListSchema, orderUpdateSchema };
