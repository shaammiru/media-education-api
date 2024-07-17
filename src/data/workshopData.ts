import { PrismaClient } from "@prisma/client";
import staticFiles from "../utility/staticFiles";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const workshop = await prisma.$transaction(
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

      const workshopHistory = await prismaTransaction.workshopHistory.create({
        data: {
          price: data.price,
        },
      });

      delete data.price;

      const workshop = await prismaTransaction.workshop.create({
        data: {
          lastWorkshopHistoryId: workshopHistory.id,
          ...data,
        },
      });

      await prismaTransaction.workshopHistory.update({
        where: {
          id: workshopHistory.id,
        },
        data: {
          workshopId: workshop.id,
        },
      });

      return workshop;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return workshop;
};

const list = async () => {
  const workshops = await prisma.workshop.findMany({
    include: {
      workshopHistories: true,
      lastWorkshopHistory: true,
      category: true,
      subCategory: true,
    },
  });

  return workshops;
};

const getById = async (id: string) => {
  const workshop = await prisma.workshop.findUnique({
    where: {
      id: id,
    },
    include: {
      workshopHistories: true,
      lastWorkshopHistory: true,
      category: true,
      subCategory: true,
    },
  });

  if (!workshop) return;

  return workshop;
};

const getRegisteredUsers = async (id: string) => {
  const registeredUsers = await prisma.account.findMany({
    where: {
      orders: {
        some: {
          detailOrders: {
            some: {
              workshopId: id,
            },
          },
        },
      },
    },
    select: {
      fullname: true,
      organization: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });

  return registeredUsers;
};

const updateById = async (id: string, data: any) => {
  const workshop = await prisma.$transaction(
    async (prismaTransaction) => {
      let workshop = await prismaTransaction.workshop.findUnique({
        where: {
          id: id,
        },
      });

      if (!workshop) return;

      if (data.banner) {
        await staticFiles.remove(workshop.banner);
      }

      if (data.price) {
        const workshopHistory = await prismaTransaction.workshopHistory.create({
          data: {
            workshopId: id,
            price: data.price,
          },
        });

        delete data.price;

        const updatedWorkshop = await prismaTransaction.workshop.update({
          where: {
            id: id,
          },
          data: {
            lastWorkshopHistoryId: workshopHistory.id,
            ...data,
          },
          include: {
            workshopHistories: true,
            lastWorkshopHistory: true,
            category: true,
            subCategory: true,
          },
        });

        return updatedWorkshop;
      }

      workshop = await prismaTransaction.workshop.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
        include: {
          workshopHistories: true,
          lastWorkshopHistory: true,
          category: true,
          subCategory: true,
        },
      });

      return workshop;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return workshop;
};

const deleteById = async (id: string) => {
  const workshop = await prisma.$transaction(async (prismaTransaction) => {
    const workshop = await prismaTransaction.workshop.delete({
      where: {
        id: id,
      },
    });

    await staticFiles.remove(workshop.banner);

    return workshop;
  });

  return workshop;
};

const uploadPlayback = async (id: string, url: string) => {
  const workshop = await prisma.workshop.update({
    where: {
      id: id,
    },
    data: {
      playbackUrl: url,
    },
  });

  return workshop;
};

export default {
  create,
  list,
  getById,
  getRegisteredUsers,
  updateById,
  deleteById,
  uploadPlayback,
};
