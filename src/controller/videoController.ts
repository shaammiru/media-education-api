import { NextFunction, Request, Response } from "express";
import videoData from "../data/videoData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await videoData.create(req.body);
    return res.status(201).json({ message: "Video created", data: video });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos = await videoData.list();
    return res.status(200).json({ message: "List of Videos", data: videos });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await videoData.getById(req.params.id);
    if (!video) {
      res.status(404).json({ error: "Video not found" });
      return;
    }
    return res.status(200).json({ message: "Video By Id", data: video });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const video = await videoData.updateById(req.params.id, req.body);
    return res.status(200).json({ message: "Video updated", data: video });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await videoData.deleteById(req.params.id);
    return res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
