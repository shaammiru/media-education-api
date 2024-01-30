const accountData = require("../data/account_data");

const create = async (req, res) => {
  try {
    const validData = req.body.validData;
    const account = await accountData.create(validData);

    return res.status(201).json({ message: "User created", data: account });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const accounts = await accountData.list();

    return res.status(200).json({ message: "List of users", data: accounts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await accountData.getById(accountId);

    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User by id", data: account });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const accountId = req.params.id;
    const validData = req.body.validData;
    const account = await accountData.updateById(accountId, validData);

    return res.status(200).json({ message: "User updated", data: account });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await accountData.deleteById(accountId);

    return res.status(200).json({ message: "User deleted", data: account });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
