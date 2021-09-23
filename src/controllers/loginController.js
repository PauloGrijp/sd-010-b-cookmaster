const rescue = require('express-rescue');

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const loginService = require('../services/loginService');

const SECRET = '123456';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  if (error) {
    return next('login');
  }
  const login = await loginService.loginUser(email, password);
  if (!login) {
    return next('passwordOrLogin');
  }
  const { _id, role } = login;
  const payload = {
    _id, email, role,
  };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return res.status(200).json({ token });
});
module.exports = {
  loginUser,
};