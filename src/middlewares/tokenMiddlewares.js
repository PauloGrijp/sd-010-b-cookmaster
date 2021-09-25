const Jwt = require('jsonwebtoken');

const secret = 'secretSecret';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '5d',
};

const checkToken = (token) => {
  if (!token) {
    const error = new Error('missing auth token');
    error.code = 401;
    throw error;
  }
};
const validToken = (token) => {
  try {
    Jwt.verify(token, secret);
  } catch (err) {
    err.message = 'jwt malformed';
    err.code = 401;
    throw err;
  }
};
const createTokenUser = (user) => {
  const { password: _, ...payload } = user;
  const token = Jwt.sign(payload, secret, jwtConfig);
  return token;
};
const validTokenUser = async (req, _res, next) => {
  const token = req.headers.authorization;
  checkToken(token);
  validToken(token);
  const payload = Jwt.verify(token, secret);
  req.user = payload;
  next();
};

module.exports = {
  createTokenUser,
  validTokenUser,
};
