const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Login = require('../services/loginServices');

const secret = 'minha-senha';
const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const login = rescue(async (req, res) => {
  const { email: userEmail } = req.body;
  const checkLogin = await Login.findUser(userEmail);
  const { _id, email, role } = checkLogin;
  const payload = { _id, email, role };
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(StatusCodes.OK).json({ token });
});

module.exports = {
  login,
};