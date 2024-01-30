const prismaClient = require("@prisma/client").PrismaClient;

const prisma = new prismaClient();

const excludeFields = (account, keys) => {
  return Object.fromEntries(
    Object.entries(account).filter(([key]) => !keys.includes(key)),
  );
};

const create = async (validData) => {
  const account = await prisma.account.create({
    data: validData,
  });

  return account;
};

const list = async () => {
  const accounts = await prisma.account.findMany();

  if (!accounts) return;

  const accountsWithoutPassword = excludeFields(accounts, ["password"]);

  return accountsWithoutPassword;
};

const getById = async (accountId) => {
  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!account) return;

  const accountWithoutPassword = excludeFields(account, ["password"]);

  return accountWithoutPassword;
};

const updateById = async (accountId, validData) => {
  const account = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: validData,
    select: {
      password: false,
    },
  });

  return account;
};

const deleteById = async (accountId) => {
  const account = await prisma.account.delete({
    where: {
      id: accountId,
    },
    select: {
      password: false,
    },
  });

  return account;
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
