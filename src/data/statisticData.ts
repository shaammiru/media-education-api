import prisma from "../utility/prisma";

const getTotalRegisteredUser = async () => {
  const userCount = await prisma.account.count();

  return userCount;
};

const getEventCount = async () => {
  const webinarCount = await prisma.webinar.count();
  const workshopCount = await prisma.workshop.count();
  const trainingCount = await prisma.training.count();

  return {
    webinarCount,
    workshopCount,
    trainingCount,
    totalEvent: webinarCount + workshopCount + trainingCount,
  };
};

export default { getTotalRegisteredUser, getEventCount };
