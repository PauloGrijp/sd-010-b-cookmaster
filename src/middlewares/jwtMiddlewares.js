const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const secret = 'It is secret ok?!';

const jwtConfiguration = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'missing auth token',
    }); 
  }
  
  try {
    const payload = jwt.verify(token, secret);
    const { id, email } = payload;

    req.user = { userId: id, email };
    
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'jwt malformed',
    });
  }
};

module.exports = {
  jwt,
  jwtConfiguration,
  secret,
  validateJWT,
};