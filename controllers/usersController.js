const usersModel = require('../model/usersModel');
const usersService = require('../services/usersServices');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const messageErr = { message: 'Email already registered' };

  if (await usersModel.findByEmail(email)) return res.status(409).json(messageErr);

  const user = await usersService.createUser(name, email, password);
  if (user.error) return res.status(400).json(user.err);
  return res.status(201).json({ user });
};

module.exports = {
  createUser,
};