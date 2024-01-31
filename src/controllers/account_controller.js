const AccountData = require("../data/account_data");

const create = async (req, res, next) => {
  try {
    const validData = req.body.validData;
    const account = await AccountData.create(validData);

    return res.status(201).json({ message: "User created", data: account });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const accounts = await AccountData.list();

    return res.status(200).json({ message: "List of users", data: accounts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await AccountData.getById(accountId);

    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User by id", data: account });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const validData = req.body.validData;
    const account = await AccountData.updateById(accountId, validData);

    return res.status(200).json({ message: "User updated", data: account });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await AccountData.deleteById(accountId);

    return res.status(200).json({ message: "User deleted", data: account });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
