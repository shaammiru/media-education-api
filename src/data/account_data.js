const PrismaClient = require("@prisma/client").PrismaClient;

const Prisma = new PrismaClient();

const excludeFields = (account, keys) => {
  return Object.fromEntries(
    Object.entries(account).filter(([key]) => !keys.includes(key)),
  );
};

const create = async (validData) => {
  const account = await Prisma.account.create({
    data: validData,
  });

  return account;
};

const list = async () => {
  const accounts = await Prisma.account.findMany();

  if (!accounts) return;

  const accountsWithoutPassword = excludeFields(accounts, ["password"]);

  return accountsWithoutPassword;
};

const getById = async (accountId) => {
  const account = await Prisma.account.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!account) return;

  const accountWithoutPassword = excludeFields(account, ["password"]);

  return accountWithoutPassword;
};

const updateById = async (accountId, validData) => {
  const account = await Prisma.account.update({
    where: {
      id: accountId,
    },
    data: validData,
  });

  const accountWithoutPassword = excludeFields(account, ["password"]);

  return accountWithoutPassword;
};

const deleteById = async (accountId) => {
  const account = await Prisma.account.delete({
    where: {
      id: accountId,
    },
  });

  const accountWithoutPassword = excludeFields(account, ["password"]);

  return accountWithoutPassword;
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
