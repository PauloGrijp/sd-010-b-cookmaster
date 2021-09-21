const rescue = require('express-rescue');
const Joi = require('joi');
const Services = require('../services');

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(error);

  const user = { ...req.body, role: 'user' };
  const userCreate = await Services.user.create(user);

  res.status(200).json(userCreate);
});

module.exports = { create };
