import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (orderData: any) => {
  const order = await prisma.order.create({
    data: orderData,
  });

  return order;
};

const list = async (eventType?: any) => {
  if (eventType) {
    const orders = await prisma.order.findMany({
      where: {
        eventType: eventType,
      },
    });

    return orders;
  }

  const orders = await prisma.order.findMany();

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

const getByEventType = async (accountId: string, eventType: ProductType) => {
  const orders = await prisma.order.findMany({
    where: {
      accountId: accountId,
      eventType: eventType,
    },
  });

  return orders;
};

const getByUserEventId = async (accountId: string, eventId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      accountId: accountId,
      eventId: eventId,
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

const verifyOrder = async (id: string) => {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      isVerified: true,
    },
  });

  return order;
};

export default {
  create,
  list,
  getById,
  getByEventType,
  getByUserEventId,
  updateById,
  deleteById,
  verifyOrder,
};
