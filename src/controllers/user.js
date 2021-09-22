const codes = require('../httpcodes');
const userService = require('../services/user');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { user, error } = await userService.createUser(name, email, password);
  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(codes.created).json({ user });
};

module.exports = {
  createUser,
};
