const express = require('express');
const jwt = require('jsonwebtoken');
const { validadeLogin } = require('../midd/validade');
const loginService = require('../services/login');

const app = express();

const secret = 'secretToken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

app.post('/', validadeLogin, async (req, res, next) => {
  const { email, password } = req.body;

  const login = await loginService.login(email, password);

  if (login.code) return next(login);

  const token = jwt.sign(login, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = app;
