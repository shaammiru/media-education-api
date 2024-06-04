import { PrismaClient } from "@prisma/client";
import s3 from "../utility/awsS3";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const training = await prisma.$transaction(
    async (prismaTransaction) => {
      const trainingHistory = await prismaTransaction.trainingHistory.create({
        data: {
          price: data.price,
          discount: data.discount,
        },
      });

      delete data.price;
      delete data.discount;

      const training = await prismaTransaction.training.create({
        data: {
          lastTrainingHistoryId: trainingHistory.id,
          ...data,
        },
      });

      await prismaTransaction.trainingHistory.update({
        where: {
          id: trainingHistory.id,
        },
        data: {
          trainingId: training.id,
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

      if (data.banner) {
        await s3.remove(training.banner);
      }

      const dataToUpdate = {} as any;
      dataToUpdate.trainingId = id;

      if (data.price) {
        dataToUpdate.price = data.price;
        delete data.price;
      }

      if (data.discount) {
        dataToUpdate.discount = data.discount;
        delete data.discount;
      }

      if (dataToUpdate.price || dataToUpdate.discount) {
        const trainingHistory = await prismaTransaction.trainingHistory.create({
          data: dataToUpdate,
        });

        const updatedTraining = await prismaTransaction.training.update({
          where: {
            id: id,
          },
          data: {
            lastTrainingHistoryId: trainingHistory.id,
            ...data,
          },
          include: {
            lastTrainingHistory: true,
          },
        });

        return updatedTraining;
      }

      training = await prismaTransaction.training.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
        include: {
          lastTrainingHistory: true,
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
