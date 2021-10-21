const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const { usersServices } = require('../services');

const userSchema = Joi.object({
  name: Joi
    .string()
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required(),
})
  .messages({
    'any.required': 'Invalid entries. Try again.',
    'string.email': 'Invalid entries. Try again.',
  });

const create = rescue(async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return next(error);

  const { name, email, password } = req.body;
  const user = await usersServices.create({ name, email, password, role: 'user' });
  if (user.error) return next(user.error);

  res.status(201).json(user);
});

const createAdmin = rescue(async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return next(error);

  const { name, email, password } = req.body;
  const user = await usersServices.create({ name, email, password, role: 'admin' });
  if (user.error) return next(user.error);

  res.status(201).json(user);
});

module.exports = {
  create,
  createAdmin,
};
