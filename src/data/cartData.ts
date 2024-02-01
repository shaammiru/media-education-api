import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const cart = await prisma.cart.create({
    data: data,
  });

  return cart;
};

const list = async () => {
  const carts = await prisma.cart.findMany();

  return carts;
};

const getById = async (id: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id: id,
    },
  });

  if (!cart) return;

  return cart;
};

const updateById = async (id: string, data: any) => {
  const cart = await prisma.cart.update({
    where: {
      id: id,
    },
    data: data,
  });

  return cart;
};

const deleteById = async (id: string) => {
  const cart = await prisma.cart.delete({
    where: {
      id: id,
    },
  });

  return cart;
};

export default { create, list, getById, updateById, deleteById };
