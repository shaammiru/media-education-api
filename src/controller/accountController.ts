import { NextFunction, Request, Response } from "express";
import accountData from "../data/accountData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await accountData.create(req.body);
    res.status(201).json({ message: "Account created", data: account });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await accountData.list();
    res.status(200).json({ message: "List of Accounts", data: accounts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await accountData.getById(req.params.id);
    if (!account) {
      res.status(404).json({ error: "Account not found" });
      return;
    }
    res.status(200).json({ message: "Account By Id", data: account });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await accountData.updateById(req.params.id, req.body);
    res.status(200).json({ message: "Account updated", data: account });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await accountData.deleteById(req.params.id);
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
