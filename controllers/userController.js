const rescue = require('express-rescue');
// const { ObjectID } = require('mongodb');
const Joi = require('joi');
const UserService = require('../services/userService');

const create = rescue(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().regex(/\S*@\S*\.\S/),
    password: Joi.string().required(),
    role: Joi.string(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: 'Invalid entries. Try again.' });

  const verify = await UserService.findByEmail(email);
  if (verify) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  const newUser = await UserService.create(name, email, password, role);
  if (newUser.err) return next(newUser.err);
  return res.status(201).json(newUser);
});

module.exports = {
  create,
};