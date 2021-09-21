const { StatusCodes } = require('http-status-codes');
const usersService = require('../services/usersService');

const addUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await usersService.addUser(name, email);
  if (user.message) return res.status(StatusCodes.CONFLICT).json(user);
  return res.status(StatusCodes.CREATED).json(user);
};

module.exports = { addUser };
