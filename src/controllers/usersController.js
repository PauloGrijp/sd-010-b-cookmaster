const usersService = require('../services/usersService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.create({ name, email, password });
  res.status(201).json({ user });
};

module.exports = createUser;