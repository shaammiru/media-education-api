import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (orderData: any, detailOrders: any[]) => {
  const order = await prisma.order.create({
    data: {
      ...orderData,
      detailOrders: {
        create: detailOrders,
      },
    },
    include: {
      detailOrders: true,
    },
  });

  return order;
};

const list = async () => {
  const orders = await prisma.order.findMany({
    include: {
      detailOrders: true,
    },
  });

  return orders;
};

const getById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      detailOrders: true,
    },
  });

  if (!order) return;

  return order;
};

const updateById = async (id: string, orderData: any, detailOrders: any[]) => {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      ...orderData,
      detailOrders: {
        deleteMany: {}, // Clear existing detail orders
        create: detailOrders, // Add new detail orders
      },
    },
    include: {
      detailOrders: true,
    },
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
