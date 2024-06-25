import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: any) => {
  const video = await prisma.video.create({
    data: data,
  });

  return video;
};

const list = async () => {
  const videos = await prisma.video.findMany();

  return videos;
};

const getById = async (id: string) => {
  const video = await prisma.video.findUnique({
    where: {
      id: id,
    },
  });

  if (!video) return;

  return video;
};

const updateById = async (id: string, data: any) => {
  const video = await prisma.video.update({
    where: {
      id: id,
    },
    data: data,
  });

  return video;
};

const deleteById = async (id: string) => {
  const video = await prisma.video.delete({
    where: {
      id: id,
    },
  });

  return video;
};

export default { create, list, getById, updateById, deleteById };
