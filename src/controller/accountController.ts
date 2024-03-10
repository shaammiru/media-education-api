import { NextFunction, Request, Response } from "express";
import accountData from "../data/accountData";
import responseBody from "../utility/responseBody";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await accountData.create(req.body);
    return res.status(201).json(responseBody("Account created", null, account));
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await accountData.list();
    return res.status(200).json(responseBody("OK", null, accounts));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await accountData.getById(req.params.id);
    if (!account) {
      return res
        .status(404)
        .json(responseBody("Account not found", null, null));
    }

    return res.status(200).json(responseBody("OK", null, account));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await accountData.updateById(req.params.id, req.body);
    return res.status(200).json(responseBody("Account updated", null, account));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await accountData.deleteById(req.params.id);
    return res.status(200).json(responseBody("Account deleted", null, null));
  } catch (error) {
    next(error);
  }
};

const listAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("here");
    const accounts = await accountData.listAdmin();
    return res.status(200).json(responseBody("OK", null, accounts));
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById, listAdmin };
