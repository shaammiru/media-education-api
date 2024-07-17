import { NextFunction, Request, Response } from "express";
import workshopData from "../data/workshopData";
import staticFiles from "../utility/staticFiles";
import responseBody from "../utility/responseBody";
import categoryData from "../data/categoryData";
import subCategoryData from "../data/subCategoryData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await staticFiles.upload(req.file!, "banner/workshop");
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
      await staticFiles.remove(bannerUrl);
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

const getRegisteredUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registeredUsers = await workshopData.getRegisteredUsers(
      req.params.id
    );
    return res.status(200).json(responseBody("OK", null, registeredUsers));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const bannerUrl = await staticFiles.upload(req.file, "banner/workshop");
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

    const training = await workshopData.updateById(req.params.id, req.body);
    return res
      .status(200)
      .json(responseBody("Workshop updated", null, training));
  } catch (error) {
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

    const playbackUrl = await staticFiles.upload(req.file, "playback/workshop");
    const workshop = await workshopData.updateById(req.params.id, playbackUrl);
    return res
      .status(200)
      .json(responseBody("Playback uploaded", null, workshop));
  } catch (error) {
    next(error);
  }
};

export {
  create,
  list,
  getById,
  getRegisteredUsers,
  updateById,
  deleteById,
  uploadPlayback,
};
