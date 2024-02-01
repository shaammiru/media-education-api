import { NextFunction, Request, Response } from "express";
import categoryData from "../data/categoryData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryData.create(req.body);
    res.status(201).json({ message: "Category created", data: category });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryData.list();
    res.status(200).json({ message: "List of Categories", data: categories });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryData.getById(req.params.id);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category By Id", data: category });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryData.updateById(req.params.id, req.body);
    res.status(200).json({ message: "Category updated", data: category });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryData.deleteById(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
