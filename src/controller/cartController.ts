import { NextFunction, Request, Response } from "express";
import cartData from "../data/cartData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartData.create(req.body);
    res.status(201).json({ message: "Cart created", data: cart });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await cartData.list();
    res.status(200).json({ message: "List of Carts", data: carts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartData.getById(req.params.id);
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }
    res.status(200).json({ message: "Cart By Id", data: cart });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartData.updateById(req.params.id, req.body);
    res.status(200).json({ message: "Cart updated", data: cart });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartData.deleteById(req.params.id);
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
