import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { validateBufferMIMEType } from "validate-image-type";
import joi from "joi";
import mime from "mime-types";

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

const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const documentMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-access",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const validateImage = (fieldName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: `Image file "${fieldName}" is required` });
    } else {
      const validationResult = await validateBufferMIMEType(req.file.buffer, {
        originalFilename: req.file.originalname,
        allowMimeTypes: imageMimeTypes,
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
        allowMimeTypes: imageMimeTypes,
      });

      if (validationResult.error) {
        next(new MulterError("LIMIT_UNEXPECTED_FILE", "File type not allowed"));
      }
    }

    next();
  };
};

const validateDocument = (fieldName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: `Document file "${fieldName}" is required` });
    } else {
      const mimeType = mime.lookup(req.file.originalname);

      if (mimeType === false || !documentMimeTypes.includes(mimeType)) {
        next(new MulterError("LIMIT_UNEXPECTED_FILE", "File type not allowed"));
      }

      next();
    }
  };
};

const validateDocumentUpdate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const validationResult = await validateBufferMIMEType(req.file.buffer, {
        originalFilename: req.file.originalname,
        allowMimeTypes: documentMimeTypes,
      });

      if (validationResult.error) {
        next(new MulterError("LIMIT_UNEXPECTED_FILE", "File type not allowed"));
      }
    }

    next();
  };
};

export {
  validateParams,
  validateBody,
  validateImage,
  validateImageUpdate,
  validateDocument,
  validateDocumentUpdate,
};
