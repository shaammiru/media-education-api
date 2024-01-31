const prismaClient = require("@prisma/client").PrismaClient;

const Prisma = new prismaClient();

const create = async (validData) => {
  const webinar = createWebinarTransaction(validData);

  return webinar;
};

const list = async () => {
  const webinars = await Prisma.webinar.findMany();

  return webinars;
};

const getById = async (webinarId) => {
  const webinar = await Prisma.webinar.findUnique({
    where: {
      id: webinarId,
    },
  });

  return webinar;
};

const updateById = async (webinarId, validData) => {
  if (validData.price) {
    const webinarHistory = await Prisma.webinarHistory.create({
      data: {
        price: validData.price,
      },
    });

    delete validData.price;

    const webinar = await Prisma.webinar.update({
      where: {
        id: webinarId,
      },
      data: {
        lastWebinarHistory: {
          connect: {
            id: webinarHistory.id,
          },
        },
        ...validData,
      },
    });

    return webinar;
  }

  const webinar = await Prisma.webinar.update({
    where: {
      id: webinarId,
    },
    data: validData,
    select: {
      password: false,
    },
  });

  return webinar;
};

const deleteById = async (webinarId) => {
  const webinar = await Prisma.webinar.delete({
    where: {
      id: webinarId,
    },
    select: {
      password: false,
    },
  });

  return webinar;
};

const createWebinarTransaction = async (validData) => {
  await Prisma.$transaction(async (prisma) => {
    const webinarHistory = await prisma.webinarHistory.create({
      data: {
        price: validData.price,
      },
    });

    delete validData.price;

    const webinar = await prisma.webinar.create({
      data: {
        lastWebinarHistory: {
          connect: {
            id: webinarHistory.id,
          },
        },
        ...validData,
      },
    });

    await prisma.webinarHistory.update({
      where: {
        id: webinarHistory.id,
      },
      data: {
        lastWebinar: {
          connect: {
            id: webinar.id,
          },
        },
      },
    });

    return webinar;
  });
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
