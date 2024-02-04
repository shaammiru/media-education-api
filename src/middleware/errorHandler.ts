import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ValidationError } from "joi";
import { MulterError } from "multer";

const joiErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.details[0].message });
  }

  next(err);
};

const prismaErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(400).json({ error: "Invalid input" });
      case "P2025":
        return res.status(404).json({ error: "Record not found" });
      default:
        next(err);
    }
  }

  next(err);
};

const multerErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    switch (err.code) {
      case "LIMIT_UNEXPECTED_FILE":
        if (err.field === "File type not allowed") {
          return res.status(400).json({ error: err.field });
        }

        return res.status(400).json({ error: "Unexpected field" });
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({ error: "File size too large" });
      default:
        next(err);
    }
  }

  next(err);
};

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
};

export {
  joiErrorHandler,
  prismaErrorHandler,
  multerErrorHandler,
  errorHandler,
};
