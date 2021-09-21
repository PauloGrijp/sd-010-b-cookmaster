const usersService = require('../services/usersService');

const create = async (req, res, next) => {
  const { body } = req;
  const newUser = await usersService.create(body);
  if (newUser.message) {
    return next(newUser);
  }
  return res.status(201).json(newUser);
};

module.exports = {
  create,
};