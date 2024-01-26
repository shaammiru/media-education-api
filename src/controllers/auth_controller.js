const login = async (req, res) => {
  return res.status(200).json({ message: "Login success" });
};

module.exports = {
  login,
};
