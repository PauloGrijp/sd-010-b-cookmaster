const StatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');
const LoginService = require('../services/LoginService');

const secret = 'seusecretdetoken';

const findUser = async (req, res) => {
  const { email, password } = req.body;
  
  const { message } = await LoginService.findUser({ email, password });

  if (message) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message,
    });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const user = await LoginService.findUser({ email, password });

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  
  return res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  findUser,
};
