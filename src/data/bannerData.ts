import prisma from "../utility/prisma";
import staticFiles from "../utility/staticFiles";

const create = async (data: any) => {
  const banner = await prisma.banner.create({
    data: data,
  });

  return banner;
};

const list = async () => {
  const banners = await prisma.banner.findMany();

  return banners;
};

const getById = async (id: string) => {
  const banner = await prisma.banner.findUnique({
    where: {
      id: id,
    },
  });

  if (!banner) return;

  return banner;
};

const updateById = async (id: string, data: any) => {
  const banner = await prisma.$transaction(
    async (prismaTransaction) => {
      let banner = await prismaTransaction.banner.findUnique({
        where: {
          id: id,
        },
      });

      if (!banner) return;

      if (data.url) {
        await staticFiles.remove(banner.url);
      }

      banner = await prismaTransaction.banner.update({
        where: {
          id: id,
        },
        data: data,
      });

      return banner;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return banner;
};

const deleteById = async (id: string) => {
  const banner = await prisma.$transaction(
    async (prismaTransaction) => {
      let banner = await prismaTransaction.banner.findUnique({
        where: {
          id: id,
        },
      });

      if (!banner) return;

      await staticFiles.remove(banner.url);

      banner = await prismaTransaction.banner.delete({
        where: {
          id: id,
        },
      });

      return banner;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  return banner;
};

export default { create, list, getById, updateById, deleteById };
