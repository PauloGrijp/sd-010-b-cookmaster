const { StatusCodes } = require('http-status-codes');

const servicesUsers = require('../services/users');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await servicesUsers.create(name, email, password);
  res.status(StatusCodes.CREATED).json(newUser);
};

module.exports = {
  create,
};
