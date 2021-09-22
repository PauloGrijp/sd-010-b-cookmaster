const usersService = require('../services/usersService');

const create = async (req, res, next) => {
  const { body } = req;
  const newUser = await usersService.create(body);
  if (newUser.message) {
    return next(newUser);
  }
  return res.status(201).json(newUser);
};

const login = async (req, res, next) => {
  const { body } = req;
  const data = await usersService.login(body);
  if (data.message) {
    return next(data);
  }
  return res.status(200).send({ token: data });
};

module.exports = {
  create,
  login,
};