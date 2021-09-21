const rescue = require('express-rescue');
const Joi = require('joi');
const Services = require('../services');

const validateCreate = (body) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().not().empty().required(),
  }).validate(body);

  return error;
};

const create = rescue(async (req, res, next) => {
  const error = validateCreate(req.body);

  if (error) return next({ invalidEntries: true });

  const user = { ...req.body, role: 'user' };
  const userCreate = await Services.user.create(user);

  if (!userCreate) return next({ emailExists: true });

  res.status(201).json({ user: userCreate });
});

module.exports = { create };
