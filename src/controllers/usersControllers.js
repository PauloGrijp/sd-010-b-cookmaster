const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const { usersServices } = require('../services');

const ERROR = 'Invalid entries. Try again.';

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
}).messages({
  'any.required': ERROR,
  'string.email': ERROR,
});

const create = rescue(async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return next(error);

  const { name, email, password } = req.body;
  let { role } = req.body;
  if (!role) role = 'user';

  const user = await usersServices.create({ name, email, password, role });
  if (user.error) return next(user.error);

  res.status(201).json(user);
});

module.exports = create;
