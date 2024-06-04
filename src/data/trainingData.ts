import { PrismaClient } from "@prisma/client";
import s3 from "../utility/awsS3";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const training = await prisma.training.create({
    data: {
      ...data,
    },
  });

  return training;
};

const list = async () => {
  const trainings = await prisma.training.findMany();

  return trainings;
};

const getById = async (id: string) => {
  const training = await prisma.training.findUnique({
    where: {
      id: id,
    },
  });

  return training;
};

const updateById = async (id: string, data: any) => {
  const training = await prisma.$transaction(
    async (prismaTransaction) => {
      let training = await prismaTransaction.training.findUnique({
        where: {
          id: id,
        },
      });

      if (!training) return;

      if (data.categoryName) {
        const newCategory = await prismaTransaction.category.create({
          data: {
            name: data.categoryName,
          },
        });
        data.categoryId = newCategory.id;
      }

      if (data.subCategoryName) {
        const newSubCategory = await prismaTransaction.subCategory.create({
          data: {
            name: data.subCategoryName,
          },
        });
        data.subCategoryId = newSubCategory.id;
      }

      delete data.categoryName;
      delete data.subCategoryName;

      if (data.price) {
        const trainingHistory = await prismaTransaction.trainingHistory.create({
          data: {
            trainingId: id,
            price: data.price,
          },
        });

        delete data.price;
        await s3.remove(training.banner);

        const updatedTraining = await prismaTransaction.training.update({
          where: {
            id: id,
          },
          data: {
            lastTrainingHistoryId: trainingHistory.id,
            ...data,
          },
        });

        return updatedTraining;
      }

      await s3.remove(training.banner);

      training = await prismaTransaction.training.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });

      return training;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return training;
};

const deleteById = async (id: string) => {
  const training = await prisma.$transaction(async (prismaTransaction) => {
    const training = await prismaTransaction.training.delete({
      where: {
        id: id,
      },
    });

    await s3.remove(training.banner);

    return training;
  });

  return training;
};

export default {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
