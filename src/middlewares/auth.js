const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../utils/secret');
const Error = require('../utils/createObjError');

module.exports = (req, res, next) => {
  const err = (msg) => Error.unauthorized(msg);
  try {
    const { authorization: token } = req.headers;
    if (!token) next(err('missing auth token'));
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return next(err('jwt malformed'));
  }
};
