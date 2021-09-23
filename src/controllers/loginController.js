const jwt = require('jsonwebtoken');
const LoginService = require('../services/loginService');

const secret = 'mysecrettoken';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const logUser = async (req, res) => {
  const { email, password } = req.body;
  const { code, message, _id, name, role } = await LoginService.findUser({ email, password });

  if (code) return res.status(code).json({ message });

  const token = jwt.sign({ data: { _id, name, email, role } }, secret, jwtConfig);
  res.status(200).json({ token });
};

module.exports = {
  logUser,
};
