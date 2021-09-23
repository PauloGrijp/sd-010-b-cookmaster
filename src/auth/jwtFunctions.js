const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'SuperSenha';

const createJWT = (user) => {
  const payload = { ...user };
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const verifyJWT = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
}; 

module.exports = { createJWT, verifyJWT };