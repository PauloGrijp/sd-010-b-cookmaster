const { StatusCodes } = require('http-status-codes');

const servicesUsers = require('../services/users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await servicesUsers.createUser(name, email, password);
  res.status(StatusCodes.CREATED).json(newUser);
};

module.exports = {
  createUser,
};
