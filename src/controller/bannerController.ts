import { NextFunction, Request, Response } from "express";
import bannerData from "../data/bannerData";
import staticFiles from "../utility/staticFiles";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await staticFiles.upload(req.file!, "banner/index");
    req.body.url = bannerUrl;
    const banner = await bannerData.create(req.body);
    return res.status(201).json({ message: "Banner created", data: banner });
  } catch (error) {
    if (bannerUrl !== "") {
      await staticFiles.remove(bannerUrl);
    }
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banners = await bannerData.list();
    return res.status(200).json({ message: "List of Banners", data: banners });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = await bannerData.getById(req.params.id);
    if (!banner) {
      res.status(404).json({ error: "Banner not found" });
      return;
    }
    return res.status(200).json({ message: "Banner By Id", data: banner });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    if (req.file) {
      bannerUrl = await staticFiles.upload(req.file, "banner/index");
      req.body.url = bannerUrl;
    }

    const banner = await bannerData.updateById(req.params.id, req.body);
    return res.status(200).json({ message: "Banner updated", data: banner });
  } catch (error) {
    if (bannerUrl !== "") {
      await staticFiles.remove(bannerUrl);
    }
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bannerData.deleteById(req.params.id);
    return res.status(200).json({ message: "Banner deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
