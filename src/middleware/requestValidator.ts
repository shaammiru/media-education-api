import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { validateBufferMIMEType } from "validate-image-type";
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

const validateImage = (fieldName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: `Image file "${fieldName}" is required` });
    } else {
      const validationResult = await validateBufferMIMEType(req.file.buffer, {
        originalFilename: req.file.originalname,
        allowMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
      });

      if (validationResult.error) {
        next(new MulterError("LIMIT_UNEXPECTED_FILE", "File type not allowed"));
      }

      next();
    }
  };
};

const validateImageUpdate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const validationResult = await validateBufferMIMEType(req.file.buffer, {
        originalFilename: req.file.originalname,
        allowMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
      });
      
      if (validationResult.error) {
        next(new MulterError("LIMIT_UNEXPECTED_FILE", "File type not allowed"));
      }
    }

    next();
  };
};

export { validateParams, validateBody, validateImage, validateImageUpdate };
