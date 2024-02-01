import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const category = await prisma.category.create({
    data: data,
  });

  return category;
};

const list = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

const getById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  if (!category) return;

  return category;
};

const updateById = async (id: string, data: any) => {
  const category = await prisma.category.update({
    where: {
      id: id,
    },
    data: data,
  });

  return category;
};

const deleteById = async (id: string) => {
  const category = await prisma.category.delete({
    where: {
      id: id,
    },
  });

  return category;
};

export default { create, list, getById, updateById, deleteById };
