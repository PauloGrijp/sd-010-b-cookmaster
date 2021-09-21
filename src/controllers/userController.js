const UserService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await UserService.create({ name, email, password });

  res.status(201).json(newUser);
};

module.exports = {
  create,
};
