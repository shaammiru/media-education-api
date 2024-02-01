import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const account = await prisma.account.create({
    data: data,
  });

  return account;
};

const list = async () => {
  const accounts = await prisma.account.findMany();

  return accounts;
};

const getById = async (id: string) => {
  const account = await prisma.account.findUnique({
    where: {
      id: id,
    },
  });

  if (!account) return;

  return account;
};

const updateById = async (id: string, data: any) => {
  const account = await prisma.account.update({
    where: {
      id: id,
    },
    data: data,
  });

  return account;
};

const deleteById = async (id: string) => {
  const account = await prisma.account.delete({
    where: {
      id: id,
    },
  });

  return account;
};

export default { create, list, getById, updateById, deleteById };
