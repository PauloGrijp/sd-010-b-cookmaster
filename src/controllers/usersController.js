const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.create({ name, email, password });
  res.status(201).json({ user });
});

const authenticate = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await usersService.authenticate({ email, password });
  res.status(200).json({ token });
});

module.exports = {
  create,
  authenticate,
};