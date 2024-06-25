import prisma from "../utility/prisma";
import staticFiles from "../utility/staticFiles";

const create = async (data: any) => {
  const trainingMaterial = await prisma.trainingMaterial.create({
    data: data,
  });

  return trainingMaterial;
};

const createByTrainingId = async (trainingId: string, data: any) => {
  const trainingMaterial = await prisma.trainingMaterial.create({
    data: {
      trainingId,
      ...data,
    },
  });

  return trainingMaterial;
};

const list = async () => {
  const trainingMaterials = await prisma.trainingMaterial.findMany();

  return trainingMaterials;
};

const listByTrainingId = async (trainingId: string) => {
  const trainingMaterials = await prisma.trainingMaterial.findMany({
    where: {
      trainingId,
    },
  });

  return trainingMaterials;
};

const getById = async (id: string) => {
  const trainingMaterial = await prisma.trainingMaterial.findUnique({
    where: {
      id: id,
    },
  });

  return trainingMaterial;
};

const updateById = async (id: string, data: any) => {
  const trainingMaterial = await prisma.$transaction(
    async (prismaTransaction) => {
      let trainingMaterial =
        await prismaTransaction.trainingMaterial.findUnique({
          where: {
            id: id,
          },
        });

      if (!trainingMaterial) return;

      if (data.url) {
        await staticFiles.remove(trainingMaterial.url);
      }

      trainingMaterial = await prismaTransaction.trainingMaterial.update({
        where: {
          id: id,
        },
        data: data,
      });

      return trainingMaterial;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return trainingMaterial;
};

const deleteById = async (id: string) => {
  const trainingMaterial = await prisma.trainingMaterial.delete({
    where: {
      id: id,
    },
  });

  return trainingMaterial;
};

export default {
  create,
  createByTrainingId,
  list,
  listByTrainingId,
  getById,
  updateById,
  deleteById,
};
