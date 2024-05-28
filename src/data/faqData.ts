import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const faq = await prisma.faq.create({
    data: data,
  });

  return faq;
};

const list = async () => {
  const faqs = await prisma.faq.findMany();

  return faqs;
};

const getById = async (id: string) => {
  const faq = await prisma.faq.findUnique({
    where: {
      id: id,
    },
  });

  if (!faq) return;

  return faq;
};

const updateById = async (id: string, data: any) => {
  const faq = await prisma.faq.update({
    where: {
      id: id,
    },
    data: data,
  });

  return faq;
};

const deleteById = async (id: string) => {
  const faq = await prisma.faq.delete({
    where: {
      id: id,
    },
  });

  return faq;
};

export default { create, list, getById, updateById, deleteById };
