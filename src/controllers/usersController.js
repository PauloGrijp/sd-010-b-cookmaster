const usersService = require('../services/usersService');

const registerNewUser = async (req, res) => {
  const newUser = await usersService.registerNewUser(req.body);
  if (newUser.message === 'Email already registered') return res.status(409).json(newUser);
  if (!newUser.user) return res.status(400).json(newUser);
  return res.status(201).json(newUser);
};

module.exports = {
  registerNewUser,
};