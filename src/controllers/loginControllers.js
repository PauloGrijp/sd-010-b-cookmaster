const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { loginServices } = require('../services');

const SECRET = 'a-colher-nao-existe';

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required(),
}).messages({ 'any.required': 'All fields must be filled' });

const loginControllers = rescue(async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(error);

  const { email, password } = req.body;
  const user = await loginServices.login({ email, password });
  if (user.error) return next(user.error);

  const token = jwt.sign(user, SECRET);
  res.status(200).json({ token });
});

module.exports = loginControllers;
