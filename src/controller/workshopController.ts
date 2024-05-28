import { NextFunction, Request, Response } from "express";
import workshopData from "../data/workshopData";
import s3 from "../utility/awsS3";
import responseBody from "../utility/responseBody";
import categoryData from "../data/categoryData";
import subCategoryData from "../data/subCategoryData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await s3.upload(req.file!, "workshop/banner");
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

    const workshop = await workshopData.create(req.body);
    return res
      .status(201)
      .json(responseBody("Workshop created", null, workshop));
  } catch (error) {
    if (bannerUrl !== "") {
      await s3.remove(bannerUrl);
    }
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workshops = await workshopData.list();
    return res.status(200).json(responseBody("OK", null, workshops));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workshop = await workshopData.getById(req.params.id);
    if (!workshop) {
      return res
        .status(404)
        .json(responseBody("Workshop not found", null, null));
    }

    return res.status(200).json(responseBody("OK", null, workshop));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    if (req.file) {
      const bannerUrl = await s3.upload(req.file, "workshop/banner");

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

    const workshop = await workshopData.updateById(req.params.id, req.body);
    return res
      .status(200)
      .json(responseBody("Workshop updated", null, workshop));
  } catch (error) {
    if (bannerUrl !== "") {
      await s3.remove(bannerUrl);
    }
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await workshopData.deleteById(req.params.id);
    return res.status(200).json(responseBody("Workshop deleted", null, null));
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

    const playbackUrl = await s3.upload(req.file, "workshop/playback");
    const workshop = await workshopData.updateById(req.params.id, playbackUrl);
    return res
      .status(200)
      .json(responseBody("Playback uploaded", null, workshop));
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById, uploadPlayback };
