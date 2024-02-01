import { Request, Response, NextFunction } from "express";
import joi from "joi";

const paramsSchema = joi.object({
  id: joi
    .string()
    .uuid({ version: "uuidv4" })
    .message("Invalid UUID format")
    .required(),
});

const validateParams = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await paramsSchema.validateAsync(req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
};

const validateBody = (schema: joi.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validData = await schema.validateAsync(req.body);
      req.body = validData;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { validateParams, validateBody };
