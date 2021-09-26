const UserService = require('../services/users.service');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await UserService.createUser(name, email, password, 'user');
  return res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await UserService.login(email, password);
  return res.status(200).json({ token });
};

module.exports = { createUser, login };