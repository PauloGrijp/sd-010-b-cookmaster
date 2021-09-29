const express = require('express');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');
const secret = require('./superpassword');

const loginRouter = express.Router();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.validateLogin(email, password);

  if (result.message) {
    return res.status(StatusCodes.UNAUTHORIZED).json(result);
  }

  const token = jwt.sign(result, secret, jwtConfig);

  return res.status(StatusCodes.OK).json({ token });
});

module.exports = loginRouter;
