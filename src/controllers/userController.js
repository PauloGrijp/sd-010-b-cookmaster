const UserService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await UserService.create({ name, email, password });

  if (newUser.code) return res.status(newUser.code).json({ message: newUser.message });

  res.status(201).json(newUser);
};

module.exports = {
  create,
};
