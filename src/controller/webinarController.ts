import { NextFunction, Request, Response } from "express";
import webinarData from "../data/webinarData";
import categoryData from "../data/categoryData";
import s3 from "../utility/awsS3";
import responseBody from "../utility/responseBody";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bannerUrl = await s3.upload(req.file!, "webinar/banner");
    req.body.banner = bannerUrl;

    if (req.body.categoryName) {
      const category = await categoryData.getByName(req.body.categoryName);
      if (!category) {
        const newCategory = await categoryData.create({
          name: req.body.categoryName,
        });
        req.body.categoryId = newCategory.id;
      }
    }

    const webinar = await webinarData.create(req.body);
    return res.status(201).json(responseBody("Webinar created", null, webinar));
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webinars = await webinarData.list();
    return res.status(200).json(responseBody("OK", null, webinars));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webinar = await webinarData.getById(req.params.id);
    if (!webinar) {
      return res
        .status(404)
        .json(responseBody("Webinar not found", null, null));
    }

    return res.status(200).json(responseBody("OK", null, webinar));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const bannerUrl = await s3.upload(req.file, "webinar/banner");
      req.body.banner = bannerUrl;
    }

    const webinar = await webinarData.updateById(req.params.id, req.body);
    return res.status(200).json(responseBody("Webinar updated", null, webinar));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await webinarData.deleteById(req.params.id);
    return res.status(200).json(responseBody("Webinar deleted", null, null));
  } catch (error) {
    next(error);
  }
};

export { create, list, getById, updateById, deleteById };
