import { NextFunction, Request, Response } from "express";
import trainingMaterialData from "../data/trainingMaterialData";
import staticFiles from "../utility/staticFiles";
import responseBody from "../utility/responseBody";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let materialUrl = "";
  try {
    materialUrl = await staticFiles.upload(req.file!, "material/training");
    req.body.url = materialUrl;
    const trainingMaterial = await trainingMaterialData.create(req.body);
    return res
      .status(201)
      .json(responseBody("Training material created", null, trainingMaterial));
  } catch (error) {
    if (materialUrl !== "") {
      await staticFiles.remove(materialUrl);
    }
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainings = await trainingMaterialData.list();
    return res.status(200).json(responseBody("OK", null, trainings));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const training = await trainingMaterialData.getById(req.params.id);
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
      const materialUrl = await staticFiles.upload(
        req.file,
        "material/training"
      );
      req.body.url = materialUrl;
    }

    const training = await trainingMaterialData.updateById(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(responseBody("Training updated", null, training));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await trainingMaterialData.deleteById(req.params.id);
    return res.status(200).json(responseBody("Training deleted", null, null));
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
