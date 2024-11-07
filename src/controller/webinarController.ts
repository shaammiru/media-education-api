import { NextFunction, Request, Response } from "express";
import webinarData from "../data/webinarData";
import staticFiles from "../utility/staticFiles";
import responseBody from "../utility/responseBody";
import categoryData from "../data/categoryData";
import subCategoryData from "../data/subCategoryData";
import orderData from "../data/orderData";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let bannerUrl = "";
  try {
    bannerUrl = await staticFiles.upload(req.file!, "banner/webinar");
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
      await staticFiles.remove(bannerUrl);
    }
    next(error);
  }
};

const list = async (req: any, res: Response, next: NextFunction) => {
  try {
    const webinars = await webinarData.list();
    let modWebinars: [{ [k: string]: any }] = [{}];

    if (req.user && webinars.length !== 0) {
      const webinarOrder = await orderData.getByEventType(
        req.user.id,
        "WEBINAR"
      );

      for (let i = 0; i < webinars.length; i++) {
        modWebinars[i] = webinars[i];
        modWebinars[i].isRegistered = false;
        modWebinars[i].isVerified = false;
        for (let j = 0; j < webinarOrder.length; j++) {
          if (webinars[i].id == webinarOrder[j].eventId) {
            modWebinars[i].isRegistered = true;
            modWebinars[i].isVerified = webinarOrder[j].isVerified;
          }
        }
      }
    } else {
      for (let i = 0; i < webinars.length; i++) {
        modWebinars[i] = webinars[i];
        modWebinars[i].isRegistered = false;
        modWebinars[i].isVerified = false;
      }
    }

    if (webinars.length === 0) {
      return res.status(200).json(responseBody("OK", null, webinars));
    }

    return res.status(200).json(responseBody("OK", null, modWebinars));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: any, res: Response, next: NextFunction) => {
  try {
    let isRegistered = false;
    const webinar = await webinarData.getById(req.params.id);

    if (!webinar) {
      return res
        .status(404)
        .json(responseBody("Webinar not found", null, null));
    }

    if (req.user) {
      const order = await orderData.getByUserEventId(
        req.user.id,
        req.params.id
      );

      if (order) {
        isRegistered = true;
      }
    }

    return res
      .status(200)
      .json(responseBody("OK", null, { ...webinar, isRegistered }));
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
    const registeredUsers = await webinarData.getRegisteredUsers(req.params.id);
    return res.status(200).json(responseBody("OK", null, registeredUsers));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const bannerUrl = await staticFiles.upload(req.file, "banner/webinar");
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

export { create, list, getById, getRegisteredUsers, updateById, deleteById };
