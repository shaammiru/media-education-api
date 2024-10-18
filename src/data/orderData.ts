import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (orderData: any) => {
  const order = await prisma.order.create({
    data: orderData,
  });

  return order;
};

const list = async (eventType: any) => {
  const orders = await prisma.order.findMany({
    where: {
      eventType: eventType,
    },
  });

  return orders;
};

const getById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });

  if (!order) return;

  return order;
};

const updateById = async (id: string, orderData: any) => {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: orderData,
  });

  return order;
};

const deleteById = async (id: string) => {
  const order = await prisma.order.delete({
    where: {
      id: id,
    },
  });

  return order;
};

export default { create, list, getById, updateById, deleteById };
