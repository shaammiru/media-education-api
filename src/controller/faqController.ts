import { NextFunction, Request, Response } from "express";
import faqData from "../data/faqData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faq = await faqData.create(req.body);
    return res.status(201).json({ message: "FAQ created", data: faq });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faqs = await faqData.list();
    return res.status(200).json({ message: "List of FAQs", data: faqs });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faq = await faqData.getById(req.params.id);
    if (!faq) {
      res.status(404).json({ error: "FAQ not found" });
      return;
    }
    return res.status(200).json({ message: "FAQ By Id", data: faq });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faq = await faqData.updateById(req.params.id, req.body);
    return res.status(200).json({ message: "FAQ updated", data: faq });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await faqData.deleteById(req.params.id);
    return res.status(200).json({ message: "FAQ deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
