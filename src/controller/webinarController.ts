import { NextFunction, Request, Response } from "express";
import webinarData from "../data/webinarData";
import s3 from "../utility/awsS3";
import responseBody from "../utility/responseBody";
import categoryData from "../data/categoryData";
import subCategoryData from "../data/subCategoryData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await s3.upload(req.file!, "banner/webinar");
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

    const webinar = await webinarData.create(req.body);
    return res.status(201).json(responseBody("Webinar created", null, webinar));
  } catch (error) {
    if (bannerUrl !== "") {
      await s3.remove(bannerUrl);
    }
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
      const bannerUrl = await s3.upload(req.file, "banner/webinar");
      req.body.banner = bannerUrl;
    }

    if (req.body.categoryName) {
      const category = await categoryData.getByName(req.body.categoryName);

      if (!category) {
        const newCategory = await categoryData.create({
          name: req.body.categoryName,
        });

        req.body.categoryId = newCategory.id;
      } else {
        req.body.categoryId = category.id;
      }
    }

    if (req.body.subCategoryName) {
      const subCategory = await subCategoryData.getByName(
        req.body.subCategoryName
      );

      if (!subCategory) {
        const newSubCategory = await subCategoryData.create({
          name: req.body.subCategoryName,
        });

        req.body.subCategoryId = newSubCategory.id;
      } else {
        req.body.subCategoryId = subCategory.id;
      }
    }

    delete req.body.categoryName;
    delete req.body.subCategoryName;

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
