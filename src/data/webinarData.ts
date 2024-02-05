import { PrismaClient } from "@prisma/client";
import s3 from "../utility/awsS3";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const webinar = await prisma.$transaction(async (prismaTransaction) => {
    const webinarHistory = await prismaTransaction.webinarHistory.create({
      data: {
        price: data.price,
      },
    });

    delete data.price;

    const webinar = await prismaTransaction.webinar.create({
      data: {
        lastWebinarHistoryId: webinarHistory.id,
        ...data,
      },
    });

    await prismaTransaction.webinarHistory.update({
      where: {
        id: webinarHistory.id,
      },
      data: {
        webinarId: webinar.id,
      },
    });

    return webinar;
  });

  return webinar;
};

const list = async () => {
  const webinars = await prisma.webinar.findMany();

  return webinars;
};

const getById = async (id: string) => {
  const webinar = await prisma.webinar.findUnique({
    where: {
      id: id,
    },
  });

  if (!webinar) return;

  return webinar;
};

const updateById = async (id: string, data: any) => {
  const webinar = await prisma.$transaction(async (prismaTransaction) => {
    if (data.price) {
      const webinarHistory = await prismaTransaction.webinarHistory.create({
        data: {
          webinarId: id,
          price: data.price,
        },
      });

      delete data.price;

      const webinar = await prismaTransaction.webinar.update({
        where: {
          id: id,
        },
        data: {
          lastWebinarHistoryId: webinarHistory.id,
          ...data,
        },
      });

      return webinar;
    }

    const webinar = await prismaTransaction.webinar.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return webinar;
  });

  return webinar;
};

const deleteById = async (id: string) => {
  const webinar = await prisma.$transaction(async (prismaTransaction) => {
    const webinar = await prismaTransaction.webinar.delete({
      where: {
        id: id,
      },
    });

    await s3.remove(webinar.banner);

    return webinar;
  })

  return webinar;
};

export default { create, list, getById, updateById, deleteById };
