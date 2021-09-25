const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const loginService = require('../services/loginService');

const secret = 'seusecretdetoken';

const login = async (req, res) => {
  const user = await loginService.login(req.body);
  // console.log(user);
  if (user.message) { return res.status(StatusCodes.UNAUTHORIZED).json({ message: user.message }); }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  delete user.password;
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};