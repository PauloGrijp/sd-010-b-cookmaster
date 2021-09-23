const jwt = require('jsonwebtoken');
const secret = require('../configs/secret');
const { statusCode, messages } = require('../schemas');

const authenticateMiddleware = (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    err.statusCode = statusCode.UNAUTHORIZED;
    err.message = messages.JWT_MALFORMED;
    next(err);
  }
};

module.exports = authenticateMiddleware;