import { NextFunction, Request, Response } from "express";
import orderData from "../data/orderData";
import webinarData from "../data/webinarData";
import workshopData from "../data/workshopData";
import trainingData from "../data/trainingData";

const checkEventAvaibility = async (eventId: string) => {
  let isValid = false;
  let eventType = "";
  let isPaid = false;

  const webinar = await webinarData.getById(eventId);
  if (webinar) {
    isValid = true;
    eventType = "WEBINAR";

    if (webinar.lastWebinarHistory.price.greaterThan(0)) {
      isPaid = true;
    }

    return { isValid, eventType, isPaid };
  }

  const workshop = await workshopData.getById(eventId);
  if (workshop) {
    isValid = true;
    eventType = "WORKSHOP";

    if (workshop.lastWorkshopHistory.price.greaterThan(0)) {
      isPaid = true;
    }

    return { isValid, eventType, isPaid };
  }

  const training = await trainingData.getById(eventId);
  if (training) {
    isValid = true;
    eventType = "TRAINING";

    if (training.lastTrainingHistory.price.greaterThan(0)) {
      isPaid = true;
    }

    return { isValid, eventType, isPaid };
  }

  return { isValid, eventType, isPaid };
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await checkEventAvaibility(req.body.eventId);
    if (event.isValid) {
      req.body.eventType = event.eventType;
      req.body.isPaid = event.isPaid;
      const order = await orderData.create(req.body);
      return res.status(201).json({ message: "Order created", data: order });
    } else {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    next(error);
  }
};

const userCreate = async (req: any, res: Response, next: NextFunction) => {
  try {
    const event = await checkEventAvaibility(req.body.eventId);
    if (event.isValid) {
      req.body.accountId = req.user.id;
      req.body.eventType = event.eventType;
      req.body.isPaid = event.isPaid;
      const order = await orderData.create(req.body);
      return res.status(201).json({ message: "Order created", data: order });
    } else {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    next(error);
  }
};

const list = async (req: any, res: Response, next: NextFunction) => {
  try {
    const orders = await orderData.list(req.body.eventType);
    return res.status(200).json({ message: "List of Orders", data: orders });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderData.getById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    return res.status(200).json({ message: "Order By Id", data: order });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedOrder = await orderData.updateById(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Order updated", data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderData.deleteById(req.params.id);
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    next(error);
  }
};

const approveOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderData.verifyOrder(req.params.id);
    return res.status(200).json({ message: "Order approved" });
  } catch (error) {
    next(error);
  }
};

export {
  create,
  userCreate,
  list,
  getById,
  updateById,
  deleteById,
  approveOrder,
};
