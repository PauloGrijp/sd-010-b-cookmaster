const rescue = require('express-rescue');
const Joi = require('joi');
const usersService = require('../services/usersService');

const createUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  if (error) {
    return next(error);
  }
  const create = await usersService.createUser(name, email, password);
  if (create.message) {
    const { code, message } = create;
    return res.status(code).json({ message });
  }
  res.status(201).json(create);
});
module.exports = { createUser };