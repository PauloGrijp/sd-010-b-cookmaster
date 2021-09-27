const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const OK = 200;
const UNAUTHORIZED = 401;

const secret = 'mySuperPassword';

const jwtConfiguration = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// req 2 
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { message } = await loginService.findUserByLoginValidation({ email, password });

  if (message) {
    return res.status(UNAUTHORIZED).json({ message });
  }

  const loginUser = await loginService.findUserByLoginValidation({ email, password });
  const token = jwt.sign({ data: loginUser }, secret, jwtConfiguration);
  
  return res.status(OK).json({ token });
};

module.exports = {
  userLogin,
};
