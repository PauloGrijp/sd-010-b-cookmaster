const jwt = require('jsonwebtoken');
const secret = require('../configs/secret');
const { statusCode, messages } = require('../schemas');
const Unauthorized = require('./error/BaseError');

const authenticateMiddleware = (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Unauthorized(messages.MISSING_JWT, statusCode.UNAUTHORIZED);
    jwt.verify(token, secret);
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = statusCode.UNAUTHORIZED;
      err.message = messages.JWT_MALFORMED;
    }
    next(err);
  }
};

module.exports = authenticateMiddleware;