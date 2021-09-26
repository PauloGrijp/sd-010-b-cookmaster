const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const servicesUsers = require('../services/users');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await servicesUsers.createUser({ name, email, password });

  if (newUser.conflict) return res.status(StatusCodes.CONFLICT).json({ message: newUser.message });
  if (newUser.message) return res.status(StatusCodes.BAD_REQUEST).json(newUser);
  
  return res.status(StatusCodes.CREATED).json(newUser);

});

module.exports = {
  createUser,
};
