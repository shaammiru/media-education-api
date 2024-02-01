import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ValidationError } from "joi";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ error: "Internal server error" });
};

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
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Record not found" });
    }

    if (err.code === "P2003") {
      return res.status(400).json({ error: "Invalid input" });
    }
  }

  next(err);
};

export { errorHandler, joiErrorHandler, prismaErrorHandler };
