const rescue = require('express-rescue');

const {
  usersServices,
} = require('../services/usersServices');

const registerCommonUserController = rescue(async (req, res, _next) => {
  const { name, email, password } = req.body;
  const result = await usersServices({ name, email, password, role: 'user' });
  res.status(result.statusCode).json(result.infos);
});

const registerAdminUserController = rescue(async (req, res, _next) => {
  const { role } = req.user;
  const { name, email, password } = req.body;
  const result = await usersServices({ name, email, password, role });
  res.status(result.statusCode).json(result.infos);
});

module.exports = {
  registerCommonUserController,
  registerAdminUserController,
};
