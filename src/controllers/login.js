const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const service = require('../services/login');

const secret = 'naotemsenha';
const jwtConfiguration = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginUsuario = rescue(async (req, res, next) => {
  const user = req.body;
  const result = await service.loginUsuario(user);

  if ('code' in result) {
    return next(result);
  }

  const token = jwt.sign({ data: user }, secret, jwtConfiguration);

  return res.status(200).json({ token });
});

module.exports = { 
  loginUsuario,
};