import { NextFunction, Request, Response } from "express";
import statisticData from "../data/statisticData";

const getDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCount = await statisticData.getTotalRegisteredUser();
    const eventCount = await statisticData.getEventCount();

    return res
      .status(200)
      .json({ message: "Dashboard data", data: { userCount, ...eventCount } });
  } catch (error) {
    next(error);
  }
};

export { getDashboardData };
