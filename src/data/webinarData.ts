import { PrismaClient } from "@prisma/client";
import s3 from "../utility/awsS3";


const prisma = new PrismaClient();

const create = async (data: any) => {
  const webinar = await prisma.$transaction(async (prismaTransaction) => {
    
    if (!data.categoryId) {
      const newCategory = await prismaTransaction.category.create({
        data: {
          name: data.categoryName,
        }
      });
      data.categoryId = newCategory.id;
    }

    if (!data.subCategoryId) {
      const newSubCategory = await prismaTransaction.subCategory.create({
        data: {
          name: data.subCategoryName,
        }
      });
      data.subCategoryId = newSubCategory.id;
    }

    delete data.categoryName;
    delete data.subCategoryName;

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
  }, {
    maxWait: 5000,
    timeout: 10000,
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
    include: {
      webinarHistories: true, // Include webinarHistories relation
      carts: true, // Include carts relation
      lastWebinarHistory: true, // Include lastWebinarHistory relation
      category: true, // Include category relation
      subCategory: true, // Include subCategory relation
    },
  });

  if (!webinar) return;

  return webinar;
};

const updateById = async (id: string, data: any) => {
  const webinar = await prisma.$transaction(async (prismaTransaction) => {
    let webinar = await prismaTransaction.webinar.findUnique({
      where: {
        id: id,
      },
    });

    if (!webinar) return;

    if (!data.categoryId) {
      const newCategory = await prismaTransaction.category.create({
        data: {
          name: data.categoryName,
        }
      });
      data.categoryId = newCategory.id;
    }

    if (!data.subCategoryId) {
      const newSubCategory = await prismaTransaction.subCategory.create({
        data: {
          name: data.subCategoryName,
        }
      });
      data.subCategoryId = newSubCategory.id;
    }

    delete data.categoryName;
    delete data.subCategoryName;

    if (data.price) {
      const webinarHistory = await prismaTransaction.webinarHistory.create({
        data: {
          webinarId: id,
          price: data.price,
        },
      });

      delete data.price;
      await s3.remove(webinar.banner);

      const updatedWebinar = await prismaTransaction.webinar.update({
        where: {
          id: id,
        },
        data: {
          lastWebinarHistoryId: webinarHistory.id,
          ...data,
        },
      });

      return updatedWebinar;
    }

    await s3.remove(webinar.banner);

    webinar = await prismaTransaction.webinar.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return webinar;
  }, {
    maxWait: 5000,
    timeout: 10000,
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
  });

  return webinar;
};

export default { create, list, getById, updateById, deleteById };
