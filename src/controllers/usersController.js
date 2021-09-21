const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.createUser({ name, email, password });
  res.status(201).json({ user });
};

module.exports = createUser;