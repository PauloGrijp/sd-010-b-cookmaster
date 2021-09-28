const jwt = require('jsonwebtoken');

const secret = 'tigretigre';

const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

function generateToken(payload) {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
}

module.exports = {
  generateToken,
};