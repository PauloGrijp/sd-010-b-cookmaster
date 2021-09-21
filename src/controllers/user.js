const rescue = require('express-rescue');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const Services = require('../services');

const secret = 'cookmaster';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateCreate = (body) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().not().empty().required(),
  }).validate(body);

  return error;
};

const validateLoginRequired = (body) => {
  const { error } = Joi.object({
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(body);

  return error;
};

const create = rescue(async (req, res, next) => {
  const entriesError = validateCreate(req.body);

  if (entriesError) return next({ invalidEntries: true });

  const user = { ...req.body, role: 'user' };
  const userCreate = await Services.user.create(user);

  if (!userCreate) return next({ emailExists: true });

  res.status(201).json({ user: userCreate });
});

const login = rescue(async (req, res, next) => {
  const user = req.body;
  const fieldsRequiredError = validateLoginRequired(user);

  if (fieldsRequiredError) {
    return next({ fieldsRequired: true });
  }

  const userLogged = await Services.user.login(user);

  if (!userLogged) return next({ incorrectUserInfo: true });

  const token = jwt.sign(userLogged, secret, jwtConfig);

  res.status(200).json({ token });
});

module.exports = { create, login };
