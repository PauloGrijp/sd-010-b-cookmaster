const rescue = require('express-rescue');
const Joi = require('joi');
const Services = require('../services');

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const user = { ...req.body, role: 'user' };
  const userCreate = await Services.user.create(user);

  if (userCreate.emailError) return next(userCreate);

  res.status(201).json({ user: userCreate });
});

module.exports = { create };
