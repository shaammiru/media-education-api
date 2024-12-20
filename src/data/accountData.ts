import prisma from "../utility/prisma";
import { Role } from "@prisma/client";

const create = async (data: any) => {
  const account = await prisma.account.create({
    data: data,
  });

  return account;
};

const list = async (role: Role | null) => {
  if (role) {
    const accounts = await prisma.account.findMany({
      where: {
        role: role,
      },
    });

    return accounts;
  }

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

const getByEmail = async (email: string) => {
  const account = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });

  return account;
};

const listAdmin = async () => {
  const accounts = await prisma.account.findMany({
    where: {
      role: "ADMIN",
    },
  });

  return accounts;
};

export default {
  create,
  list,
  getById,
  updateById,
  deleteById,
  getByEmail,
  listAdmin,
};
