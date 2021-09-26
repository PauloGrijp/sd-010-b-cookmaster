const UserService = require('../services/users.service');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await UserService.createUser(name, email, password, 'user');
  return res.status(201).json(newUser);
};

module.exports = { createUser };