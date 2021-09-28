const JWT = require('jsonwebtoken');

const secret = 'mia';

async function tokenValidation(req, _res, next) {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error('missing auth token');
    error.code = 401;
    throw error;
  }
  try {
    const payload = JWT.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    err.message = 'jwt malformed';
    err.code = 401;
    throw err;
  }
}

module.exports = {
  tokenValidation,
};