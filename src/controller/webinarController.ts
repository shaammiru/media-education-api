import { NextFunction, Request, Response } from "express";
import webinarData from "../data/webinarData";
import s3 from "../utility/awsS3";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bannerUrl = await s3.upload(req.file!, "webinar/banner");
    req.body.banner = bannerUrl;
    const webinar = await webinarData.create(req.body);
    return res.status(201).json({ message: "Webinar created", data: webinar });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webinars = await webinarData.list();
    return res
      .status(200)
      .json({ message: "List of Webinars", data: webinars });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webinar = await webinarData.getById(req.params.id);
    if (!webinar) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    return res.status(200).json({ message: "Webinar By Id", data: webinar });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (req.file) {
      const bannerUrl = await s3.upload(req.file, "webinar/banner");
      req.body.banner = bannerUrl;
    }
    
    const webinar = await webinarData.updateById(id, req.body);
    return res.status(200).json({ message: "Webinar updated", data: webinar });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await webinarData.deleteById(req.params.id);
    return res.status(200).json({ message: "Webinar deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
