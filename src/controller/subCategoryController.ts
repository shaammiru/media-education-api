import { NextFunction, Request, Response } from "express";
import subCategoryData from "../data/subCategoryData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subCategory = await subCategoryData.create(req.body);
    return res.status(201).json({ message: "Sub Category created", data: subCategory });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subCategories = await subCategoryData.list();
    return res.status(200).json({ message: "List of Sub Categories", data: subCategories });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subCategory = await subCategoryData.getById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ error: "Sub Category not found" });
    }

    return res.status(200).json({ message: "Sub Category By Id", data: subCategory });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subCategory = await subCategoryData.updateById(req.params.id, req.body);
    return res.status(200).json({ message: "Sub Category updated", data: subCategory });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subCategoryData.deleteById(req.params.id);
    return res.status(200).json({ message: "Sub Category deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
