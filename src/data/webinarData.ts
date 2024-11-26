import prisma from "../utility/prisma";
import staticFiles from "../utility/staticFiles";

const create = async (data: any) => {
  const webinar = await prisma.$transaction(
    async (prismaTransaction) => {
      if (!data.categoryId) {
        const newCategory = await prismaTransaction.category.create({
          data: {
            name: data.categoryName,
          },
        });
        data.categoryId = newCategory.id;
      }

      if (!data.subCategoryId) {
        const newSubCategory = await prismaTransaction.subCategory.create({
          data: {
            name: data.subCategoryName,
          },
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
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return webinar;
};

const list = async () => {
  const webinars = await prisma.webinar.findMany({
    include: {
      webinarHistories: true,
      lastWebinarHistory: true,
      category: true,
      subCategory: true,
    },
  });

  return webinars;
};

const getById = async (id: string) => {
  const webinar = await prisma.webinar.findUnique({
    where: {
      id: id,
    },
    include: {
      webinarHistories: true,
      lastWebinarHistory: true,
      category: true,
      subCategory: true,
    },
  });

  if (!webinar) return;

  return webinar;
};

const getRegisteredUsers = async (id: string) => {
  const registeredUsers = await prisma.account.findMany({
    where: {
      orders: {
        some: {
          eventId: id,
        },
      },
    },
    select: {
      fullname: true,
      email: true,
      phone: true,
      organization: true,
      university: true,
      createdAt: true,
    },
  });

  return registeredUsers;
};

const updateById = async (id: string, data: any) => {
  const webinar = await prisma.$transaction(
    async (prismaTransaction) => {
      let webinar = await prismaTransaction.webinar.findUnique({
        where: {
          id: id,
        },
      });

      if (!webinar) return;

      if (data.banner) {
        await staticFiles.remove(webinar.banner);
      }

      if (data.price) {
        const webinarHistory = await prismaTransaction.webinarHistory.create({
          data: {
            webinarId: id,
            price: data.price,
          },
        });

        delete data.price;

        const updatedWebinar = await prismaTransaction.webinar.update({
          where: {
            id: id,
          },
          data: {
            lastWebinarHistoryId: webinarHistory.id,
            ...data,
          },
          include: {
            webinarHistories: true,
            lastWebinarHistory: true,
            category: true,
            subCategory: true,
          },
        });

        return updatedWebinar;
      }

      webinar = await prismaTransaction.webinar.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
        include: {
          webinarHistories: true,
          lastWebinarHistory: true,
          category: true,
          subCategory: true,
        },
      });

      return webinar;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return webinar;
};

const deleteById = async (id: string) => {
  const webinar = await prisma.$transaction(async (prismaTransaction) => {
    const webinar = await prismaTransaction.webinar.delete({
      where: {
        id: id,
      },
    });

    await staticFiles.remove(webinar.banner);

    return webinar;
  });

  return webinar;
};

export default {
  create,
  list,
  getById,
  getRegisteredUsers,
  updateById,
  deleteById,
};
