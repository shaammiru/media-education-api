import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const subCategory = await prisma.subCategory.create({
    data: data,
  });

  return subCategory;
};

const list = async () => {
  const subCategories = await prisma.subCategory.findMany();

  return subCategories;
};

const getById = async (id: string) => {
  const subCategory = await prisma.subCategory.findUnique({
    where: {
      id: id,
    },
  });

  if (!subCategory) return;

  return subCategory;
};

const updateById = async (id: string, data: any) => {
  const subCategory = await prisma.subCategory.update({
    where: {
      id: id,
    },
    data: data,
  });

  return subCategory;
};

const deleteById = async (id: string) => {
  const subCategory = await prisma.subCategory.delete({
    where: {
      id: id,
    },
  });

  return subCategory;
};

const getByName = async (name: string) => {
  const subCategory = await prisma.subCategory.findUnique({
    where: {
      name: name,
    },
  });

  return subCategory;
};

export default { create, list, getById, updateById, deleteById, getByName };
