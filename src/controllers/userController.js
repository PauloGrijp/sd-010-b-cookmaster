const rescue = require('express-rescue');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const secret = 'MyReallySuperSecretSecret';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

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
    return res.status(409).json({ message: 'Email already registered' });
  }

  const newUser = await UserService.create(name, email, password, role);
  if (newUser.err) return next(newUser.err);
  return res.status(201).json(newUser);
});

const login = rescue(async (req, res, _next) => {
  const { email, password } = req.body;
  const { error } = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(401).json({ message: 'All fields must be filled' });

  const user = await UserService.login(email, password);
  if (!user) return res.status(401).json({ message: 'Incorrect username or password' });

  if (user.email === email && user.password === password) {
    const { _id, role } = user;
    const token = jwt.sign({ id: _id, email, role }, secret, jwtConfig);
    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: 'Incorrect username or password' });
});

const createAdmin = rescue(async (req, res, next) => {
  const { role } = res;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  const { name, email, password } = req.body;
  const newAdmin = await UserService.create(name, email, password, role);
  if (newAdmin.err) return next(newAdmin.err);
  return res.status(201).json(newAdmin);
});

module.exports = {
  create,
  createAdmin,
  login,
};