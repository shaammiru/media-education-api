import { NextFunction, Request, Response } from "express";
import trainingData from "../data/trainingData";
import s3 from "../utility/awsS3";
import responseBody from "../utility/responseBody";
import categoryData from "../data/categoryData";
import subCategoryData from "../data/subCategoryData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await s3.upload(req.file!, "training/banner");
    req.body.banner = bannerUrl;

    if (req.body.categoryName && req.body.categoryName !== "") {
      req.body.categoryId = (
        await categoryData.getByName(req.body.categoryName)
      )?.id;
    }

    if (req.body.subCategoryName && req.body.subCategoryName !== "") {
      req.body.subCategoryId = (
        await subCategoryData.getByName(req.body.subCategoryName)
      )?.id;
    }

    const training = await trainingData.create(req.body);
    return res
      .status(201)
      .json(responseBody("Training created", null, training));
  } catch (error) {
    if (bannerUrl !== "") {
      await s3.remove(bannerUrl);
    }
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainings = await trainingData.list();
    return res.status(200).json(responseBody("OK", null, trainings));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const training = await trainingData.getById(req.params.id);
    if (!training) {
      return res
        .status(404)
        .json(responseBody("Training not found", null, null));
    }

    return res.status(200).json(responseBody("OK", null, training));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    if (req.file) {
      const bannerUrl = await s3.upload(req.file, "training/banner");

      if (bannerUrl) {
        await s3.remove(req.body.banner);
      }

      req.body.banner = bannerUrl;
    }

    if (req.body.categoryName && req.body.categoryName !== "") {
      req.body.categoryId = (
        await categoryData.getByName(req.body.categoryName)
      )?.id;
    }

    if (req.body.subCategoryName && req.body.subCategoryName !== "") {
      req.body.subCategoryId = (
        await subCategoryData.getByName(req.body.subCategoryName)
      )?.id;
    }

    const training = await trainingData.updateById(req.params.id, req.body);
    return res
      .status(200)
      .json(responseBody("Training updated", null, training));
  } catch (error) {
    if (bannerUrl !== "") {
      await s3.remove(bannerUrl);
    }
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await trainingData.deleteById(req.params.id);
    return res.status(200).json(responseBody("Training deleted", null, null));
  } catch (error) {
    next(error);
  }
};

const uploadPlayback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json(responseBody("Playback file required", null, null));
    }

    const playbackUrl = await s3.upload(req.file, "training/playback");
    const training = await trainingData.updateById(req.params.id, playbackUrl);
    return res
      .status(200)
      .json(responseBody("Playback uploaded", null, training));
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById, uploadPlayback };
