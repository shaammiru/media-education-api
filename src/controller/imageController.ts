import { Request, Response, NextFunction } from "express";

const uploadBanner = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({ message: "File uploaded" });
  } catch (error) {
    next(error);
  }
};

export { uploadBanner };
