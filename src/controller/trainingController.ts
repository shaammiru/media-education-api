import { NextFunction, Request, Response } from "express";
import trainingData from "../data/trainingData";
import staticFiles from "../utility/staticFiles";
import responseBody from "../utility/responseBody";
import categoryData from "../data/categoryData";
import subCategoryData from "../data/subCategoryData";
import trainingMaterialData from "../data/trainingMaterialData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await staticFiles.upload(req.file!, "banner/training");
    req.body.banner = bannerUrl;

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

    const training = await trainingData.create(req.body);
    return res
      .status(201)
      .json(responseBody("Training created", null, training));
  } catch (error) {
    if (bannerUrl !== "") {
      await staticFiles.remove(bannerUrl);
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
  try {
    if (req.file) {
      const bannerUrl = await staticFiles.upload(req.file, "banner/training");
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

    const training = await trainingData.updateById(req.params.id, req.body);
    return res
      .status(200)
      .json(responseBody("Training updated", null, training));
  } catch (error) {
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

const listMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const materials = await trainingMaterialData.listByTrainingId(
      req.params.id
    );
    return res.status(200).json(responseBody("OK", null, materials));
  } catch (error) {
    next(error);
  }
};

const uploadMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let materialUrl = "";
  try {
    materialUrl = await staticFiles.upload(req.file!, "material/training");
    req.body.url = materialUrl;
    const training = await trainingMaterialData.createByTrainingId(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(responseBody("Material uploaded", null, training));
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

    const playbackUrl = await staticFiles.upload(req.file, "playback/training");
    const training = await trainingData.updateById(req.params.id, playbackUrl);
    return res
      .status(200)
      .json(responseBody("Playback uploaded", null, training));
  } catch (error) {
    next(error);
  }
};

export {
  create,
  list,
  getById,
  updateById,
  deleteById,
  listMaterial,
  uploadMaterial,
  uploadPlayback,
};
