const jwt = require('jsonwebtoken');

const secret = 'akojtA3FFkK3KA5z';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
