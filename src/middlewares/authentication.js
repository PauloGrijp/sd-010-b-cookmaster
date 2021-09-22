const Joi = require('joi');
const models = require('../models');

const login = async (req, _res, next) => {
  const userData = req.body;

  const validate = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }).validate(userData);
  if (validate.error) return next({ message: 'All fields must be filled' });

  const getUser = await models.getUser(userData);
  if (!getUser) return next({ message: 'Incorrect username or password' });
  req.user = getUser;
  next();
};

module.exports = { login };